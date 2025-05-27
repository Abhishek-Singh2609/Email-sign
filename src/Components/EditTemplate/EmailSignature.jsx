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

  // Check if we're coming back from preview page with preserved state
  const {
    preserveDesign,
    selectedDesign: savedDesign,
    preserveFormData,
    formData: savedFormData,
    activeTab: savedActiveTab,
    email, // Add this to destructure the email prop
    organization,
    businessPhones,
    displayName,
    jobTitle,
    officeLocation,
  } = location.state || {};

  // Get initial state
  const getInitialState = () => {
    // First check if we're coming back from preview page
    if (preserveFormData && savedFormData) {
      return {
        formData: ensureFiveCampaigns(savedFormData),
        activeTab: savedActiveTab || "Personal Info",
        selectedDesign: savedDesign || "default",
      };
    }

    // Then check localStorage
    const localStorageState = loadFromLocalStorage();
    if (localStorageState) {
      // If email was passed, override the stored email
      const formDataWithEmail = email
        ? { ...localStorageState.formData, email }
        : localStorageState.formData;

      return {
        formData: ensureFiveCampaigns(formDataWithEmail),
        activeTab: localStorageState.activeTab || "Personal Info",
        selectedDesign: localStorageState.selectedDesign || "default",
      };
    }

    return {
      formData: ensureFiveCampaigns({
        name: displayName || "John Doe",
        jobTitle: jobTitle || "Product Designer",
        company: organization || "Agilesignature.com",
        email: email || "john.doe@agile.com",
        phone: businessPhones?.[0] || "+1 (555) 123-4567", // use first business phone if available
        mobilePhone: "", // You can map mobile separately if it's different
        location: officeLocation || "San Francisco, CA",
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
      activeTab: "Personal Info",
      selectedDesign: "default",
    };
  };

  const initialState = getInitialState();
  const [activeTab, setActiveTab] = useState(initialState.activeTab);
  const [selectedDesign, setSelectedDesign] = useState(
    initialState.selectedDesign
  );
  const [formData, setFormData] = useState(initialState.formData);

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
    if (!formData.email) {
      alert("Please enter your email address");
      return;
    }

    setIsSending(true);
    try {
      const organization = "agileworldtechnologies.com";
      const signatureHTML = generateSignatureHTML(formData); // Make sure to pass formData
      console.log(signatureHTML);

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

  const handleTabClick = (tab) => {
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
            organization={organization}
          />
        );
      case "Images":
        return (
          <ImagesTab
            formData={formData}
            handleFormDataUpdate={handleFormDataUpdate}
          />
        );
      case "Social":
        return (
          <SocialTab
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormDataUpdate={handleFormDataUpdate}
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
          />
        );
      case "Disclaimer":
        return (
          <DisclaimerTab
            formData={formData}
            handleFormDataUpdate={handleFormDataUpdate}
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
        Customize Your Email Signature
      </h2>
      <div className="editor-container">
        <div className="content">
          <div className="form-section">
            <TabNavigation
              activeTab={activeTab}
              handleTabClick={handleTabClick}
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
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSignatureCreator;
