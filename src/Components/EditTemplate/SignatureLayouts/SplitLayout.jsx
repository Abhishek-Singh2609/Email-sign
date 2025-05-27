import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const SplitLayout = ({ formData, designStyle }) => {
  return (
    <div
      style={designStyle.containerStyle}
      className="signature-preview split-layout"
    >
      <div style={designStyle.sidebarStyle} className="signature-sidebar">
        {formData.profileImage && (
          <div className="profile-image-container centered">
            <img
              src={formData.profileImage || "/placeholder.svg"}
              alt={formData.name}
              className="profile-image"
            />
          </div>
        )}
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
        <h3 className="preview-name centered" style={{ color: "white" }}>
          {formData.name}
        </h3>
        <p
          className="preview-job centered"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          {formData.jobTitle}
        </p>
        <div className="sidebar-social-icons">
          {renderSocialIcons(formData)}
        </div>
      </div>
      <div style={designStyle.contentStyle} className="signature-content">
        <p className="preview-company">{formData.company}</p>
        <div className="contact-info">
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
      </div>
    </div>
  );
};

export default SplitLayout;
