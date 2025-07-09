import React from 'react';
import { 
  FiMenu, FiPieChart, FiMail, FiUsers, 
  FiDollarSign, FiSettings 
} from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Sign<span>Admin</span></h2>
        <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu />
        </button>
      </div>
      
      <div className="sidebar-menu">
        <button 
          className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FiPieChart className="icon" />
          <span>Overview</span>
        </button>
        <button 
          className={`menu-item ${activeTab === 'signatures' ? 'active' : ''}`}
          onClick={() => setActiveTab('signatures')}
        >
          <FiMail className="icon" />
          <span>Signatures</span>
        </button>
        <button 
          className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FiUsers className="icon" />
          <span>Users</span>
        </button>
        <button 
          className={`menu-item ${activeTab === 'revenue' ? 'active' : ''}`}
          onClick={() => setActiveTab('revenue')}
        >
          <FiDollarSign className="icon" />
          <span>Revenue</span>
        </button>
        <button 
          className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <FiSettings className="icon" />
          <span>Settings</span>
        </button>
      </div>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">AD</div>
          <div className="user-info">
            <h4>Admin User</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;