import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const CenteredLayout = ({ formData, designStyle }) => {
  return (
    <div
      className="signature-preview centered-layout"
      style={{
        backgroundColor: designStyle.backgroundColor,
        color: designStyle.textColor,
        border: designStyle.borderStyle,
        boxShadow: designStyle.boxShadow,
        textAlign: "center",
        padding: "24px",
      }}
    >
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
      <h3 className="preview-name" style={{ color: designStyle.nameColor }}>
        {formData.name}
      </h3>
      <p className="preview-job">
        {formData.jobTitle}
        {formData.company}
      </p>
      <div className="preview-divider" style={designStyle.dividerStyle}></div>
      <div className="centered-contact">
        <p className="contact-item centered-item">
          <span
            className="contact-icon"
            style={{ color: designStyle.accentColor }}
          >
            📞
          </span>{" "}
          {formData.phone}
        </p>
        {formData.mobilePhone && (
          <p className="contact-item centered-item">
            <span
              className="contact-icon"
              style={{ color: designStyle.accentColor }}
            >
              📱
            </span>{" "}
            {formData.mobilePhone}
          </p>
        )}
        <p className="contact-item centered-item">
          <span
            className="contact-icon"
            style={{ color: designStyle.accentColor }}
          >
            ✉️
          </span>{" "}
          {formData.email}
        </p>
        {formData.website && (
          <p className="contact-item centered-item">
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
          <p className="contact-item centered-item">
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
      <div className="centered-social">{renderSocialIcons(formData)}</div>
    </div>
  );
};

export default CenteredLayout;
