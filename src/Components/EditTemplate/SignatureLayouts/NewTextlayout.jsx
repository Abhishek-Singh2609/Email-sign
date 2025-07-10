import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { renderSocialIcons } from "../Tabs/SocialTab";

const NewTextLayout = ({formData, designStyle}) => {
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
        
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px",
      }}>
        
         <div style={{
                    fontSize: "16px",
                    fontWeight: "650",
                    lineHeight: "1.2",
                    color: "#333333",
                    textAlign: "center",
                  }}
                >
                  {formData.company}
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
       
  <div style={{ display: "flex", alignItems: "center", }}>
   
  <div
            style={{
              width: "120px",
              minWidth: "120px",
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
              
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", width:"200px"}}>
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
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ fontSize: "12px",
                color: "#666666",
                lineHeight: "1.4", }}>
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
              <strong>location:</strong> {formData.location || ""}
            </div>
          </div>

  </div>
      
    <div style={{display: "flex",alignContent:"center", justifyContent:"space-between" ,padding: "10px" }}>
     <div>{formData.email && (
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
              )}</div>
              <div>
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
              </div>
    </div>

      </div>
    </>
  );
    
};

export default NewTextLayout;




























// import React from "react";
// import {
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   Globe,
//   Phone,
//   Mail,
//   MapPin,
// } from "lucide-react";

// const NewTextLayout = ({
//   name = "Noa Vidal",
//   jobTitle = "Executive Director",
//   company = "The Phone Company",
//   email = "noa@thephone-company.com",
//   phone = "(857) 555-0178",
//   website = "www.thephone-company.com",
//   address = "4321 Maplewood Ave",
//   city = "Nashville",
//   state = "TN",
//   zipCode = "13141",
//   socialLinks = {},
// }) => {
//   const fullAddress = `${address}\n${city}, ${state} ${zipCode}`;

//   const LogoIcon = () => (
//     <div style={{ position: "relative", width: "48px", height: "48px" }}>
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           width: "32px",
//           height: "24px",
//           transform: "rotate(12deg)",
//           background: "linear-gradient(45deg, #00BCD4, #4DD0E1)",
//           clipPath: "polygon(0% 100%, 100% 100%, 85% 0%, 0% 20%)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: "4px",
//           left: "4px",
//           width: "32px",
//           height: "24px",
//           transform: "rotate(12deg)",
//           background: "linear-gradient(45deg, #E91E63, #F06292)",
//           clipPath: "polygon(0% 100%, 100% 100%, 85% 0%, 0% 20%)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: "8px",
//           left: "8px",
//           width: "32px",
//           height: "24px",
//           transform: "rotate(12deg)",
//           background: "linear-gradient(45deg, #FF9800, #FFB74D)",
//           clipPath: "polygon(0% 100%, 100% 100%, 85% 0%, 0% 20%)",
//         }}
//       />
//     </div>
//   );

//   const SocialIcon = ({ type, url }) => {
//     const getIcon = () => {
//       switch (type) {
//         case "facebook":
//           return <Facebook size={14} color="#fff" />;
//         case "twitter":
//           return <Twitter size={14} color="#fff" />;
//         case "linkedin":
//           return <Linkedin size={14} color="#fff" />;
//         case "instagram":
//           return <Instagram size={14} color="#fff" />;
//         default:
//           return null;
//       }
//     };

//     return (
//       <div
//         style={{
//           width: "24px",
//           height: "24px",
//           backgroundColor: "#1d4ed8",
//           borderRadius: "4px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//         }}
//         onClick={() => url && window.open(url, "_blank")}
//       >
//         {getIcon()}
//       </div>
//     );
//   };

//   return (
//     <div
//       style={{
//         width: "600px",
//         minHeight: "180px",
//         backgroundColor: "#fff",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         fontFamily: "sans-serif",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Top Section */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           padding: "24px",
//           minHeight: "140px",
//         }}
//       >
//         {/* Left Logo */}
//         <div
//           style={{
//             width: "140px",
//             minWidth: "140px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <LogoIcon />
//           <div
//             style={{
//               fontSize: "12px",
//               fontWeight: 600,
//               color: "#333",
//               textAlign: "center",
//               marginTop: "8px",
//               lineHeight: 1.2,
//             }}
//           >
//             {company}
//           </div>
//         </div>

//         {/* Middle Info */}
//         <div style={{ flex: 1, padding: "0 16px" }}>
//           <div style={{ fontSize: "20px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>
//             {name}
//           </div>
//           <div style={{ fontSize: "14px", color: "#2563eb", marginBottom: "12px", fontWeight: 500 }}>
//             {jobTitle}
//           </div>

//           <div style={{ fontSize: "12px", color: "#666", lineHeight: "1.6" }}>
//             {email && (
//               <div>
//                 <a
//                   href={`mailto:${email}`}
//                   style={{ color: "#666", textDecoration: "none" }}
//                 >
//                   {email}
//                 </a>
//               </div>
//             )}
//             {website && (
//               <div>
//                 <a
//                   href={website.startsWith("http") ? website : `https://${website}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "#666", textDecoration: "none" }}
//                 >
//                   {website}
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Address */}
//         <div
//           style={{
//             fontSize: "12px",
//             color: "#666",
//             textAlign: "right",
//             minWidth: "120px",
//             lineHeight: 1.4,
//           }}
//         >
//           <div style={{ whiteSpace: "pre-line" }}>{fullAddress}</div>
//           {phone && (
//             <div style={{ fontWeight: 500, marginTop: "4px" }}>{phone}</div>
//           )}
//         </div>
//       </div>

//       {/* Bottom Social */}
//       <div style={{ padding: "0 24px 16px 24px" }}>
//         <div style={{ display: "flex", gap: "8px" }}>
//           {socialLinks.facebook && <SocialIcon type="facebook" url={socialLinks.facebook} />}
//           {socialLinks.twitter && <SocialIcon type="twitter" url={socialLinks.twitter} />}
//           {socialLinks.linkedin && <SocialIcon type="linkedin" url={socialLinks.linkedin} />}
//           {socialLinks.instagram && <SocialIcon type="instagram" url={socialLinks.instagram} />}

//           {!Object.keys(socialLinks).length && (
//             <>
//               <SocialIcon type="facebook" />
//               <SocialIcon type="twitter" />
//               <SocialIcon type="linkedin" />
//               <SocialIcon type="instagram" />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewTextLayout;
