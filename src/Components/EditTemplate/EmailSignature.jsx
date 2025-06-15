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
//         phone: location.state?.mobilePhone || "+1 (555) 123-4567",
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
//         phone: firstEmployee.mobilePhone || "+1 (555) 123-4567",
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
//         mobilePhone: "{{phone}}", // This will be replaced with actual employee mobilePhone
//       phone: "{{phone}}", // Fallback for layouts that use phone field
//         location: "{{location}}",
//         company: "{{company}}",
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
//         phone: location.state?.mobilePhone || "+1 (555) 123-4567",
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
//         phone: firstEmployee.mobilePhone || "+1 (555) 123-4567",
//         location: firstEmployee.officeLocation || "San Francisco, CA",
//         company: "Agile World Technologies LLC", // Keep static company info
//       };
//       setFormData(newFormData);
//     }
//   }, [isBulkApply, selectedEmployees]);

//   // 🔍 ADD THIS NEW useEffect FOR DEBUGGING - Place it right after the previous useEffect
//   useEffect(() => {
//     if (isBulkApply && selectedEmployees?.length > 0) {
//       console.log("🔍 DEBUGGING BULK APPLY:");
//       console.log("Total employees:", selectedEmployees.length);
//       console.log("First employee full data:", selectedEmployees[0]);
      
//       // Check what phone fields are available
//       selectedEmployees.slice(0, 3).forEach((emp, index) => {
//         console.log(`Employee ${index + 1} phone data:`, {
//           displayName: emp.displayName,
//           mobilePhone: emp.mobilePhone,
//           businessPhones: emp.businessPhones,
//           phone: emp.phone,
//           officePhone: emp.officePhone,
//           // Check all possible phone field names
//           allKeys: Object.keys(emp).filter(key => 
//             key.toLowerCase().includes('phone') || 
//             key.toLowerCase().includes('mobile') ||
//             key.toLowerCase().includes('tel')
//           )
//         });
//       });
      
//       // Test signature generation for first employee
//       const testEmployee = selectedEmployees[0];
//       const testFormData = {
//         ...formData,
//         name: testEmployee.displayName || "Test Name",
//         jobTitle: testEmployee.jobTitle || "Test Title",
//         email: testEmployee.mail || "test@email.com",
//         phone: testEmployee.mobilePhone || testEmployee.businessPhones?.[0] || "No Phone",
//         location: testEmployee.officeLocation || "No Location",
//         company: "Agile World Technologies LLC"
//       };
      
//       console.log("🧪 Test form data for first employee:", testFormData);
      
//       const testSignature = generateSignatureHTML(testFormData, selectedDesign, designStyle);
//       console.log("🧪 Test signature HTML (first 300 chars):", testSignature.substring(0, 300));
      
//       // Check if signature contains placeholders (should not)
//       const hasPlaceholders = testSignature.includes('{{') || testSignature.includes('{name}');
//       console.log("🧪 Signature has placeholders:", hasPlaceholders);
//     }
//   }, [isBulkApply, selectedEmployees, formData, selectedDesign]);
//   // END OF DEBUGGING useEffect
//  // Add this temporary useEffect right after your existing useEffects for testing
// useEffect(() => {
//   console.log("🟦 Component mounted/updated");
//   console.log("🟦 isBulkApply:", isBulkApply);
//   console.log("🟦 selectedEmployees length:", selectedEmployees?.length);
//   console.log("🟦 selectedEmployees data:", selectedEmployees);
  
//   // Force debug if in bulk mode
//   if (isBulkApply) {
//     console.log("🟦 FORCING DEBUG OUTPUT:");
//     if (selectedEmployees && selectedEmployees.length > 0) {
//       console.log("🟦 First employee:", selectedEmployees[0]);
//       console.log("🟦 All employee keys:", Object.keys(selectedEmployees[0]));
      
//       // Check each employee's phone data
//       selectedEmployees.forEach((emp, index) => {
//         console.log(`🟦 Employee ${index + 1} phone info:`, {
//           name: emp.displayName,
//           mobilePhone: emp.mobilePhone,
//           businessPhones: emp.businessPhones,
//           allPhoneKeys: Object.keys(emp).filter(key => 
//             key.toLowerCase().includes('phone') || 
//             key.toLowerCase().includes('mobile')
//           ),
//           fullEmployeeData: emp
//         });
//       });
//     } else {
//       console.log("🟦 No selectedEmployees found!");
//     }
//   }
// }, []); // Empty dependency array to run once on mount

// // Also add this button click handler for immediate debugging
// const forceDebugNow = () => {
//   console.log("🔴 MANUAL FORCE DEBUG:");
//   console.log("🔴 isBulkApply:", isBulkApply);
//   console.log("🔴 selectedEmployees:", selectedEmployees);
//   console.log("🔴 location.state:", location.state);
  
//   if (selectedEmployees && selectedEmployees.length > 0) {
//     selectedEmployees.forEach((emp, index) => {
//       console.log(`🔴 Employee ${index + 1}:`, {
//         displayName: emp.displayName,
//         mail: emp.mail,
//         mobilePhone: emp.mobilePhone,
//         businessPhones: emp.businessPhones,
//         officeLocation: emp.officeLocation,
//         jobTitle: emp.jobTitle,
//         id: emp.id
//       });
//     });
//   }
// };
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

//   // 🔍 REPLACE YOUR OLD handleBulkApply WITH THIS NEW VERSION
//   const handleBulkApply = async () => {
//     if (!selectedEmployees || selectedEmployees.length === 0) {
//       alert("No employees selected for bulk apply");
//       return;
//     }

//     setIsSending(true);
//     let successCount = 0;
//     let failCount = 0;
//     const failedEmployees = [];

//     try {
//       const organization = "agileworldtechnologies.com";
      
//       console.log("🚀 Starting bulk apply for", selectedEmployees.length, "employees");
      
//       // Apply to each employee individually (more reliable than template approach)
//       for (let i = 0; i < selectedEmployees.length; i++) {
//         const employee = selectedEmployees[i];
        
//         try {
//           // Create individual form data for each employee with actual values
//           const individualFormData = {
//             ...formData, // Keep all the design settings, social links, logos, etc.
//             // Override with actual employee data
//             name: employee.displayName || "Employee Name",
//             jobTitle: employee.jobTitle || "Job Title", 
//             email: employee.mail || "",
//             phone: employee.mobilePhone || employee.businessPhones?.[0] || "",
//             mobilePhone: employee.mobilePhone || employee.businessPhones?.[0] || "",
//             location: employee.officeLocation || "",
//             company: "Agile World Technologies LLC"
//           };

//           console.log(`📧 Processing ${i + 1}/${selectedEmployees.length}: ${employee.displayName}`);
//           console.log("Employee data:", {
//             name: individualFormData.name,
//             email: individualFormData.email,
//             phone: individualFormData.phone || individualFormData.mobilePhone,
//             location: individualFormData.location
//           });

//           // Generate signature HTML with actual employee data (no placeholders)
//           const signatureHTML = generateSignatureHTML(
//             individualFormData,
//             selectedDesign,
//             designStyle
//           );

//           // Verify the signature doesn't contain placeholders
//           if (signatureHTML.includes('{{') || signatureHTML.includes('{name}')) {
//             console.warn("⚠️ Warning: Signature still contains placeholders for", employee.displayName);
//           }

//           // Apply signature using the individual endpoint (same as individual apply)
//           const response = await axios.post(
//             "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
//             {
//               email: employee.mail,
//               organization,
//               html: signatureHTML,
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 "x-functions-key": apiUrl,
//               },
//             }
//           );

//           console.log(`✅ Success for ${employee.displayName}`);
//           successCount++;
          
//           // Add delay to avoid overwhelming the API
//           if (i < selectedEmployees.length - 1) {
//             await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
//           }
          
//         } catch (employeeError) {
//           console.error(`❌ Failed for ${employee.displayName}:`, employeeError.response?.data || employeeError.message);
//           failCount++;
//           failedEmployees.push(employee.displayName);
//         }
//       }

//       // Show detailed results
//       let message = `Bulk apply completed!\n✅ Successful: ${successCount}\n❌ Failed: ${failCount}`;
//       if (failedEmployees.length > 0) {
//         message += `\n\nFailed employees:\n${failedEmployees.join('\n')}`;
//       }
      
//       alert(message);
//       navigate("/employees");
      
//     } catch (error) {
//       console.error("❌ Error in bulk apply:", error);
//       alert(`Bulk apply failed. Error: ${error.message}`);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Optional debug function
//   const debugEmployeeData = () => {
//     if (selectedEmployees && selectedEmployees.length > 0) {
//       console.log("🔍 Debug: First employee data:", selectedEmployees[0]);
//       console.log("🔍 Available fields:", Object.keys(selectedEmployees[0]));
      
//       selectedEmployees.slice(0, 3).forEach((emp, index) => {
//         console.log(`Employee ${index + 1}:`, {
//           displayName: emp.displayName,
//           jobTitle: emp.jobTitle,
//           mail: emp.mail,
//           mobilePhone: emp.mobilePhone,
//           businessPhones: emp.businessPhones,
//           officeLocation: emp.officeLocation
//         });
//       });
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
//           {/* 🔍 ADD THIS DEBUG BUTTON - Place it right after the employee count */}
//           <button 
//             onClick={() => {
//               if (selectedEmployees?.length > 0) {
//                 console.log("🔍 Manual Debug - Employee Data:", selectedEmployees[0]);
//                 debugEmployeeData();
//               }
//             }}
//             style={{
//               backgroundColor: "#ffc107",
//               color: "black",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               margin: "10px"
//             }}
//           >
//             🔍 Debug Employee Data
//           </button>
//           {/* END OF DEBUG BUTTON */}
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

// Import utilities
import {
  ensureFiveCampaigns,
  getActiveCampaigns,
  generateSignatureHTML,
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

    return {
      formData: ensureFiveCampaigns({
        name: location.state?.displayName || "John Doe",
        jobTitle: location.state?.jobTitle || "Product Designer",
        company: location.state?.organization || "Agilesignature.com",
        email: location.state?.email || "john.doe@agile.com",
        phone: location.state?.mobilePhone || "+1 (555) 123-4567",
        mobilePhone: "",
        location: location.state?.officeLocation || "San Francisco, CA",
        website: "www.agilesignature.com",
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

  // Handle bulk apply if needed - Use real data from first employee for preview
  useEffect(() => {
    if (isBulkApply && selectedEmployees?.length > 0) {
      // Use the first employee's data for preview, but keep static data like social links, logos etc.
      const firstEmployee = selectedEmployees[0];
      const newFormData = {
        ...formData,
        name: firstEmployee.displayName || "John Doe",
        jobTitle: firstEmployee.jobTitle || "Product Designer", 
        email: firstEmployee.mail || "john.doe@agile.com",
        phone: firstEmployee.mobilePhone || "+1 (555) 123-4567",
        location: firstEmployee.officeLocation || "San Francisco, CA",
        company: "Agile World Technologies LLC", // Keep static company info
      };
      setFormData(newFormData);
    }
  }, [isBulkApply, selectedEmployees]);

  // 🔍 ADD THIS NEW useEffect FOR DEBUGGING - Place it right after the previous useEffect
  useEffect(() => {
    if (isBulkApply && selectedEmployees?.length > 0) {
      console.log("🔍 DEBUGGING BULK APPLY:");
      console.log("Total employees:", selectedEmployees.length);
      console.log("First employee full data:", selectedEmployees[0]);
      console.log("Selected design:", selectedDesign);
      console.log("Design style:", getDesignStyle(selectedDesign));
      
      // Check what phone fields are available
      selectedEmployees.slice(0, 3).forEach((emp, index) => {
        console.log(`Employee ${index + 1} phone data:`, {
          displayName: emp.displayName,
          mobilePhone: emp.mobilePhone,
          businessPhones: emp.businessPhones,
          phone: emp.phone,
          officePhone: emp.officePhone,
          // Check all possible phone field names
          allKeys: Object.keys(emp).filter(key => 
            key.toLowerCase().includes('phone') || 
            key.toLowerCase().includes('mobile') ||
            key.toLowerCase().includes('tel')
          )
        });
      });
      
      // Test signature generation for first employee
      const testEmployee = selectedEmployees[0];
      const testFormData = {
        ...formData,
        name: testEmployee.displayName || "Test Name",
        jobTitle: testEmployee.jobTitle || "Test Title",
        email: testEmployee.mail || "test@email.com",
        phone: testEmployee.mobilePhone || testEmployee.businessPhones?.[0] || "No Phone",
        mobilePhone: testEmployee.mobilePhone || testEmployee.businessPhones?.[0] || "No Phone",
        location: testEmployee.officeLocation || "No Location",
        company: "Agile World Technologies LLC"
      };
      
      console.log("🧪 Test form data for first employee:", testFormData);
      
      const testSignature = generateSignatureHTML(testFormData, selectedDesign, getDesignStyle(selectedDesign));
      console.log("🧪 Test signature HTML (first 300 chars):", testSignature.substring(0, 300));
      
      // Check if signature contains placeholders (should not)
      const hasPlaceholders = testSignature.includes('{{') || testSignature.includes('{name}');
      console.log("🧪 Signature has placeholders:", hasPlaceholders);
    }
  }, [isBulkApply, selectedEmployees, formData, selectedDesign]);

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
      getDesignStyle(selectedDesign)
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
      const signatureHTML = generateSignatureHTML(
        formData,
        selectedDesign,
        getDesignStyle(selectedDesign)
      );

      const response = await axios.post(
        "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
        {
          email: formData.email,
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
      alert("Signature applied successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert(`Failed to apply signature. Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  // 🔍 REPLACE YOUR OLD handleBulkApply WITH THIS NEW VERSION
  const handleBulkApply = async () => {
    if (!selectedEmployees || selectedEmployees.length === 0) {
      alert("No employees selected for bulk apply");
      return;
    }

    setIsSending(true);
    let successCount = 0;
    let failCount = 0;
    const failedEmployees = [];

    try {
      const organization = "agileworldtechnologies.com";
      const designStyle = getDesignStyle(selectedDesign);
      
      console.log("🚀 Starting bulk apply for", selectedEmployees.length, "employees");
      console.log("🔍 Current selectedDesign:", selectedDesign);
      console.log("🔍 Current designStyle:", designStyle);
      
      // Apply to each employee individually (more reliable than template approach)
      for (let i = 0; i < selectedEmployees.length; i++) {
        const employee = selectedEmployees[i];
        
        try {
          // Create individual form data for each employee with actual values
          const individualFormData = {
            ...formData, // Keep all the design settings, social links, logos, etc.
            // Override with actual employee data
            name: employee.displayName || "Employee Name",
            jobTitle: employee.jobTitle || "Job Title", 
            email: employee.mail || "",
            phone: employee.mobilePhone || employee.businessPhones?.[0] || "",
            mobilePhone: employee.mobilePhone || employee.businessPhones?.[0] || "",
            location: employee.officeLocation || "",
            company: "Agile World Technologies LLC"
          };

          console.log(`📧 Processing ${i + 1}/${selectedEmployees.length}: ${employee.displayName}`);
          console.log("Raw employee data:", {
            displayName: employee.displayName,
            mail: employee.mail,
            mobilePhone: employee.mobilePhone,
            officeLocation: employee.officeLocation,
            jobTitle: employee.jobTitle
          });
          console.log("Generated individualFormData:", individualFormData);
          console.log("Phone mapping:", {
            "employee.mobilePhone": employee.mobilePhone,
            "individualFormData.phone": individualFormData.phone,
            "individualFormData.mobilePhone": individualFormData.mobilePhone
          });

          // Generate signature HTML with actual employee data (no placeholders)
          const signatureHTML = generateSignatureHTML(
            individualFormData,
            selectedDesign,
            designStyle
          );

          // Log the signature HTML to see if phone numbers are included
          console.log("Generated signature HTML for", employee.displayName, ":");
          console.log("First 500 chars:", signatureHTML.substring(0, 500));
          console.log("Contains phone number?", signatureHTML.includes(employee.mobilePhone || "NO_PHONE"));
          console.log("Phone search in HTML:", {
            searchFor: employee.mobilePhone,
            found: signatureHTML.includes(employee.mobilePhone || "NO_PHONE"),
            htmlContains: signatureHTML.toLowerCase().includes("mobile") ? "contains 'mobile'" : "no 'mobile' found"
          });

          // Verify the signature doesn't contain placeholders
          if (signatureHTML.includes('{{') || signatureHTML.includes('{name}')) {
            console.warn("⚠️ Warning: Signature still contains placeholders for", employee.displayName);
          }

          // Apply signature using the individual endpoint (same as individual apply)
          const response = await axios.post(
            "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
            {
              email: employee.mail,
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

          console.log(`✅ Success for ${employee.displayName}`);
          successCount++;
          
          // Add delay to avoid overwhelming the API
          if (i < selectedEmployees.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
          }
          
        } catch (employeeError) {
          console.error(`❌ Failed for ${employee.displayName}:`, employeeError.response?.data || employeeError.message);
          failCount++;
          failedEmployees.push(employee.displayName);
        }
      }

      // Show detailed results
      let message = `Bulk apply completed!\n✅ Successful: ${successCount}\n❌ Failed: ${failCount}`;
      if (failedEmployees.length > 0) {
        message += `\n\nFailed employees:\n${failedEmployees.join('\n')}`;
      }
      
      alert(message);
      navigate("/employees");
      
    } catch (error) {
      console.error("❌ Error in bulk apply:", error);
      alert(`Bulk apply failed. Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  // Optional debug function
  const debugEmployeeData = () => {
    if (selectedEmployees && selectedEmployees.length > 0) {
      console.log("🔍 Debug: First employee data:", selectedEmployees[0]);
      console.log("🔍 Available fields:", Object.keys(selectedEmployees[0]));
      
      selectedEmployees.slice(0, 3).forEach((emp, index) => {
        console.log(`Employee ${index + 1}:`, {
          displayName: emp.displayName,
          jobTitle: emp.jobTitle,
          mail: emp.mail,
          mobilePhone: emp.mobilePhone,
          businessPhones: emp.businessPhones,
          officeLocation: emp.officeLocation
        });
      });
    }
  };

  // ADD THESE NEW DEBUG FUNCTIONS
  const testEmployeesWithPhones = () => {
    if (selectedEmployees?.length > 0) {
      console.log("📞 TESTING EMPLOYEES WITH PHONE NUMBERS:");
      
      // Find employees with phone numbers
      const employeesWithPhones = selectedEmployees.filter(emp => emp.mobilePhone);
      console.log("Found employees with phones:", employeesWithPhones.length);
      
      employeesWithPhones.forEach((emp, index) => {
        console.log(`\n📞 Employee ${index + 1}: ${emp.displayName}`);
        console.log("Phone:", emp.mobilePhone);
        
        // Generate form data same as bulk apply
        const testFormData = {
          ...formData,
          name: emp.displayName || "Employee Name",
          jobTitle: emp.jobTitle || "Job Title",
          email: emp.mail || "",
          phone: emp.mobilePhone || "",
          mobilePhone: emp.mobilePhone || "",
          location: emp.officeLocation || "",
          company: "Agile World Technologies LLC"
        };
        
        console.log("Form data:", testFormData);
        
        // Generate signature using same method as bulk apply
        const signature = generateSignatureHTML(testFormData, selectedDesign, getDesignStyle(selectedDesign));
        
        console.log("Signature includes phone?", signature.includes(emp.mobilePhone));
        console.log("Signature snippet:", signature.substring(0, 500));
        
        if (!signature.includes(emp.mobilePhone)) {
          console.log("❌ PHONE MISSING for", emp.displayName);
          console.log("❌ Looking for:", emp.mobilePhone);
          console.log("❌ In HTML:", signature);
        } else {
          console.log("✅ Phone found for", emp.displayName);
        }
      });
    }
  };

  const compareIndividualVsBulk = () => {
    if (selectedEmployees?.length > 0) {
      const ankuur = selectedEmployees.find(emp => emp.displayName.includes('Ankuur'));
      if (ankuur && ankuur.mobilePhone) {
        console.log("🔄 COMPARING INDIVIDUAL VS BULK for", ankuur.displayName);
        console.log("Phone number:", ankuur.mobilePhone);
        
        // INDIVIDUAL APPLY STYLE (from your working individual apply)
        const individualFormData = {
          name: ankuur.displayName,
          jobTitle: ankuur.jobTitle,
          company: "Agile World Technologies LLC",
          email: ankuur.mail,
          phone: ankuur.mobilePhone,
          mobilePhone: ankuur.mobilePhone,
          location: ankuur.officeLocation || "San Francisco, CA",
          website: "www.agilesignature.com",
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
        };
        
        // BULK APPLY STYLE (from your bulk apply)
        const bulkFormData = {
          ...formData, // Use current form data
          name: ankuur.displayName || "Employee Name",
          jobTitle: ankuur.jobTitle || "Job Title", 
          email: ankuur.mail || "",
          phone: ankuur.mobilePhone || "",
          mobilePhone: ankuur.mobilePhone || "",
          location: ankuur.officeLocation || "",
          company: "Agile World Technologies LLC"
        };
        
        console.log("📝 Individual form data:", individualFormData);
        console.log("📝 Bulk form data:", bulkFormData);
        
        // Generate signatures
        const designStyle = getDesignStyle(selectedDesign);
        const individualSignature = generateSignatureHTML(individualFormData, selectedDesign, designStyle);
        const bulkSignature = generateSignatureHTML(bulkFormData, selectedDesign, designStyle);
        
        console.log("🔍 Individual signature:", individualSignature);
        console.log("🔍 Bulk signature:", bulkSignature);
        
        console.log("📞 Phone in individual signature?", individualSignature.includes(ankuur.mobilePhone));
        console.log("📞 Phone in bulk signature?", bulkSignature.includes(ankuur.mobilePhone));
        
        console.log("🔄 Signatures identical?", individualSignature === bulkSignature);
        
        if (individualSignature !== bulkSignature) {
          console.log("❌ SIGNATURES ARE DIFFERENT!");
          console.log("❌ Difference in form data:");
          Object.keys(individualFormData).forEach(key => {
            if (individualFormData[key] !== bulkFormData[key]) {
              console.log(`  ${key}: individual="${individualFormData[key]}" vs bulk="${bulkFormData[key]}"`);
            }
          });
        }
      } else {
        alert("Ankuur Tyagi not found or no phone number");
      }
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
          <p>Applying to {selectedEmployees?.length || 0} employees</p>
          
          {/* DEBUG BUTTONS */}
          <button 
            onClick={() => {
              if (selectedEmployees?.length > 0) {
                console.log("🔍 Manual Debug - Employee Data:", selectedEmployees[0]);
                debugEmployeeData();
              }
            }}
            style={{
              backgroundColor: "#ffc107",
              color: "black",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              margin: "10px"
            }}
          >
            🔍 Debug Employee Data
          </button>
          
          <button 
            onClick={() => {
              if (selectedEmployees?.length > 0) {
                const testEmployee = selectedEmployees[0];
                console.log("🧪 TESTING SIGNATURE GENERATION:");
                console.log("Test employee:", testEmployee);
                
                const testFormData = {
                  ...formData,
                  name: testEmployee.displayName || "Test Name",
                  jobTitle: testEmployee.jobTitle || "Test Title",
                  email: testEmployee.mail || "test@email.com",
                  phone: testEmployee.mobilePhone || "NO_PHONE",
                  mobilePhone: testEmployee.mobilePhone || "NO_PHONE",
                  location: testEmployee.officeLocation || "Test Location",
                  company: "Agile World Technologies LLC"
                };
                
                console.log("🧪 Test form data:", testFormData);
                
                const testSignature = generateSignatureHTML(testFormData, selectedDesign, designStyle);
                console.log("🧪 Full signature HTML:", testSignature);
                console.log("🧪 Signature includes phone?", testSignature.includes(testEmployee.mobilePhone));
              }
            }}
            style={{
              backgroundColor: "#17a2b8",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              margin: "10px"
            }}
          >
            🧪 Test Signature HTML
          </button>

          <button 
            onClick={testEmployeesWithPhones}
            style={{
              backgroundColor: "#6f42c1",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              margin: "10px"
            }}
          >
            📞 Test Employees with Phones
          </button>

          <button 
            onClick={compareIndividualVsBulk}
            style={{
              backgroundColor: "#e83e8c",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              margin: "10px"
            }}
          >
            🔄 Compare Individual vs Bulk
          </button>
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