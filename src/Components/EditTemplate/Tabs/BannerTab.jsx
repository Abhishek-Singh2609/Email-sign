import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import StandardBanner, {
  standardBannerTemplates,
  initializeStandardBanners,
  isStandardBannerDateValid,
  getStandardBannerStatusMessage,
} from "./StandardBanner";
import "./BannerTab.css";

const BannerTab = ({ formData, handleFormDataUpdate }) => {
  // Initialize standardBanners in formData if not exists
  const initializeStandardBannersInForm = () => {
    if (!formData.standardBanners) {
      const initialized = initializeStandardBanners(
        formData,
        formData.companyName
      );
      handleFormDataUpdate({ standardBanners: initialized });
    }
  };

  // Handle selecting/deselecting a standard banner
  const handleStandardBannerSelect = (bannerId) => {
    initializeStandardBannersInForm();

    const updatedBanners = (formData.standardBanners || []).map((banner) => {
      if (banner.id === bannerId) {
        return { ...banner, selected: !banner.selected };
      }
      return { ...banner, selected: false };
    });

    handleFormDataUpdate({
      standardBanners: updatedBanners,
      bannerType: "standard",
    });
  };

  // Handle standard banner content change
  const handleStandardBannerContentChange = (bannerId, editor) => {
    const updatedBanners = formData.standardBanners.map((banner) => {
      if (banner.id === bannerId) {
        return { ...banner, content: editor.getData() };
      }
      return banner;
    });
    handleFormDataUpdate({ standardBanners: updatedBanners });
  };

  // Handle standard banner date changes
  const handleStandardBannerDateChange = (bannerId, field, value) => {
    const updatedBanners = formData.standardBanners.map((banner) => {
      if (banner.id === bannerId) {
        const updatedBanner = { ...banner, [field]: value };
        if (!isStandardBannerDateValid(updatedBanner)) {
          updatedBanner.active = false;
        }
        return updatedBanner;
      }
      return banner;
    });
    handleFormDataUpdate({ standardBanners: updatedBanners });
  };

  // Handle standard banner link changes
  const handleStandardBannerLinkChange = (bannerId, field, value) => {
    const updatedBanners = formData.standardBanners.map((banner) => {
      if (banner.id === bannerId) {
        return {
          ...banner,
          link: {
            ...banner.link,
            [field]: value,
          },
        };
      }
      return banner;
    });
    handleFormDataUpdate({ standardBanners: updatedBanners });
  };

  // Handle standard banner activation
  const handleStandardBannerActivation = (bannerId) => {
    const updatedBanners = formData.standardBanners.map((banner) => {
      if (banner.id === bannerId) {
        return { ...banner, active: !banner.active };
      }
      return banner;
    });
    handleFormDataUpdate({ standardBanners: updatedBanners });
  };

  // Campaign banner functions
  const [campaigns, setCampaigns] = useState(formData.campaigns || []);

  const handleCampaignNameChange = (id, value) => {
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === id ? { ...campaign, name: value } : campaign
    );
    setCampaigns(updatedCampaigns);
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const handleCampaignImageUpload = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Make the upload request
      const response = await fetch(
        "https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Cookie:
              "ARRAffinity=d8e9b80b64bf4b8d6f35de201a95cef0d730cbf1e6617cf235119fd987f06b94; ARRAffinitySameSite=d8e9b80b64bf4b8d6f35de201a95cef0d730cbf1e6617cf235119fd987f06b94; connect.sid=s%3ABQbpdA3Otq4GZgzPRCQw9EcsPrhciyAY.5gwibNjrTT20ADIPAuwDo7jTf1ksV9MPH4FGyTyG9oo",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Original File URL:", result.fileUrl);

      // Extract filename from the original URL
      const originalUrl = result.fileUrl;
      const fileName = originalUrl.substring(originalUrl.lastIndexOf("/") + 1);

      // Construct new URL with your base path
      const newImageUrl = `https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/banners/${fileName}`;
      console.log("New Image URL:", newImageUrl);

      // Update the campaign with the new image URL
      const updatedCampaigns = campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, image: newImageUrl } : campaign
      );
      setCampaigns(updatedCampaigns);
      handleFormDataUpdate({ campaigns: updatedCampaigns });
    } catch (error) {
      console.error("Error uploading image:", error);
      // Optionally show an error message to the user
    }
  };

  const handleCampaignExpiryChange = (id, value) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === id) {
        const updatedCampaign = { ...campaign, expiryDate: value };
        if (!isCampaignDateValid(updatedCampaign)) {
          updatedCampaign.active = false;
        }
        return updatedCampaign;
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const handleCampaignStartDateChange = (id, value) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === id) {
        const updatedCampaign = { ...campaign, startDate: value };
        if (!isCampaignDateValid(updatedCampaign)) {
          updatedCampaign.active = false;
        }
        return updatedCampaign;
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const handleCampaignLinkChange = (campaignId, linkIndex, field, value) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === campaignId) {
        const updatedLinks = [...campaign.links];
        updatedLinks[linkIndex] = {
          ...updatedLinks[linkIndex],
          [field]: value,
        };
        return { ...campaign, links: updatedLinks };
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const removeCampaignImage = (id) => {
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === id ? { ...campaign, image: null } : campaign
    );
    setCampaigns(updatedCampaigns);
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const toggleCampaignActive = async (id) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (!campaign || !campaign.image || !isCampaignDateValid(campaign)) {
      return;
    }

    const isActivating = !campaign.active;

    try {
      // Generate the HTML for the banner with links
      const bannerHtml = generateCampaignBannerHtml(campaign);
      const organization = formData.companyName?.trim()
        ? formData.companyName.toLowerCase().replace(/\s+/g, "") + ".com"
        : "agileworldtechnologies.com";

      const response = await fetch(
        "https://email-signature-function-app.azurewebsites.net/api/RemoveBanner",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: isActivating ? "add" : "remove",
            organization: organization,
            bannerName: `Campaign_${campaign.id}`,
            html: bannerHtml,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update banner status");
      }

      // Only update the local state if the API call succeeds
      const updatedCampaigns = campaigns.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      );
      setCampaigns(updatedCampaigns);
      handleFormDataUpdate({ campaigns: updatedCampaigns });
    } catch (error) {
      console.error("Error toggling campaign status:", error);
      // Optionally show an error message to the user
    }
  };

  // Helper function to generate HTML for the campaign banner
  const generateCampaignBannerHtml = (campaign) => {
    // Create a table-based banner with clickable sections
    let html = `
    <div style="width: 100%; max-width: 600px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
        <tr>
  `;

    // Add each section as a table cell with background image
    campaign.links.forEach((link, index) => {
      const width = Math.floor(100 / campaign.links.length);
      html += `
      <td width="${width}%" style="background-image: url('${campaign.image}'); 
            background-position: ${
              index === 0 ? "left" : index === 1 ? "center" : "right"
            }; 
            background-size: cover;
            height: 200px;
            text-align: center;
            vertical-align: middle;">
        <a href="${link.url || "#"}" 
           target="_blank" 
           style="display: block; width: 100%; height: 100%; text-decoration: none;">
          <span style="color: transparent; font-size: 1px;">${
            link.text || ""
          }</span>
        </a>
      </td>
    `;
    });

    html += `
        </tr>
      </table>
    </div>
  `;

    return html;
  };
  const isCampaignDateValid = (campaign) => {
    const today = new Date().toISOString().split("T")[0];
    if (!campaign.startDate || !campaign.expiryDate) return false;
    return campaign.startDate <= today && today <= campaign.expiryDate;
  };

  const getCampaignStatusMessage = (campaign) => {
    const today = new Date().toISOString().split("T")[0];

    if (!campaign.startDate && !campaign.expiryDate) {
      return { message: "No dates set", color: "#666" };
    }

    if (!campaign.startDate) {
      return { message: "Start date required", color: "#dc3545" };
    }

    if (!campaign.expiryDate) {
      return { message: "Expiry date required", color: "#dc3545" };
    }

    if (today < campaign.startDate) {
      return {
        message: `Starts on: ${new Date(
          campaign.startDate
        ).toLocaleDateString()}`,
        color: "#ffc107",
      };
    }

    if (today > campaign.expiryDate) {
      return { message: "Expired", color: "#dc3545" };
    }

    return {
      message: `Active until: ${new Date(
        campaign.expiryDate
      ).toLocaleDateString()}`,
      color: "#28a745",
    };
  };

  const getActiveCampaigns = () => {
    return campaigns.filter(
      (campaign) =>
        campaign.active && campaign.image && isCampaignDateValid(campaign)
    );
  };

  // Initialize standard banners on component mount
  useEffect(() => {
    initializeStandardBannersInForm();
  }, []);

  return (
    <div className="banner-tab-form">
      <div className="banner-tab-section">
        <h3 className="banner-tab-heading">Standard Banner Templates</h3>

        <div className="standard-banners-container">
          <h4>Select Standard Banners</h4>
          <div className="standard-banners-grid">
            {standardBannerTemplates.map((banner) => {
              const isSelected = formData.standardBanners?.some(
                (b) => b.id === banner.id && b.selected
              );
              return (
                <StandardBanner
                  key={banner.id}
                  banner={banner}
                  formData={formData}
                  companyName={formData.companyName}
                  isPreview={true}
                  isSelected={isSelected}
                  onSelect={handleStandardBannerSelect}
                />
              );
            })}
          </div>

          {/* Show editors for selected banners */}
          {formData.standardBanners
            ?.filter((b) => b.selected)
            .map((banner) => (
              <StandardBanner
                key={banner.id}
                banner={banner}
                formData={formData}
                companyName={formData.companyName}
                onContentChange={handleStandardBannerContentChange}
                onDateChange={handleStandardBannerDateChange}
                onLinkChange={handleStandardBannerLinkChange}
                onActivation={handleStandardBannerActivation}
              />
            ))}
        </div>
      </div>

      <div className="banner-tab-section">
        <h3 className="banner-tab-heading">Campaign Banners</h3>

        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className={`banner-tab-campaign-item ${
              campaign.active ? "active" : ""
            }`}
          >
            <div className="banner-tab-campaign-header">
              <div className="banner-tab-form-group">
                <label htmlFor={`campaign-name-${campaign.id}`}>
                  Campaign Name
                </label>
                <input
                  type="text"
                  id={`campaign-name-${campaign.id}`}
                  value={campaign.name}
                  onChange={(e) =>
                    handleCampaignNameChange(campaign.id, e.target.value)
                  }
                />
              </div>

              <div className="banner-tab-form-group">
                <label htmlFor={`campaign-start-${campaign.id}`}>
                  Start Date *
                </label>
                <input
                  type="date"
                  id={`campaign-start-${campaign.id}`}
                  value={campaign.startDate}
                  onChange={(e) =>
                    handleCampaignStartDateChange(campaign.id, e.target.value)
                  }
                  required
                />
              </div>

              <div className="banner-tab-form-group">
                <label htmlFor={`campaign-expiry-${campaign.id}`}>
                  Expiry Date *
                </label>
                <input
                  type="date"
                  id={`campaign-expiry-${campaign.id}`}
                  value={campaign.expiryDate}
                  onChange={(e) =>
                    handleCampaignExpiryChange(campaign.id, e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="banner-tab-image-section">
              <div className="banner-tab-image-container">
                {campaign.image ? (
                  <div className="banner-tab-image-preview">
                    <img
                      src={campaign.image}
                      alt={`Campaign ${campaign.id}`}
                      className="banner-tab-image"
                    />
                    <button
                      className="banner-tab-remove-btn"
                      onClick={() => removeCampaignImage(campaign.id)}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="banner-tab-upload-placeholder"
                    onClick={() =>
                      document
                        .getElementById(`campaign-upload-${campaign.id}`)
                        .click()
                    }
                  >
                    <span className="banner-tab-upload-icon">🖼️</span>
                    <span>Upload Campaign Banner</span>
                  </div>
                )}
                <input
                  id={`campaign-upload-${campaign.id}`}
                  type="file"
                  onChange={(e) => handleCampaignImageUpload(e, campaign.id)}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="banner-tab-links-section">
              <label className="banner-tab-links-header">
                Banner Links (Clickable Areas)
              </label>

              {campaign.links.map((link, index) => (
                <div key={index} className="banner-tab-link-item">
                  <div className="banner-tab-link-content">
                    <div className={`banner-tab-link-number link-${index + 1}`}>
                      {index + 1}
                    </div>
                    <div className="banner-tab-link-text-input">
                      <input
                        type="text"
                        placeholder={`Link ${index + 1} Text`}
                        value={link.text}
                        onChange={(e) =>
                          handleCampaignLinkChange(
                            campaign.id,
                            index,
                            "text",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="banner-tab-link-url-input">
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={link.url}
                        onChange={(e) =>
                          handleCampaignLinkChange(
                            campaign.id,
                            index,
                            "url",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="banner-tab-link-area-label">
                    {index === 0
                      ? "Left section"
                      : index === 1
                      ? "Middle section"
                      : "Right section"}
                  </div>
                </div>
              ))}
            </div>

            <div className="banner-tab-footer">
              <div className="banner-tab-status">
                {(() => {
                  const status = getCampaignStatusMessage(campaign);
                  return (
                    <span style={{ color: status.color, fontWeight: "bold" }}>
                      {status.message}
                    </span>
                  );
                })()}
              </div>
              <button
                className={`banner-tab-toggle-btn ${
                  campaign.active ? "active" : ""
                } ${
                  !campaign.image || !isCampaignDateValid(campaign)
                    ? "disabled"
                    : ""
                }`}
                onClick={() => toggleCampaignActive(campaign.id)}
                disabled={!campaign.image || !isCampaignDateValid(campaign)}
              >
                {campaign.active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerTab;
