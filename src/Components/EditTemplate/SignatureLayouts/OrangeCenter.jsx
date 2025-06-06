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
  const defaultData = {
    name: "Sally Williams",
    jobTitle: "SALES MANAGER", 
    phone: "+1 234 56789",
    mobilePhone: "+1 987 65432",
    email: "s.williams@crossware365.com",
    website: "www.crossware365.com",
    company: "Crossware Inc.",
    location: "New York, USA",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
    ...formData
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
          backgroundColor: "#ffffff",
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
            padding: "20px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Left Section - Name and Title */}
          <div style={{ flex: 1, paddingRight: "20px" }}>
            {/* Name */}
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#333333",
                marginBottom: "2px",
                lineHeight: "1.2",
                
              }}
            >
              {defaultData.name || "Your Name"}
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
              {defaultData.jobTitle || "YOUR JOB TITLE"}
            </div>

            {/* Social Icons - Centered below name/title */}
            <div style={{ display: "flex" }}>
              <div className="social-icons-container">
                {renderSocialIcons(defaultData)}
              </div>
            </div>
          </div>

          {/* Center Section - Profile Image */}
          <div style={{ margin: "0 20px" }}>
            {defaultData.profileImage ? (
              <img
                src={defaultData.profileImage}
                alt={defaultData.name || "Profile"}
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
                {defaultData.name ? defaultData.name.charAt(0) : "U"}
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
            {(defaultData.mobilePhone || defaultData.phone) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {defaultData.mobilePhone && (
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
                      {defaultData.mobilePhone}
                    </span>
                  </div>
                )}
                {defaultData.phone && (
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
                      {defaultData.phone}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Email */}
            {defaultData.email && (
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
                  {defaultData.email}
                </span>
              </div>
            )}

            {/* Website */}
            {defaultData.website && (
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
                  {defaultData.website}
                </span>
              </div>
            )}

            {/* Company */}
            {defaultData.company && (
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
                  {defaultData.company}
                </span>
              </div>
            )}

            {/* Location */}
            {defaultData.location && (
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
                  {defaultData.location}
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