import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";
import { 
  FaMobileScreen, 
  FaPhone, 
  FaEnvelope, 
  FaGlobe, 
  FaBuilding, 
  FaLocationDot 
} from "react-icons/fa6";

const OrangeCenter = ({ formData, designStyle }) => {
  
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
      {/* Custom CSS for orange social icons */}
      <style>
        {`
          .orange-signature-layout .social-icons-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .orange-signature-layout .social-icons-container a {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
          }
          
          .orange-signature-layout .social-icons-container a:hover {
            transform: scale(1.1) !important;
          }
          
          .orange-signature-layout .social-icons-container img {
            filter: brightness(0) invert(1) !important;
          }
        `}
      </style>

      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          width: "600px",
          border: "none",
          margin: "0",
          padding: "0",
        }}
        className="signature-preview orange-signature-layout"
      >
        {/* Orange top border */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #FF6B35 0%, #F7931E 100%)",
            width: "100%",
          }}
        />

        {/* Main content section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Left Section - Name and Title */}
          <div style={{ maxWidth:"128px" }}>
            {/* Name */}
            <div
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#333333",
                marginBottom: "2px",
                lineHeight: "1.2",
                
              }}
            >
              {formData.name || "Your Name"}
            </div>

            {/* Job Title */}
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#FF6B35",
                marginBottom: "15px",
                letterSpacing: "0.5px",
             
              }}
            >
              {formData.jobTitle || "YOUR JOB TITLE"}
            </div>

            {/* Social Icons - Centered below name/title */}
            <div style={{ display: "flex" }}>
              <div className="social-icons-container">
                {renderSocialIcons(formData)}
              </div>
            </div>
          </div>

          {/* Center Section - Profile Image */}
          <div style={{ margin: "0 4px" }}>
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt={formData.name || "Profile"}
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #FF6B35",
                }}
              />
            ) : (
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  backgroundColor: "#FF6B35",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "36px",
                  fontWeight: "bold",
                }}
              >
               {getUserInitials()}
              </div>
            )}
          </div>

          {/* Right Section - Contact Info, Company, Location */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-start",
            }}
          >
            {/* Phone Numbers */}
            {(formData.mobilePhone || formData.phone) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {formData.mobilePhone && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FF6B35",
                      }}
                    >
                      <FaMobileScreen size={12} />
                    </div>
                    <span style={{ fontSize: "12px", color: "#333333" }}>
                      {formData.mobilePhone}
                    </span>
                  </div>
                )}
                {formData.phone && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FF6B35",
                      }}
                    >
                      <FaPhone size={12} />
                    </div>
                    <span style={{ fontSize: "12px", color: "#333333" }}>
                      {formData.phone}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Email */}
            {formData.email && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF6B35",
                  }}
                >
                  <FaEnvelope size={12} />
                </div>
                <span style={{ fontSize: "12px", color: "#333333" }}>
                  {formData.email}
                </span>
              </div>
            )}

            {/* Website */}
            {formData.website && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF6B35",
                  }}
                >
                  <FaGlobe size={12} />
                </div>
                <span style={{ fontSize: "12px", color: "#333333" }}>
                  {formData.website}
                </span>
              </div>
            )}

            {/* Company */}
            {formData.company && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF6B35",
                  }}
                >
                  <FaBuilding size={12} />
                </div>
                <span style={{ fontSize: "12px", color: "#333333" }}>
                  {formData.company}
                </span>
              </div>
            )}

            {/* Location */}
            {formData.location && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF6B35",
                  }}
                >
                  <FaLocationDot size={12} />
                </div>
                <span style={{ fontSize: "12px", color: "#333333" }}>
                  {formData.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrangeCenter;