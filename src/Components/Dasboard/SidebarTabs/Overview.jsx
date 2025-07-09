import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { FiMail, FiUsers, FiDollarSign } from 'react-icons/fi';
import { BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';

const userGrowthData = [
  { name: 'Jan', users: 1200, signatures: 800 },
  { name: 'Feb', users: 1900, signatures: 1200 },
  { name: 'Mar', users: 2200, signatures: 1600 },
  { name: 'Apr', users: 2800, signatures: 2000 },
  { name: 'May', users: 3500, signatures: 2500 },
  { name: 'Jun', users: 4200, signatures: 3100 },
];

const planDistribution = [
  { name: 'Free', value: 45 },
  { name: 'Pro', value: 30 },
  { name: 'Business', value: 20 },
  { name: 'Enterprise', value: 5 },
];

const recentSignatures = [
  { id: '#ES-1001', name: 'Sarah Johnson', plan: 'Pro', status: 'active', date: '2023-06-15' },
  { id: '#ES-1002', name: 'Tech Solutions Inc.', plan: 'Business', status: 'active', date: '2023-06-14' },
  { id: '#ES-1003', name: 'Michael Chen', plan: 'Free', status: 'expired', date: '2023-06-12' },
  { id: '#ES-1004', name: 'Emily Wilson', plan: 'Pro', status: 'active', date: '2023-06-10' },
  { id: '#ES-1005', name: 'Global Corp', plan: 'Enterprise', status: 'active', date: '2023-06-08' },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const Overview = () => {
  return (
    <>
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <div className="breadcrumb">Home / Dashboard</div>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FiMail />
          </div>
          <div className="stat-info">
            <h3>3,100</h3>
            <p>Total Signatures</p>
            <span className="trend up">+12% from last month</span>
          </div>
        </div>
         <div className="stat-card success">
               <div className="stat-icon">
                 <FiUsers />
               </div>
               <div className="stat-info">
                 <h3>2,450</h3>
                 <p>Active Users</p>
                 <span className="trend up">+8% from last month</span>
               </div>
             </div>          
             <div className="stat-card warning">
               <div className="stat-icon">
                 <FiDollarSign />
               </div>
               <div className="stat-info">
                 <h3>$8,750</h3>
                 <p>Monthly Revenue</p>
                 <span className="trend up">+15% from last month</span>
               </div>
             </div>          
             <div className="stat-card danger">
               <div className="stat-icon">
                 <BsExclamationTriangle />
               </div>
               <div className="stat-info">
                 <h3>42</h3>
                 <p>Issues Reported</p>
                 <span className="trend down">-5% from last month</span>
               </div>
             </div>
      </div>
      
      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-container large">
          <div className="chart-header">
            <h3>User & Signature Growth</h3>
            <select className="time-selector">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#4e73df" fill="#4e73df" fillOpacity={0.1} />
                <Area type="monotone" dataKey="signatures" stroke="#1cc88a" fill="#1cc88a" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-container small">
               <div className="chart-header">
                 <h3>Plan Distribution</h3>
               </div>
               <div className="chart-wrapper">
                 <ResponsiveContainer width="100%" height={300}>
                   <PieChart>
                     <Pie
                       data={planDistribution}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {planDistribution.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                     </Pie>
                     <Tooltip />
                     <Legend />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
             </div>
      </div>
      
      {/* Recent Activity */}
      {/* <div className="recent-activity">
        <div className="section-header">
          <h3>Recent Signatures</h3>
          <button className="view-all-btn">View All</button>
        </div>
        
        <div className="signatures-table">
          <table>
            <thead>
              <tr>
                <th>Signature ID</th>
                <th>User</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentSignatures.map(sig => (
                <tr key={sig.id}>
                  <td>{sig.id}</td>
                  <td>{sig.name}</td>
                  <td>
                    <span className={`plan-badge ${sig.plan.toLowerCase()}`}>
                      {sig.plan}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${sig.status}`}>
                      {sig.status === 'active' ? <BsCheckCircle /> : <BsExclamationTriangle />}
                      {sig.status}
                    </span>
                  </td>
                  <td>{sig.date}</td>
                  <td>
                    <button className="action-btn view">View</button>
                    <button className="action-btn edit">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default Overview;