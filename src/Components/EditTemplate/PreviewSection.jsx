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
      
      {/* Display banners outside of signature-preview card without text labels */}
      {(getActiveCampaigns().length > 0 || formData.banner) && (
        <div className="banners-outside-preview" style={{ marginTop: "8px" }}>
          <div>
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
            {formData.banner && (
              <div>
                <img
                  src={formData.banner}
                  alt="Banner"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
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



// import React from "react";
// import Buttons from "./Tabs/Buttons";
// import SignatureLayout from "./SignatureLayouts/SignatureLayout";

// const PreviewSection = ({
//   formData,
//   selectedDesign,
//   designStyle,
//   getActiveCampaigns,
//   navigateToPreview,
//   handleSendData,
//   isSending,
//   isBulkApply = false,
// }) => {
  
//   // Check if HTML banner is expired or not yet started
//   const isHtmlBannerActive = () => {
//     const today = new Date();

//     // Check if banner has not started yet
//     if (formData.htmlBannerStartDate) {
//       const start = new Date(formData.htmlBannerStartDate);
//       if (today < start) return false; // Not yet started
//     }

//     // Check if banner has expired
//     if (formData.htmlBannerExpiryDate) {
//       const expiry = new Date(formData.htmlBannerExpiryDate);
//       if (today > expiry) return false; // Expired
//     }

//     return true; // Banner is active
//   };

//   // Check if we should show HTML banner
//   const shouldShowHtmlBanner = () => {
//     return formData.htmlBanner && isHtmlBannerActive();
//   };

//   return (
//     <div className="preview-section">
//       <h2 className="preview-title">Preview</h2>
//       <p className="preview-subtitle">
//         Here's how your signature will appear in emails
//       </p>
    
//       <SignatureLayout
//         formData={formData}
//         selectedDesign={selectedDesign}
//         designStyle={designStyle}
//       />
      
//       {/* Display banners outside of signature-preview card */}
//       {(getActiveCampaigns().length > 0 || formData.banner || shouldShowHtmlBanner()) && (
//         <div className="banners-outside-preview" style={{ marginTop: "8px" }}>
//           <div>
//             {getActiveCampaigns().map((campaign) => (
//               <div
//                 key={campaign.id}
//                 style={{ position: "relative", marginBottom: "10px" }}
//               >
//                 <img
//                   src={campaign.image}
//                   alt={campaign.name}
//                   style={{
//                     width: "83%",
//                     height: "auto",
//                     maxHeight: "100px",
//                     borderRadius: "4px",
//                   }}
//                 />
//                 {/* Clickable areas */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 >
//                   {campaign.links.map(
//                     (link, index) =>
//                       link.url && (
//                         <a
//                           key={index}
//                           href={link.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           title={link.text}
//                           style={{
//                             position: "absolute",
//                             left: `${link.area.x}%`,
//                             top: `${link.area.y}%`,
//                             width: `${link.area.width}%`,
//                             height: `${link.area.height}%`,
//                             display: "block",
//                             zIndex: 2,
//                             cursor: "pointer",
//                           }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             ))}
            
//             {formData.banner && (
//               <div>
//                 <img
//                   src={formData.banner}
//                   alt="Banner"
//                   style={{
//                     width: "100%",
//                     height: "auto",
//                     maxHeight: "100px",
//                     objectFit: "cover",
//                     borderRadius: "4px",
//                   }}
//                 />
//               </div>
//             )}
            
//             {shouldShowHtmlBanner() && (
//               <div style={{ margin: "10px 0" }}>
//                 {formData.htmlBannerLink?.url ? (
//                   <a
//                     href={formData.htmlBannerLink.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     title={formData.htmlBannerLink.text || 'Banner Link'}
//                     style={{ 
//                       textDecoration: "none",
//                       display: "block",
//                       cursor: "pointer"
//                     }}
//                   >
//                     <div 
//                       className="html-banner-preview"
//                       dangerouslySetInnerHTML={{ __html: formData.htmlBanner }}
//                       style={{
//                         width: "100%",
//                         padding: "12px",
//                         border: "1px solid #eee",
//                         borderRadius: "4px",
//                         transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.target.style.transform = "translateY(-1px)";
//                         e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = "translateY(0)";
//                         e.target.style.boxShadow = "none";
//                       }}
//                     />
//                   </a>
//                 ) : (
//                   <div 
//                     className="html-banner-preview"
//                     dangerouslySetInnerHTML={{ __html: formData.htmlBanner }}
//                     style={{
//                       width: "100%",
//                       padding: "12px",
//                       border: "1px solid #eee",
//                       borderRadius: "4px"
//                     }}
//                   />
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
      
//       {formData.disclaimer && (
//         <div
//           className="disclaimer-preview"
//           style={{
//             fontSize: "12px",
//             color: "#666",
//             borderRadius: "4px",
//           }}
//         >
//           <div dangerouslySetInnerHTML={{ __html: formData.disclaimer }} />
//         </div>
//       )}
      
//       {/* Only show preview button for individual signatures */}
//       {!isBulkApply && (
//         <div className="d-flex justify-content-end my-4">
//           <button
//             className="btn"
//             style={{ backgroundColor: "#4285F4", color: "white" }}
//             onClick={navigateToPreview}
//             type="button"
//           >
//             <i className="bi bi-check2-circle me-2"></i>
//             Preview
//           </button>
//         </div>
//       )}
      
//       {!isBulkApply && <Buttons />}
      
//       <div className="preview-actions">
//         <button
//           onClick={handleSendData}
//           className="send-data-button"
//           disabled={isSending}
//           style={{
//             backgroundColor: isBulkApply ? "#28a745" : "#007bff",
//             padding: "12px 24px",
//             fontSize: "16px",
//             fontWeight: "600",
//             border: "none",
//             borderRadius: "6px",
//             color: "white",
//             cursor: isSending ? "not-allowed" : "pointer",
//             opacity: isSending ? 0.7 : 1,
//             transition: "all 0.3s ease"
//           }}
//         >
//           {isSending 
//             ? (isBulkApply ? "Applying Template..." : "Applying...") 
//             : (isBulkApply ? "Apply Template to All Employees" : "Apply Signature")
//           }
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PreviewSection;