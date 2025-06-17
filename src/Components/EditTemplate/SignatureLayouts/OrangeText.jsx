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

const OrangeText = ({ formData, designStyle }) => {
  
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
          }}
        >
          {/* Left Section - Name, Title, Social Icons (now occupying profile image space) */}
          <div style={{ width: "160px", marginRight: "20px" }}>
            {/* Name */}
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#333333",
                marginBottom: "8px",
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

            {/* Social Icons - 3 per line */}
            <div className="social-icons-container">
              {renderSocialIcons(formData)}
            </div>
          </div>

          {/* Right Section - Contact Info, Company, Location */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-start",
              flex: 1,
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

export default OrangeText;