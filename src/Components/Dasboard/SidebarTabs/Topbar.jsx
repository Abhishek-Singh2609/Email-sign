import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search signatures, users..." />
      </div>
      
      <div className="topbar-right">
        <div className="notification-icon">
          <FiBell />
          <span className="badge">3</span>
        </div>
        
        <div className="user-menu">
          <div className="avatar sm">AD</div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;