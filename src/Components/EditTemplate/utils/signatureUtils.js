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

// Function to generate HTML content of the signature
export const generateSignatureHTML = (formData) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #ffffff; background-color: #0c0c0c; padding: 20px; max-width: 600px;">
      <p style="margin-bottom: 10px;">Thanks & Regards,</p>
      <table style="width: 100%; border-spacing: 0; color: #ffffff;">
        <tr>
          <td style="padding-right: 20px; vertical-align: top;">
            <p style="margin: 0; font-size: 16px; font-weight: bold; color: #3db2ff;">${
              formData.name || "Employee Name"
            }</p>
            <p style="margin: 2px 0; font-size: 14px; color: #3db2ff;">${
              formData.jobTitle || "Employee Title"
            }</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: #ffffff;">${
              formData.company || "AgileWorld Technology Ltd."
            }</p>
            <p style="margin: 2px 0 0 0; font-size: 14px;">${
              formData.location || "Gurgaon, Haryana"
            }</p>
          </td>
          <td style="border-left: 1px solid #ffffff; padding-left: 20px; vertical-align: top;">
            <p style="margin: 0; font-size: 14px;">📞 ${
              formData.phone || "+91 9876543210"
            }</p>
            <p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:${
              formData.email
            }" style="color: #3db2ff; text-decoration: none;">${
    formData.email || "email@example.com"
  }</a></p>
            <p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://${
              formData.website
            }" style="color: #3db2ff; text-decoration: none;">www.${
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
          ? `
        <div style="margin-top: 20px; font-size: 11px; color: #cccccc;">
          <p><strong>DISCLAIMER</strong></p>
          <p style="margin-top: 5px;">${formData.disclaimer}</p>
        </div>
      `
          : ""
      }
    </div>
  `;
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
