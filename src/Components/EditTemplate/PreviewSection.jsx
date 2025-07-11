import React from "react";
import Buttons from "./Tabs/Buttons";
import SignatureLayout from "./SignatureLayouts/SignatureLayout";
import { 
  isStandardBannerDateValid,
  getStandardBannerStatusMessage 
} from "./Tabs/StandardBanner";

const PreviewSection = ({
  formData,
  selectedDesign,
  designStyle,
  getActiveCampaigns,
  navigateToPreview,
  handleSendData,
  isSending,
  isBulkApply = false,
}) => {
  // Check if standard banner is active using shared validation
  const isStandardBannerActive = (banner) => {
    return banner.active && isStandardBannerDateValid(banner);
  };

  // Get all active standard banners
  const getActiveStandardBanners = () => {
    if (!formData.standardBanners) return [];
    return formData.standardBanners.filter(isStandardBannerActive);
  };

  // Check if we should show standard banners
  const shouldShowStandardBanners = () => {
    return getActiveStandardBanners().length > 0;
  };

  // Check if any banners should be shown
  const shouldShowBanners = () => {
    return getActiveCampaigns().length > 0 || shouldShowStandardBanners();
  };

//   // Generate complete styled HTML for standard banners with links
  const generateStandardBannerHTML = (banner) => {
    const cleanContent = banner.content.replace(/<[^>]*>/g, '').replace(/Announcement:|URGENT:/g, '').trim();
    const linkHTML = (banner.link?.text && banner.link?.url) 
      ? `<a href="${banner.link.url}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; display: block; width: 100%; height: 100%;">` 
      : '';
    const linkCloseHTML = (banner.link?.text && banner.link?.url) ? '</a>' : '';
    
    if (banner.id === 'announcement') {
      return `<div style="background: #f8f9fa; border-left: 4px solid #4285F4; padding: 12px; margin: 8px 0; border-radius: 4px; font-family: Arial, sans-serif; ${(banner.link?.text && banner.link?.url) ? 'cursor: pointer;' : ''}">
  ${linkHTML}
  <div style="font-weight: bold; color: #4285F4; margin-bottom: 4px;">Announcement:</div>
  <div style="color: #333; line-height: 1.4;">${cleanContent}</div>
  ${linkCloseHTML}
</div>`;
    } else if (banner.id === 'urgent') {
      return `<div style="background: #fff3cd; border-left: 4px solid #dc3545; padding: 12px; margin: 8px 0; border-radius: 4px; font-family: Arial, sans-serif; ${(banner.link?.text && banner.link?.url) ? 'cursor: pointer;' : ''}">
  ${linkHTML}
  <div style="font-weight: bold; color: #dc3545; margin-bottom: 4px;">URGENT:</div>
  <div style="color: #333; line-height: 1.4;">${cleanContent}</div>
  ${linkCloseHTML}
</div>`;
    }
    return banner.content;
  };

  return (
    <div className="preview-section">
      <h2 className="preview-title">Preview</h2>
      <p className="preview-subtitle">
        Here's how your signature will appear in emails
      </p>
    
      <SignatureLayout
        formData={formData}
        selectedDesign={selectedDesign}
        designStyle={designStyle}
      />
      
      {/* Display banners outside of signature-preview card */}
      {shouldShowBanners() && (
        <div className="banners-outside-preview" style={{ marginTop: "8px" }}>
          <div>
            {/* Campaign Banners */}
            {getActiveCampaigns().map((campaign) => (
              <div
                key={campaign.id}
                style={{ position: "relative", marginBottom: "10px" }}
              >
                <img
                  src={campaign.image}
                  alt={campaign.name}
                  style={{
                    width: "83%",
                    height: "auto",
                    maxHeight: "100px",
                    borderRadius: "4px",
                  }}
                />
                {/* Clickable areas */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {campaign.links.map(
                    (link, index) =>
                      link.url && (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={link.text}
                          style={{
                            position: "absolute",
                            left: `${link.area.x}%`,
                            top: `${link.area.y}%`,
                            width: `${link.area.width}%`,
                            height: `${link.area.height}%`,
                            display: "block",
                            zIndex: 2,
                            cursor: "pointer",
                          }}
                        />
                      )
                  )}
                </div>
              </div>
            ))}

            {/* Standard Banners */}
            {shouldShowStandardBanners() && (
              <div style={{ margin: "10px 0", width: "83%" }}>
                {getActiveStandardBanners().map((banner) => (
                  <div 
                    key={banner.id}
                    dangerouslySetInnerHTML={{ __html: generateStandardBannerHTML(banner) }}
                    onClick={() => {
                      if (banner.link?.text && banner.link?.url) {
                        window.open(banner.link.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    style={{
                      marginBottom: "8px",
                      cursor: (banner.link?.text && banner.link?.url) ? "pointer" : "default"
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {formData.disclaimer && (
        <div
          className="disclaimer-preview"
          style={{
            fontSize: "12px",
            color: "#666",
            borderRadius: "4px",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: formData.disclaimer }} />
        </div>
      )}
      
      {/* Only show preview button for individual signatures */}
      {!isBulkApply && (
        <div className="d-flex justify-content-end my-4">
          <button
            className="btn"
            style={{ backgroundColor: "#4285F4", color: "white" }}
            onClick={navigateToPreview}
            type="button"
          >
            <i className="bi bi-check2-circle me-2"></i>
            Preview
          </button>
        </div>
      )}
      
      {!isBulkApply && <Buttons />}
      
      <div className="preview-actions">
        <button
          onClick={handleSendData}
          className="send-data-button"
          disabled={isSending}
          style={{
            backgroundColor: isBulkApply ? "#28a745" : "#007bff",
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: isSending ? "not-allowed" : "pointer",
            opacity: isSending ? 0.7 : 1,
            transition: "all 0.3s ease"
          }}
        >
          {isSending 
            ? (isBulkApply ? "Applying Template..." : "Applying...") 
            : (isBulkApply ? "Apply Template to All Employees" : "Apply Signature")
          }
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;