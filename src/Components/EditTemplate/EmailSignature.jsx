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
// console.log(apiUrl);

// const EmailSignatureCreator = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isSending, setIsSending] = useState(false);

//   // Check if we're coming back from preview page with preserved state
//   const {
//     preserveDesign,
//     selectedDesign: savedDesign,
//     preserveFormData,
//     formData: savedFormData,
//     activeTab: savedActiveTab,
//     email, // Add this to destructure the email prop
//     organization,
//     businessPhones,
//     displayName,
//     jobTitle,
//     officeLocation,
//   } = location.state || {};

//   // Get initial state
//   const getInitialState = () => {
//     // First check if we're coming back from preview page
//     if (preserveFormData && savedFormData) {
//       return {
//         formData: ensureFiveCampaigns(savedFormData),
//         activeTab: savedActiveTab || "Personal Info",
//         selectedDesign: savedDesign || "default",
//       };
//     }

//     // Then check localStorage
//     const localStorageState = loadFromLocalStorage();
//     if (localStorageState) {
//       // If email was passed, override the stored email
//       const formDataWithEmail = email
//         ? { ...localStorageState.formData, email }
//         : localStorageState.formData;

//       return {
//         formData: ensureFiveCampaigns(formDataWithEmail),
//         activeTab: localStorageState.activeTab || "Personal Info",
//         selectedDesign: localStorageState.selectedDesign || "default",
//       };
//     }

//     return {
//       formData: ensureFiveCampaigns({
//         name: displayName || "John Doe",
//         jobTitle: jobTitle || "Product Designer",
//         company: organization || "Agilesignature.com",
//         email: email || "john.doe@agile.com",
//         phone: businessPhones?.[0] || "+1 (555) 123-4567", // use first business phone if available
//         mobilePhone: "", // You can map mobile separately if it's different
//         location: officeLocation || "San Francisco, CA",
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
//       activeTab: "Personal Info",
//       selectedDesign: "default",
//     };
//   };

//   const initialState = getInitialState();
//   const [activeTab, setActiveTab] = useState(initialState.activeTab);
//   const [selectedDesign, setSelectedDesign] = useState(
//     initialState.selectedDesign
//   );
//   const [formData, setFormData] = useState(initialState.formData);

//   // Ensure we have 5 campaigns when the component mounts
//   useEffect(() => {
//     if (!formData.campaigns || formData.campaigns.length < 5) {
//       const updatedFormData = ensureFiveCampaigns(formData);
//       setFormData(updatedFormData);
//       saveToLocalStorage({
//         formData: updatedFormData,
//         activeTab,
//         selectedDesign,
//       });
//     }
//   }, []);

//   // Handle form data updates
//   const handleFormDataUpdate = (updatedFormData) => {
//     const newFormData = { ...formData, ...updatedFormData };
//     setFormData(newFormData);

//     const saved = saveToLocalStorage(
//       {
//         formData: newFormData,
//         activeTab,
//         selectedDesign,
//       },
//       { formData, activeTab, selectedDesign }
//     );

//     return saved;
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
//       ); // Pass all required parameters including selectedDesign and designStyle
//       console.log(signatureHTML);

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

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     saveToLocalStorage(
//       {
//         formData,
//         activeTab: tab,
//         selectedDesign,
//       },
//       {
//         formData,
//         activeTab,
//         selectedDesign,
//       }
//     );
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "Personal Info":
//         return (
//           <PersonalInfoTab
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFormDataUpdate={handleFormDataUpdate}
//             organization={organization}
//           />
//         );
//       case "Images":
//         return (
//           <ImagesTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//           />
//         );
//       case "Social":
//         return (
//           <SocialTab
//             formData={formData}
//             handleInputChange={handleInputChange}
//             handleFormDataUpdate={handleFormDataUpdate}
//           />
//         );
//       case "Design":
//         return (
//           <DesignTab
//             selectedDesign={selectedDesign}
//             handleDesignChange={(newDesign) => {
//               setSelectedDesign(newDesign);
//               saveToLocalStorage({
//                 formData,
//                 activeTab,
//                 selectedDesign: newDesign,
//               });
//             }}
//           />
//         );
//       case "Banner":
//         return (
//           <BannerTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
//           />
//         );
//       case "Disclaimer":
//         return (
//           <DisclaimerTab
//             formData={formData}
//             handleFormDataUpdate={handleFormDataUpdate}
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
//         Customize Your Email Signature
//       </h2>
//       <div className="editor-container">
//         <div className="content">
//           <div className="form-section">
//             <TabNavigation
//               activeTab={activeTab}
//               handleTabClick={handleTabClick}
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
        phone: location.state?.businessPhones?.[0] || "+1 (555) 123-4567",
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

  // Handle bulk apply if needed
  useEffect(() => {
    if (isBulkApply && selectedEmployees?.length > 0) {
      // Set the first employee's data as the template
      const firstEmployee = selectedEmployees[0];
      const newFormData = {
        ...formData,
        name: firstEmployee.displayName || formData.name,
        jobTitle: firstEmployee.jobTitle || formData.jobTitle,
        email: firstEmployee.mail || formData.email,
        phone: firstEmployee.businessPhones?.[0] || formData.phone,
        location: firstEmployee.officeLocation || formData.location,
      };
      setFormData(newFormData);
    }
  }, [isBulkApply, selectedEmployees]);

  // Ensure we have 5 campaigns when the component mounts
  useEffect(() => {
    if (!formData.campaigns || formData.campaigns.length < 5) {
      const updatedFormData = ensureFiveCampaigns(formData);
      setFormData(updatedFormData);
      saveToLocalStorage({
        formData: updatedFormData,
        activeTab,
        selectedDesign,
      });
    }
  }, []);

  // Handle form data updates
  const handleFormDataUpdate = (updatedFormData) => {
    const newFormData = { ...formData, ...updatedFormData };
    setFormData(newFormData);

    const saved = saveToLocalStorage(
      {
        formData: newFormData,
        activeTab,
        selectedDesign,
      },
      { formData, activeTab, selectedDesign }
    );

    return saved;
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

  const handleBulkApply = async () => {
    if (!selectedEmployees || selectedEmployees.length === 0) {
      alert("No employees selected for bulk apply");
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

      // Apply to all selected employees
      for (const employee of selectedEmployees) {
        try {
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
          console.log(`Applied to ${employee.mail}:`, response.data);
        } catch (error) {
          console.error(`Error applying to ${employee.mail}:`, error);
          // Continue with next employee even if one fails
        }
      }

      alert(`Signature applied to ${selectedEmployees.length} employees!`);
      navigate("/employees"); // Return to employees page after bulk apply
    } catch (error) {
      console.error("Error in bulk apply:", error);
      alert(`Bulk apply partially completed. Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleTabClick = (tab) => {
    if (tabsDisabled) return; // Prevent tab changes in bulk apply mode
    setActiveTab(tab);
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
              saveToLocalStorage({
                formData,
                activeTab,
                selectedDesign: newDesign,
              });
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
