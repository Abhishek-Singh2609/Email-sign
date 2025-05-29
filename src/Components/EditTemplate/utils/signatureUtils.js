// Function to ensure 5 campaigns exist
export const ensureFiveCampaigns = (formDataToUpdate) => {
  if (!formDataToUpdate.campaigns || formDataToUpdate.campaigns.length < 5) {
    const updatedCampaigns = [...(formDataToUpdate.campaigns || [])];

    // Add campaigns until we have 5
    while (updatedCampaigns.length < 5) {
      const newId = updatedCampaigns.length + 1;
      updatedCampaigns.push({
        id: newId,
        name: `Campaign ${newId}`,
        image: null,
        startDate: "",
        expiryDate: "",
        active: false,
        links: [
          {
            url: "",
            text: "Link 1",
            area: { x: 0, y: 0, width: 33, height: 100 },
          },
          {
            url: "",
            text: "Link 2",
            area: { x: 33, y: 0, width: 34, height: 100 },
          },
          {
            url: "",
            text: "Link 3",
            area: { x: 67, y: 0, width: 33, height: 100 },
          },
        ],
      });
    }

    return {
      ...formDataToUpdate,
      campaigns: updatedCampaigns,
    };
  }

  return formDataToUpdate;
};

// Function to get active campaigns
export const getActiveCampaigns = (campaigns) => {
  return campaigns.filter(
    (campaign) =>
      campaign.active &&
      campaign.image &&
      !(campaign.startDate && new Date() < new Date(campaign.startDate)) &&
      !(campaign.expiryDate && new Date() > new Date(campaign.expiryDate))
  );
};

// Function to render social icons
const renderSocialIcons = (formData) => {
  const socialLinks = [];
  if (formData.linkedin) {
    socialLinks.push(
      `<a href="${formData.linkedin}" style="margin-right: 10px;"><img src="https://cdn-icons-png.flaticon.com/24/145/145807.png" alt="LinkedIn" style="vertical-align: middle;"></a>`
    );
  }
  if (formData.youtube) {
    socialLinks.push(
      `<a href="${formData.youtube}" style="margin-right: 10px;"><img src="https://cdn-icons-png.flaticon.com/24/1384/1384060.png" alt="YouTube" style="vertical-align: middle;"></a>`
    );
  }
  if (formData.instagram) {
    socialLinks.push(
      `<a href="${formData.instagram}"><img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" style="vertical-align: middle;"></a>`
    );
  }

  return socialLinks.length > 0
    ? `<p style="margin-top: 8px;">${socialLinks.join("")}</p>`
    : "";
};

// Generate HTML for different layout types
const generateStandardLayout = (formData, designStyle) => {
  const bgColor = designStyle.backgroundColor || "#f0f0f0";
  const textColor = designStyle.textColor || "#333";
  const nameColor = designStyle.nameColor || "#3498db";
  const accentColor = designStyle.accentColor || "#3498db";

  return `
    <div style="font-family: Arial, sans-serif; color: ${textColor}; background-color: ${bgColor}; padding: 20px; max-width: 600px; border-radius: 8px; ${
    designStyle.borderStyle ? `border: ${designStyle.borderStyle};` : ""
  } ${designStyle.boxShadow ? `box-shadow: ${designStyle.boxShadow};` : ""}">
      <p style="margin-bottom: 10px;">Thanks & Regards,</p>
      <table style="width: 100%; border-spacing: 0; color: ${textColor};">
        <tr>
          <td style="padding-right: 20px; vertical-align: top;">
            <p style="margin: 0; font-size: 16px; font-weight: bold; color: ${nameColor};">${
    formData.name || "Employee Name"
  }</p>
            <p style="margin: 2px 0; font-size: 14px; color: ${accentColor};">${
    formData.jobTitle || "Employee Title"
  }</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: ${textColor};">${
    formData.company || "AgileWorld Technology Ltd."
  }</p>
            <p style="margin: 2px 0 0 0; font-size: 14px;">${
              formData.location || "Gurgaon, Haryana"
            }</p>
          </td>
          <td style="border-left: 1px solid ${accentColor}; padding-left: 20px; vertical-align: top;">
            <p style="margin: 0; font-size: 14px;">📞 ${
              formData.phone || "+91 9876543210"
            }</p>
            <p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:${
              formData.email
            }" style="color: ${accentColor}; text-decoration: none;">${
    formData.email || "email@example.com"
  }</a></p>
            <p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://${
              formData.website
            }" style="color: ${accentColor}; text-decoration: none;">www.${
    formData.website || "agileworldtechnologies.com"
  }</a></p>
            ${renderSocialIcons(formData)}
          </td>
        </tr>
      </table>
      ${
        formData.banner
          ? `<div style="margin-top: 20px;"><img src="${formData.banner}" alt="Banner" style="width: 100%; height: auto; border-radius: 8px;"></div>`
          : ""
      }
      ${
        formData.disclaimer
          ? `<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><strong>DISCLAIMER</strong></p><p style="margin-top: 5px;">${formData.disclaimer}</p></div>`
          : ""
      }
    </div>
  `;
};

const generateSplitLayout = (formData, designStyle) => {
  const accentColor = designStyle.accentColor || "#3498db";
  const bgColor = designStyle.backgroundColor || "#f0f0f0";
  const textColor = designStyle.textColor || "#333";

  return `
    <div style="font-family: Arial, sans-serif; display: flex; max-width: 600px; border-radius: 8px; overflow: hidden; ${
      designStyle.boxShadow ? `box-shadow: ${designStyle.boxShadow};` : ""
    }">
      <div style="width: 120px; background-color: ${accentColor}; padding: 20px; display: flex; flex-direction: column; align-items: center; color: white;">
        <div style="text-align: center;">
          <p style="margin: 0; font-size: 14px; font-weight: bold;">${
            formData.name || "Employee Name"
          }</p>
          <p style="margin: 5px 0; font-size: 12px;">${
            formData.jobTitle || "Employee Title"
          }</p>
        </div>
      </div>
      <div style="flex: 1; padding: 20px; background-color: ${bgColor}; color: ${textColor};">
        <p style="margin-bottom: 10px;">Thanks & Regards,</p>
        <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">${
          formData.company || "AgileWorld Technology Ltd."
        }</p>
        <p style="margin: 2px 0 0 0; font-size: 14px;">${
          formData.location || "Gurgaon, Haryana"
        }</p>
        <div style="margin-top: 10px;">
          <p style="margin: 0; font-size: 14px;">📞 ${
            formData.phone || "+91 9876543210"
          }</p>
          <p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:${
            formData.email
          }" style="color: ${accentColor}; text-decoration: none;">${
    formData.email || "email@example.com"
  }</a></p>
          <p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://${
            formData.website
          }" style="color: ${accentColor}; text-decoration: none;">www.${
    formData.website || "agileworldtechnologies.com"
  }</a></p>
          ${renderSocialIcons(formData)}
        </div>
      </div>
    </div>
  `;
};

const generateCenteredLayout = (formData, designStyle) => {
  const accentColor = designStyle.accentColor || "#3498db";
  const bgColor = designStyle.backgroundColor || "#f0f0f0";
  const textColor = designStyle.textColor || "#333";
  const nameColor = designStyle.nameColor || "#3498db";

  return `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: ${bgColor}; color: ${textColor}; padding: 20px; max-width: 600px; border-radius: 8px; ${
    designStyle.boxShadow ? `box-shadow: ${designStyle.boxShadow};` : ""
  }">
      <p style="margin-bottom: 10px;">Thanks & Regards,</p>
      <p style="margin: 0; font-size: 16px; font-weight: bold; color: ${nameColor};">${
    formData.name || "Employee Name"
  }</p>
      <p style="margin: 2px 0; font-size: 14px; color: ${accentColor};">${
    formData.jobTitle || "Employee Title"
  }</p>
      <div style="width: 60%; margin: 12px auto; height: 2px; background: ${accentColor};"></div>
      <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">${
        formData.company || "AgileWorld Technology Ltd."
      }</p>
      <p style="margin: 2px 0 0 0; font-size: 14px;">${
        formData.location || "Gurgaon, Haryana"
      }</p>
      <div style="margin-top: 10px;">
        <p style="margin: 0; font-size: 14px;">📞 ${
          formData.phone || "+91 9876543210"
        }</p>
        <p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:${
          formData.email
        }" style="color: ${accentColor}; text-decoration: none;">${
    formData.email || "email@example.com"
  }</a></p>
        <p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://${
          formData.website
        }" style="color: ${accentColor}; text-decoration: none;">www.${
    formData.website || "agileworldtechnologies.com"
  }</a></p>
        ${renderSocialIcons(formData)}
      </div>
      ${
        formData.banner
          ? `<div style="margin-top: 20px;"><img src="${formData.banner}" alt="Banner" style="width: 100%; height: auto; border-radius: 8px;"></div>`
          : ""
      }
      ${
        formData.disclaimer
          ? `<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><strong>DISCLAIMER</strong></p><p style="margin-top: 5px;">${formData.disclaimer}</p></div>`
          : ""
      }
    </div>
  `;
};

const generateHorizontalLayout = (formData, designStyle) => {
  const accentColor = designStyle.accentColor || "#3498db";
  const bgColor = designStyle.backgroundColor || "#f0f0f0";
  const textColor = designStyle.textColor || "#333";
  const nameColor = designStyle.nameColor || "#3498db";

  return `
    <div style="font-family: Arial, sans-serif; background-color: ${bgColor}; color: ${textColor}; max-width: 600px; border-radius: 8px; overflow: hidden; ${
    designStyle.boxShadow ? `box-shadow: ${designStyle.boxShadow};` : ""
  }">
      <div style="padding: 20px;">
        <p style="margin-bottom: 10px;">Thanks & Regards,</p>
        <table style="width: 100%; border-spacing: 0;">
          <tr>
            <td style="padding-right: 20px; vertical-align: top;">
              <p style="margin: 0; font-size: 16px; font-weight: bold; color: ${nameColor};">${
    formData.name || "Employee Name"
  }</p>
              <p style="margin: 2px 0; font-size: 14px; color: ${accentColor};">${
    formData.jobTitle || "Employee Title"
  }</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">${
                formData.company || "AgileWorld Technology Ltd."
              }</p>
              <p style="margin: 2px 0 0 0; font-size: 14px;">${
                formData.location || "Gurgaon, Haryana"
              }</p>
            </td>
            <td style="vertical-align: top;">
              <p style="margin: 0; font-size: 14px;">📞 ${
                formData.phone || "+91 9876543210"
              }</p>
              <p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:${
                formData.email
              }" style="color: ${accentColor}; text-decoration: none;">${
    formData.email || "email@example.com"
  }</a></p>
              <p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://${
                formData.website
              }" style="color: ${accentColor}; text-decoration: none;">www.${
    formData.website || "agileworldtechnologies.com"
  }</a></p>
              ${renderSocialIcons(formData)}
            </td>
          </tr>
        </table>
      </div>
      <div style="background-color: ${accentColor}; padding: 12px; color: white;">
        <p style="margin: 0; font-size: 12px; text-align: center;">Contact us for more information</p>
      </div>
      ${
        formData.banner
          ? `<div><img src="${formData.banner}" alt="Banner" style="width: 100%; height: auto;"></div>`
          : ""
      }
      ${
        formData.disclaimer
          ? `<div style="padding: 20px; font-size: 11px; color: #cccccc;"><p><strong>DISCLAIMER</strong></p><p style="margin-top: 5px;">${formData.disclaimer}</p></div>`
          : ""
      }
    </div>
  `;
};

const generateBorderedLayout = (formData, designStyle) => {
  const accentColor = designStyle.accentColor || "#3498db";
  const bgColor = designStyle.backgroundColor || "#f0f0f0";
  const textColor = designStyle.textColor || "#333";
  const nameColor = designStyle.nameColor || "#3498db";

  return `
    <div style="font-family: Arial, sans-serif; background-color: ${bgColor}; color: ${textColor}; padding: 20px; max-width: 600px; border: 3px solid ${accentColor}; border-radius: 8px; ${
    designStyle.boxShadow ? `box-shadow: ${designStyle.boxShadow};` : ""
  }">
      <div style="padding: 16px;">
        <p style="margin-bottom: 10px;">Thanks & Regards,</p>
        <table style="width: 100%; border-spacing: 0;">
          <tr>
            <td style="padding-right: 20px; vertical-align: top;">
              <p style="margin: 0; font-size: 16px; font-weight: bold; color: ${nameColor};">${
    formData.name || "Employee Name"
  }</p>
              <p style="margin: 2px 0; font-size: 14px; color: ${accentColor};">${
    formData.jobTitle || "Employee Title"
  }</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">${
                formData.company || "AgileWorld Technology Ltd."
              }</p>
              <p style="margin: 2px 0 0 0; font-size: 14px;">${
                formData.location || "Gurgaon, Haryana"
              }</p>
            </td>
            <td style="border-left: 1px solid ${accentColor}; padding-left: 20px; vertical-align: top;">
              <p style="margin: 0; font-size: 14px;">📞 ${
                formData.phone || "+91 9876543210"
              }</p>
              <p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:${
                formData.email
              }" style="color: ${accentColor}; text-decoration: none;">${
    formData.email || "email@example.com"
  }</a></p>
              <p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://${
                formData.website
              }" style="color: ${accentColor}; text-decoration: none;">www.${
    formData.website || "agileworldtechnologies.com"
  }</a></p>
              ${renderSocialIcons(formData)}
            </td>
          </tr>
        </table>
        ${
          formData.banner
            ? `<div style="margin-top: 20px;"><img src="${formData.banner}" alt="Banner" style="width: 100%; height: auto; border-radius: 8px;"></div>`
            : ""
        }
        ${
          formData.disclaimer
            ? `<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><strong>DISCLAIMER</strong></p><p style="margin-top: 5px;">${formData.disclaimer}</p></div>`
            : ""
        }
      </div>
    </div>
  `;
};

// Updated function to generate HTML content of the signature based on design
export const generateSignatureHTML = (
  formData,
  selectedDesign,
  designStyle
) => {
  // Import design templates to get layout info
  const designTemplates = [
    { id: "default", layout: "standard" },
    { id: "dark", layout: "standard" },
    { id: "minimal", layout: "standard" },
    { id: "vibrant", layout: "standard" },
    { id: "green", layout: "standard" },
    { id: "modern", layout: "split" },
    { id: "elegant", layout: "centered" },
    { id: "clean", layout: "horizontal" },
    { id: "gradient", layout: "standard" },
    { id: "bordered", layout: "bordered" },
    { id: "banner", layout: "banner" },
  ];

  const design =
    designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];

  switch (design.layout) {
    case "split":
      return generateSplitLayout(formData, designStyle);
    case "centered":
      return generateCenteredLayout(formData, designStyle);
    case "horizontal":
      return generateHorizontalLayout(formData, designStyle);
    case "bordered":
      return generateBorderedLayout(formData, designStyle);
    default:
      return generateStandardLayout(formData, designStyle);
  }
};

// Function to load data from localStorage
export const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("emailSignatureState");
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
  return null;
};

// Function to save state to localStorage and handle form data updates
export const saveToLocalStorage = (stateToSave, currentState = null) => {
  try {
    let updatedState = stateToSave;

    // If we're just updating form data with a new form data object
    if (stateToSave.formData && currentState) {
      // Ensure the formData has 5 campaigns
      const updatedFormData = ensureFiveCampaigns(stateToSave.formData);

      updatedState = {
        formData: updatedFormData,
        activeTab: stateToSave.activeTab || currentState.activeTab,
        selectedDesign:
          stateToSave.selectedDesign || currentState.selectedDesign,
      };
    } else {
      // Ensure we preserve the activeTab when saving state
      updatedState = {
        ...stateToSave,
        activeTab:
          stateToSave.activeTab ||
          (currentState ? currentState.activeTab : "Personal Info"),
      };
    }

    localStorage.setItem("emailSignatureState", JSON.stringify(updatedState));
    return updatedState.formData;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return stateToSave.formData;
  }
};
