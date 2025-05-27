import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const StandardLayout = ({ formData, designStyle, selectedDesign }) => {
  return (
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
            selectedDesign === "minimal" ? designStyle.accentColor : "#e6e6e6",
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
  );
};

export default StandardLayout;
