import React from "react";
import Buttons from "./Tabs/Buttons";
import SignatureLayout from "./SignatureLayouts/SignatureLayout";

const PreviewSection = ({
  formData,
  selectedDesign,
  designStyle,
  getActiveCampaigns,
  navigateToPreview,
  handleSendData,
  isSending,
}) => {
  return (
    <div className="preview-section">
      <h2 className="preview-title">Preview</h2>
      <p className="preview-subtitle">
        Here's how your signature will appear in emails
      </p>
      <SignatureLayout
        formData={formData}
        selectedDesign={selectedDesign}
        designStyle={designStyle}
      />
      {/* Display banners outside of signature-preview card without text labels */}
      {(getActiveCampaigns().length > 0 || formData.banner) && (
        <div className="banners-outside-preview" style={{ marginTop: "8px" }}>
          <div>
            {getActiveCampaigns().map((campaign) => (
              <div
                key={campaign.id}
                style={{ position: "relative", marginBottom: "10px" }}
              >
                <img
                  src={campaign.image}
                  alt={campaign.name}
                  style={{
                    width: "75%",
                    height: "auto",
                    maxHeight: "100px",
                    borderRadius: "4px",
                  }}
                />
                {/* Clickable areas */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {campaign.links.map(
                    (link, index) =>
                      link.url && (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={link.text}
                          style={{
                            position: "absolute",
                            left: `${link.area.x}%`,
                            top: `${link.area.y}%`,
                            width: `${link.area.width}%`,
                            height: `${link.area.height}%`,
                            display: "block",
                            zIndex: 2,
                            cursor: "pointer",
                          }}
                        />
                      )
                  )}
                </div>
              </div>
            ))}
            {formData.banner && (
              <div>
                <img
                  src={formData.banner}
                  alt="Banner"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {formData.disclaimer && (
        <div
          className="disclaimer-preview"
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#666",
            paddingTop: "15px",
            borderRadius: "4px",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: formData.disclaimer }} />
        </div>
      )}
      <div className="d-flex justify-content-end my-4">
        <button
          className="btn"
          style={{ backgroundColor: "#4285F4", color: "white" }}
          onClick={navigateToPreview}
          type="button"
        >
          <i className="bi bi-check2-circle me-2"></i>
          Preview
        </button>
      </div>
      <Buttons />
      <div className="preview-actions">
        {/* <button onClick={navigateToPreview} className="preview-button">
          Preview Signature
        </button> */}
        <button
          onClick={handleSendData}
          className="send-data-button"
          disabled={isSending}
        >
          {isSending ? "Applying..." : "Apply Signature"}
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;
