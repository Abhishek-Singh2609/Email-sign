// import  { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
// import "./Employees.css";

// const SignatureAction = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [signatureApplied, setSignatureApplied] = useState(null);
//   const [loadingEmployees, setLoadingEmployees] = useState(false);
//   const [removingAll, setRemovingAll] = useState(false);
//   const [removingEmployee, setRemovingEmployee] = useState(null);
//   const [removingAllBanners, setRemovingAllBanners] = useState(false);
//   const [organizationDomain, setOrganizationDomain] = useState(null);
//   const [showEmployeeList, setShowEmployeeList] = useState(false);
//   const navigate = useNavigate();

//   const fetchEmployees = async () => {
//     setLoadingEmployees(true);
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       alert("No token found. Please login.");
//       window.location.href = "/login";
//       return;
//     }

//     try {
//       const response = await axios.get(
//         "https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/employees",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEmployees(response.data);
//       setFilteredEmployees(response.data);
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         alert("Session expired. Please login again.");
//         localStorage.removeItem("accessToken");
//         window.location.href = "/login";
//       } else {
//         setError("Failed to fetch employees. Please try again later.");
//         console.error("Error fetching employees:", err);
//       }
//     } finally {
//       setLoadingEmployees(false);
//     }
//   };

//   const fetchOrganization = async () => {
//     const token = localStorage.getItem("accessToken");
//     try {
//       const response = await axios.get(
//         "https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/organization",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       const defaultDomain = response.data[0]?.verifiedDomains?.find(
//         domain => domain.isDefault
//       )?.name;
      
//       if (defaultDomain) {
//         setOrganizationDomain(defaultDomain);
//       } else {
//         setError("Could not determine organization domain");
//       }
//     } catch (err) {
//       console.error("Error fetching organization:", err);
//       setError("Failed to fetch organization details");
//     }
//   };

//   useEffect(() => {
//     fetchOrganization();
//     fetchEmployees(); 
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredEmployees(employees);
//     } else {
//       const filtered = employees.filter(
//         (employee) =>
//           employee.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           employee.mail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           employee.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredEmployees(filtered);
//     }
//   }, [searchTerm, employees]);

//   const applySignature = (emp) => {
//     setIsLoading(true);
//     setSignatureApplied(emp.id);

//     navigate("/edittemplate", {
//       state: {
//         email: emp.mail,
//         organization: "Agile World Technologies LLC",
//         mobilePhone: emp.mobilePhone,
//         displayName: emp.displayName,
//         jobTitle: emp.jobTitle,
//         officeLocation: emp.officeLocation,
//         isBulkApply: false,
//       },
//     });

//     setTimeout(() => {
//       setIsLoading(false);
//       setSignatureApplied(null);
//     }, 1000);
//   };

//   const applyAllSignatures = () => {
//     if (filteredEmployees.length === 0) {
//       setError("No employees available to apply signatures");
//       return;
//     }

//     setIsLoading(true);
//     setSelectedEmployees(filteredEmployees);
    
//     navigate("/edittemplate", {
//       state: {
//         isBulkApply: true,
//         selectedEmployees: filteredEmployees,
//         organization: "Agile World Technologies LLC"
//       },
//     });

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

//   const handleShowIndividual = () => {
//     if (!showEmployeeList && employees.length === 0) {
//       fetchEmployees(); // Only fetch if not already loaded
//     } else {
//       setShowEmployeeList(true); // Just show the list if already loaded
//     }
//   };

//   const handleSelectAll = (checked) => {
//     if (checked) {
//       setSelectedEmployees(filteredEmployees.map((emp) => emp.id));
//     } else {
//       setSelectedEmployees([]);
//     }
//   };

//   const handleSelectEmployee = (id, checked) => {
//     if (checked) {
//       setSelectedEmployees([...selectedEmployees, id]);
//     } else {
//       setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
//     }
//   };

//   const removeAllSignatures = async () => {
//     if (!organizationDomain) {
//       setError("Organization domain not available");
//       return;
//     }
//     setRemovingAll(true);
//     try {
//       const response = await axios.post(
//         'https://email-signature-function-app.azurewebsites.net/api/RemoveSignature',
//         {
//           organization: organizationDomain
//         },
//         {
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
//       if (response.status === 200) {
//         alert("All signatures removed successfully!");
//       }
//     } catch (error) {
//       console.error("Error removing all signatures:", error);
//       setError("Failed to remove all signatures. Please try again later.");
//     } finally {
//       setRemovingAll(false);
//     }
//   };

//   const removeSignature = async (employee) => {
//     if (!organizationDomain) {
//       setError("Organization domain not available");
//       return;
//     }
//     setRemovingEmployee(employee.id);
//     try {
//       const response = await axios.post(
//         'https://email-signature-function-app.azurewebsites.net/api/RemoveSignature',
//         {
//           organization: organizationDomain,
//           email: employee.mail
//         },
//         {
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
//       if (response.status === 200) {
//         alert(`Signature removed successfully for ${employee.displayName}!`);
//       }
//     } catch (error) {
//       console.error(`Error removing signature for ${employee.displayName}:`, error);
//       setError(`Failed to remove signature for ${employee.displayName}. Please try again later.`);
//     } finally {
//       setRemovingEmployee(null);
//     }
//   };

//   const removeAllBanners = async () => {
//     if (!organizationDomain) {
//       setError("Organization domain not available");
//       return;
//     }
//     setRemovingAllBanners(true);
//     try {
//       const response = await fetch(
//         "https://email-signature-function-app.azurewebsites.net/api/RemoveBanner",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             action: "removeAll",
//             organization: organizationDomain,
//           }),
//         }
//       );

//       if (response.ok) {
//         alert("All banners removed successfully!");
//       } else {
//         throw new Error("Failed to remove banners.");
//       }
//     } catch (error) {
//       console.error("Error removing all banners:", error);
//       setError("Failed to remove all banners. Please try again later.");
//     } finally {
//       setRemovingAllBanners(false);
//     }
//   };

//   const isAllSelected = selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0;
//   const isIndeterminate = selectedEmployees.length > 0 && selectedEmployees.length < filteredEmployees.length;

//   if (loadingEmployees) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <span>Loading employees...</span>
//       </div>
//     );
//   }


//   return (
//     <>
//       <div className="action-header">
//         <h1>
//           Choose Who Gets the{" "}
//           <span className="action-header-line">Signature</span>{" "}
//         </h1>
//       </div>
//       <div className="action-subtitle">
//         Apply signatures to individuals or entire teams <br /> Keep your brand
//         consistent across users
//       </div>
//       <div className="actionbutton-group">
//         <button 
//           className="btn btn-apply" 
//           onClick={applyAllSignatures}
//           disabled={isLoading || employees.length === 0}
//         >
//           {isLoading ? "Applying..." : "Apply For All"}
//         </button>
//         <button 
//           className="btn btn-remove"
//           onClick={() => {
//             if (employees.length === 0) {
//               fetchEmployees(); // Fetch if not already loaded
//             }
//             setShowEmployeeList(true); // Always show the list when clicked
//           }}
//         >
//           Apply to Individual
//         </button>
//         <button className="btn btn-apply">Apply to Groups</button>
//       </div>

//       {showEmployeeList && (
//         <>
//           <div className="search-bar">
//             <div className="search-container">
//               <Search className="search-icon" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search for employees"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//             </div>
//             <div className="filter-container">
//               <button className="filter-button">
//                 <Filter size={20} />
//               </button>
//             </div>
//           </div>

//           <div className="employee-table-container">
//             {error && <div className="error-message">{error}</div>}

//             <div className="table-wrapper">
//               <table className="employee-table">
//                 <thead>
//                   <tr>
//                     <th className="checkbox-col">
//                       <input
//                         type="checkbox"
//                         checked={isAllSelected}
//                         ref={(input) => {
//                           if (input) input.indeterminate = isIndeterminate;
//                         }}
//                         onChange={(e) => handleSelectAll(e.target.checked)}
//                         className="checkbox"
//                       />
//                     </th>
//                     <th className="name-col">Name</th>
//                     <th className="position-col">Position</th>
//                     <th className="tags-col">
//                       <div className="tags-header">
//                         Tags
//                         <Filter size={16} className="tags-filter" />
//                       </div>
//                     </th>
//                     <th className="preview-col">Preview</th>
//                     <th className="apply-col">Apply</th>
//                     <th className="remove-col">Remove</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredEmployees.length > 0 ? (
//                     filteredEmployees.map((employee) => (
//                       <tr key={employee.id} className="employee-row">
//                         <td className="checkbox-col">
//                           <input
//                             type="checkbox"
//                             checked={selectedEmployees.includes(employee.id)}
//                             onChange={(e) =>
//                               handleSelectEmployee(employee.id, e.target.checked)
//                             }
//                             className="checkbox"
//                           />
//                         </td>
//                         <td className="name-col">
//                           <div className="employee-info">
//                             <div className="avatar">
//                               <img 
//                                 src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.displayName || '')}&background=random`} 
//                                 alt={employee.displayName} 
//                               />
//                             </div>
//                             <span className="employee-name">{employee.displayName}</span>
//                           </div>
//                         </td>
//                         <td className="position-col">
//                           <span className="position">{employee.jobTitle}</span>
//                         </td>
//                         <td className="tags-col">
//                           <div className="tags-container">
//                             {employee.officeLocation && (
//                               <span className="tag">{employee.officeLocation}</span>
//                             )}
//                             {employee.department && (
//                               <span className="tag">{employee.department}</span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="preview-col">
//                           <button className="action-btn preview-btn">
//                             <Eye size={16} />
//                           </button>
//                         </td>
//                         <td className="apply-col">
//                           <button 
//                             className="action-btn apply-btn"
//                             onClick={() => applySignature(employee)}
//                             disabled={isLoading || signatureApplied === employee.id}
//                           >
//                             {signatureApplied === employee.id ? (
//                               <span className="spinner"></span>
//                             ) : (
//                               <Edit size={16} />
//                             )}
//                           </button>
//                         </td>
//                         <td className="remove-col">
//                           <button 
//                             className="action-btn remove-btn"
//                             onClick={() => removeSignature(employee)}
//                             disabled={removingEmployee === employee.id}
//                           >
//                             {removingEmployee === employee.id ? (
//                               <span className="spinner"></span>
//                             ) : (
//                               <Trash2 size={16} />
//                             )}
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="no-results">
//                         {searchTerm ? "No employees found matching your search." : "No employees available."}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default SignatureAction;


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import "./Employees.css";

const SignatureAction = () => {
  // State for employees
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signatureApplied, setSignatureApplied] = useState(null);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [removingAll, setRemovingAll] = useState(false);
  const [removingEmployee, setRemovingEmployee] = useState(null);
  const [organizationDomain, setOrganizationDomain] = useState(null);
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  
  // State for groups
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [showGroupsList, setShowGroupsList] = useState(false);
  
  const navigate = useNavigate();

  // Fetch employees
  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("No token found. Please login.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.get(
        "https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/employees",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } else {
        setError("Failed to fetch employees. Please try again later.");
        console.error("Error fetching employees:", err);
      }
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Fetch groups
  const fetchGroups = async () => {
    setLoadingGroups(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("No token found. Please login.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.get(
        "https://graph.microsoft.com/v1.0/groups",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGroups(response.data.value);
      setFilteredGroups(response.data.value);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } else {
        setError("Failed to fetch groups. Please try again later.");
        console.error("Error fetching groups:", err);
      }
    } finally {
      setLoadingGroups(false);
    }
  };

  // Fetch organization
  const fetchOrganization = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/organization",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const defaultDomain = response.data[0]?.verifiedDomains?.find(
        domain => domain.isDefault
      )?.name;
      
      if (defaultDomain) {
        setOrganizationDomain(defaultDomain);
      } else {
        setError("Could not determine organization domain");
      }
    } catch (err) {
      console.error("Error fetching organization:", err);
      setError("Failed to fetch organization details");
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
      setFilteredGroups(groups);
    } else {
      if (showEmployeeList) {
        const filtered = employees.filter(
          (employee) =>
            employee.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.mail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(filtered);
      } else if (showGroupsList) {
        const filtered = groups.filter(
          (group) =>
            group.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.mail?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGroups(filtered);
      }
    }
  }, [searchTerm, employees, groups, showEmployeeList, showGroupsList]);

  // Apply signature to individual employee or group
  const applySignature = (emp) => {
    setIsLoading(true);
    setSignatureApplied(emp.id);

    const isGroup = showGroupsList;
    
    if (isGroup) {
      navigate("/edittemplate", {
        state: {
          email: emp.mail,
          organization: "Agile World Technologies LLC",
          displayName: emp.displayName,
          isBulkApply: false,
          isGroup: true
        },
      });
    } else {
      navigate("/edittemplate", {
        state: {
          email: emp.mail,
          organization: "Agile World Technologies LLC",
          mobilePhone: emp.mobilePhone,
          displayName: emp.displayName,
          jobTitle: emp.jobTitle,
          officeLocation: emp.officeLocation,
          isBulkApply: false
        },
      });
    }

    setTimeout(() => {
      setIsLoading(false);
      setSignatureApplied(null);
    }, 1000);
  };

  // Apply to all employees (always enabled)
  const applyAllSignatures = () => {
    if (showGroupsList) {
      // When in groups view, apply to all employees (if any exist)
      if (employees.length === 0) {
        setError("No employees available to apply signatures");
        return;
      }
      setIsLoading(true);
      setSelectedEmployees(employees);
      
      navigate("/edittemplate", {
        state: {
          isBulkApply: true,
          selectedEmployees: employees,
          organization: "Agile World Technologies LLC"
        },
      });
    } else {
      // When in employees view, apply to filtered employees
      if (filteredEmployees.length === 0) {
        setError("No employees available to apply signatures");
        return;
      }
      setIsLoading(true);
      setSelectedEmployees(filteredEmployees);
      
      navigate("/edittemplate", {
        state: {
          isBulkApply: true,
          selectedEmployees: filteredEmployees,
          organization: "Agile World Technologies LLC"
        },
      });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Show individual employees
  const handleShowIndividual = () => {
    if (employees.length === 0) {
      fetchEmployees();
    }
    setShowEmployeeList(true);
    setShowGroupsList(false);
  };

  // Show groups
  const handleShowGroups = () => {
    if (groups.length === 0) {
      fetchGroups();
    }
    setShowGroupsList(true);
    setShowEmployeeList(false);
  };

  // Employee selection handlers
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(filteredEmployees.map((emp) => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id, checked) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, id]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    }
  };

  // Remove signature functions
  const removeAllSignatures = async () => {
    if (!organizationDomain) {
      setError("Organization domain not available");
      return;
    }
    setRemovingAll(true);
    try {
      const response = await axios.post(
        'https://email-signature-function-app.azurewebsites.net/api/RemoveSignature',
        {
          organization: organizationDomain
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (response.status === 200) {
        alert("All signatures removed successfully!");
      }
    } catch (error) {
      console.error("Error removing all signatures:", error);
      setError("Failed to remove all signatures. Please try again later.");
    } finally {
      setRemovingAll(false);
    }
  };

  const removeSignature = async (employee) => {
    if (!organizationDomain) {
      setError("Organization domain not available");
      return;
    }
    setRemovingEmployee(employee.id);
    try {
      const response = await axios.post(
        'https://email-signature-function-app.azurewebsites.net/api/RemoveSignature',
        {
          organization: organizationDomain,
          email: employee.mail
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (response.status === 200) {
        alert(`Signature removed successfully for ${employee.displayName}!`);
      }
    } catch (error) {
      console.error(`Error removing signature for ${employee.displayName}:`, error);
      setError(`Failed to remove signature for ${employee.displayName}. Please try again later.`);
    } finally {
      setRemovingEmployee(null);
    }
  };

  const isAllSelected = selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0;
  const isIndeterminate = selectedEmployees.length > 0 && selectedEmployees.length < filteredEmployees.length;

  if (loadingEmployees) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <span>Loading employees...</span>
      </div>
    );
  }

  return (
    <>
      <div className="action-header">
        <h1>
          Choose Who Gets the{" "}
          <span className="action-header-line">Signature</span>{" "}
        </h1>
      </div>
      <div className="action-subtitle">
        Apply signatures to individuals or entire teams <br /> Keep your brand
        consistent across users
      </div>
      <div className="actionbutton-group">
        <button 
          className="btn btn-apply" 
          onClick={applyAllSignatures}
          disabled={isLoading}
        >
          {isLoading ? "Applying..." : "Apply For All"}
        </button>
        <button 
          className="btn btn-remove"
          onClick={handleShowIndividual}
        >
          Apply to Individual
        </button>
        <button 
          className="btn btn-apply" 
          onClick={handleShowGroups}
          disabled={loadingGroups}
        >
          {loadingGroups ? "Loading..." : "Apply to Groups"}
        </button>
      </div>

      {showEmployeeList && (
        <>
          <div className="search-bar">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search for employees"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-container">
              <button className="filter-button">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="employee-table-container">
            {error && <div className="error-message">{error}</div>}

            <div className="table-wrapper">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(input) => {
                          if (input) input.indeterminate = isIndeterminate;
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="checkbox"
                      />
                    </th>
                    <th className="name-col">Name</th>
                    <th className="position-col">Position</th>
                    <th className="tags-col">
                      <div className="tags-header">
                        Tags
                        <Filter size={16} className="tags-filter" />
                      </div>
                    </th>
                    <th className="preview-col">Preview</th>
                    <th className="apply-col">Apply</th>
                    <th className="remove-col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="employee-row">
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={selectedEmployees.includes(employee.id)}
                            onChange={(e) =>
                              handleSelectEmployee(employee.id, e.target.checked)
                            }
                            className="checkbox"
                          />
                        </td>
                        <td className="name-col">
                          <div className="employee-info">
                            <div className="avatar">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.displayName || '')}&background=random`} 
                                alt={employee.displayName} 
                              />
                            </div>
                            <span className="employee-name">{employee.displayName}</span>
                          </div>
                        </td>
                        <td className="position-col">
                          <span className="position">{employee.jobTitle}</span>
                        </td>
                        <td className="tags-col">
                          <div className="tags-container">
                            {employee.officeLocation && (
                              <span className="tag">{employee.officeLocation}</span>
                            )}
                            {employee.department && (
                              <span className="tag">{employee.department}</span>
                            )}
                          </div>
                        </td>
                        <td className="preview-col">
                          <button className="action-btn preview-btn">
                            <Eye size={16} />
                          </button>
                        </td>
                        <td className="apply-col">
                          <button 
                            className="action-btn apply-btn"
                            onClick={() => applySignature(employee)}
                            disabled={isLoading || signatureApplied === employee.id}
                          >
                            {signatureApplied === employee.id ? (
                              <span className="spinner"></span>
                            ) : (
                              <Edit size={16} />
                            )}
                          </button>
                        </td>
                        <td className="remove-col">
                          <button 
                            className="action-btn remove-btn"
                            onClick={() => removeSignature(employee)}
                            disabled={removingEmployee === employee.id}
                          >
                            {removingEmployee === employee.id ? (
                              <span className="spinner"></span>
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-results">
                        {searchTerm ? "No employees found matching your search." : "No employees available."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showGroupsList && (
        <>
          <div className="search-bar">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search for groups"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="employee-table-container">
            {error && <div className="error-message">{error}</div>}

            <div className="table-wrapper">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th className="name-col">Group Name</th>
                    <th className="position-col">Email</th>
                    <th className="apply-col">Apply</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                      <tr key={group.id} className="employee-row">
                        <td className="name-col">
                          <div className="employee-info">
                            <div className="avatar">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(group.displayName || '')}&background=random`} 
                                alt={group.displayName} 
                              />
                            </div>
                            <span className="employee-name">{group.displayName}</span>
                          </div>
                        </td>
                        <td className="position-col">
                          <span className="position">{group.mail}</span>
                        </td>
                        <td className="apply-col">
                          <button 
                            className="action-btn apply-btn"
                            onClick={() => applySignature(group)}
                            disabled={isLoading || signatureApplied === group.id}
                          >
                            {signatureApplied === group.id ? (
                              <span className="spinner"></span>
                            ) : (
                              <Edit size={16} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-results">
                        {searchTerm ? "No groups found matching your search." : "No groups available."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignatureAction;