import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./BannerTab.css";

const BannerTab = ({ formData, handleFormDataUpdate }) => {
  // Campaign banner functions
  const handleCampaignNameChange = (id, value) => {
    const updatedCampaigns = formData.campaigns.map((campaign) =>
      campaign.id === id ? { ...campaign, name: value } : campaign
    );
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const handleCampaignImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedCampaigns = formData.campaigns.map((campaign) =>
          campaign.id === id
            ? { ...campaign, image: event.target.result }
            : campaign
        );
        handleFormDataUpdate({ campaigns: updatedCampaigns });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCampaignExpiryChange = (id, value) => {
    const updatedCampaigns = formData.campaigns.map((campaign) =>
      campaign.id === id ? { ...campaign, expiryDate: value } : campaign
    );
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const handleCampaignStartDateChange = (id, value) => {
    const updatedCampaigns = formData.campaigns.map((campaign) =>
      campaign.id === id ? { ...campaign, startDate: value } : campaign
    );
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const handleCampaignLinkChange = (campaignId, linkIndex, field, value) => {
    const updatedCampaigns = formData.campaigns.map((campaign) => {
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

    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const removeCampaignImage = (id) => {
    const updatedCampaigns = formData.campaigns.map((campaign) =>
      campaign.id === id ? { ...campaign, image: null } : campaign
    );
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const toggleCampaignActive = (id) => {
    const campaign = formData.campaigns.find((c) => c.id === id);

    if (
      !campaign ||
      !campaign.image ||
      isCampaignExpired(campaign.expiryDate, campaign.startDate)
    ) {
      return;
    }

    const updatedCampaigns = formData.campaigns.map((c) =>
      c.id === id ? { ...c, active: !c.active } : c
    );

    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  // Check if campaign is expired or not yet started
  const isCampaignExpired = (expiryDate, startDate) => {
    const today = new Date();

    // Check if campaign has not started yet
    if (startDate) {
      const start = new Date(startDate);
      if (today < start) return true; // Not yet started
    }

    // Check if campaign has expired
    if (expiryDate) {
      const expiry = new Date(expiryDate);
      if (today > expiry) return true; // Expired
    }

    return false; // Campaign is active
  };

  // Get active campaigns
  const getActiveCampaigns = () => {
    const activeCampaigns = formData.campaigns.filter(
      (campaign) =>
        campaign.active &&
        campaign.image &&
        !isCampaignExpired(campaign.expiryDate, campaign.startDate)
    );
    return activeCampaigns;
  };

  return (
    <div className="banner-tab-form">
      <div className="banner-tab-section">
        <h3 className="banner-tab-heading">Campaign Banners</h3>

        {formData.campaigns.map((campaign) => (
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
                  Start Date
                </label>
                <input
                  type="date"
                  id={`campaign-start-${campaign.id}`}
                  value={campaign.startDate}
                  onChange={(e) =>
                    handleCampaignStartDateChange(campaign.id, e.target.value)
                  }
                />
              </div>

              <div className="banner-tab-form-group">
                <label htmlFor={`campaign-expiry-${campaign.id}`}>
                  Expiry Date
                </label>
                <input
                  type="date"
                  id={`campaign-expiry-${campaign.id}`}
                  value={campaign.expiryDate}
                  onChange={(e) =>
                    handleCampaignExpiryChange(campaign.id, e.target.value)
                  }
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
                {isCampaignExpired(campaign.expiryDate, campaign.startDate) ? (
                  <span className="banner-tab-status-expired">
                    {campaign.startDate &&
                    new Date() < new Date(campaign.startDate)
                      ? "Not started yet"
                      : "Expired"}
                  </span>
                ) : campaign.expiryDate ? (
                  <span>
                    Active until:{" "}
                    {new Date(campaign.expiryDate).toLocaleDateString()}
                  </span>
                ) : (
                  <span>No expiry date set</span>
                )}
              </div>
              <button
                className={`banner-tab-toggle-btn ${
                  campaign.active ? "active" : ""
                } ${
                  !campaign.image ||
                  isCampaignExpired(campaign.expiryDate, campaign.startDate)
                    ? "disabled"
                    : ""
                }`}
                onClick={() => toggleCampaignActive(campaign.id)}
                disabled={
                  !campaign.image ||
                  isCampaignExpired(campaign.expiryDate, campaign.startDate)
                }
              >
                {campaign.active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Banner upload section */}
      <div className="banner-tab-section">
        <h3 className="banner-tab-heading">General Banner</h3>
        <div className="banner-tab-banner-section">
          <div className="banner-tab-image-container">
            {formData.banner ? (
              <div className="banner-tab-image-preview">
                <img
                  src={formData.banner}
                  alt="Banner"
                  className="banner-tab-image"
                />
                <button
                  className="banner-tab-remove-btn"
                  onClick={() => handleFormDataUpdate({ banner: null })}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ) : (
              <div
                className="banner-tab-upload-placeholder"
                onClick={() => document.getElementById("banner-upload").click()}
              >
                <span className="banner-tab-upload-icon">🖼️</span>
                <span>Upload General Banner</span>
              </div>
            )}
            <input
              id="banner-upload"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    handleFormDataUpdate({ banner: event.target.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTab;
