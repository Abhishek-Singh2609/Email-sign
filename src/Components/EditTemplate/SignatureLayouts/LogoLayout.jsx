import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const LogoLayout = ({ formData, designStyle }) => {
  return (
    <>
      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          width: "600px",
          minHeight: "180px",
          margin: "0",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
          ...designStyle.containerStyle,
        }}
        className="signature-preview professional-layout-v2"
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            minHeight: "140px",
          }}
        >
          {/* Logo Section - Maintains space even if empty */}
          <div
            style={{
              width: "140px",
              minWidth: "140px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "15px",
              visibility: formData.logo ? "visible" : "hidden",
            }}
          >
            {formData.logo ? (
              <img
                src={formData.logo}
                alt="Company Logo"
                style={{
                  width: "100px",
                  height: "83px",
                  objectFit: "contain",
                  marginRight: "15px",
                  borderRadius: "4px",
                }}
                className="company-logo"
              />
            ) : (
              <div
                style={{
                  width: "80px",
                  height: "60px",
                  background: `linear-gradient(135deg, ${
                    designStyle.accentColor || "#0066cc"
                  }, ${designStyle.accentColor || "#004499"})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginRight: "15px",
                  borderRadius: "4px",
                }}
                className="company-logo-placeholder"
              >
                {formData.company
                  ? formData.company.substring(0, 3).toUpperCase()
                  : "IDC"}
              </div>
            )}
            
          </div>

          {/* Contact Information */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#333333",
                marginBottom: "2px",
              }}
              className="preview-name"
            >
              {formData.name || "Employee Name"}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: designStyle.accentColor || "#0066cc",
                marginBottom: "8px",
              }}
              className="preview-job"
            >
              {formData.jobTitle || "Job Title"}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#666666",
                lineHeight: "1.4",
              }}
              className="contact-details"
            >
              {(formData.mobilePhone || formData.phone) && (
                <>
                  <strong>mobile:</strong>{" "}
                  {formData.mobilePhone || formData.phone}
                  {formData.phone && formData.mobilePhone && (
                    <>
                      {" | "}
                      <strong>tel:</strong> {formData.phone}
                    </>
                  )}
                  <br />
                </>
              )}
              {formData.email && (
                <>
                  <strong>email:</strong> {formData.email}
                  <br />
                </>
              )}
              {formData.website && (
                <>
                  <strong>website:</strong> {formData.website}
                  <br />
                </>
              )}
              <strong>location:</strong> {formData.location || ""}
            </div>
          </div>

          {/* Company Name (replaces profile image) */}
          <div
            style={{
              width: "80px",
              minWidth: "80px",
              height: "80px",
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#666666",
                
              }}
            >
              {formData.company || "Company Name"}
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div
          style={{
           padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* Social Icons */}
            <div className="social-icons-container">
              {renderSocialIcons(formData)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoLayout;