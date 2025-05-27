import React from "react";
import "./PersonalInfoTab.css";

const PersonalInfoTab = ({
  formData,
  handleInputChange,
  handleFormDataUpdate,
}) => {
  // We'll now use the provided handleInputChange directly

  return (
    <div className="personal-info-form">
      <div className="personal-info-form-group">
        <label className="personal-info-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="personal-info-input"
        />
      </div>

      <div className="personal-info-form-group">
        <label className="personal-info-label" htmlFor="jobTitle">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="personal-info-input"
        />
      </div>

      <div className="personal-info-form-group">
        <label className="personal-info-label" htmlFor="company">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="personal-info-input"
        />
      </div>

      <div className="personal-info-form-group">
        <label className="personal-info-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="personal-info-input"
        />
      </div>

      <div className="personal-info-form-group">
        <label className="personal-info-label" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="personal-info-input"
        />
      </div>

      <div className="personal-info-form-group">
        <label className="personal-info-label" htmlFor="mobilePhone">
          Phone 2
        </label>
        <input
          type="tel"
          id="mobilePhone"
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleInputChange}
          className="personal-info-input"
        />
      </div>

      <div className="personal-info-form-group">
        <label className="personal-info-label" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="personal-info-input"
        />
      </div>

      <div className="personal-info-form-group">
        <label className="personal-info-label" htmlFor="website">
          Website
        </label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="personal-info-input"
        />
      </div>
    </div>
  );
};

export default PersonalInfoTab;
