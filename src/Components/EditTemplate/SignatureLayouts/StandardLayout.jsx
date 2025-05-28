import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const StandardLayout = ({ formData, designStyle, selectedDesign }) => {
  return (
    <>
      <div
        className="signature-preview standard-layout"
        style={{
          backgroundColor: designStyle.backgroundColor,
          color: designStyle.textColor,
          boxShadow: designStyle.boxShadow,
          background: designStyle.gradient || designStyle.backgroundColor,
        }}
      >
        <div className="standard-header">
          {formData.profileImage ? (
            <div className="standard-with-image">
              <div className="profile-image-container">
                <img
                  src={formData.profileImage || "/placeholder.svg"}
                  alt={formData.name}
                  className="profile-image"
                />
              </div>
              {formData.logo && (
                <div className="logo-container" style={{ marginTop: "10px" }}>
                  <img
                    src={formData.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "50px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              <div>
                <h3
                  className="preview-name"
                  style={{ color: designStyle.nameColor }}
                >
                  {formData.name}
                </h3>
                <p className="preview-job">
                  {formData.jobTitle} {formData.company}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h3
                className="preview-name"
                style={{ color: designStyle.nameColor }}
              >
                {formData.name}
              </h3>
              <p className="preview-job">
                {formData.jobTitle}
                {formData.company}
              </p>
            </div>
          )}
        </div>
        <div
          className="preview-divider"
          style={{
            backgroundColor:
              selectedDesign === "minimal"
                ? designStyle.accentColor
                : "#e6e6e6",
          }}
        ></div>
        <div className="preview-contact">
          <div className="contact-left">
            <p className="contact-item">
              <span
                className="contact-icon"
                style={{ color: designStyle.accentColor }}
              >
                📞
              </span>{" "}
              {formData.phone}
            </p>
            {formData.mobilePhone && (
              <p className="contact-item">
                <span
                  className="contact-icon"
                  style={{ color: designStyle.accentColor }}
                >
                  📱
                </span>{" "}
                {formData.mobilePhone}
              </p>
            )}
            <p className="contact-item">
              <span
                className="contact-icon"
                style={{ color: designStyle.accentColor }}
              >
                ✉️
              </span>{" "}
              {formData.email}
            </p>
            {formData.website && (
              <p className="contact-item">
                <span
                  className="contact-icon"
                  style={{ color: designStyle.accentColor }}
                >
                  🌐
                </span>{" "}
                {formData.website}
              </p>
            )}
            {formData.location && (
              <p className="contact-item">
                <span
                  className="contact-icon"
                  style={{ color: designStyle.accentColor }}
                >
                  📍
                </span>{" "}
                {formData.location}
              </p>
            )}
          </div>
          <div className="contact-right">{renderSocialIcons(formData)}</div>
        </div>
      </div>
    </>
  );
};

export default StandardLayout;

// import React from "react";
// import { renderSocialIcons } from "../Tabs/SocialTab";

// const BannerLayout = ({ formData, designStyle, selectedDesign }) => {
//   return (
//     <div
//       className="signature-preview banner-layout"
//       style={{
//         backgroundColor: designStyle.backgroundColor,
//         color: designStyle.textColor,
//         boxShadow: designStyle.boxShadow,
//         background: designStyle.gradient || designStyle.backgroundColor,
//         fontFamily: "Arial, sans-serif",
//         maxWidth: "600px",
//       }}
//     >
//       {/* Logo at the top */}
//       {formData.logo && (
//         <div className="logo-container" style={{ marginBottom: "15px" }}>
//           <img
//             src={formData.logo || "/placeholder.svg"}
//             alt="Company Logo"
//             style={{
//               maxWidth: "150px",
//               maxHeight: "60px",
//               objectFit: "contain",
//             }}
//           />
//         </div>
//       )}

//       {/* Name and Title */}
//       <div className="banner-header" style={{ marginBottom: "10px" }}>
//         <h3
//           className="preview-name"
//           style={{
//             color: designStyle.nameColor,
//             margin: "0 0 5px 0",
//             fontSize: "18px",
//             fontWeight: "bold",
//           }}
//         >
//           {formData.name}
//         </h3>
//         <p
//           className="preview-job"
//           style={{
//             margin: "0",
//             fontSize: "14px",
//             color: designStyle.textColor,
//           }}
//         >
//           {formData.jobTitle}
//         </p>
//       </div>

//       {/* Contact Information */}
//       <div
//         className="preview-contact"
//         style={{
//           fontSize: "12px",
//           lineHeight: "1.5",
//           marginBottom: "15px",
//         }}
//       >
//         <p style={{ margin: "3px 0" }}>
//           <span style={{ color: designStyle.accentColor, marginRight: "5px" }}>
//             📱
//           </span>
//           {formData.mobilePhone}
//           {formData.phone && (
//             <>
//               <span style={{ margin: "0 5px" }}>|</span>
//               <span
//                 style={{ color: designStyle.accentColor, marginRight: "5px" }}
//               >
//                 📞
//               </span>
//               {formData.phone}
//             </>
//           )}
//         </p>
//         {formData.location && (
//           <p style={{ margin: "3px 0" }}>
//             <span
//               style={{ color: designStyle.accentColor, marginRight: "5px" }}
//             >
//               📍
//             </span>
//             {formData.location}
//           </p>
//         )}
//         <p style={{ margin: "3px 0" }}>
//           <span style={{ color: designStyle.accentColor, marginRight: "5px" }}>
//             ✉️
//           </span>
//           {formData.email}
//         </p>
//       </div>

//       {/* Banner Section */}
//       <div
//         className="banner-section"
//         style={{
//           backgroundColor: designStyle.accentColor,
//           color: "#ffffff",
//           padding: "10px",
//           textAlign: "center",
//           margin: "15px 0",
//           fontWeight: "bold",
//         }}
//       >
//         {formData.bannerText || "LEARN MORE"}
//       </div>

//       {/* Social Icons */}
//       <div
//         className="social-icons-container"
//         style={{ margin: "10px 0", textAlign: "center" }}
//       >
//         {renderSocialIcons(formData)}
//       </div>

//       {/* Disclaimer */}
//       <div
//         className="disclaimer"
//         style={{
//           fontSize: "10px",
//           color: "#666666",
//           borderTop: `1px solid ${designStyle.accentColor}`,
//           paddingTop: "10px",
//           marginTop: "15px",
//         }}
//       >
//         {formData.disclaimer ||
//           "This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify us immediately and delete the message from your system."}
//       </div>
//     </div>
//   );
// };

// export default BannerLayout;
