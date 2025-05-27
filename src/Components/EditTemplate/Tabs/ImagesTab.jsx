import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./ImagesTab.css";

const ImagesTab = ({ formData, handleFormDataUpdate }) => {
  // Create refs for file inputs
  const imageInputRef = useRef(null);
  const logoInputRef = useRef(null);

  // Handle image upload for profile image and logo
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleFormDataUpdate({ [type]: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image (profile or banner)
  const removeImage = (type) => {
    handleFormDataUpdate({ [type]: null });
  };

  // Trigger profile image upload dialog
  const triggerImageUpload = () => {
    imageInputRef.current.click();
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleFormDataUpdate({ logo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger logo upload dialog
  const triggerLogoUpload = () => {
    logoInputRef.current.click();
  };

  // Remove logo
  const removeLogo = () => {
    handleFormDataUpdate({ logo: null });
  };

  return (
    <div className="images-tab-form">
      <div className="images-tab-section">
        <label className="images-tab-label">Profile Image</label>
        <div className="images-tab-upload-container">
          {formData.profileImage ? (
            <div className="images-tab-preview-container">
              <img
                src={formData.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="images-tab-preview"
              />
              <button
                className="images-tab-remove-btn"
                onClick={() => removeImage("profileImage")}
              >
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div
              className="images-tab-upload-placeholder"
              onClick={triggerImageUpload}
            >
              <span className="images-tab-upload-icon">📷</span>
              <span>Upload</span>
            </div>
          )}
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleImageUpload(e, "profileImage")}
            accept="image/*"
            className="images-tab-hidden-input"
          />
        </div>
        <p className="images-tab-tip">
          Recommended: Image at least should be 100x100px
        </p>
      </div>

      <div className="images-tab-section">
        <label className="images-tab-label">Company Logo</label>
        <div className="images-tab-upload-container">
          {formData.logo ? (
            <div className="images-tab-preview-container">
              <img
                src={formData.logo || "/placeholder.svg"}
                alt="Logo"
                className="images-tab-preview"
              />
              <button className="images-tab-remove-btn" onClick={removeLogo}>
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div
              className="images-tab-upload-placeholder"
              onClick={triggerLogoUpload}
            >
              <span className="images-tab-upload-icon">📷</span>
              <span>Upload</span>
            </div>
          )}
          <input
            type="file"
            ref={logoInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="images-tab-hidden-input"
          />
        </div>
        <p className="images-tab-tip">
          Recommended: Logo should be at least 100x100px
        </p>
      </div>
    </div>
  );
};

export default ImagesTab;
