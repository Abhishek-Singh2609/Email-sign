// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./EmailSignature.css";
// import axios from "axios";

// // Import tab components
// import PersonalInfoTab from "./Tabs/PersonalInfoTab";
// import SocialTab from "./Tabs/SocialTab";
// import DesignTab, { getDesignStyle } from "./Tabs/DesignTab";
// import ImagesTab from "./Tabs/ImagesTab";
// import BannerTab from "./Tabs/BannerTab";
// import DisclaimerTab from "./Tabs/DisclaimerTab";

// // Import new components
// import TabNavigation from "./TabNavigation";
// import PreviewSection from "./PreviewSection";

// // Import utilities
// import {
//   ensureFiveCampaigns,
//   getActiveCampaigns,
//   generateSignatureHTML,
//   loadFromLocalStorage,
//   saveToLocalStorage,
// } from "./utils/signatureUtils";

// const apiUrl = import.meta.env.VITE_AZURE_KEY;

// const EmailSignatureCreator = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isSending, setIsSending] = useState(false);

//   // Check if we're in bulk apply mode
//   const { isBulkApply, selectedEmployees } = location.state || {};
//   const [activeTab, setActiveTab] = useState(
//     isBulkApply ? "Design" : "Personal Info"
//   );
//   const [tabsDisabled, setTabsDisabled] = useState(isBulkApply || false);

//   // Get initial state
//   const getInitialState = () => {
//     // First check if we're coming back from preview page
//     if (location.state?.preserveFormData && location.state?.formData) {
//       return {
//         formData: ensureFiveCampaigns(location.state.formData),
//         selectedDesign: location.state?.selectedDesign || "default",
//       };
//     }

//     // Then check localStorage
//     const localStorageState = loadFromLocalStorage();
//     if (localStorageState) {
//       // If email was passed, override the stored email
//       const formDataWithEmail = location.state?.email
//         ? { ...localStorageState.formData, email: location.state.email }
//         : localStorageState.formData;

//       return {
//         formData: ensureFiveCampaigns(formDataWithEmail),
//         selectedDesign: localStorageState.selectedDesign || "default",
//       };
//     }

//     return {
//       formData: ensureFiveCampaigns({
//         name: location.state?.displayName || "John Doe",
//         jobTitle: location.state?.jobTitle || "Product Designer",
//         company: location.state?.organization || "Agilesignature.com",
//         email: location.state?.email || "john.doe@agile.com",
//         phone: location.state?.businessPhones?.[0] || "+1 (555) 123-4567",
//         mobilePhone: "",
//         location: location.state?.officeLocation || "San Francisco, CA",
//         website: "www.agilesignature.com",
//         linkedin: "",
//         twitter: "",
//         instagram: "",
//         facebook: "",
//         youtube: "",
//         portfolio: "",
//         profileImage: null,
//         logo: null,
//         banner: null,
//         disclaimer: "",
//         campaigns: [],
//       }),
//       selectedDesign: "default",
//     };
//   };

//   const initialState = getInitialState();
//   const [selectedDesign, setSelectedDesign] = useState(
//     initialState.selectedDesign
//   );
//   const [formData, setFormData] = useState(initialState.formData);

//   // Handle bulk apply if needed - Use real data from first employee for preview
//   useEffect(() => {
//     if (isBulkApply && selectedEmployees?.length > 0) {
//       // Use the first employee's data for preview, but keep static data like social links, logos etc.
//       const firstEmployee = selectedEmployees[0];
//       const newFormData = {
//         ...formData,
//         name: firstEmployee.displayName || "John Doe",
//         jobTitle: firstEmployee.jobTitle || "Product Designer", 
//         email: firstEmployee.mail || "john.doe@agile.com",
//         phone: firstEmployee.businessPhones?.[0] || "+1 (555) 123-4567",
//         location: firstEmployee.officeLocation || "San Francisco, CA",
//         company: "Agile World Technologies LLC", // Keep static company info
//       };
//       setFormData(newFormData);
//     }
//   }, [isBulkApply, selectedEmployees]);

//   // Ensure we have 5 campaigns when the component mounts
//   useEffect(() => {
//     if (!formData.campaigns || formData.campaigns.length < 5) {
//       const updatedFormData = ensureFiveCampaigns(formData);
//       setFormData(updatedFormData);
//       if (!isBulkApply) {
//         saveToLocalStorage({
//           formData: updatedFormData,
//           activeTab,
//           selectedDesign,
//         });
//       }
//     }
//   }, []);

//   // Handle form data updates
//   const handleFormDataUpdate = (updatedFormData) => {
//     const newFormData = { ...formData, ...updatedFormData };
//     setFormData(newFormData);

//     // Only save to localStorage if not in bulk apply mode
//     if (!isBulkApply) {
//       const saved = saveToLocalStorage(
//         {
//           formData: newFormData,
//           activeTab,
//           selectedDesign,
//         },
//         { formData, activeTab, selectedDesign }
//       );
//       return saved;
//     }
//     return newFormData;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     handleFormDataUpdate({ [name]: value });
//   };

//   const navigateToPreview = () => {
//     const signatureHTML = generateSignatureHTML(
//       formData,
//       selectedDesign,
//       designStyle
//     );
//     navigate("/preview", {
//       state: {
//         signatureHTML,
//         formData,
//         selectedDesign,
//         activeTab,
//       },
//     });
//   };

//   const handleSendData = async () => {
//     if (isBulkApply) {
//       await handleBulkApply();
//       return;
//     }

//     if (!formData.email) {
//       alert("Please enter your email address");
//       return;
//     }

//     setIsSending(true);
//     try {
//       const organization = "agileworldtechnologies.com";
//       const signatureHTML = generateSignatureHTML(
//         formData,
//         selectedDesign,
//         designStyle
//       );

//       const response = await axios.post(
//         "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
//         {
//           email: formData.email,
//           organization,
//           html: signatureHTML,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-functions-key": apiUrl,
//           },
//         }
//       );

//       console.log("API Response:", response.data);
//       alert("Signature applied successfully!");
//     } catch (error) {
//       console.error("Error sending data:", error);
//       alert(`Failed to apply signature. Error: ${error.message}`);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Updated bulk apply function to send template with placeholders
//   const handleBulkApply = async () => {
//     if (!selectedEmployees || selectedEmployees.length === 0) {
//       alert("No employees selected for bulk apply");
//       return;
//     }

//     setIsSending(true);
//     try {
//       const organization = "agileworldtechnologies.com";
      
//       // Create template form data with placeholders for the backend
//       const templateFormData = {
//         ...formData,
//         name: "{{name}}",
//         jobTitle: "{{title}}", 
//         email: "{{email}}",
//         phone: "{{phone}}",
//         location: "{{location}}",
//         company: "{{company}}",
//         mobilePhone: "{{mobilePhone}}",
//         website: formData.website || "{{website}}"
//       };
      
//       // Generate the signature HTML template with placeholders
//       const signatureHTMLTemplate = generateSignatureHTML(
//         templateFormData,
//         selectedDesign,
//         designStyle
//       );

//       console.log("Sending bulk apply request with template:", signatureHTMLTemplate);

//       // Send request matching your curl format
//       const response = await axios.post(
//         "https://email-signature-function-app.azurewebsites.net/api/v2/apply-signature",
//         {
//           organization,
//           html: signatureHTMLTemplate,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-functions-key": apiUrl,
//           },
//         }
//       );

//       console.log("Bulk apply response:", response.data);
//       alert(`Signature template applied to ${selectedEmployees.length} employees!`);
//       navigate("/employees"); // Return to employees page after bulk apply
//     } catch (error) {
//       console.error("Error in bulk apply:", error);
//       alert(`Bulk apply failed. Error: ${error.message}`);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleTabClick = (tab) => {
//     if (tabsDisabled) return; // Prevent tab changes in bulk apply mode
//     setActiveTab(tab);
//     if (!isBulkApply) {
//       saveToLocalStorage(
//         {
//           formData,
//           activeTab: tab,
//           selectedDesign,
//         },
//         {
//           formData,
//           activeTab,
//           selectedDesign,
//         }
//       );
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "Personal Info":
//         return (
//           <PersonalInfoTab
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFormDataUpdate={handleFormDataUpdate}
//             organization={location.state?.organization}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Images":
//         return (
//           <ImagesTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Social":
//         return (
//           <SocialTab
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Design":
//         return (
//           <DesignTab
//             selectedDesign={selectedDesign}
//             handleDesignChange={(newDesign) => {
//               setSelectedDesign(newDesign);
//               if (!isBulkApply) {
//                 saveToLocalStorage({
//                   formData,
//                   activeTab,
//                   selectedDesign: newDesign,
//                 });
//               }
//             }}
//           />
//         );
//       case "Banner":
//         return (
//           <BannerTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Disclaimer":
//         return (
//           <DisclaimerTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const designStyle = getDesignStyle(selectedDesign);

//   return (
//     <div>
//       <h2
//         style={{
//           textAlign: "center",
//           marginTop: "0 auto",
//           color: "black",
//           fontWeight: "700",
//           fontSize: "2.5rem",
//         }}
//       >
//         {isBulkApply
//           ? "Bulk Apply Email Signatures"
//           : "Customize Your Email Signature"}
//       </h2>
//       {isBulkApply && (
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <p>Applying to {selectedEmployees?.length || 0} employees</p>
//         </div>
//       )}
//       <div className="editor-container">
//         <div className="content">
//           <div className="form-section">
//             <TabNavigation
//               activeTab={activeTab}
//               handleTabClick={handleTabClick}
//               tabsDisabled={tabsDisabled}
//             />
//             {renderTabContent()}
//           </div>

//           <PreviewSection
//             formData={formData}
//             selectedDesign={selectedDesign}
//             designStyle={designStyle}
//             getActiveCampaigns={() => getActiveCampaigns(formData.campaigns)}
//             navigateToPreview={navigateToPreview}
//             handleSendData={handleSendData}
//             isSending={isSending}
//             isBulkApply={isBulkApply}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailSignatureCreator;
// Fixed EmailSignatureCreator.jsx - Properly handles individual employee data in bulk apply
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./EmailSignature.css";
// import axios from "axios";

// // Import tab components
// import PersonalInfoTab from "./Tabs/PersonalInfoTab";
// import SocialTab from "./Tabs/SocialTab";
// import DesignTab, { getDesignStyle } from "./Tabs/DesignTab";
// import ImagesTab from "./Tabs/ImagesTab";
// import BannerTab from "./Tabs/BannerTab";
// import DisclaimerTab from "./Tabs/DisclaimerTab";

// // Import new components
// import TabNavigation from "./TabNavigation";
// import PreviewSection from "./PreviewSection";

// // Import fixed utilities
// import {
//   ensureFiveCampaigns,
//   getActiveCampaigns,
//   generateSignatureHTML,
//   generateSignatureTemplate,
//   replacePlaceholders,
//   loadFromLocalStorage,
//   saveToLocalStorage,
// } from "./utils/signatureUtils";

// const apiUrl = import.meta.env.VITE_AZURE_KEY;

// const EmailSignatureCreator = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isSending, setIsSending] = useState(false);

//   // Check if we're in bulk apply mode
//   const { isBulkApply, selectedEmployees } = location.state || {};
//   const [activeTab, setActiveTab] = useState(
//     isBulkApply ? "Design" : "Personal Info"
//   );
//   const [tabsDisabled, setTabsDisabled] = useState(isBulkApply || false);

//   // Get initial state
//   const getInitialState = () => {
//     // First check if we're coming back from preview page
//     if (location.state?.preserveFormData && location.state?.formData) {
//       return {
//         formData: ensureFiveCampaigns(location.state.formData),
//         selectedDesign: location.state?.selectedDesign || "default",
//       };
//     }

//     // Then check localStorage
//     const localStorageState = loadFromLocalStorage();
//     if (localStorageState) {
//       // If email was passed, override the stored email
//       const formDataWithEmail = location.state?.email
//         ? { ...localStorageState.formData, email: location.state.email }
//         : localStorageState.formData;

//       return {
//         formData: ensureFiveCampaigns(formDataWithEmail),
//         selectedDesign: localStorageState.selectedDesign || "default",
//       };
//     }

//     return {
//       formData: ensureFiveCampaigns({
//         name: location.state?.displayName || "John Doe",
//         jobTitle: location.state?.jobTitle || "Product Designer",
//         company: location.state?.organization || "Agilesignature.com",
//         email: location.state?.email || "john.doe@agile.com",
//         phone: location.state?.businessPhones?.[0] || "+1 (555) 123-4567",
//         mobilePhone: "",
//         location: location.state?.officeLocation || "San Francisco, CA",
//         website: "www.agilesignature.com",
//         linkedin: "",
//         twitter: "",
//         instagram: "",
//         facebook: "",
//         youtube: "",
//         portfolio: "",
//         profileImage: null,
//         logo: null,
//         banner: null,
//         disclaimer: "",
//         campaigns: [],
//       }),
//       selectedDesign: "default",
//     };
//   };

//   const initialState = getInitialState();
//   const [selectedDesign, setSelectedDesign] = useState(
//     initialState.selectedDesign
//   );
//   const [formData, setFormData] = useState(initialState.formData);

//   // Handle bulk apply if needed - Use real data from first employee for preview
//   useEffect(() => {
//     if (isBulkApply && selectedEmployees?.length > 0) {
//       // Use the first employee's data for preview, but keep static data like social links, logos etc.
//       const firstEmployee = selectedEmployees[0];
//       const newFormData = {
//         ...formData,
//         name: firstEmployee.displayName || "John Doe",
//         jobTitle: firstEmployee.jobTitle || "Product Designer", 
//         email: firstEmployee.mail || "john.doe@agile.com",
//         phone: firstEmployee.businessPhones?.[0] || "+1 (555) 123-4567", // 🔧 Fixed phone handling
//         location: firstEmployee.officeLocation || "San Francisco, CA",
//         company: "Agile World Technologies LLC", // Keep static company info
//       };
//       console.log("🔧 Bulk Apply Preview Data:", newFormData);
//       setFormData(newFormData);
//     }
//   }, [isBulkApply, selectedEmployees]);

//   // Ensure we have 5 campaigns when the component mounts
//   useEffect(() => {
//     if (!formData.campaigns || formData.campaigns.length < 5) {
//       const updatedFormData = ensureFiveCampaigns(formData);
//       setFormData(updatedFormData);
//       if (!isBulkApply) {
//         saveToLocalStorage({
//           formData: updatedFormData,
//           activeTab,
//           selectedDesign,
//         });
//       }
//     }
//   }, []);

//   // Handle form data updates
//   const handleFormDataUpdate = (updatedFormData) => {
//     const newFormData = { ...formData, ...updatedFormData };
//     setFormData(newFormData);

//     // Only save to localStorage if not in bulk apply mode
//     if (!isBulkApply) {
//       const saved = saveToLocalStorage(
//         {
//           formData: newFormData,
//           activeTab,
//           selectedDesign,
//         },
//         { formData, activeTab, selectedDesign }
//       );
//       return saved;
//     }
//     return newFormData;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     handleFormDataUpdate({ [name]: value });
//   };

//   const navigateToPreview = () => {
//     const signatureHTML = generateSignatureHTML(
//       formData,
//       selectedDesign,
//       designStyle
//     );
//     navigate("/preview", {
//       state: {
//         signatureHTML,
//         formData,
//         selectedDesign,
//         activeTab,
//       },
//     });
//   };

//   // Individual signature apply - works for ALL designs now!
//   const handleSendData = async () => {
//     if (isBulkApply) {
//       await handleBulkApply();
//       return;
//     }

//     if (!formData.email) {
//       alert("Please enter your email address");
//       return;
//     }

//     setIsSending(true);
//     try {
//       const organization = "agileworldtechnologies.com";
      
//       // Generate HTML for individual user
//       const signatureHTML = generateSignatureHTML(
//         formData,
//         selectedDesign,
//         designStyle
//       );

//       console.log("📧 Sending individual signature HTML for design:", selectedDesign);
//       console.log("📄 HTML length:", signatureHTML.length);
//       console.log("📱 Phone in formData:", formData.phone);

//       const response = await axios.post(
//         "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
//         {
//           email: formData.email,
//           organization,
//           html: signatureHTML,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-functions-key": apiUrl,
//           },
//         }
//       );

//       console.log("API Response:", response.data);
//       alert("Signature applied successfully!");
//     } catch (error) {
//       console.error("Error sending data:", error);
//       alert(`Failed to apply signature. Error: ${error.message}`);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // 🔧 FIXED: Bulk apply function - now sends individual signatures for each employee
//   const handleBulkApply = async () => {
//     if (!selectedEmployees || selectedEmployees.length === 0) {
//       alert("No employees selected for bulk apply");
//       return;
//     }

//     setIsSending(true);
//     try {
//       const organization = "agileworldtechnologies.com";
//       const successfulApplies = [];
//       const failedApplies = [];

//       console.log("🚀 Starting bulk apply for", selectedEmployees.length, "employees");

//       // 🔧 NEW APPROACH: Send individual signatures for each employee
//       for (const employee of selectedEmployees) {
//         try {
//           // Create individual signature data for each employee
//           const employeeFormData = {
//             ...formData, // Keep static data (company, social links, logo, etc.)
//             name: employee.displayName || employee.name || "Employee",
//             jobTitle: employee.jobTitle || employee.title || "Job Title",
//             email: employee.mail || employee.email || "",
//             phone: employee.businessPhones?.[0] || employee.phone || "", // 🔧 Fixed phone handling
//             mobilePhone: employee.mobilePhone || "",
//             location: employee.officeLocation || employee.location || formData.location,
//             company: formData.company, // Keep static company
//           };

//           // console.log("📧 Generating signature for:", employeeFormData.name, "Phone:", employeeFormData.phone);

//           // Generate individual HTML signature
//           const individualSignatureHTML = generateSignatureHTML(
//             employeeFormData,
//             selectedDesign,
//             designStyle
//           );

//           // Send individual signature
//           const response = await axios.post(
//             "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
//             {
//               email: employeeFormData.email,
//               organization,
//               html: individualSignatureHTML,
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 "x-functions-key": apiUrl,
//               },
//             }
//           );

//           // console.log(`✅ Applied signature for ${employeeFormData.name}`);
//           successfulApplies.push(employeeFormData.name);

//           // Add small delay to avoid overwhelming the API
//           await new Promise(resolve => setTimeout(resolve, 100));

//         } catch (error) {
//           console.error(`❌ Failed to apply signature for ${employee.displayName}:`, error);
//           failedApplies.push(employee.displayName || employee.email);
//         }
//       }

//       // Show results
//       const successCount = successfulApplies.length;
//       const failedCount = failedApplies.length;
      
//       if (successCount > 0 && failedCount === 0) {
//         alert(`🎉 Successfully applied signatures to all ${successCount} employees!`);
//       } else if (successCount > 0 && failedCount > 0) {
//         alert(`✅ Applied signatures to ${successCount} employees.\n❌ Failed for ${failedCount} employees: ${failedApplies.join(', ')}`);
//       } else {
//         alert(`❌ Failed to apply signatures. Please check your connection and try again.`);
//       }

//       if (successCount > 0) {
//         navigate("/edittemplate"); // Return to employees page after bulk apply
//       }

//     } catch (error) {
//       console.error("Error in bulk apply:", error);
//       alert(`Bulk apply failed. Error: ${error.message}`);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleTabClick = (tab) => {
//     if (tabsDisabled) return; // Prevent tab changes in bulk apply mode
//     setActiveTab(tab);
//     if (!isBulkApply) {
//       saveToLocalStorage(
//         {
//           formData,
//           activeTab: tab,
//           selectedDesign,
//         },
//         {
//           formData,
//           activeTab,
//           selectedDesign,
//         }
//       );
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "Personal Info":
//         return (
//           <PersonalInfoTab
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFormDataUpdate={handleFormDataUpdate}
//             organization={location.state?.organization}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Images":
//         return (
//           <ImagesTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Social":
//         return (
//           <SocialTab
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Design":
//         return (
//           <DesignTab
//             selectedDesign={selectedDesign}
//             handleDesignChange={(newDesign) => {
//               setSelectedDesign(newDesign);
//               if (!isBulkApply) {
//                 saveToLocalStorage({
//                   formData,
//                   activeTab,
//                   selectedDesign: newDesign,
//                 });
//               }
//             }}
//           />
//         );
//       case "Banner":
//         return (
//           <BannerTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Disclaimer":
//         return (
//           <DisclaimerTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const designStyle = getDesignStyle(selectedDesign);

//   return (
//     <div>
//       <h2
//         style={{
//           textAlign: "center",
//           marginTop: "0 auto",
//           color: "black",
//           fontWeight: "700",
//           fontSize: "2.5rem",
//         }}
//       >
//         {isBulkApply
//           ? "Bulk Apply Email Signatures"
//           : "Customize Your Email Signature"}
//       </h2>
//       {isBulkApply && (
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <p>Applying individual signatures to {selectedEmployees?.length || 0} employees</p>
//           <p style={{ fontSize: "14px", color: "#666" }}>
//             📋 Using design: <strong>{selectedDesign}</strong>
//           </p>
//           <p style={{ fontSize: "12px", color: "#888" }}>
//             ℹ️ Each employee will get their own personalized signature with their individual data
//           </p>
//         </div>
//       )}
//       <div className="editor-container">
//         <div className="content">
//           <div className="form-section">
//             <TabNavigation
//               activeTab={activeTab}
//               handleTabClick={handleTabClick}
//               tabsDisabled={tabsDisabled}
//             />
//             {renderTabContent()}
//           </div>

//           <PreviewSection
//             formData={formData}
//             selectedDesign={selectedDesign}
//             designStyle={designStyle}
//             getActiveCampaigns={() => getActiveCampaigns(formData.campaigns)}
//             navigateToPreview={navigateToPreview}
//             handleSendData={handleSendData}
//             isSending={isSending}
//             isBulkApply={isBulkApply}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailSignatureCreator;


// Fixed EmailSignatureCreator.jsx - Complete with bulk apply template approach and consistent navigation
// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./EmailSignature.css";
// import axios from "axios";

// // Import tab components
// import PersonalInfoTab from "./Tabs/PersonalInfoTab";
// import SocialTab from "./Tabs/SocialTab";
// import DesignTab, { getDesignStyle } from "./Tabs/DesignTab";
// import ImagesTab from "./Tabs/ImagesTab";
// import BannerTab from "./Tabs/BannerTab";
// import DisclaimerTab from "./Tabs/DisclaimerTab";

// // Import new components
// import TabNavigation from "./TabNavigation";
// import PreviewSection from "./PreviewSection";

// // Import fixed utilities
// import {
//   ensureFiveCampaigns,
//   getActiveCampaigns,
//   generateSignatureHTML,
//   generateSignatureTemplate,
//   replacePlaceholders,
//   loadFromLocalStorage,
//   saveToLocalStorage,
// } from "./utils/signatureUtils";

// const apiUrl = import.meta.env.VITE_AZURE_KEY;

// const EmailSignatureCreator = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isSending, setIsSending] = useState(false);

//   // Check if we're in bulk apply mode
//   const { isBulkApply, selectedEmployees } = location.state || {};
//   const [activeTab, setActiveTab] = useState(
//     isBulkApply ? "Design" : "Personal Info"
//   );
//   const [tabsDisabled, setTabsDisabled] = useState(isBulkApply || false);

//   // Get initial state
//   const getInitialState = () => {
//     // First check if we're coming back from preview page
//     if (location.state?.preserveFormData && location.state?.formData) {
//       return {
//         formData: ensureFiveCampaigns(location.state.formData),
//         selectedDesign: location.state?.selectedDesign || "default",
//       };
//     }

//     // Then check localStorage
//     const localStorageState = loadFromLocalStorage();
//     if (localStorageState) {
//       // If email was passed, override the stored email
//       const formDataWithEmail = location.state?.email
//         ? { ...localStorageState.formData, email: location.state.email }
//         : localStorageState.formData;

//       return {
//         formData: ensureFiveCampaigns(formDataWithEmail),
//         selectedDesign: localStorageState.selectedDesign || "default",
//       };
//     }

//     return {
//       formData: ensureFiveCampaigns({
//         name: location.state?.displayName || "John Doe",
//         jobTitle: location.state?.jobTitle || "Product Designer",
//         company: location.state?.organization || "Agilesignature.com",
//         email: location.state?.email || "john.doe@agile.com",
//         phone: location.state?.businessPhones?.[0] || "+1 (555) 123-4567",
//         mobilePhone: "",
//         location: location.state?.officeLocation || "San Francisco, CA",
//         website: "www.agilesignature.com",
//         linkedin: "",
//         twitter: "",
//         instagram: "",
//         facebook: "",
//         youtube: "",
//         portfolio: "",
//         profileImage: null,
//         logo: null,
//         banner: null,
//         disclaimer: "",
//         campaigns: [],
//       }),
//       selectedDesign: "default",
//     };
//   };

//   const initialState = getInitialState();
//   const [selectedDesign, setSelectedDesign] = useState(
//     initialState.selectedDesign
//   );
//   const [formData, setFormData] = useState(initialState.formData);

//   // Handle bulk apply if needed - Use real data from first employee for preview
//   useEffect(() => {
//     if (isBulkApply && selectedEmployees?.length > 0) {
//       // Use the first employee's data for preview, but keep static data like social links, logos etc.
//       const firstEmployee = selectedEmployees[0];
//       const newFormData = {
//         ...formData,
//         name: firstEmployee.displayName || "John Doe",
//         jobTitle: firstEmployee.jobTitle || "Product Designer", 
//         email: firstEmployee.mail || "john.doe@agile.com",
//         phone: firstEmployee.businessPhones?.[0] || "+1 (555) 123-4567",
//         location: firstEmployee.officeLocation || "San Francisco, CA",
//         company: "Agile World Technologies LLC", // Keep static company info
//       };
//       console.log("🔧 Bulk Apply Preview Data:", newFormData);
//       setFormData(newFormData);
//     }
//   }, [isBulkApply, selectedEmployees]);

//   // Ensure we have 5 campaigns when the component mounts
//   useEffect(() => {
//     if (!formData.campaigns || formData.campaigns.length < 5) {
//       const updatedFormData = ensureFiveCampaigns(formData);
//       setFormData(updatedFormData);
//       if (!isBulkApply) {
//         saveToLocalStorage({
//           formData: updatedFormData,
//           activeTab,
//           selectedDesign,
//         });
//       }
//     }
//   }, []);

//   // Handle form data updates
//   const handleFormDataUpdate = (updatedFormData) => {
//     const newFormData = { ...formData, ...updatedFormData };
//     setFormData(newFormData);

//     // Only save to localStorage if not in bulk apply mode
//     if (!isBulkApply) {
//       const saved = saveToLocalStorage(
//         {
//           formData: newFormData,
//           activeTab,
//           selectedDesign,
//         },
//         { formData, activeTab, selectedDesign }
//       );
//       return saved;
//     }
//     return newFormData;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     handleFormDataUpdate({ [name]: value });
//   };

//   const navigateToPreview = () => {
//     const signatureHTML = generateSignatureHTML(
//       formData,
//       selectedDesign,
//       designStyle
//     );
//     navigate("/preview", {
//       state: {
//         signatureHTML,
//         formData,
//         selectedDesign,
//         activeTab,
//       },
//     });
//   };

//   // Individual signature apply - works for ALL designs now!
//   const handleSendData = async () => {
//     if (isBulkApply) {
//       await handleBulkApply();
//       return;
//     }

//     if (!formData.email) {
//       alert("Please enter your email address");
//       return;
//     }

//     setIsSending(true);
//     try {
//       const organization = "agileworldtechnologies.com";
      
//       // Generate HTML for individual user
//       const signatureHTML = generateSignatureHTML(
//         formData,
//         selectedDesign,
//         designStyle
//       );

//       console.log("📧 Sending individual signature HTML for design:", selectedDesign);
//       console.log("📄 HTML length:", signatureHTML.length);
//       console.log("📱 Phone in formData:", formData.phone);

//       const response = await axios.post(
//         "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
//         {
//           email: formData.email,
//           organization,
//           html: signatureHTML,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-functions-key": apiUrl,
//           },
//         }
//       );

//       console.log("API Response:", response.data);
//       alert("Signature applied successfully!");
//     } catch (error) {
//       console.error("Error sending data:", error);
//       alert(`Failed to apply signature. Error: ${error.message}`);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // 🔧 FIXED: Bulk apply function - now uses template approach like the second code
//   const handleBulkApply = async () => {
//     if (!selectedEmployees || selectedEmployees.length === 0) {
//       alert("No employees selected for bulk apply");
//       return;
//     }

//     setIsSending(true);
//     try {
//       const organization = "agileworldtechnologies.com";
      
//       console.log("🚀 Starting bulk apply with template approach for", selectedEmployees.length, "employees");

//       // 🔧 TEMPLATE APPROACH: Create template form data with placeholders for the backend
//       const templateFormData = {
//         ...formData,
//         name: "{{name}}",
//         jobTitle: "{{title}}", 
//         email: "{{email}}",
//         phone: "{{phone}}",
//         location: "{{location}}",
//         company: "{{company}}",
//         mobilePhone: "{{mobilePhone}}",
//         website: formData.website || "{{website}}"
//       };
      
//       // Generate the signature HTML template with placeholders
//       const signatureHTMLTemplate = generateSignatureHTML(
//         templateFormData,
//         selectedDesign,
//         designStyle
//       );

//       console.log("📧 Sending bulk apply request with template for design:", selectedDesign);
//       console.log("📄 Template HTML length:", signatureHTMLTemplate.length);

//       // Send request to v2 API endpoint for bulk apply
//       const response = await axios.post(
//         "https://email-signature-function-app.azurewebsites.net/api/v2/apply-signature",
//         {
//           organization,
//           html: signatureHTMLTemplate,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-functions-key": apiUrl,
//           },
//         }
//       );

//       console.log("✅ Bulk apply response:", response.data);
//       alert(`🎉 Signature template applied to ${selectedEmployees.length} employees!`);
      
//       // 🔧 FIXED: Consistent navigation - always go back to employees page
//       navigate("/employees");

//     } catch (error) {
//       console.error("❌ Error in bulk apply:", error);
//       alert(`Bulk apply failed. Error: ${error.message}`);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleTabClick = (tab) => {
//     if (tabsDisabled) return; // Prevent tab changes in bulk apply mode
//     setActiveTab(tab);
//     if (!isBulkApply) {
//       saveToLocalStorage(
//         {
//           formData,
//           activeTab: tab,
//           selectedDesign,
//         },
//         {
//           formData,
//           activeTab,
//           selectedDesign,
//         }
//       );
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "Personal Info":
//         return (
//           <PersonalInfoTab
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFormDataUpdate={handleFormDataUpdate}
//             organization={location.state?.organization}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Images":
//         return (
//           <ImagesTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Social":
//         return (
//           <SocialTab
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Design":
//         return (
//           <DesignTab
//             selectedDesign={selectedDesign}
//             handleDesignChange={(newDesign) => {
//               setSelectedDesign(newDesign);
//               if (!isBulkApply) {
//                 saveToLocalStorage({
//                   formData,
//                   activeTab,
//                   selectedDesign: newDesign,
//                 });
//               }
//             }}
//           />
//         );
//       case "Banner":
//         return (
//           <BannerTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       case "Disclaimer":
//         return (
//           <DisclaimerTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//             disabled={tabsDisabled}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const designStyle = getDesignStyle(selectedDesign);

//   return (
//     <div>
//       <h2
//         style={{
//           textAlign: "center",
//           marginTop: "0 auto",
//           color: "black",
//           fontWeight: "700",
//           fontSize: "2.5rem",
//         }}
//       >
//         {isBulkApply
//           ? "Bulk Apply Email Signatures"
//           : "Customize Your Email Signature"}
//       </h2>
//       {isBulkApply && (
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <p>Applying template to {selectedEmployees?.length || 0} employees</p>
//           <p style={{ fontSize: "14px", color: "#666" }}>
//             📋 Using design: <strong>{selectedDesign}</strong>
//           </p>
//           <p style={{ fontSize: "12px", color: "#888" }}>
//             ⚡ Fast bulk apply using template with placeholders
//           </p>
//         </div>
//       )}
//       <div className="editor-container">
//         <div className="content">
//           <div className="form-section">
//             <TabNavigation
//               activeTab={activeTab}
//               handleTabClick={handleTabClick}
//               tabsDisabled={tabsDisabled}
//             />
//             {renderTabContent()}
//           </div>

//           <PreviewSection
//             formData={formData}
//             selectedDesign={selectedDesign}
//             designStyle={designStyle}
//             getActiveCampaigns={() => getActiveCampaigns(formData.campaigns)}
//             navigateToPreview={navigateToPreview}
//             handleSendData={handleSendData}
//             isSending={isSending}
//             isBulkApply={isBulkApply}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailSignatureCreator;

// Fixed EmailSignatureCreator.jsx - Proper phone number handling for individual apply
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EmailSignature.css";
import axios from "axios";

// Import tab components
import PersonalInfoTab from "./Tabs/PersonalInfoTab";
import SocialTab from "./Tabs/SocialTab";
import DesignTab, { getDesignStyle } from "./Tabs/DesignTab";
import ImagesTab from "./Tabs/ImagesTab";
import BannerTab from "./Tabs/BannerTab";
import DisclaimerTab from "./Tabs/DisclaimerTab";

// Import new components
import TabNavigation from "./TabNavigation";
import PreviewSection from "./PreviewSection";

// Import fixed utilities
import {
  ensureFiveCampaigns,
  getActiveCampaigns,
  generateSignatureHTML,
  generateSignatureTemplate,
  replacePlaceholders,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils/signatureUtils";

const apiUrl = import.meta.env.VITE_AZURE_KEY;

const EmailSignatureCreator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSending, setIsSending] = useState(false);

  // Check if we're in bulk apply mode
  const { isBulkApply, selectedEmployees } = location.state || {};
  const [activeTab, setActiveTab] = useState(
    isBulkApply ? "Design" : "Personal Info"
  );
  const [tabsDisabled, setTabsDisabled] = useState(isBulkApply || false);

  // Get initial state
  const getInitialState = () => {
    // First check if we're coming back from preview page
    if (location.state?.preserveFormData && location.state?.formData) {
      return {
        formData: ensureFiveCampaigns(location.state.formData),
        selectedDesign: location.state?.selectedDesign || "default",
      };
    }

    // Then check localStorage
    const localStorageState = loadFromLocalStorage();
    if (localStorageState) {
      // If email was passed, override the stored email
      const formDataWithEmail = location.state?.email
        ? { ...localStorageState.formData, email: location.state.email }
        : localStorageState.formData;

      return {
        formData: ensureFiveCampaigns(formDataWithEmail),
        selectedDesign: localStorageState.selectedDesign || "default",
      };
    }

    // 🔧 FIXED: Proper phone number handling for individual apply
    const businessPhone = location.state?.businessPhones?.[0] || "";
    const fallbackPhone = businessPhone || "+1 (555) 123-4567";

    return {
      formData: ensureFiveCampaigns({
        name: location.state?.displayName || "John Doe",
        jobTitle: location.state?.jobTitle || "Product Designer",
        company: location.state?.organization || "Agile World Technologies LLC",
        email: location.state?.email || "john.doe@agile.com",
        phone: businessPhone, // 🔧 Use actual business phone
        mobilePhone: businessPhone, // 🔧 Use same for mobile
        businessPhones: location.state?.businessPhones || [], // 🔧 Keep original array
        location: location.state?.officeLocation || "San Francisco, CA",
        website: "www.agileworldtechnologies.com",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
        youtube: "",
        portfolio: "",
        profileImage: null,
        logo: null,
        banner: null,
        disclaimer: "",
        campaigns: [],
      }),
      selectedDesign: "default",
    };
  };

  const initialState = getInitialState();
  const [selectedDesign, setSelectedDesign] = useState(
    initialState.selectedDesign
  );
  const [formData, setFormData] = useState(initialState.formData);

  // 🔧 FIXED: Handle bulk apply with proper employee data
  useEffect(() => {
    if (isBulkApply && selectedEmployees?.length > 0) {
      // Use the first employee's data for preview, including their actual phone
      const firstEmployee = selectedEmployees[0];
      const employeePhone = firstEmployee.businessPhones?.[0] || "";
      
      const newFormData = {
        ...formData,
        name: firstEmployee.displayName || "John Doe",
        jobTitle: firstEmployee.jobTitle || "Product Designer", 
        email: firstEmployee.mail || "john.doe@agile.com",
        phone: employeePhone, // 🔧 Use actual employee phone
        mobilePhone: employeePhone, // 🔧 Use same for mobile
        businessPhones: firstEmployee.businessPhones || [],
        location: firstEmployee.officeLocation || "San Francisco, CA",
        company: "Agile World Technologies LLC", // Keep static company info
      };
      console.log("🔧 Bulk Apply Preview Data:", newFormData);
      console.log("📱 Employee phone:", employeePhone);
      setFormData(newFormData);
    }
  }, [isBulkApply, selectedEmployees]);

  // Debug: Log when individual employee data is loaded
  useEffect(() => {
    if (!isBulkApply && location.state?.email) {
      console.log("🔧 Individual Apply Data:");
      console.log("📧 Email:", location.state.email);
      console.log("📱 Business Phones:", location.state.businessPhones);
      console.log("📱 Phone in formData:", formData.phone);
      console.log("👤 Name:", location.state.displayName);
    }
  }, []);

  // Ensure we have 5 campaigns when the component mounts
  useEffect(() => {
    if (!formData.campaigns || formData.campaigns.length < 5) {
      const updatedFormData = ensureFiveCampaigns(formData);
      setFormData(updatedFormData);
      if (!isBulkApply) {
        saveToLocalStorage({
          formData: updatedFormData,
          activeTab,
          selectedDesign,
        });
      }
    }
  }, []);

  // Handle form data updates
  const handleFormDataUpdate = (updatedFormData) => {
    const newFormData = { ...formData, ...updatedFormData };
    setFormData(newFormData);

    // Only save to localStorage if not in bulk apply mode
    if (!isBulkApply) {
      const saved = saveToLocalStorage(
        {
          formData: newFormData,
          activeTab,
          selectedDesign,
        },
        { formData, activeTab, selectedDesign }
      );
      return saved;
    }
    return newFormData;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleFormDataUpdate({ [name]: value });
  };

  const navigateToPreview = () => {
    const signatureHTML = generateSignatureHTML(
      formData,
      selectedDesign,
      designStyle
    );
    navigate("/preview", {
      state: {
        signatureHTML,
        formData,
        selectedDesign,
        activeTab,
      },
    });
  };

  // 🔧 FIXED: Individual signature apply with proper employee data
  const handleSendData = async () => {
    if (isBulkApply) {
      await handleBulkApply();
      return;
    }

    if (!formData.email) {
      alert("Please enter your email address");
      return;
    }

    setIsSending(true);
    try {
      const organization = "agileworldtechnologies.com";
      
      // 🔧 ENHANCED: Create formData with actual employee data for individual apply
      const individualFormData = {
        ...formData,
        // Use actual employee data if available from location.state
        name: location.state?.displayName || formData.name,
        jobTitle: location.state?.jobTitle || formData.jobTitle,
        email: location.state?.email || formData.email,
        phone: location.state?.businessPhones?.[0] || formData.phone,
        mobilePhone: location.state?.businessPhones?.[0] || formData.mobilePhone,
        location: location.state?.officeLocation || formData.location,
        businessPhones: location.state?.businessPhones || formData.businessPhones,
      };

      // Generate HTML for individual user with actual data
      const signatureHTML = generateSignatureHTML(
        individualFormData,
        selectedDesign,
        designStyle
      );

      console.log("📧 Sending individual signature HTML for design:", selectedDesign);
      console.log("📄 HTML length:", signatureHTML.length);
      console.log("📱 Actual phone being used:", individualFormData.phone);
      console.log("👤 Employee name:", individualFormData.name);
      console.log("📄 HTML preview:", signatureHTML.substring(0, 300) + "...");

      const response = await axios.post(
        "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
        {
          email: individualFormData.email,
          organization,
          html: signatureHTML,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-functions-key": apiUrl,
          },
        }
      );

      console.log("API Response:", response.data);
      alert("🎉 Signature applied successfully!\n\n⏰ Will be active in 5-15 minutes\n\n📧 Test by sending an email to yourself");
    } catch (error) {
      console.error("Error sending data:", error);
      alert(`Failed to apply signature. Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  // 🔧 FIXED: Bulk apply function with proper template placeholders
  const handleBulkApply = async () => {
    if (!selectedEmployees || selectedEmployees.length === 0) {
      alert("No employees selected for bulk apply");
      return;
    }

    setIsSending(true);
    try {
      const organization = "agileworldtechnologies.com";
      
      console.log("🚀 Starting bulk apply with template approach for", selectedEmployees.length, "employees");

      // 🔧 FIXED: Create template form data with proper placeholders
      const templateFormData = {
        ...formData,
        name: "{{name}}",
        jobTitle: "{{title}}", 
        email: "{{email}}",
        phone: "{{phone}}", // Will be replaced with employee's businessPhones[0]
        mobilePhone: "{{phone}}", // Use same phone for mobile
        location: "{{location}}",
        company: "Agile World Technologies LLC", // Keep static
        website: formData.website || "www.agileworldtechnologies.com"
      };
      
      // Generate the signature HTML template with placeholders
      const signatureHTMLTemplate = generateSignatureHTML(
        templateFormData,
        selectedDesign,
        designStyle
      );

      console.log("📧 Sending bulk apply request with template for design:", selectedDesign);
      console.log("📄 Template HTML length:", signatureHTMLTemplate.length);
      console.log("📄 Template preview:", signatureHTMLTemplate.substring(0, 300) + "...");
      
      // Check that placeholders exist in template
      if (!signatureHTMLTemplate.includes("{{name}}") || !signatureHTMLTemplate.includes("{{phone}}")) {
        console.warn("⚠️ Template may not contain proper placeholders!");
      }

      // Send request to v2 API endpoint for bulk apply
      const response = await axios.post(
        "https://email-signature-function-app.azurewebsites.net/api/v2/apply-signature",
        {
          organization,
          html: signatureHTMLTemplate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-functions-key": apiUrl,
          },
        }
      );

      console.log("✅ Bulk apply response:", response.data);
      alert(`🎉 Signature template applied to ${selectedEmployees.length} employees!\n\n⏰ Will be active in 5-15 minutes\n\n📧 Each employee's actual data will be used`);
      
      // Navigate back to employees page
      navigate("/employees");

    } catch (error) {
      console.error("❌ Error in bulk apply:", error);
      alert(`Bulk apply failed. Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleTabClick = (tab) => {
    if (tabsDisabled) return; // Prevent tab changes in bulk apply mode
    setActiveTab(tab);
    if (!isBulkApply) {
      saveToLocalStorage(
        {
          formData,
          activeTab: tab,
          selectedDesign,
        },
        {
          formData,
          activeTab,
          selectedDesign,
        }
      );
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return (
          <PersonalInfoTab
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormDataUpdate={handleFormDataUpdate}
            organization={location.state?.organization}
            disabled={tabsDisabled}
          />
        );
      case "Images":
        return (
          <ImagesTab
            formData={formData}
            handleFormDataUpdate={handleFormDataUpdate}
            disabled={tabsDisabled}
          />
        );
      case "Social":
        return (
          <SocialTab
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormDataUpdate={handleFormDataUpdate}
            disabled={tabsDisabled}
          />
        );
      case "Design":
        return (
          <DesignTab
            selectedDesign={selectedDesign}
            handleDesignChange={(newDesign) => {
              setSelectedDesign(newDesign);
              if (!isBulkApply) {
                saveToLocalStorage({
                  formData,
                  activeTab,
                  selectedDesign: newDesign,
                });
              }
            }}
          />
        );
      case "Banner":
        return (
          <BannerTab
            formData={formData}
            handleFormDataUpdate={handleFormDataUpdate}
            disabled={tabsDisabled}
          />
        );
      case "Disclaimer":
        return (
          <DisclaimerTab
            formData={formData}
            handleFormDataUpdate={handleFormDataUpdate}
            disabled={tabsDisabled}
          />
        );
      default:
        return null;
    }
  };

  const designStyle = getDesignStyle(selectedDesign);

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginTop: "0 auto",
          color: "black",
          fontWeight: "700",
          fontSize: "2.5rem",
        }}
      >
        {isBulkApply
          ? "Bulk Apply Email Signatures"
          : "Customize Your Email Signature"}
      </h2>
      {isBulkApply && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p>Applying template to {selectedEmployees?.length || 0} employees</p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            📋 Using design: <strong>{selectedDesign}</strong>
          </p>
          <p style={{ fontSize: "12px", color: "#888" }}>
            ⚡ Each employee's real data (name, phone, location) will be used
          </p>
        </div>
      )}
      
      {/* 🔧 DEBUG: Show current phone info */}
      {!isBulkApply && (
        <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "12px", color: "#666" }}>
          👤 Current: {formData.name} | 📱 Phone: {formData.phone || "No phone"} | 📧 {formData.email}
        </div>
      )}
      
      <div className="editor-container">
        <div className="content">
          <div className="form-section">
            <TabNavigation
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              tabsDisabled={tabsDisabled}
            />
            {renderTabContent()}
          </div>

          <PreviewSection
            formData={formData}
            selectedDesign={selectedDesign}
            designStyle={designStyle}
            getActiveCampaigns={() => getActiveCampaigns(formData.campaigns)}
            navigateToPreview={navigateToPreview}
            handleSendData={handleSendData}
            isSending={isSending}
            isBulkApply={isBulkApply}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSignatureCreator;