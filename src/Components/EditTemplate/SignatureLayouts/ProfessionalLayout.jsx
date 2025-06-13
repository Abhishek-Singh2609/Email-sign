import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const ProfessionalLayout = ({ formData, designStyle }) => {

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
          width: "600px",
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
            backgroundColor: "#ffffff",
            minHeight: "140px",
          }}
        >
          {/* Logo Section - Always takes space even if empty */}
          <div
            style={{
              width: "140px",
              minWidth: "140px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Center content vertically
            }}
          >
            {formData.logo ? (
              <>
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
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "650",
                    lineHeight: "1.2",
                    color: "#333333",
                    textAlign: "center",
                  }}
                >
                  {formData.company}
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
                    borderRadius: "4px",
                    marginBottom: "8px",
                  }}
                  className="company-logo-placeholder"
                >
                 {getUserInitials()}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "650",
                    lineHeight: "1.2",
                    color: "#333333",
                    textAlign: "center",
                  }}
                >
                  {formData.company}
                </div>
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
                  <strong>mobile:</strong> {formData.phone}
                  {formData.mobilePhone || formData.phone}
                  {formData.phone && formData.mobilePhone && (
                    <>
                      {" | "}
                      <strong>tel:</strong>{" "}
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
                  <strong>website:</strong>{" "}
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

          {/* Profile Image - Always takes space even if empty */}
          <div
            style={{
              minWidth: "80px",
              height: "80px",
              visibility: formData.profileImage ? "visible" : "hidden",
            }}
          >
            {formData.profileImage && (
              <img
                src={formData.profileImage}
                alt={formData.name || "Profile"}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "6px",
                  objectFit: "cover",
                  border: "2px solid #e0e0e0",
                }}
                className="profile-image"
              />
            )}
          </div>
        </div>

        {/* Social Section */}
        <div
          style={{
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

export default ProfessionalLayout;