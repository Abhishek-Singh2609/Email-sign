import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const WithoutLogo = ({ formData, designStyle }) => {

// Function to get user initials
  const getUserInitials = () => {
    if (!formData.name) return "ID";
    
    const nameParts = formData.name.trim().split(/\s+/);
    if (nameParts.length === 0) return "ID";
    
    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    
    if (nameParts.length === 1) return firstNameInitial;
    
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <>
      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          width: "600px", // Changed from maxWidth to fixed width
          minHeight: "180px", 
          margin: "0",
          borderRadius: "8px",
          overflow: "hidden",
          ...designStyle.containerStyle,
        }}
        className="signature-preview professional-layout"
      >
        {/* Header Section with Company Logo and Contact Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: "140px", // Ensure consistent height for this section
          }}
        >
          {/* Logo Section - Always takes space even if empty */}
          <div
            style={{
              width: "140px",
              minWidth: "140px", // Ensure fixed width
              display: "flex",
              flexDirection: "column",
              marginRight: "10px",
              alignItems: "center",
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
                {getUserInitials()}
              </div>
            )}
            <div
              style={{
                color: "#666666",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  color: "#333333",
                  textAlign: "center",
                }}
              >
                {formData.company}
              </div>
            </div>
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
                  <strong>email:</strong>{" "}
                  <a
                    href={`mailto:${formData.email}`}
                    style={{
                      color: "#666666",
                      textDecoration: "none",
                    }}
                  >
                    {formData.email}
                  </a>
                  <br />
                </>
              )}
              {formData.website && (
                <>
                  <strong>website:</strong> {" "}
                   <a
                    href={
                      formData.website.startsWith("http")
                        ? formData.website
                        : `https://${formData.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#666666",
                      textDecoration: "none",
                    }}
                  >
                    {formData.website.replace(/^https?:\/\//, "")}
                  </a>
                  <br />
                </>
              )}
              <strong>location:</strong> {formData.location || ""}
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

export default WithoutLogo;