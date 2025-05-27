import React from "react";
import RichTextEditor from "./RichTextEditor";
import "./DisclaimerTab.css";

const DisclaimerTab = ({ formData, handleFormDataUpdate }) => {
  // Handle input changes for disclaimer
  const handleInputChange = (value) => {
    handleFormDataUpdate({ disclaimer: value });
  };

  return (
    <div className="disclaimer-tab-form">
      <div className="disclaimer-tab-section">
        <label className="disclaimer-tab-label" htmlFor="disclaimer">
          Disclaimer
        </label>
        <RichTextEditor
          value={formData.disclaimer}
          onChange={handleInputChange}
          placeholder="Enter your disclaimer text here..."
        />
      </div>
    </div>
  );
};

export default DisclaimerTab;
