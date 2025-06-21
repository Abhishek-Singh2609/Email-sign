// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import "./BannerTab.css";

// const BannerTab = ({ formData, handleFormDataUpdate }) => {
//   const [showStandardBanners, setShowStandardBanners] = useState(false);

//   // Standard banner templates
//   const standardBanners = [
//     {
//       id: 'announcement',
//       name: 'Announcement Banner',
//       template: `
//         <div style="background: #f8f9fa; border-left: 4px solid #4285F4; padding: 12px; margin: 8px 0; border-radius: 4px;">
//           <div style="font-weight: bold; color: #4285F4; margin-bottom: 4px;">Announcement:</div>
//           <div>This is a test company-wide banner message for {companyName}.</div>
//         </div>
//       `,
//       defaultText: "This is a test company-wide banner message for {companyName}."
//     },
//     {
//       id: 'urgent',
//       name: 'Urgent Banner',
//       template: `
//         <div style="background: #fff3cd; border-left: 4px solid #dc3545; padding: 12px; margin: 8px 0; border-radius: 4px;">
//           <div style="font-weight: bold; color: #dc3545; margin-bottom: 4px;">URGENT:</div>
//           <div>This is a test high priority banner for {companyName}.</div>
//         </div>
//       `,
//       defaultText: "This is a test high priority banner for {companyName}."
//     }
//   ];

//   // Apply standard banner template
//   const applyStandardBanner = (template) => {
//     const bannerHtml = template.replace(/{companyName}/g, formData.companyName || 'Your Company');
//     handleFormDataUpdate({ 
//       banner: null, // Clear any image banner
//       htmlBanner: bannerHtml,
//       bannerType: 'html'
//     });
//     setShowStandardBanners(false);
//   };

//   // Handle HTML banner content change
//   const handleHtmlBannerChange = (editor) => {
//     handleFormDataUpdate({ htmlBanner: editor.getData() });
//   };

//   // Handle HTML banner link changes
//   const handleHtmlBannerLinkChange = (field, value) => {
//     const currentLink = formData.htmlBannerLink || { text: '', url: '' };
//     handleFormDataUpdate({ 
//       htmlBannerLink: { 
//         ...currentLink, 
//         [field]: value 
//       } 
//     });
//   };

//   // Handle HTML banner date changes
//   const handleHtmlBannerStartDateChange = (value) => {
//     handleFormDataUpdate({ htmlBannerStartDate: value });
//   };

//   const handleHtmlBannerExpiryDateChange = (value) => {
//     handleFormDataUpdate({ htmlBannerExpiryDate: value });
//   };

//   // Toggle between image and HTML banner
//   const setBannerType = (type) => {
//     handleFormDataUpdate({ bannerType: type });
//     if (type === 'image') {
//       handleFormDataUpdate({ htmlBanner: '' });
//     } else {
//       handleFormDataUpdate({ banner: null });
//     }
//   };

//   // Check if HTML banner is expired or not yet started
//   const isHtmlBannerExpired = () => {
//     const today = new Date();

//     // Check if banner has not started yet
//     if (formData.htmlBannerStartDate) {
//       const start = new Date(formData.htmlBannerStartDate);
//       if (today < start) return true; // Not yet started
//     }

//     // Check if banner has expired
//     if (formData.htmlBannerExpiryDate) {
//       const expiry = new Date(formData.htmlBannerExpiryDate);
//       if (today > expiry) return true; // Expired
//     }

//     return false; // Banner is active
//   };

//   // Campaign banner functions
//   const handleCampaignNameChange = (id, value) => {
//     const updatedCampaigns = formData.campaigns.map((campaign) =>
//       campaign.id === id ? { ...campaign, name: value } : campaign
//     );
//     handleFormDataUpdate({ campaigns: updatedCampaigns });
//   };

//   const handleCampaignImageUpload = (e, id) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const updatedCampaigns = formData.campaigns.map((campaign) =>
//           campaign.id === id
//             ? { ...campaign, image: event.target.result }
//             : campaign
//         );
//         handleFormDataUpdate({ campaigns: updatedCampaigns });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCampaignExpiryChange = (id, value) => {
//     const updatedCampaigns = formData.campaigns.map((campaign) =>
//       campaign.id === id ? { ...campaign, expiryDate: value } : campaign
//     );
//     handleFormDataUpdate({ campaigns: updatedCampaigns });
//   };

//   const handleCampaignStartDateChange = (id, value) => {
//     const updatedCampaigns = formData.campaigns.map((campaign) =>
//       campaign.id === id ? { ...campaign, startDate: value } : campaign
//     );
//     handleFormDataUpdate({ campaigns: updatedCampaigns });
//   };

//   const handleCampaignLinkChange = (campaignId, linkIndex, field, value) => {
//     const updatedCampaigns = formData.campaigns.map((campaign) => {
//       if (campaign.id === campaignId) {
//         const updatedLinks = [...campaign.links];
//         updatedLinks[linkIndex] = {
//           ...updatedLinks[linkIndex],
//           [field]: value,
//         };
//         return { ...campaign, links: updatedLinks };
//       }
//       return campaign;
//     });

//     handleFormDataUpdate({ campaigns: updatedCampaigns });
//   };

//   const removeCampaignImage = (id) => {
//     const updatedCampaigns = formData.campaigns.map((campaign) =>
//       campaign.id === id ? { ...campaign, image: null } : campaign
//     );
//     handleFormDataUpdate({ campaigns: updatedCampaigns });
//   };

//   const toggleCampaignActive = (id) => {
//     const campaign = formData.campaigns.find((c) => c.id === id);

//     if (
//       !campaign ||
//       !campaign.image ||
//       isCampaignExpired(campaign.expiryDate, campaign.startDate)
//     ) {
//       return;
//     }

//     const updatedCampaigns = formData.campaigns.map((c) =>
//       c.id === id ? { ...c, active: !c.active } : c
//     );

//     handleFormDataUpdate({ campaigns: updatedCampaigns });
//   };

//   // Check if campaign is expired or not yet started
//   const isCampaignExpired = (expiryDate, startDate) => {
//     const today = new Date();

//     // Check if campaign has not started yet
//     if (startDate) {
//       const start = new Date(startDate);
//       if (today < start) return true; // Not yet started
//     }

//     // Check if campaign has expired
//     if (expiryDate) {
//       const expiry = new Date(expiryDate);
//       if (today > expiry) return true; // Expired
//     }

//     return false; // Campaign is active
//   };

//   // Get active campaigns
//   const getActiveCampaigns = () => {
//     const activeCampaigns = formData.campaigns.filter(
//       (campaign) =>
//         campaign.active &&
//         campaign.image &&
//         !isCampaignExpired(campaign.expiryDate, campaign.startDate)
//     );
//     return activeCampaigns;
//   };

//   return (
//     <div className="banner-tab-form">
//       <div className="banner-tab-section">
//         <h3 className="banner-tab-heading">General Banner</h3> 
//         <div className="banner-type-selector">
          
//           <button
//             className="banner-type-btn"
//             onClick={() => setShowStandardBanners(!showStandardBanners)}
//           >
//             Standard Templates
//           </button>
//           <button
//             className={`banner-type-btn ${formData.bannerType === 'image' ? 'active' : ''}`}
//             onClick={() => setBannerType('image')}
//           >
//             Image Banner
//           </button>
//         </div>

//         {showStandardBanners && (
//           <div className="standard-banners-container">
//             <h4>Select a Standard Banner</h4>
//             <div className="standard-banners-grid">
//               {standardBanners.map((banner) => (
//                 <div 
//                   key={banner.id}
//                   className="standard-banner-preview"
//                   onClick={() => applyStandardBanner(banner.template)}
//                   dangerouslySetInnerHTML={{ 
//                     __html: banner.template.replace(/{companyName}/g, formData.companyName || 'Your Company')
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {formData.bannerType === 'image' ? (
//           <div className="banner-tab-banner-section">
//             <div className="banner-tab-image-container">
//               {formData.banner ? (
//                 <div className="banner-tab-image-preview">
//                   <img
//                     src={formData.banner}
//                     alt="Banner"
//                     className="banner-tab-image"
//                   />
//                   <button
//                     className="banner-tab-remove-btn"
//                     onClick={() => handleFormDataUpdate({ banner: null })}
//                   >
//                     <FaTimes size={12} />
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   className="banner-tab-upload-placeholder"
//                   onClick={() => document.getElementById("banner-upload").click()}
//                 >
//                   <span className="banner-tab-upload-icon">🖼️</span>
//                   <span>Upload General Banner</span>
//                 </div>
//               )}
//               <input
//                 id="banner-upload"
//                 type="file"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     const reader = new FileReader();
//                     reader.onload = (event) => {
//                       handleFormDataUpdate({ 
//                         banner: event.target.result,
//                         bannerType: 'image'
//                       });
//                     };
//                     reader.readAsDataURL(file);
//                   }
//                 }}
//                 accept="image/*"
//                 style={{ display: "none" }}
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="html-banner-editor">
//             <CKEditor
//               editor={ClassicEditor}
//               data={formData.htmlBanner || ''}
//               onChange={(event, editor) => {
//                 handleHtmlBannerChange(editor);
//               }}
//               config={{
//                 toolbar: [
//                   'heading', '|',
//                   'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
//                   'blockQuote', 'insertTable', '|',
//                   'undo', 'redo'
//                 ],
//                 placeholder: 'Enter your banner content here...'
//               }}
//             />
            
//             {/* HTML Banner Configuration Section */}
//             <div className="html-banner-config">
//               {/* Date Configuration */}
//               <div className="banner-tab-campaign-header" style={{ marginTop: "20px" }}>
//                 <div className="banner-tab-form-group">
//                   <label htmlFor="html-banner-start">Start Date</label>
//                   <input
//                     type="date"
//                     id="html-banner-start"
//                     value={formData.htmlBannerStartDate || ''}
//                     onChange={(e) => handleHtmlBannerStartDateChange(e.target.value)}
//                   />
//                 </div>

//                 <div className="banner-tab-form-group">
//                   <label htmlFor="html-banner-expiry">Expiry Date</label>
//                   <input
//                     type="date"
//                     id="html-banner-expiry"
//                     value={formData.htmlBannerExpiryDate || ''}
//                     onChange={(e) => handleHtmlBannerExpiryDateChange(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Link Configuration */}
//               <div className="banner-tab-links-section" style={{ marginTop: "15px" }}>
//                 <label className="banner-tab-links-header">
//                   Banner Link (Optional)
//                 </label>
                
//                 <div className="banner-tab-link-item">
//                   <div className="banner-tab-link-content">
//                     <div className="banner-tab-link-number link-1">
//                       1
//                     </div>
//                     <div className="banner-tab-link-text-input">
//                       <input
//                         type="text"
//                         placeholder="Link Text"
//                         value={formData.htmlBannerLink?.text || ''}
//                         onChange={(e) => handleHtmlBannerLinkChange('text', e.target.value)}
//                       />
//                     </div>
//                     <div className="banner-tab-link-url-input">
//                       <input
//                         type="url"
//                         placeholder="https://example.com"
//                         value={formData.htmlBannerLink?.url || ''}
//                         onChange={(e) => handleHtmlBannerLinkChange('url', e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div className="banner-tab-link-area-label">
//                     Entire banner area
//                   </div>
//                 </div>
//               </div>

//               {/* Banner Status */}
//               <div className="banner-tab-footer" style={{ marginTop: "15px" }}>
//                 <div className="banner-tab-status">
//                   {isHtmlBannerExpired() ? (
//                     <span className="banner-tab-status-expired">
//                       {formData.htmlBannerStartDate &&
//                       new Date() < new Date(formData.htmlBannerStartDate)
//                         ? "Not started yet"
//                         : "Expired"}
//                     </span>
//                   ) : formData.htmlBannerExpiryDate ? (
//                     <span>
//                       Active until:{" "}
//                       {new Date(formData.htmlBannerExpiryDate).toLocaleDateString()}
//                     </span>
//                   ) : (
//                     <span>No expiry date set</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="banner-tab-section">
//         <h3 className="banner-tab-heading">Campaign Banners</h3>

//         {formData.campaigns.map((campaign) => (
//           <div
//             key={campaign.id}
//             className={`banner-tab-campaign-item ${
//               campaign.active ? "active" : ""
//             }`}
//           >
//             <div className="banner-tab-campaign-header">
//               <div className="banner-tab-form-group">
//                 <label htmlFor={`campaign-name-${campaign.id}`}>
//                   Campaign Name
//                 </label>
//                 <input
//                   type="text"
//                   id={`campaign-name-${campaign.id}`}
//                   value={campaign.name}
//                   onChange={(e) =>
//                     handleCampaignNameChange(campaign.id, e.target.value)
//                   }
//                 />
//               </div>

//               <div className="banner-tab-form-group">
//                 <label htmlFor={`campaign-start-${campaign.id}`}>
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   id={`campaign-start-${campaign.id}`}
//                   value={campaign.startDate}
//                   onChange={(e) =>
//                     handleCampaignStartDateChange(campaign.id, e.target.value)
//                   }
//                 />
//               </div>

//               <div className="banner-tab-form-group">
//                 <label htmlFor={`campaign-expiry-${campaign.id}`}>
//                   Expiry Date
//                 </label>
//                 <input
//                   type="date"
//                   id={`campaign-expiry-${campaign.id}`}
//                   value={campaign.expiryDate}
//                   onChange={(e) =>
//                     handleCampaignExpiryChange(campaign.id, e.target.value)
//                   }
//                 />
//               </div>
//             </div>

//             <div className="banner-tab-image-section">
//               <div className="banner-tab-image-container">
//                 {campaign.image ? (
//                   <div className="banner-tab-image-preview">
//                     <img
//                       src={campaign.image}
//                       alt={`Campaign ${campaign.id}`}
//                       className="banner-tab-image"
//                     />
//                     <button
//                       className="banner-tab-remove-btn"
//                       onClick={() => removeCampaignImage(campaign.id)}
//                     >
//                       <FaTimes size={12} />
//                     </button>
//                   </div>
//                 ) : (
//                   <div
//                     className="banner-tab-upload-placeholder"
//                     onClick={() =>
//                       document
//                         .getElementById(`campaign-upload-${campaign.id}`)
//                         .click()
//                     }
//                   >
//                     <span className="banner-tab-upload-icon">🖼️</span>
//                     <span>Upload Campaign Banner</span>
//                   </div>
//                 )}
//                 <input
//                   id={`campaign-upload-${campaign.id}`}
//                   type="file"
//                   onChange={(e) => handleCampaignImageUpload(e, campaign.id)}
//                   accept="image/*"
//                   style={{ display: "none" }}
//                 />
//               </div>
//             </div>

//             <div className="banner-tab-links-section">
//               <label className="banner-tab-links-header">
//                 Banner Links (Clickable Areas)
//               </label>

//               {campaign.links.map((link, index) => (
//                 <div key={index} className="banner-tab-link-item">
//                   <div className="banner-tab-link-content">
//                     <div className={`banner-tab-link-number link-${index + 1}`}>
//                       {index + 1}
//                     </div>
//                     <div className="banner-tab-link-text-input">
//                       <input
//                         type="text"
//                         placeholder={`Link ${index + 1} Text`}
//                         value={link.text}
//                         onChange={(e) =>
//                           handleCampaignLinkChange(
//                             campaign.id,
//                             index,
//                             "text",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </div>
//                     <div className="banner-tab-link-url-input">
//                       <input
//                         type="url"
//                         placeholder="https://example.com"
//                         value={link.url}
//                         onChange={(e) =>
//                           handleCampaignLinkChange(
//                             campaign.id,
//                             index,
//                             "url",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="banner-tab-link-area-label">
//                     {index === 0
//                       ? "Left section"
//                       : index === 1
//                       ? "Middle section"
//                       : "Right section"}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="banner-tab-footer">
//               <div className="banner-tab-status">
//                 {isCampaignExpired(campaign.expiryDate, campaign.startDate) ? (
//                   <span className="banner-tab-status-expired">
//                     {campaign.startDate &&
//                     new Date() < new Date(campaign.startDate)
//                       ? "Not started yet"
//                       : "Expired"}
//                   </span>
//                 ) : campaign.expiryDate ? (
//                   <span>
//                     Active until:{" "}
//                     {new Date(campaign.expiryDate).toLocaleDateString()}
//                   </span>
//                 ) : (
//                   <span>No expiry date set</span>
//                 )}
//               </div>
//               <button
//                 className={`banner-tab-toggle-btn ${
//                   campaign.active ? "active" : ""
//                 } ${
//                   !campaign.image ||
//                   isCampaignExpired(campaign.expiryDate, campaign.startDate)
//                     ? "disabled"
//                     : ""
//                 }`}
//                 onClick={() => toggleCampaignActive(campaign.id)}
//                 disabled={
//                   !campaign.image ||
//                   isCampaignExpired(campaign.expiryDate, campaign.startDate)
//                 }
//               >
//                 {campaign.active ? "Deactivate" : "Activate"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BannerTab;


import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./BannerTab.css";

const BannerTab = ({ formData, handleFormDataUpdate }) => {
  // Standard banner templates
  const standardBanners = [
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

  // Initialize standardBanners in formData if not exists
  const initializeStandardBanners = () => {
    if (!formData.standardBanners) {
      const initialized = standardBanners.map(banner => ({
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
      handleFormDataUpdate({ standardBanners: initialized });
    }
  };

  // Handle selecting/deselecting a standard banner
  const handleStandardBannerSelect = (bannerId) => {
    initializeStandardBanners();
    
    const updatedBanners = (formData.standardBanners || []).map(banner => {
      if (banner.id === bannerId) {
        return { ...banner, selected: !banner.selected };
      }
      return banner;
    });
    
    handleFormDataUpdate({ 
      standardBanners: updatedBanners,
      bannerType: 'standard'
    });
  };

  // Handle standard banner content change
  const handleStandardBannerContentChange = (bannerId, editor) => {
    const updatedBanners = formData.standardBanners.map(banner => {
      if (banner.id === bannerId) {
        return { ...banner, content: editor.getData() };
      }
      return banner;
    });
    
    handleFormDataUpdate({ standardBanners: updatedBanners });
  };

  // Handle standard banner date changes
  const handleStandardBannerDateChange = (bannerId, field, value) => {
    const updatedBanners = formData.standardBanners.map(banner => {
      if (banner.id === bannerId) {
        const updatedBanner = { ...banner, [field]: value };
        
        // Auto-deactivate if dates are invalid after change
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
    const updatedBanners = formData.standardBanners.map(banner => {
      if (banner.id === bannerId) {
        return { 
          ...banner, 
          link: {
            ...banner.link,
            [field]: value
          }
        };
      }
      return banner;
    });
    
    handleFormDataUpdate({ standardBanners: updatedBanners });
  };

  // Handle standard banner activation
  const handleStandardBannerActivation = (bannerId) => {
    const updatedBanners = formData.standardBanners.map(banner => {
      if (banner.id === bannerId) {
        return { ...banner, active: !banner.active };
      }
      return banner;
    });
    
    handleFormDataUpdate({ standardBanners: updatedBanners });
  };

  // FIXED: Check if standard banner has valid date range
  const isStandardBannerDateValid = (banner) => {
    const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
    
    // Both start date and expiry date must be provided
    if (!banner.startDate || !banner.expiryDate) {
      return false;
    }
    
    // Start date must be <= today <= expiry date
    return banner.startDate <= today && today <= banner.expiryDate;
  };

  // FIXED: Check if standard banner is expired or not yet started
  const isStandardBannerExpired = (banner) => {
    return !isStandardBannerDateValid(banner);
  };

  // Get banner status message for standard banners
  const getStandardBannerStatusMessage = (banner) => {
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

  // Initialize standard banners on component mount
  React.useEffect(() => {
    initializeStandardBanners();
  }, []);

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
    const updatedCampaigns = formData.campaigns.map((campaign) => {
      if (campaign.id === id) {
        const updatedCampaign = { ...campaign, expiryDate: value };
        
        // Auto-deactivate if dates are invalid after change
        if (!isCampaignDateValid(updatedCampaign)) {
          updatedCampaign.active = false;
        }
        
        return updatedCampaign;
      }
      return campaign;
    });
    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  const handleCampaignStartDateChange = (id, value) => {
    const updatedCampaigns = formData.campaigns.map((campaign) => {
      if (campaign.id === id) {
        const updatedCampaign = { ...campaign, startDate: value };
        
        // Auto-deactivate if dates are invalid after change
        if (!isCampaignDateValid(updatedCampaign)) {
          updatedCampaign.active = false;
        }
        
        return updatedCampaign;
      }
      return campaign;
    });
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
      !isCampaignDateValid(campaign)
    ) {
      return;
    }

    const updatedCampaigns = formData.campaigns.map((c) =>
      c.id === id ? { ...c, active: !c.active } : c
    );

    handleFormDataUpdate({ campaigns: updatedCampaigns });
  };

  // FIXED: Check if campaign has valid date range
  const isCampaignDateValid = (campaign) => {
    const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
    
    // Both start date and expiry date must be provided
    if (!campaign.startDate || !campaign.expiryDate) {
      return false;
    }
    
    // Start date must be <= today <= expiry date
    return campaign.startDate <= today && today <= campaign.expiryDate;
  };

  // FIXED: Check if campaign is expired or not yet started
  const isCampaignExpired = (campaign) => {
    return !isCampaignDateValid(campaign);
  };

  // Get banner status message for campaigns
  const getCampaignStatusMessage = (campaign) => {
    const today = new Date().toISOString().split('T')[0];
    
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
      return { message: `Starts on: ${new Date(campaign.startDate).toLocaleDateString()}`, color: "#ffc107" };
    }
    
    if (today > campaign.expiryDate) {
      return { message: "Expired", color: "#dc3545" };
    }
    
    return { message: `Active until: ${new Date(campaign.expiryDate).toLocaleDateString()}`, color: "#28a745" };
  };

  // Get active campaigns
  const getActiveCampaigns = () => {
    const activeCampaigns = formData.campaigns.filter(
      (campaign) =>
        campaign.active &&
        campaign.image &&
        isCampaignDateValid(campaign)
    );
    return activeCampaigns;
  };

  return (
    <div className="banner-tab-form">
      <div className="banner-tab-section">
        <h3 className="banner-tab-heading">Standard Banner Templates</h3> 
        
        <div className="standard-banners-container">
          <h4>Select Standard Banners</h4>
          <div className="standard-banners-grid">
            {standardBanners.map((banner) => (
              <div 
                key={banner.id}
                className={`standard-banner-preview ${
                  formData.standardBanners?.find(b => b.id === banner.id)?.selected ? 'selected' : ''
                }`}
                onClick={() => handleStandardBannerSelect(banner.id)}
                style={{ 
                  cursor: 'pointer',
                  border: formData.standardBanners?.find(b => b.id === banner.id)?.selected 
                    ? '2px solid #4285F4' : '2px solid transparent',
                  borderRadius: '4px',
                  padding: '8px',
                  margin: '4px'
                }}
              >
                <div dangerouslySetInnerHTML={{ 
                  __html: banner.template.replace(/{companyName}/g, formData.companyName || 'Your Company')
                }} />
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '8px', 
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: formData.standardBanners?.find(b => b.id === banner.id)?.selected ? '#4285F4' : '#666'
                }}>
                  {formData.standardBanners?.find(b => b.id === banner.id)?.selected ? '✓ Selected' : 'Click to select'}
                </div>
              </div>
            ))}
          </div>

          {/* Show editors for selected banners */}
          {formData.standardBanners?.filter(b => b.selected).map((banner) => (
            <div key={banner.id} className="standard-banner-editor" style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
              <h5 style={{ marginBottom: '16px', color: '#4285F4' }}>{banner.name}</h5>
              
              <CKEditor
                editor={ClassicEditor}
                data={banner.content || ''}
                onChange={(event, editor) => {
                  handleStandardBannerContentChange(banner.id, editor);
                }}
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

              {/* Banner Link Section */}
              <div className="banner-tab-links-section" style={{ marginTop: '20px' }}>
                <label className="banner-tab-links-header" style={{ 
                  display: 'block', 
                  marginBottom: '12px', 
                  fontWeight: 'bold', 
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Banner Links (Clickable Areas)
                </label>
                
                <div className="banner-tab-link-item" style={{ marginBottom: '15px' }}>
                  <div className="banner-tab-link-content" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <div className="banner-tab-link-number" style={{ 
                      width: '30px', 
                      height: '30px', 
                      borderRadius: '50%', 
                      backgroundColor: '#4285F4', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 'bold',
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      1
                    </div>
                    
                    <div className="banner-tab-link-text-input" style={{ flex: '1' }}>
                      <input
                        type="text"
                        placeholder="Link Text (e.g., Learn More)"
                        value={banner.link?.text || ''}
                        onChange={(e) => handleStandardBannerLinkChange(banner.id, 'text', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    
                    <div className="banner-tab-link-url-input" style={{ flex: '1.5' }}>
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={banner.link?.url || ''}
                        onChange={(e) => handleStandardBannerLinkChange(banner.id, 'url', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="banner-tab-link-area-label" style={{ 
                    marginLeft: '42px', // Align with text input
                    fontSize: '12px', 
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    This link will make the entire banner clickable
                  </div>
                </div>
              </div>

              {/* Date Configuration */}
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
                    onChange={(e) => handleStandardBannerDateChange(banner.id, 'startDate', e.target.value)}
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
                    onChange={(e) => handleStandardBannerDateChange(banner.id, 'expiryDate', e.target.value)}
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

              {/* Banner Status and Activation */}
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
                  onClick={() => handleStandardBannerActivation(banner.id)}
                  disabled={!isStandardBannerDateValid(banner)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: banner.active ? '#dc3545' : '#28a745',
                    color: 'white',
                    cursor: !isStandardBannerDateValid(banner) ? 'not-allowed' : 'pointer',
                    opacity: !isStandardBannerDateValid(banner) ? 0.5 : 1
                  }}
                >
                  {banner.active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                    <span style={{ color: status.color, fontWeight: 'bold' }}>
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
                disabled={
                  !campaign.image || !isCampaignDateValid(campaign)
                }
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