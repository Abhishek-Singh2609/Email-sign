
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
        name: location.state?.displayName || "{{name}}",
        jobTitle: location.state?.jobTitle || "{{title}}",
        company: location.state?.organization || "{{company}}",
        email: location.state?.email || "{{email}}",
        phone: location.state?.businessPhones?.[0] || "{{phone}}",
        mobilePhone: "{{mobilePhone}}",
        location: location.state?.officeLocation || "{{location}}",
        website: "{{website}}",
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
      // For bulk apply, use placeholder values in the template
      const templateFormData = {
        ...formData,
        name: "{{name}}",
        jobTitle: "{{title}}",
        email: "{{email}}",
        phone: "{{phone}}",
        location: "{{location}}",
        company: "{{company}}",
        website: formData.website || "{{website}}",
        mobilePhone: "{{mobilePhone}}",
      };
      setFormData(templateFormData);
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

  // Updated bulk apply function to send template with placeholders
  const handleBulkApply = async () => {
    if (!selectedEmployees || selectedEmployees.length === 0) {
      alert("No employees selected for bulk apply");
      return;
    }

    setIsSending(true);
    try {
      const organization = "agileworldtechnologies.com";
      
      // Generate the signature HTML template with placeholders
      const signatureHTMLTemplate = generateSignatureHTML(
        formData,
        selectedDesign,
        designStyle
      );

      console.log("Sending bulk apply request with template:", signatureHTMLTemplate);

      // Send single request with template containing placeholders
      const response = await axios.post(
        "https://email-signature-function-app.azurewebsites.net/api/ApplySignature",
        {
          organization,
          html: signatureHTMLTemplate,
          // You might want to include employee list or let the backend handle it
          employees: selectedEmployees.map(emp => ({
            email: emp.mail,
            name: emp.displayName,
            title: emp.jobTitle,
            phone: emp.businessPhones?.[0] || "",
            location: emp.officeLocation || "",
            company: organization,
            department: emp.department || "",
          }))
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
      navigate("/employees"); // Return to employees page after bulk apply
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
          <p>Applying template to {selectedEmployees?.length || 0} employees</p>
          <div style={{ 
            background: "#f0f8ff", 
            padding: "10px", 
            borderRadius: "5px", 
            margin: "10px auto", 
            maxWidth: "600px" 
          }}>
            <small>
              <strong>Note:</strong> This will create a template with placeholders like {{name}}, {{email}}, etc. 
              The backend will replace these with actual employee data.
            </small>
          </div>
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