import React from "react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const TextLayout = ({ formData, designStyle }) => {
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
          {/* Contact Information (shifted left where logo was) */}
          <div style={{ width: "70%", paddingRight: "20px" }}>
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

          {/* Company Name (centered where profile image was) */}
          <div
            style={{
              width: "30%",
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
                color:"#666666",
                padding: "10px",
                
                height: "100%",
                display: "flex",
                alignItems: "center",
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

export default TextLayout;


