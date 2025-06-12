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

// Fixed EmailSignatureCreator.jsx - Proper data handling and preview
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
  generateSignatureTemplate,
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

  // FIXED: Get initial state with proper employee data mapping
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
    if (localStorageState && !location.state?.email && !isBulkApply) {
      return {
        formData: ensureFiveCampaigns(localStorageState.formData),
        selectedDesign: localStorageState.selectedDesign || "default",
      };
    }

    // FIXED: Create form data with proper employee data mapping
    const defaultFormData = {
      name: location.state?.displayName || "John Doe",
      jobTitle: location.state?.jobTitle || "Product Designer",
      company: location.state?.organization || "Agile World Technologies LLC",
      email: location.state?.email || "john.doe@agile.com",
      phone: location.state?.businessPhones?.[0] || "+1 (555) 123-4567",
      mobilePhone: "", // This will be populated if available
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
    };

    // If localStorage exists, merge with employee data but prioritize employee data
    if (localStorageState) {
      const mergedFormData = {
        ...localStorageState.formData,
        ...defaultFormData, // Employee data overrides localStorage
      };
      return {
        formData: ensureFiveCampaigns(mergedFormData),
        selectedDesign: localStorageState.selectedDesign || "default",
      };
    }

    return {
      formData: ensureFiveCampaigns(defaultFormData),
      selectedDesign: "default",
    };
  };

  const initialState = getInitialState();
  const [selectedDesign, setSelectedDesign] = useState(
    initialState.selectedDesign
  );
  const [formData, setFormData] = useState(initialState.formData);

  // FIXED: Handle bulk apply with proper data from first employee for preview
  useEffect(() => {
    if (isBulkApply && selectedEmployees?.length > 0) {
      const firstEmployee = selectedEmployees[0];
      console.log("🔧 Setting up bulk apply preview with employee:", firstEmployee);
      
      // Use the first employee's data for preview, keeping static data like social links, logos etc.
      const newFormData = {
        ...formData, // Keep existing static data (logos, social links, etc.)
        // Override with first employee's dynamic data
        name: firstEmployee.displayName || "John Doe",
        jobTitle: firstEmployee.jobTitle || "Product Designer", 
        email: firstEmployee.mail || "john.doe@agile.com",
        phone: firstEmployee.businessPhones?.[0] || "+1 (555) 123-4567",
        mobilePhone: firstEmployee.mobilePhone || "", // Handle mobile phone
        location: firstEmployee.officeLocation || "San Francisco, CA",
        company: "Agile World Technologies LLC", // Keep static company info
      };
      
      console.log("📋 Preview form data:", {
        name: newFormData.name,
        jobTitle: newFormData.jobTitle,
        email: newFormData.email,
        phone: newFormData.phone,
        mobilePhone: newFormData.mobilePhone,
        location: newFormData.location
      });
      
      setFormData(newFormData);
    }
  }, [isBulkApply, selectedEmployees]);

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

  // Single signature apply
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
        designStyle
      );

      console.log("📧 Sending signature HTML for design:", selectedDesign);
      console.log("📄 HTML length:", signatureHTML.length);
      console.log("🔍 HTML preview:", signatureHTML.substring(0, 200));

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

  // FIXED: Bulk apply function with proper template generation
  const handleBulkApply = async () => {
    if (!selectedEmployees || selectedEmployees.length === 0) {
      alert("No employees selected for bulk apply");
      return;
    }

    setIsSending(true);
    try {
      const organization = "agileworldtechnologies.com";
      
      console.log("🎯 Generating bulk template with static data:", {
        company: formData.company,
        website: formData.website,
        logo: formData.logo,
        banner: formData.banner,
        selectedDesign: selectedDesign
      });
      
      // Generate template with placeholders for dynamic fields
      const signatureHTMLTemplate = generateSignatureTemplate(
        selectedDesign,
        designStyle,
        formData // Pass current form data as static data
      );

      console.log("📧 Sending bulk template for design:", selectedDesign);
      console.log("📄 Template length:", signatureHTMLTemplate.length);
      console.log("🔍 Template preview:", signatureHTMLTemplate.substring(0, 200));

      // Send request to bulk apply endpoint
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

      console.log("Bulk apply response:", response.data);
      alert(`Signature template applied to ${selectedEmployees.length} employees!`);
      navigate("/edittemplate"); // Return to employees page after bulk apply
    } catch (error) {
      console.error("Error in bulk apply:", error);
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
          <p>Applying to {selectedEmployees?.length || 0} employees</p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            📋 Using design: <strong>{selectedDesign}</strong>
          </p>
          <p style={{ fontSize: "12px", color: "#888" }}>
            Preview shows data from: <strong>{formData.name}</strong>
          </p>
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