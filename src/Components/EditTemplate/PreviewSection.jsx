import React from "react";
import Buttons from "./Tabs/Buttons";
import SignatureLayout from "./SignatureLayouts/SignatureLayout";

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
  
  // FIXED: Check if standard banner is active with proper date logic
  const isStandardBannerActive = (banner) => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format

    // Check if banner has not started yet
    if (banner.startDate) {
      if (todayString < banner.startDate) {
        return false; // Not yet started
      }
    }

    // Check if banner has expired
    if (banner.expiryDate) {
      if (todayString > banner.expiryDate) {
        return false; // Expired
      }
    }

    return banner.active; // Banner is active if enabled and within date range
  };

  // Get active standard banners
  const getActiveStandardBanners = () => {
    if (!formData.standardBanners) return [];
    return formData.standardBanners.filter(banner => 
      banner.selected && isStandardBannerActive(banner)
    );
  };

  // Check if we should show standard banners
  const shouldShowStandardBanners = () => {
    return getActiveStandardBanners().length > 0;
  };

  // Check if any banners should be shown
  const shouldShowBanners = () => {
    return getActiveCampaigns().length > 0 || shouldShowStandardBanners();
  };

  // FIXED: Generate complete styled HTML for standard banners with links
  const generateStandardBannerHTML = (banner) => {
    // Extract clean text content from banner
    const cleanContent = banner.content.replace(/<[^>]*>/g, '').replace(/Announcement:|URGENT:/g, '').trim();
    
    // Generate link HTML if both text and URL are provided
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
    } else {
      // For custom banners, wrap with link if provided
      if (banner.link?.text && banner.link?.url) {
        return `<a href="${banner.link.url}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; display: block; cursor: pointer;">${banner.content}</a>`;
      }
      return banner.content;
    }
  };

  // Apply standard banners to organization
  const handleApplyStandardBanners = async () => {
    const activeStandardBanners = getActiveStandardBanners();
    
    if (activeStandardBanners.length === 0) {
      alert('No active standard banners to apply.');
      return;
    }

    try {
      const organization = formData.companyName?.trim() 
        ? formData.companyName.toLowerCase().replace(/\s+/g, '') + '.com'
        : 'agileworldtechnologies.com';
      
      for (const banner of activeStandardBanners) {
        // Map banner types to API banner names
        const bannerNameMap = {
          'announcement': 'AnnouncementBanner',
          'urgent': 'ListPriorityBanner'
        };

        const bannerName = bannerNameMap[banner.id] || 'CustomBanner';
        
        // Generate complete styled HTML content for API with links
        const htmlContent = generateStandardBannerHTML(banner);

        const requestData = {
          action: "add",
          organization: organization,
          bannerName: bannerName,
          html: htmlContent
        };

        console.log('Applying banner:', requestData);

        const response = await fetch('https://email-signature-function-app.azurewebsites.net/api/RemoveBanner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error(`Failed to apply ${banner.name}: ${response.statusText}`);
        }

        const result = await response.text();
        console.log(`${banner.name} applied successfully:`, result);
      }

      alert(`Successfully applied ${activeStandardBanners.length} standard banner(s) to ${organization}`);
      
    } catch (error) {
      console.error('Error applying standard banners:', error);
      alert(`Error applying standard banners: ${error.message}`);
    }
  };

  // Remove standard banners from organization
  const handleRemoveStandardBanners = async () => {
    try {
      const organization = formData.companyName?.trim() 
        ? formData.companyName.toLowerCase().replace(/\s+/g, '') + '.com'
        : 'agileworldtechnologies.com';
      
      // Remove both types of standard banners
      const bannerTypes = ['AnnouncementBanner', 'ListPriorityBanner'];
      
      for (const bannerName of bannerTypes) {
        const requestData = {
          action: "remove",
          organization: organization,
          bannerName: bannerName,
          html: ""
        };

        console.log('Removing banner:', requestData);

        const response = await fetch('https://email-signature-function-app.azurewebsites.net/api/RemoveBanner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          console.warn(`Failed to remove ${bannerName}: ${response.statusText}`);
        } else {
          const result = await response.text();
          console.log(`${bannerName} removed successfully:`, result);
        }
      }

      alert(`Standard banners removal attempted for ${organization}`);
      
    } catch (error) {
      console.error('Error removing standard banners:', error);
      alert(`Error removing standard banners: ${error.message}`);
    }
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

            {/* Standard Banners with clickable links (no visual indicators in preview) */}
            {shouldShowStandardBanners() && (
              <div style={{ margin: "10px 0" }}>
                {getActiveStandardBanners().map((banner) => (
                  <div 
                    key={banner.id}
                    className="standard-banner-preview"
                    style={{
                      width: "83%",
                      marginBottom: "8px"
                    }}
                  >
                    {banner.id === 'announcement' ? (
                      <div style={{
                        background: "#f8f9fa", 
                        borderLeft: "4px solid #4285F4", 
                        padding: "12px", 
                        margin: "8px 0", 
                        borderRadius: "4px",
                        cursor: (banner.link?.text && banner.link?.url) ? "pointer" : "default"
                      }}
                      onClick={() => {
                        if (banner.link?.text && banner.link?.url) {
                          window.open(banner.link.url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      >
                        <div style={{
                          fontWeight: "bold", 
                          color: "#4285F4", 
                          marginBottom: "4px"
                        }}>
                          Announcement:
                        </div>
                        <div dangerouslySetInnerHTML={{ 
                          __html: banner.content.replace(/<[^>]*>/g, '').replace(/Announcement:/g, '').trim() 
                        }} />
                      </div>
                    ) : banner.id === 'urgent' ? (
                      <div style={{
                        background: "#fff3cd", 
                        borderLeft: "4px solid #dc3545", 
                        padding: "12px", 
                        margin: "8px 0", 
                        borderRadius: "4px",
                        cursor: (banner.link?.text && banner.link?.url) ? "pointer" : "default"
                      }}
                      onClick={() => {
                        if (banner.link?.text && banner.link?.url) {
                          window.open(banner.link.url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      >
                        <div style={{
                          fontWeight: "bold", 
                          color: "#dc3545", 
                          marginBottom: "4px"
                        }}>
                          URGENT:
                        </div>
                        <div dangerouslySetInnerHTML={{ 
                          __html: banner.content.replace(/<[^>]*>/g, '').replace(/URGENT:/g, '').trim() 
                        }} />
                      </div>
                    ) : (
                      <div 
                        style={{
                          cursor: (banner.link?.text && banner.link?.url) ? "pointer" : "default"
                        }}
                        onClick={() => {
                          if (banner.link?.text && banner.link?.url) {
                            window.open(banner.link.url, '_blank', 'noopener,noreferrer');
                          }
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: banner.content }} />
                      </div>
                    )}
                  </div>
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
      
      {/* Standard Banner Actions */}
      {shouldShowStandardBanners() && (
        <div className="standard-banner-actions" style={{ margin: "20px 0" }}>
          <div style={{ 
            display: "flex", 
            gap: "12px", 
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button
              onClick={handleApplyStandardBanners}
              className="apply-banner-button"
              style={{
                backgroundColor: "#28a745",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease"
              }}
            >
              <i className="bi bi-cloud-upload"></i>
              Apply Standard Banners to Organization
            </button>
            
            <button
              onClick={handleRemoveStandardBanners}
              className="remove-banner-button"
              style={{
                backgroundColor: "#dc3545",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease"
              }}
            >
              <i className="bi bi-trash"></i>
              Remove Standard Banners
            </button> 
          </div>
          
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