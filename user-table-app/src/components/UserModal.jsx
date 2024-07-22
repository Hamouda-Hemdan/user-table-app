import React from "react";
import "./UserModal.scss";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>Age: {user.age}</p>
        <p>Gender: {user.gender}</p>
        <p>Phone: {user.phone}</p>
        <p>Email: {user.email}</p>
        <p>
          Address: {user.address.city}, {user.address.street}
        </p>
        <p>Height: {user.height} cm</p>
        <p>Weight: {user.weight} kg</p>
      </div>
    </div>
  );
};

export default UserModal;
