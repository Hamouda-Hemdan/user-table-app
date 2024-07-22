import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import SearchInput from "./components/SearchInput";
import UserModal from "./components/UserModal";
import "./App.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = [];
      let skip = 0;
      let total = 0;

      do {
        const response = await fetch(
          `https://dummyjson.com/users?limit=30&skip=${skip}`
        );
        const data = await response.json();
        allUsers.push(...data.users);
        total = data.total;
        skip += data.users.length;
      } while (skip < total);

      setUsers(allUsers);
      setFilteredUsers(allUsers);
    };

    fetchUsers().catch((error) =>
      console.error("Error fetching users:", error)
    );
  }, []);

  const handleSearch = async (query) => {
    if (!query) {
      setFilteredUsers(users); 
      setNoResults(false);
      return;
    }

    try {
      if (!query.includes(":")) {
        const searchTerm = query.trim().toLowerCase();

       
        const filtered = users.filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchTerm) ||
            user.lastName.toLowerCase().includes(searchTerm) ||
            user.age.toString().includes(searchTerm) ||
            user.gender.toLowerCase().startsWith(searchTerm) ||
            user.address.city.toLowerCase().includes(searchTerm)
        );

        console.log(users);

        setFilteredUsers(filtered);
        setNoResults(filtered.length === 0);
        return;
      }
      // Perform server-side filtering if query includes ':'
      const [key, value] = query.split(":").map((item) => item.trim());
      const response = await fetch(
        `https://dummyjson.com/users/filter?key=${key}&value=${value}`
      );
      const data = await response.json();

      console.log(key);

      if (data.users) {
        setFilteredUsers(data.users);
        setNoResults(data.users.length === 0);
      } else {
        setFilteredUsers([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error filtering users:", error);
      setFilteredUsers([]);
      setNoResults(true);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }
    setSortConfig({ key, direction });

    if (!direction) {
      setFilteredUsers([...users]);
    } else {
      const sortedUsers = [...filteredUsers].sort((a, b) => {
        const aValue = key.includes(".")
          ? key.split(".").reduce((obj, keyPart) => obj[keyPart], a)
          : a[key];
        const bValue = key.includes(".")
          ? key.split(".").reduce((obj, keyPart) => obj[keyPart], b)
          : b[key];

        if (aValue < bValue) return direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return direction === "ascending" ? 1 : -1;
        return 0;
      });
      setFilteredUsers(sortedUsers);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <SearchInput onSearch={handleSearch} />
      {noResults && <p className="no-results">No results found.</p>}
      <div className="table-container">
        <Table
          users={filteredUsers}
          onSort={handleSort}
          sortConfig={sortConfig}
          onRowClick={openModal}
        />
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>User Details</h2>
              <button onClick={closeModal}>Close</button>
            </div>
            <div className="modal-body">
              <UserModal user={selectedUser} onClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
