// import React, { useState } from 'react';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
// } from 'recharts';
// import { FiMenu, FiSearch, FiBell, FiMail, FiUsers, FiDollarSign, FiPieChart, FiSettings } from 'react-icons/fi';
// import { BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';

// // Custom CSS
// import './Dashboard.css';

// // Sample data
// const userGrowthData = [
//   { name: 'Jan', users: 1200, signatures: 800 },
//   { name: 'Feb', users: 1900, signatures: 1200 },
//   { name: 'Mar', users: 2200, signatures: 1600 },
//   { name: 'Apr', users: 2800, signatures: 2000 },
//   { name: 'May', users: 3500, signatures: 2500 },
//   { name: 'Jun', users: 4200, signatures: 3100 },
//   { name: 'July', users: 4200, signatures: 3100 },
// ];

// const planDistribution = [
//   { name: 'Free', value: 45 },
//   { name: 'Pro', value: 30 },
//   { name: 'Business', value: 20 },
//   { name: 'Enterprise', value: 5 },
// ];

// const recentSignatures = [
//   { id: '#ES-1001', name: 'Sarah Johnson', plan: 'Pro', status: 'active', date: '2023-06-15' },
//   { id: '#ES-1002', name: 'Tech Solutions Inc.', plan: 'Business', status: 'active', date: '2023-06-14' },
//   { id: '#ES-1003', name: 'Michael Chen', plan: 'Free', status: 'expired', date: '2023-06-12' },
//   { id: '#ES-1004', name: 'Emily Wilson', plan: 'Pro', status: 'active', date: '2023-06-10' },
//   { id: '#ES-1005', name: 'Global Corp', plan: 'Enterprise', status: 'active', date: '2023-06-08' },
// ];



// const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   return (
//     <div className={`dashboard ${sidebarOpen ? '' : 'collapsed'}`}>
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <h2>Sign<span>Admin</span></h2>
//           <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
//             <FiMenu />
//           </button>
//         </div>
        
//         <div className="sidebar-menu">
//           <button 
//             className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
//             onClick={() => setActiveTab('overview')}
//           >
//             <FiPieChart className="icon" />
//             <span>Overview</span>
//           </button>
//           <button 
//             className={`menu-item ${activeTab === 'signatures' ? 'active' : ''}`}
//             onClick={() => setActiveTab('signatures')}
//           >
//             <FiMail className="icon" />
//             <span>Signatures</span>
//           </button>
//           <button 
//             className={`menu-item ${activeTab === 'banners' ? 'active' : ''}`}
//             onClick={() => setActiveTab('banners')}
//           >
//             <FiMail className="icon" />
//             <span>Banners</span>
//           </button>
//           <button 
//             className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
//             onClick={() => setActiveTab('users')}
//           >
//             <FiUsers className="icon" />
//             <span>Users</span>
//           </button>
//           <button 
//             className={`menu-item ${activeTab === 'revenue' ? 'active' : ''}`}
//             onClick={() => setActiveTab('revenue')}
//           >
//             <FiDollarSign className="icon" />
//             <span>Revenue</span>
//           </button>
//           <button 
//             className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('settings')}
//           >
//             <FiSettings className="icon" />
//             <span>Settings</span>
//           </button>
//           <button 
//             className={`menu-item ${activeTab === 'admin' ? 'active' : ''}`}
//             onClick={() => setActiveTab('admin')}
//           >
//             {/* <FiSettings className="icon" /> */}
//             <span>Admin</span>
//           </button>
//         </div>
        
//         <div className="sidebar-footer">
//           <div className="user-profile">
//             <div className="avatar">AD</div>
//             <div className="user-info">
//               <h4>Admin User</h4>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Top Navigation */}
//         <header className="topbar">
//           <div className="search-bar">
//             <FiSearch className="search-icon" />
//             <input type="text" placeholder="Search signatures, users..." />
//           </div>
          
//           <div className="topbar-right">
//             <div className="notification-icon">
//               <FiBell />
//               <span className="badge">3</span>
//             </div>
            
//             <div className="user-menu">
//               <div className="avatar sm">AD</div>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <div className="content-area">
//           <div className="page-header">
//             <h1>Dashboard Overview</h1>
//             <div className="breadcrumb">Home / Dashboard</div>
//           </div>
          
//           {/* Stats Cards */}
//           <div className="stats-grid">
//             <div className="stat-card primary">
//               <div className="stat-icon">
//                 <FiMail />
//               </div>
//               <div className="stat-info">
//                 <h3>3,100</h3>
//                 <p>Total Signatures</p>
//                 <span className="trend up">+12% from last month</span>
//               </div>
//             </div>
            
//             <div className="stat-card success">
//               <div className="stat-icon">
//                 <FiUsers />
//               </div>
//               <div className="stat-info">
//                 <h3>2,450</h3>
//                 <p>Active Users</p>
//                 <span className="trend up">+8% from last month</span>
//               </div>
//             </div>
            
//             <div className="stat-card warning">
//               <div className="stat-icon">
//                 <FiDollarSign />
//               </div>
//               <div className="stat-info">
//                 <h3>$8,750</h3>
//                 <p>Monthly Revenue</p>
//                 <span className="trend up">+15% from last month</span>
//               </div>
//             </div>
            
//             <div className="stat-card danger">
//               <div className="stat-icon">
//                 <BsExclamationTriangle />
//               </div>
//               <div className="stat-info">
//                 <h3>42</h3>
//                 <p>Issues Reported</p>
//                 <span className="trend down">-5% from last month</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Charts Row */}
//           <div className="charts-row">
//             <div className="chart-container large">
//               <div className="chart-header">
//                 <h3>User & Signature Growth</h3>
//                 <select className="time-selector">
//                   <option>Last 6 Months</option>
//                   <option>Last Year</option>
//                   <option>All Time</option>
//                 </select>
//               </div>
//               <div className="chart-wrapper">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <AreaChart data={userGrowthData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="users" stroke="#4e73df" fill="#4e73df" fillOpacity={0.1} />
//                     <Area type="monotone" dataKey="signatures" stroke="#1cc88a" fill="#1cc88a" fillOpacity={0.1} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
            
//             <div className="chart-container small">
//               <div className="chart-header">
//                 <h3>Plan Distribution</h3>
//               </div>
//               <div className="chart-wrapper">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={planDistribution}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={80}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {planDistribution.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
          
//           {/* Recent Activity */}
//           {/* <div className="recent-activity">
//             <div className="section-header">
//               <h3>Recent Signatures</h3>
//               <button className="view-all-btn">View All</button>
//             </div>
            
//             <div className="signatures-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Signature ID</th>
//                     <th>User</th>
//                     <th>Plan</th>
//                     <th>Status</th>
//                     <th>Date Created</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentSignatures.map(sig => (
//                     <tr key={sig.id}>
//                       <td>{sig.id}</td>
//                       <td>{sig.name}</td>
//                       <td>
//                         <span className={`plan-badge ${sig.plan.toLowerCase()}`}>
//                           {sig.plan}
//                         </span>
//                       </td>
//                       <td>
//                         <span className={`status-badge ${sig.status}`}>
//                           {sig.status === 'active' ? <BsCheckCircle /> : <BsExclamationTriangle />}
//                           {sig.status}
//                         </span>
//                       </td>
//                       <td>{sig.date}</td>
//                       <td>
//                         <button className="action-btn view">View</button>
//                         <button className="action-btn edit">Edit</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from 'react';
import Sidebar from './SidebarTabs/Sidebar';
import Topbar from './SidebarTabs/Topbar';
import Overview from './SidebarTabs/Overview';
import Signatures from './SidebarTabs/Signatures';
import Users from './SidebarTabs/Users';
import Revenue from './SidebarTabs/Revenue';
import Settings from './SidebarTabs/Settings';
import './Dashboard.css'; 

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'signatures':
        return <Signatures />;
      case 'users':
        return <Users />;
      case 'revenue':
        return <Revenue />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={`dashboard ${sidebarOpen ? '' : 'collapsed'}`}>
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;