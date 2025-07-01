import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Standard banner templates configuration
export const standardBannerTemplates = [
  {
    id: 'announcement',
    name: 'Announcement Banner',
    template: `
      <div style="background: #f8f9fa; border-left: 4px solid #4285F4; padding: 12px; margin: 8px 0; border-radius: 4px;">
        <div style="font-weight: bold; color: #4285F4; margin-bottom: 4px;">Announcement:</div>
        <div>This is a test company-wide banner message for {companyName}.</div>
      </div>
    `,
    defaultText: "This is a test company-wide banner message for {companyName}."
  },
  {
    id: 'urgent',
    name: 'Urgent Banner',
    template: `
      <div style="background: #fff3cd; border-left: 4px solid #dc3545; padding: 12px; margin: 8px 0; border-radius: 4px;">
        <div style="font-weight: bold; color: #dc3545; margin-bottom: 4px;">URGENT:</div>
        <div>This is a test high priority banner for {companyName}.</div>
      </div>
    `,
    defaultText: "This is a test high priority banner for {companyName}."
  }
];

// Helper functions
export const initializeStandardBanners = (formData) => {
  return standardBannerTemplates.map(banner => ({
    id: banner.id,
    name: banner.name,
    content: banner.template.replace(/{companyName}/g, formData.companyName || 'Your Company'),
    startDate: '',
    expiryDate: '',
    active: false,
    selected: false,
    link: {
      text: '',
      url: ''
    }
  }));
};

export const isStandardBannerDateValid = (banner) => {
  const today = new Date().toISOString().split('T')[0];
  if (!banner.startDate || !banner.expiryDate) return false;
  return banner.startDate <= today && today <= banner.expiryDate;
};

export const getStandardBannerStatusMessage = (banner) => {
  const today = new Date().toISOString().split('T')[0];
  
  if (!banner.startDate && !banner.expiryDate) {
    return { message: "No dates set", color: "#666" };
  }
  
  if (!banner.startDate) {
    return { message: "Start date required", color: "#dc3545" };
  }
  
  if (!banner.expiryDate) {
    return { message: "Expiry date required", color: "#dc3545" };
  }
  
  if (today < banner.startDate) {
    return { message: `Starts on: ${new Date(banner.startDate).toLocaleDateString()}`, color: "#ffc107" };
  }
  
  if (today > banner.expiryDate) {
    return { message: "Expired", color: "#dc3545" };
  }
  
  return { message: `Active until: ${new Date(banner.expiryDate).toLocaleDateString()}`, color: "#28a745" };
};

// Preview Component
const StandardBannerPreview = ({ banner, companyName, isSelected, onClick }) => {
  return (
    <div 
      className={`standard-banner-preview ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      style={{ 
        cursor: 'pointer',
        border: isSelected ? '2px solid #4285F4' : '2px solid transparent',
        borderRadius: '4px',
        padding: '8px',
        margin: '4px',
        transition: 'border 0.2s ease'
      }}
    >
      <div dangerouslySetInnerHTML={{ 
        __html: banner.template.replace(/{companyName}/g, companyName || 'Your Company')
      }} />
      <div style={{ 
        textAlign: 'center', 
        marginTop: '8px', 
        fontSize: '12px',
        fontWeight: 'bold',
        color: isSelected ? '#4285F4' : '#666'
      }}>
        {isSelected ? '✓ Selected' : 'Click to select'}
      </div>
    </div>
  );
};

// Main StandardBanner Component
const StandardBanner = ({ 
  banner, 
  companyName,
  formData,
  isPreview = false,
  isSelected = false,
  onSelect, 
  onContentChange,
  onDateChange,
  onLinkChange,
  onActivation
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

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

  const prepareStandardBannerData = (banner) => {
    const bannerTypeMap = {
      'announcement': 'announcement',
      'urgent': 'urgent'
    };

    return {
      organization_name: formData.companyName || "Agile World Technologies LLC",
      banner_index: standardBannerTemplates.findIndex(t => t.id === banner.id) + 1,
      banner_priority: 10,
      banner_name: banner.name,
      banner_image_url: "",
      banner_type: bannerTypeMap[banner.id] || "standard",
      banner_link: banner.link?.url ? [banner.link.url] : [],
      start_time: banner.startDate ? `${banner.startDate}T00:00:00Z` : "",
      end_time: banner.expiryDate ? `${banner.expiryDate}T23:59:59Z` : ""
    };
  };

  const handleActivation = async (banner) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    const newActiveState = !banner.active;
    
    try {
      const organization = formData.companyName?.trim() 
        ? formData.companyName.toLowerCase().replace(/\s+/g, '') + '.com'
        : 'agileworldtechnologies.com';

      const bannerNameMap = {
        'announcement': 'AnnouncementBanner',
        'urgent': 'ListPriorityBanner'
      };
      
      const bannerName = bannerNameMap[banner.id] || 'CustomBanner';
      const htmlContent = generateStandardBannerHTML(banner);
      const bannerData = prepareStandardBannerData(banner);

      // Call both APIs in parallel
      const [existingApiResponse, newApiResponse] = await Promise.all([
        // Existing API call
        fetch('https://email-signature-function-app.azurewebsites.net/api/RemoveBanner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: newActiveState ? "add" : "remove",
            organization: organization,
            bannerName: bannerName,
            html: newActiveState ? htmlContent : null
          })
        }),
        
        // New API call
        fetch('https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/api/banners', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': 'ARRAffinity=d8e9b80b64bf4b8d6f35de201a95cef0d730cbf1e6617cf235119fd987f06b94; ARRAffinitySameSite=d8e9b80b64bf4b8d6f35de201a95cef0d730cbf1e6617cf235119fd987f06b94'
          },
         body: JSON.stringify({
  ...bannerData,
  api_payload: htmlContent
})
        })
      ]);

      if (!existingApiResponse.ok || !newApiResponse.ok) {
        throw new Error(`Failed to ${newActiveState ? 'apply' : 'remove'} banner`);
      }

      onActivation(banner.id);
      alert(`Banner ${newActiveState ? 'applied to' : 'removed from'} ${organization}`);
    } catch (error) {
      console.error('Error updating banner:', error);
      alert(`Error updating banner: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isPreview) {
    return (
      <StandardBannerPreview
        banner={banner}
        companyName={companyName}
        isSelected={isSelected}
        onClick={() => onSelect(banner.id)}
      />
    );
  }

  return (
    <div className="standard-banner-editor" style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
      <h5 style={{ marginBottom: '16px', color: '#4285F4' }}>{banner.name}</h5>
      
      <CKEditor
        editor={ClassicEditor}
        data={banner.content || ''}
        onChange={(event, editor) => onContentChange(banner.id, editor)}
        config={{
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
            'blockQuote', 'insertTable', '|',
            'undo', 'redo'
          ],
          placeholder: `Enter content for ${banner.name}...`
        }}
      />

      <div className="banner-tab-links-section" style={{ marginTop: '20px' }}>
        <label className="banner-tab-links-header" style={{ 
          display: 'block', 
          marginBottom: '12px', 
          fontWeight: 'bold', 
          color: '#333',
          fontSize: '14px'
        }}>
          Banner Links
        </label>
        
        <div className="banner-tab-link-item" style={{ marginBottom: '15px' }}>
          <div className="banner-tab-link-content" style={{ 
            display: 'flex', 
            alignItems: 'center', 
          }}>
            <div className="banner-tab-link-number link-1" >
              1
            </div>
            
            <div className="banner-tab-link-text-input" style={{ flex: '1', marginRight: '10px' }}>
              <input
                type="text"
                placeholder="Link Text"
                value={banner.link?.text || ''}
                onChange={(e) => onLinkChange(banner.id, 'text', e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              />
            </div>
            
            <div className="banner-tab-link-url-input" style={{ flex: '2' }}>
              <input
                type="url"
                placeholder="https://example.com"
                value={banner.link?.url || ''}
                onChange={(e) => onLinkChange(banner.id, 'url', e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="banner-tab-campaign-header" style={{ 
        marginTop: "20px",
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <div className="banner-tab-form-group" style={{ flex: '1', minWidth: '200px' }}>
          <label htmlFor={`standard-banner-start-${banner.id}`} style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Start Date *
          </label>
          <input
            type="date"
            id={`standard-banner-start-${banner.id}`}
            value={banner.startDate || ''}
            onChange={(e) => onDateChange(banner.id, 'startDate', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            required
          />
        </div>

        <div className="banner-tab-form-group" style={{ flex: '1', minWidth: '200px' }}>
          <label htmlFor={`standard-banner-expiry-${banner.id}`} style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Expiry Date *
          </label>
          <input
            type="date"
            id={`standard-banner-expiry-${banner.id}`}
            value={banner.expiryDate || ''}
            onChange={(e) => onDateChange(banner.id, 'expiryDate', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            required
          />
        </div>
      </div>

      <div className="banner-tab-footer" style={{ 
        marginTop: "15px", 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div className="banner-tab-status">
          {(() => {
            const status = getStandardBannerStatusMessage(banner);
            return (
              <span style={{ color: status.color }}>
                {status.message}
              </span>
            );
          })()}
        </div>
        
        <button
          className={`banner-tab-toggle-btn ${banner.active ? "active" : ""} ${
            !isStandardBannerDateValid(banner) ? "disabled" : ""
          }`}
          onClick={() => handleActivation(banner)}
          disabled={!isStandardBannerDateValid(banner) || isProcessing}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: banner.active ? '#dc3545' : '#28a745',
            color: 'white',
            cursor: (!isStandardBannerDateValid(banner) || isProcessing) ? 'not-allowed' : 'pointer',
            opacity: (!isStandardBannerDateValid(banner) || isProcessing) ? 0.7 : 1,
          }}
        >
          {isProcessing ? (
            <span>{banner.active ? "Removing..." : "Applying..."}</span>
          ) : (
            <span>{banner.active ? "Deactivate" : "Activate"}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default StandardBanner;