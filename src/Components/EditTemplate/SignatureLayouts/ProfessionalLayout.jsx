import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const ProfessionalLayout = ({ formData, designStyle }) => {
  return (
    <>
      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          maxWidth: "600px",
          margin: "0",
          padding: "20px",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          ...designStyle.containerStyle
        }}
        className="signature-preview professional-layout"
      >
        {/* Header Section with Company Branding */}
        <div
          style={{
            backgroundColor: designStyle.primaryColor || "#f8f9fa",
            padding: "15px 20px",
            marginBottom: "20px",
            borderRadius: "6px",
            borderLeft: `4px solid ${designStyle.accentColor || "#007bff"}`
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {formData.logo && (
              <div className="logo-container">
                <img
                  src={formData.logo || "/placeholder.svg"}
                  alt="Company Logo"
                  style={{
                    maxWidth: "120px",
                    maxHeight: "60px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: designStyle.textColor || "#333333",
                  margin: "0",
                  lineHeight: "1.2"
                }}
                className="preview-company"
              >
                {formData.company}
              </p>
              {formData.department && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666666",
                    margin: "2px 0 0 0",
                    lineHeight: "1.2"
                  }}
                >
                  {formData.department}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          {/* Profile Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
            {formData.profileImage && (
              <div className="profile-image-container">
                <img
                  src={formData.profileImage || "/placeholder.svg"}
                  alt={formData.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `3px solid ${designStyle.accentColor || "#007bff"}`
                  }}
                  className="profile-image"
                />
              </div>
            )}
            
            {/* Name and Job Title */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: designStyle.accentColor || "#007bff",
                  margin: "0 0 5px 0",
                  lineHeight: "1.2"
                }}
                className="preview-name"
              >
                {formData.name}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666666",
                  margin: "0",
                  fontWeight: "500",
                  lineHeight: "1.2"
                }}
                className="preview-job"
              >
                {formData.jobTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px 0",
            borderTop: `2px solid ${designStyle.accentColor || "#007bff"}`,
          }}
          className="contact-info"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "8px",
              alignItems: "start"
            }}
          >
            {formData.phone && (
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "#555555",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                className="contact-item"
              >
                <span
                  style={{
                    color: designStyle.accentColor || "#007bff",
                    fontWeight: "600",
                    minWidth: "16px"
                  }}
                  className="contact-icon"
                >
                  📞
                </span>
                <span>telephone: {formData.phone}</span>
              </p>
            )}
            
            {formData.mobilePhone && (
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "#555555",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                className="contact-item"
              >
                <span
                  style={{
                    color: designStyle.accentColor || "#007bff",
                    fontWeight: "600",
                    minWidth: "16px"
                  }}
                  className="contact-icon"
                >
                  📱
                </span>
                <span>mobile: {formData.mobilePhone}</span>
              </p>
            )}

            <p
              style={{
                margin: "0",
                fontSize: "13px",
                color: "#555555",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              className="contact-item"
            >
              <span
                style={{
                  color: designStyle.accentColor || "#007bff",
                  fontWeight: "600",
                  minWidth: "16px"
                }}
                className="contact-icon"
              >
                ✉️
              </span>
              <span>email: {formData.email}</span>
            </p>

            {formData.website && (
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "#555555",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                className="contact-item"
              >
                <span
                  style={{
                    color: designStyle.accentColor || "#007bff",
                    fontWeight: "600",
                    minWidth: "16px"
                  }}
                  className="contact-icon"
                >
                  🌐
                </span>
                <span>{formData.website}</span>
              </p>
            )}

            {formData.location && (
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "#555555",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  gridColumn: "1 / -1"
                }}
                className="contact-item"
              >
                <span
                  style={{
                    color: designStyle.accentColor || "#007bff",
                    fontWeight: "600",
                    minWidth: "16px"
                  }}
                  className="contact-icon"
                >
                  📍
                </span>
                <span>{formData.location}</span>
              </p>
            )}
          </div>
        </div>

        {/* Social Icons */}
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingTop: "10px"
          }}
        >
    
          <div className="social-icons-container">
            {renderSocialIcons(formData)}
          </div>
        </div>


       


      </div>
    </>
  );
};

export default ProfessionalLayout;