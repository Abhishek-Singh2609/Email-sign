import React from "react";
import './PopupMessage.css';

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-message">{message}</div>
        <button className="popup-close-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;