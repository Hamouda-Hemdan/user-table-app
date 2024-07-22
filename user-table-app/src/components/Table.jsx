import React, { useState } from "react";
import "./Table.scss";

const Table = ({ users, onSort, sortConfig, onRowClick }) => {
  const [columnWidths, setColumnWidths] = useState({
    fullName: 150,
    age: 100,
    gender: 150,
    phone: 200,
    address: 150,
  });

  const getClassNamesFor = (name) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleResize = (e, column) => {
    const startX = e.clientX;
    const startWidth = columnWidths[column];

    const onMouseMove = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth >= 50) {
        // Minimum width 50px
        setColumnWidths((prevWidths) => ({
          ...prevWidths,
          [column]: newWidth,
        }));
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th
            onClick={() => onSort("firstName")}
            className={getClassNamesFor("firstName")}
            style={{ width: columnWidths.fullName }}
          >
            Full Name
            <div
              className="resizer"
              onMouseDown={(e) => handleResize(e, "fullName")}
            />
          </th>
          <th
            onClick={() => onSort("age")}
            className={getClassNamesFor("age")}
            style={{ width: columnWidths.age }}
          >
            Age
            <div
              className="resizer"
              onMouseDown={(e) => handleResize(e, "age")}
            />
          </th>
          <th
            onClick={() => onSort("gender")}
            className={getClassNamesFor("gender")}
            style={{ width: columnWidths.gender }}
          >
            Gender
            <div
              className="resizer"
              onMouseDown={(e) => handleResize(e, "gender")}
            />
          </th>
          <th style={{ width: columnWidths.phone }}>
            Phone Number
            <div
              className="resizer"
              onMouseDown={(e) => handleResize(e, "phone")}
            />
          </th>
          <th
            onClick={() => onSort("address.city")}
            className={getClassNamesFor("address.city")}
            style={{ width: columnWidths.address }}
          >
            Address
            <div
              className="resizer"
              onMouseDown={(e) => handleResize(e, "address")}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => onRowClick(user)}>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>
              {user.address.city}, {user.address.street}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
