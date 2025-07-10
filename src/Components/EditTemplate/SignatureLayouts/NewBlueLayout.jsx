import React from "react";
import { MdEmail, MdLanguage, MdPhone } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

const NewBlueLayout = ({ formData }) => {
  const {
    name = "Briana Hernandez",
    jobTitle = "Sales representative",
    company = "Fourth Coffee",
    email = "Briana@fourthcoffee.com",
    website = "www.fourthcoffee.com",
    phone = "(312)555-0113",
    profileImage,
  } = formData;

  return (
    <div
      style={{
        height: "167px",
        width: "600px",
        backgroundColor: "#fdddfc",
        fontFamily: "Segoe UI, sans-serif",
        borderRadius: "6px",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* Left side image */}
      <div
        style={{
          backgroundColor: "blue",
          width: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        
        
      </div>
        <div
  style={{
    width: "100px", 
    height: "132px",
    borderRadius: "60px / 50%", 
    overflow: "hidden",
    border: "4px solid blue", 
    marginTop: "20px",
    marginLeft: "20px", // space from the left side
  }}
>
  {profileImage ? (
    <img
      src={profileImage}
      alt={name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ccc",
      }}
    ></div>
  )}
</div>


      {/* Right side content */}
      <div style={{ flex: 1, padding: "15px 20px" }}>
        <div
          style={{
            color: "#6f2dbd",
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "5px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "#333",
            fontSize: "14px",
            marginBottom: "15px",
            fontWeight: "800",
          }}
        >
          {jobTitle} | {company}
        </div>

        {/* Contact Info */}
       <div
  style={{
    fontSize: "14px",
    color: "#333",
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two columns
    rowGap: "8px",
    columnGap: "20px", // Add space between columns
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <MdEmail style={{ color: "blue" }} />
    <a href={`mailto:${email}`} style={{ color: "#333", textDecoration: "none" }}>
      {email}
    </a>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <MdLanguage style={{ color: "blue" }} />
    <a href={`https://${website}`} target="_blank" rel="noreferrer" style={{ color: "#333", textDecoration: "none" }}>
      {website}
    </a>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <FaBuilding style={{ color: "blue" }} /> {company}
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <MdPhone style={{ color: "blue" }} /> {phone}
  </div>
</div>

      </div>
    </div>
  );
};

export default NewBlueLayout;
