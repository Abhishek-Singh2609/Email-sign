import { designTemplates } from "../Tabs/DesignTab";

// Function to ensure 5 campaigns exist
export const ensureFiveCampaigns = (formDataToUpdate) => {
  if (!formDataToUpdate.campaigns || formDataToUpdate.campaigns.length < 5) {
    const updatedCampaigns = [...(formDataToUpdate.campaigns || [])];

    while (updatedCampaigns.length < 5) {
      const newId = updatedCampaigns.length + 1;
      updatedCampaigns.push({
        id: newId,
        name: `Campaign ${newId}`,
        image: null,
        startDate: "",
        expiryDate: "",
        active: false,
        links: [
          {
            url: "",
            text: "Link 1",
            area: { x: 0, y: 0, width: 33, height: 100 },
          },
          {
            url: "",
            text: "Link 2",
            area: { x: 33, y: 0, width: 34, height: 100 },
          },
          {
            url: "",
            text: "Link 3",
            area: { x: 67, y: 0, width: 33, height: 100 },
          },
        ],
      });
    }

    return {
      ...formDataToUpdate,
      campaigns: updatedCampaigns,
    };
  }

  return formDataToUpdate;
};

// Function to get active campaigns
export const getActiveCampaigns = (campaigns) => {
  return campaigns.filter(
    (campaign) =>
      campaign.active &&
      campaign.image &&
      !(campaign.startDate && new Date() < new Date(campaign.startDate)) &&
      !(campaign.expiryDate && new Date() > new Date(campaign.expiryDate))
  );
};

// Utility function to convert style object to CSS string
const styleToString = (styleObj) => {
  return Object.entries(styleObj)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join("; ");
};

// Generate social icons HTML
const renderSocialIcons = (formData) => {
  const socialIcons = [
    {
      key: "linkedin",
      icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png",
      alt: "LinkedIn",
    },
    {
      key: "youtube",
      icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png",
      alt: "YouTube",
    },
    {
      key: "instagram",
      icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png",
      alt: "Instagram",
    },
  ];

  const socialLinks = socialIcons
    .filter((social) => formData[social.key])
    .map(
      (social, index, array) =>
        `<a href="${formData[social.key]}" style="margin-right: ${
          index === array.length - 1 ? "0" : "10px"
        };"><img src="${social.icon}" alt="${
          social.alt
        }" style="vertical-align: middle;"></a>`
    );

  return socialLinks.length > 0
    ? `<p style="margin-top: 8px;">${socialLinks.join("")}</p>`
    : "";
};

// Generate social icons HTML for Orange Layout (with special styling)
const renderOrangeSocialIcons = (formData) => {
  const socialIcons = [
    {
      key: "linkedin",
      icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png",
      alt: "LinkedIn",
    },
    {
      key: "youtube",
      icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png",
      alt: "YouTube",
    },
    {
      key: "instagram",
      icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png",
      alt: "Instagram",
    },
    {
      key: "facebook",
      icon: "https://cdn-icons-png.flaticon.com/24/145/145802.png",
      alt: "Facebook",
    },
    {
      key: "twitter",
      icon: "https://cdn-icons-png.flaticon.com/24/145/145812.png",
      alt: "Twitter",
    },
    {
      key: "github",
      icon: "https://cdn-icons-png.flaticon.com/24/733/733553.png",
      alt: "GitHub",
    },
  ];

  const socialLinks = socialIcons
    .filter((social) => formData[social.key])
    .map((social, index) => {
      // Calculate position for 3 per row layout
      const row = Math.floor(index / 3);
      const col = index % 3;
      
      return `
        <a href="${formData[social.key]}" 
           style="background-color: #FF6B35 !important;
                  border-radius: 50% !important;
                  width: 25px !important;
                  height: 25px !important;
                  display: inline-flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  text-decoration: none !important;
                  transition: all 0.3s ease !important;
                  margin-right: ${col === 2 ? '0' : '8px'} !important;
                  margin-bottom: ${row > 0 ? '0' : '8px'} !important;"
           onmouseover="this.style.backgroundColor='#E55A2B !important'; this.style.transform='scale(1.1) !important';"
           onmouseout="this.style.backgroundColor='#FF6B35 !important'; this.style.transform='scale(1) !important';">
          <img src="${social.icon}" 
               alt="${social.alt}" 
               style="width: 12px; height: 12px; filter: brightness(0) invert(1) !important;">
        </a>
      `;
    });

  return socialLinks.length > 0 ? socialLinks.join("") : "";
};

// Generate common content sections
const generateContentSections = (formData, designStyle) => {
  const {
    textColor = "#333",
    nameColor = "#3498db",
    accentColor = "#3498db",
  } = designStyle;

  return {
    greeting: `<p style="margin-bottom: 10px;">Thanks & Regards,</p>`,

    personalInfo: `
      <p style="margin: 0; font-size: 16px; font-weight: bold; color: ${nameColor};">${
      formData.name || "Employee Name"
    }</p>
      <p style="margin: 2px 0; font-size: 14px; color: ${accentColor};">${
      formData.jobTitle || "Employee Title"
    }</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: ${textColor};">${
      formData.company || "AgileWorld Technology Ltd."
    }</p>
      <p style="margin: 2px 0 0 0; font-size: 14px;">${
        formData.location || "Gurgaon, Haryana"
      }</p>
    `,

    // Special sections for split layout
    sidebarInfo: `
      <p style="margin: 0; font-size: 14px; font-weight: bold;">${
        formData.name || "Employee Name"
      }</p>
      <p style="margin: 5px 0; font-size: 12px;">${
        formData.jobTitle || "Employee Title"
      }</p>
    `,

    companyInfo: `
      <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">${
        formData.company || "AgileWorld Technology Ltd."
      }</p>
      <p style="margin: 2px 0 0 0; font-size: 14px;">${
        formData.location || "Gurgaon, Haryana"
      }</p>
    `,

    contactInfo: `
      <p style="margin: 0; font-size: 14px;">📞 ${
        formData.phone || "+91 9876543210"
      }</p>
      <p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:${
        formData.email
      }" style="color: ${accentColor}; text-decoration: none;">${
      formData.email || "email@example.com"
    }</a></p>
      <p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://${
        formData.website
      }" style="color: ${accentColor}; text-decoration: none;">www.${
      formData.website || "agileworldtechnologies.com"
    }</a></p>
      ${renderSocialIcons(formData)}
    `,

    banner: formData.banner
      ? `<div style="margin-top: 20px;"><img src="${formData.banner}" alt="Banner" style="width: 100%; height: auto; border-radius: 8px;"></div>`
      : "",

    disclaimer: formData.disclaimer
      ? `<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><strong>DISCLAIMER</strong></p><p style="margin-top: 5px;">${formData.disclaimer}</p></div>`
      : "",
  };
};

// Layout configuration object - Updated with Orange Layout
const layoutConfigs = {
  // NEW ORANGE LAYOUT ADDED HERE
  orange: (designStyle, sections, formData) => {
    const defaultData = {
      name: "Sally Williams",
      jobTitle: "SALES MANAGER", 
      phone: "+1 234 56789",
      email: "s.williams@crossware365.com",
      website: "www.crossware365.com",
      company: "Crossware Inc.",
      location: "New York, USA",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      ...formData
    };

    return `
      <style>
        .orange-signature-layout .social-icons-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 100px;
        }
        
        .orange-signature-layout .social-icons-container a {
          background-color: #FF6B35 !important;
          border-radius: 50% !important;
          width: 25px !important;
          height: 25px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
          transition: all 0.3s ease !important;
        }
        
        .orange-signature-layout .social-icons-container a:hover {
          background-color: #E55A2B !important;
          transform: scale(1.1) !important;
        }
        
        .orange-signature-layout .social-icons-container svg {
          fill: white !important;
          color: white !important;
        }
        
        .orange-signature-layout .social-icons-container img {
          filter: brightness(0) invert(1) !important;
        }
      </style>

      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width: 600px; background-color: #ffffff; border: none; margin: 0; padding: 0;" class="signature-preview orange-signature-layout">
        <!-- Orange top border -->
        <div style="height: 4px; background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%); width: 100%;"></div>

        <!-- Main content section -->
        <div style="display: flex; align-items: center; padding: 20px; background-color: #ffffff;">
          <!-- Profile Image -->
          <div style="margin-right: 20px;">
            ${defaultData.profileImage ? 
              `<img src="${defaultData.profileImage}" alt="${defaultData.name || 'Profile'}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid #FF6B35;">` :
              `<div style="width: 110px; height: 110px; border-radius: 50%; background-color: #FF6B35; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">
                ${defaultData.name ? defaultData.name.charAt(0) : "U"}
              </div>`
            }
          </div>

          <!-- Left Section - Name, Title, Social Icons -->
          <div style="flex: 1;">
            <!-- Name -->
            <div style="font-size: 24px; font-weight: 700; color: #333333; margin-bottom: 2px; line-height: 1.2;">
              ${defaultData.name || "Your Name"}
            </div>

            <!-- Job Title -->
            <div style="font-size: 14px; font-weight: 600; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">
              ${defaultData.jobTitle || "YOUR JOB TITLE"}
            </div>

            <!-- Social Icons - 3 per line -->
            <div class="social-icons-container" style="display: flex; flex-wrap: wrap; gap: 8px; max-width: 100px;">
              ${renderOrangeSocialIcons(defaultData)}
            </div>
          </div>

          <!-- Right Section - Contact Info, Company, Location -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start; margin-left: 20px; width: 200px;">
            <!-- Phone -->
            ${defaultData.phone ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">📞</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.phone}</span>
              </div>
            ` : ''}

            <!-- Email -->
            ${defaultData.email ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">✉</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.email}</span>
              </div>
            ` : ''}

            <!-- Website -->
            ${defaultData.website ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">🌐</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.website}</span>
              </div>
            ` : ''}

            <!-- Company -->
            ${defaultData.company ? `
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">🏢</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.company}</span>
              </div>
            ` : ''}

            <!-- Location -->
            ${defaultData.location ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">📍</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.location}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

orangecenter: (designStyle, sections, formData) => {
    const defaultData = {
      name: "Sally Williams",
      jobTitle: "SALES MANAGER", 
      phone: "+1 234 56789",
      email: "s.williams@crossware365.com",
      website: "www.crossware365.com",
      company: "Crossware Inc.",
      location: "New York, USA",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      ...formData
    };

    return `
      <style>
        .orange-signature-layout .social-icons-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 100px;
        }
        
        .orange-signature-layout .social-icons-container a {
          background-color: #FF6B35 !important;
          border-radius: 50% !important;
          width: 25px !important;
          height: 25px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
          transition: all 0.3s ease !important;
        }
        
        .orange-signature-layout .social-icons-container a:hover {
          background-color: #E55A2B !important;
          transform: scale(1.1) !important;
        }
        
        .orange-signature-layout .social-icons-container svg {
          fill: white !important;
          color: white !important;
        }
        
        .orange-signature-layout .social-icons-container img {
          filter: brightness(0) invert(1) !important;
        }
      </style>

      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width: 600px; background-color: #ffffff; border: none; margin: 0; padding: 0;" class="signature-preview orange-signature-layout">
        <!-- Orange top border -->
        <div style="height: 4px; background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%); width: 100%;"></div>

        <!-- Main content section -->
        <div style="display: flex; align-items: center; padding: 20px; background-color: #ffffff;">
          <!-- Profile Image -->
          <div style="margin-right: 20px;">
            ${defaultData.profileImage ? 
              `<img src="${defaultData.profileImage}" alt="${defaultData.name || 'Profile'}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid #FF6B35;">` :
              `<div style="width: 110px; height: 110px; border-radius: 50%; background-color: #FF6B35; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">
                ${defaultData.name ? defaultData.name.charAt(0) : "U"}
              </div>`
            }
          </div>

          <!-- Left Section - Name, Title, Social Icons -->
          <div style="flex: 1;">
            <!-- Name -->
            <div style="font-size: 24px; font-weight: 700; color: #333333; margin-bottom: 2px; line-height: 1.2;">
              ${defaultData.name || "Your Name"}
            </div>

            <!-- Job Title -->
            <div style="font-size: 14px; font-weight: 600; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">
              ${defaultData.jobTitle || "YOUR JOB TITLE"}
            </div>

            <!-- Social Icons - 3 per line -->
            <div class="social-icons-container" style="display: flex; flex-wrap: wrap; gap: 8px; max-width: 100px;">
              ${renderOrangeSocialIcons(defaultData)}
            </div>
          </div>

          <!-- Right Section - Contact Info, Company, Location -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start; margin-left: 20px; width: 200px;">
            <!-- Phone -->
            ${defaultData.phone ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">📞</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.phone}</span>
              </div>
            ` : ''}

            <!-- Email -->
            ${defaultData.email ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">✉</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.email}</span>
              </div>
            ` : ''}

            <!-- Website -->
            ${defaultData.website ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">🌐</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.website}</span>
              </div>
            ` : ''}

            <!-- Company -->
            ${defaultData.company ? `
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">🏢</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.company}</span>
              </div>
            ` : ''}

            <!-- Location -->
            ${defaultData.location ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">📍</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.location}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },


  orangetext: (designStyle, sections, formData) => {
    const defaultData = {
      name: "Sally Williams",
      jobTitle: "SALES MANAGER", 
      phone: "+1 234 56789",
      email: "s.williams@crossware365.com",
      website: "www.crossware365.com",
      company: "Crossware Inc.",
      location: "New York, USA",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      ...formData
    };

    return `
      <style>
        .orange-signature-layout .social-icons-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 100px;
        }
        
        .orange-signature-layout .social-icons-container a {
          background-color: #FF6B35 !important;
          border-radius: 50% !important;
          width: 25px !important;
          height: 25px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
          transition: all 0.3s ease !important;
        }
        
        .orange-signature-layout .social-icons-container a:hover {
          background-color: #E55A2B !important;
          transform: scale(1.1) !important;
        }
        
        .orange-signature-layout .social-icons-container svg {
          fill: white !important;
          color: white !important;
        }
        
        .orange-signature-layout .social-icons-container img {
          filter: brightness(0) invert(1) !important;
        }
      </style>

      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width: 600px; background-color: #ffffff; border: none; margin: 0; padding: 0;" class="signature-preview orange-signature-layout">
        <!-- Orange top border -->
        <div style="height: 4px; background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%); width: 100%;"></div>


          <!-- Left Section - Name, Title, Social Icons -->
          <div style="flex: 1;">
            <!-- Name -->
            <div style="font-size: 24px; font-weight: 700; color: #333333; margin-bottom: 2px; line-height: 1.2;">
              ${defaultData.name || "Your Name"}
            </div>

            <!-- Job Title -->
            <div style="font-size: 14px; font-weight: 600; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">
              ${defaultData.jobTitle || "YOUR JOB TITLE"}
            </div>

            <!-- Social Icons - 3 per line -->
            <div class="social-icons-container" style="display: flex; flex-wrap: wrap; gap: 8px; max-width: 100px;">
              ${renderOrangeSocialIcons(defaultData)}
            </div>
          </div>

          <!-- Right Section - Contact Info, Company, Location -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start; margin-left: 20px; width: 200px;">
            <!-- Phone -->
            ${defaultData.phone ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">📞</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.phone}</span>
              </div>
            ` : ''}

            <!-- Email -->
            ${defaultData.email ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">✉</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.email}</span>
              </div>
            ` : ''}

            <!-- Website -->
            ${defaultData.website ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">🌐</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.website}</span>
              </div>
            ` : ''}

            <!-- Company -->
            ${defaultData.company ? `
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">🏢</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.company}</span>
              </div>
            ` : ''}

            <!-- Location -->
            ${defaultData.location ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 10px;">📍</span>
                </div>
                <span style="font-size: 12px; color: #333333;">${defaultData.location}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  standard: (designStyle, sections) => {
    const containerStyle = {
      fontFamily: "Arial, sans-serif",
      color: designStyle.textColor || "#333",
      backgroundColor: designStyle.backgroundColor || "#f0f0f0",
      padding: "20px",
      maxWidth: "600px",
      borderRadius: "8px",
      ...(designStyle.borderStyle && { border: designStyle.borderStyle }),
      ...(designStyle.boxShadow && { boxShadow: designStyle.boxShadow }),
    };

    return `
      <div style="${styleToString(containerStyle)}">
        ${sections.greeting}
        <table style="width: 100%; border-spacing: 0; color: ${
          designStyle.textColor || "#333"
        };">
          <tr>
            <td style="padding-right: 20px; vertical-align: top;">
              ${sections.personalInfo}
            </td>
            <td style="border-left: 1px solid ${
              designStyle.accentColor || "#3498db"
            }; padding-left: 20px; vertical-align: top;">
              ${sections.contactInfo}
            </td>
          </tr>
        </table>
        ${sections.banner}
        ${sections.disclaimer}
      </div>
    `;
  },

  split: (designStyle, sections) => {
    const containerStyle = {
      fontFamily: "Arial, sans-serif",
      display: "flex",
      maxWidth: "600px",
      borderRadius: "8px",
      overflow: "hidden",
      ...(designStyle.boxShadow && { boxShadow: designStyle.boxShadow }),
    };

    const sidebarStyle = {
      width: "120px",
      backgroundColor: designStyle.accentColor || "#3498db",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
    };

    const contentStyle = {
      flex: 1,
      padding: "20px",
      backgroundColor: designStyle.backgroundColor || "#f0f0f0",
      color: designStyle.textColor || "#333",
    };

    return `
      <div style="${styleToString(containerStyle)}">
        <div style="${styleToString(sidebarStyle)}">
          <div style="text-align: center;">
            ${sections.sidebarInfo}
          </div>
        </div>
        <div style="${styleToString(contentStyle)}">
          ${sections.greeting}
          ${sections.companyInfo}
          <div style="margin-top: 10px;">
            ${sections.contactInfo}
          </div>
        </div>
      </div>
    `;
  },

  centered: (designStyle, sections) => {
    const containerStyle = {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      backgroundColor: designStyle.backgroundColor || "#f0f0f0",
      color: designStyle.textColor || "#333",
      padding: "20px",
      maxWidth: "600px",
      borderRadius: "8px",
      ...(designStyle.boxShadow && { boxShadow: designStyle.boxShadow }),
    };

    return `
      <div style="${styleToString(containerStyle)}">
        ${sections.greeting}
        ${sections.personalInfo}
        <div style="width: 60%; margin: 12px auto; height: 2px; background: ${
          designStyle.accentColor || "#3498db"
        };"></div>
        <div style="margin-top: 10px;">
          ${sections.contactInfo}
        </div>
        ${sections.banner}
        ${sections.disclaimer}
      </div>
    `;
  },

  horizontal: (designStyle, sections) => {
    const containerStyle = {
      fontFamily: "Arial, sans-serif",
      backgroundColor: designStyle.backgroundColor || "#f0f0f0",
      color: designStyle.textColor || "#333",
      maxWidth: "600px",
      borderRadius: "8px",
      overflow: "hidden",
      ...(designStyle.boxShadow && { boxShadow: designStyle.boxShadow }),
    };

    return `
      <div style="${styleToString(containerStyle)}">
        <div style="padding: 20px;">
          ${sections.greeting}
          <table style="width: 100%; border-spacing: 0;">
            <tr>
              <td style="padding-right: 20px; vertical-align: top;">
                ${sections.personalInfo}
              </td>
              <td style="vertical-align: top;">
                ${sections.contactInfo}
              </td>
            </tr>
          </table>
        </div>
        <div style="background-color: ${
          designStyle.accentColor || "#3498db"
        }; padding: 12px; color: white;">
          <p style="margin: 0; font-size: 12px; text-align: center;">Contact us for more information</p>
        </div>
        ${sections.banner}
        ${sections.disclaimer}
      </div>
    `;
  },

  bordered: (designStyle, sections) => {
    const containerStyle = {
      fontFamily: "Arial, sans-serif",
      backgroundColor: designStyle.backgroundColor || "#f0f0f0",
      color: designStyle.textColor || "#333",
      padding: "20px",
      maxWidth: "600px",
      border: `3px solid ${designStyle.accentColor || "#3498db"}`,
      borderRadius: "8px",
      ...(designStyle.boxShadow && { boxShadow: designStyle.boxShadow }),
    };

    return `
      <div style="${styleToString(containerStyle)}">
        <div style="padding: 16px;">
          ${sections.greeting}
          <table style="width: 100%; border-spacing: 0;">
            <tr>
              <td style="padding-right: 20px; vertical-align: top;">
                ${sections.personalInfo}
              </td>
              <td style="border-left: 1px solid ${
                designStyle.accentColor || "#3498db"
              }; padding-left: 20px; vertical-align: top;">
                ${sections.contactInfo}
              </td>
            </tr>
          </table>
          ${sections.banner}
          ${sections.disclaimer}
        </div>
      </div>
    `;
  },

  professional: (designStyle, sections) => {
    const containerStyle = {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: "600px",
      margin: "0",
      padding: "20px",
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
    };

    return `
      <div style="${styleToString(containerStyle)}">
        <!-- Header Section with Company Branding -->
        <div style="background-color: #f8f9fa; padding: 15px 20px; margin-bottom: 20px; border-radius: 6px; border-left: 4px solid ${designStyle.accentColor || "#007bff"};">
          <p style="font-size: 16px; font-weight: 600; color: #333333; margin: 0; line-height: 1.2;">
            ${sections.companyInfo}
          </p>
        </div>
        
        <!-- Main Content Section -->
        <div style="display: flex; gap: 20px; align-items: flex-start;">
          <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
            <div>
              ${sections.personalInfo}
            </div>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div style="margin-top: 20px; padding: 15px 0; border-top: 2px solid ${designStyle.accentColor || "#007bff"};">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; align-items: start;">
            ${sections.contactInfo}
          </div>
        </div>
        
        <!-- Social Icons -->
        <div style="margin-top: 15px; display: flex; align-items: center; gap: 10px; padding-top: 10px;">
          <span style="font-size: 12px; color: #888888; margin-right: 5px;">
            Please note the quality of the support you received:
          </span>
          ${renderSocialIcons(formData)}
        </div>
        
        <!-- Bottom Banner -->
        <div style="margin-top: 20px; background: linear-gradient(135deg, ${designStyle.accentColor || "#007bff"}, #0056b3); padding: 12px 20px; border-radius: 6px; color: white; text-align: center;">
          <div style="font-size: 16px; font-weight: 700; margin-bottom: 5px;">
            Get IT done faster than ever
          </div>
          <div style="font-size: 12px; opacity: 0.9;">
            LEARN MORE
          </div>
        </div>
        
        <!-- Footer Links -->
        <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #888888; border-top: 1px solid #eeeeee; padding-top: 10px;">
          <div style="display: flex; gap: 15px;">
            <span>example.com</span>
            <span>newsletter subscription</span>
            <span>join our community</span>
            <span>visit our store</span>
            <span>resources</span>
          </div>
          <div style="display: flex; gap: 5px;">
            <span style="width: 16px; height: 16px; border-radius: 50%; background-color: #ffc107; display: inline-block;"></span>
            <span style="width: 16px; height: 16px; border-radius: 50%; background-color: #28a745; display: inline-block;"></span>
            <span style="width: 16px; height: 16px; border-radius: 50%; background-color: #dc3545; display: inline-block;"></span>
            <span style="width: 16px; height: 16px; border-radius: 50%; background-color: #17a2b8; display: inline-block;"></span>
          </div>
        </div>
        
        <!-- Disclaimer -->
        ${sections.disclaimer || `
        <div style="margin-top: 10px; font-size: 10px; color: #999999; line-height: 1.3;">
          This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they
          are addressed. If you have received this email in error, please notify us immediately and delete the message from your system.
        </div>
        `}
      </div>
    `;
  },

  text: (designStyle, sections) => {
    const containerStyle = {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      width: "600px",
      minHeight: "180px",
      margin: "0",
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      overflow: "hidden",
    };

    return `
      <div style="${styleToString(containerStyle)}">
        <!-- Header Section -->
        <div style="display: flex; align-items: center; padding: 20px; background-color: #ffffff; min-height: 140px;">
          <!-- Contact Information -->
          <div style="width: 70%; padding-right: 20px;">
            <div style="font-size: 18px; font-weight: 700; color: #333333; margin-bottom: 2px;">
              ${formData.name || "Employee Name"}
            </div>
            <div style="font-size: 14px; color: ${designStyle.accentColor || "#0066cc"}; margin-bottom: 8px;">
              ${formData.jobTitle || "Job Title"}
            </div>
            <div style="font-size: 12px; color: #666666; line-height: 1.4;">
              ${sections.contactInfo}
            </div>
          </div>
          
          <!-- Company Name -->
          <div style="width: 30%; display: flex; align-items: center; justify-content: center; text-align: center;">
            <div style="font-size: 16px; font-weight: 700; color: #666666; padding: 10px; display: flex; align-items: center;">
              ${formData.company || "Company Name"}
            </div>
          </div>
        </div>
        
        <!-- Social Section -->
        <div style="padding: 15px 20px; display: flex; align-items: center; justify-content: flex-start;">
          ${renderSocialIcons(formData)}
        </div>
        
        ${sections.disclaimer}
      </div>
    `;
  },

  logo: (designStyle, sections, formData) => {
    const containerStyle = {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      width: "600px",
      minHeight: "180px",
      margin: "0",
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      overflow: "hidden",
    };

    return `
      <div style="${styleToString(containerStyle)}">
        <!-- Header Section -->
        <div style="display: flex; align-items: center; padding: 20px; background-color: #ffffff; min-height: 140px;">
          <!-- Logo Section - Maintains space even if empty -->
          <div style="width: 140px; min-width: 140px; display: flex; flex-direction: column; align-items: center; margin-right: 15px; ${!formData.logo ? 'visibility: hidden;' : ''}">
            ${formData.logo ? 
              `<img src="${formData.logo}" alt="Company Logo" style="width: 100px; height: 83px; object-fit: contain; margin-right: 15px; border-radius: 4px;" />` :
              `<div style="width: 80px; height: 60px; background: linear-gradient(135deg, ${designStyle.accentColor || "#0066cc"}, ${designStyle.accentColor || "#004499"}); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; margin-right: 15px; border-radius: 4px;">
                ${formData.company ? formData.company.substring(0, 3).toUpperCase() : "IDC"}
              </div>`
            }
          </div>

          <!-- Contact Information -->
          <div style="flex: 1;">
            <div style="font-size: 18px; font-weight: 700; color: #333333; margin-bottom: 2px;">
              ${formData.name || "Employee Name"}
            </div>
            <div style="font-size: 14px; color: ${designStyle.accentColor || "#0066cc"}; margin-bottom: 8px;">
              ${formData.jobTitle || "Job Title"}
            </div>
            <div style="font-size: 12px; color: #666666; line-height: 1.4;">
              ${(formData.mobilePhone || formData.phone) ? 
                `<strong>mobile:</strong> ${formData.mobilePhone || formData.phone}${formData.phone && formData.mobilePhone ? ` | <strong>tel:</strong> ${formData.phone}` : ''}<br/>` : 
                ''
              }
              ${formData.email ? `<strong>email:</strong> ${formData.email}<br/>` : ''}
              ${formData.website ? `<strong>website:</strong> ${formData.website}<br/>` : ''}
              <strong>location:</strong> ${formData.location || ""}
            </div>
          </div>

          <!-- Company Name (replaces profile image) -->
          <div style="width: 80px; min-width: 80px; height: 80px; margin-left: 20px; display: flex; align-items: center; justify-content: center; text-align: center;">
            <div style="font-size: 16px; font-weight: 700; color: #666666;">
              ${formData.company || "Company Name"}
            </div>
          </div>
        </div>

        <!-- Social Section -->
        <div style="padding: 15px 20px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            ${renderSocialIcons(formData)}
          </div>
        </div>
        
        ${sections.disclaimer}
      </div>
    `;
  },

  // NEW WITHOUT LOGO LAYOUT - Clean layout without logo prominence
  withoutProfile: (designStyle, sections, formData) => {
    const containerStyle = {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      width: "600px",
      minHeight: "180px",
      margin: "0",
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      overflow: "hidden",
    };

    return `
      <div style="${styleToString(containerStyle)}">
        <!-- Header Section with Company Logo and Contact Info -->
        <div style="display: flex; align-items: center; padding: 20px; background-color: #ffffff; min-height: 140px;">
          <!-- Logo Section - Always takes space even if empty (but hidden when no logo) -->
          <div style="width: 140px; min-width: 140px; display: flex; flex-direction: column; align-items: center; margin-right: 15px; ${!formData.logo ? 'visibility: hidden;' : ''}">
            ${formData.logo ? 
              `<img src="${formData.logo}" alt="Company Logo" style="width: 100px; height: 83px; object-fit: contain; margin-right: 15px; border-radius: 4px;" />` :
              `<div style="width: 80px; height: 60px; background: linear-gradient(135deg, ${designStyle.accentColor || "#0066cc"}, ${designStyle.accentColor || "#004499"}); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; margin-right: 15px; border-radius: 4px;">
                ${formData.company ? formData.company.substring(0, 3).toUpperCase() : "IDC"}
              </div>`
            }
            <div style="color: #666666; font-size: 14px; font-weight: 500;">
              <div style="font-size: 13px; font-weight: 700; line-height: 1.2; color: #333333; text-align: center;">
                ${formData.company || "Company"}
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div style="flex: 1;">
            <div style="font-size: 18px; font-weight: 700; color: #333333; margin-bottom: 2px;">
              ${formData.name || "Employee Name"}
            </div>
            <div style="font-size: 14px; color: ${designStyle.accentColor || "#0066cc"}; margin-bottom: 8px;">
              ${formData.jobTitle || "Job Title"}
            </div>
            <div style="font-size: 12px; color: #666666; line-height: 1.4;">
              ${(formData.mobilePhone || formData.phone) ? 
                `<strong>mobile:</strong> ${formData.mobilePhone || formData.phone}${formData.phone && formData.mobilePhone ? ` | <strong>tel:</strong> ${formData.phone}` : ''}<br/>` : 
                ''
              }
              ${formData.email ? `<strong>email:</strong> ${formData.email}<br/>` : ''}
              ${formData.website ? `<strong>website:</strong> ${formData.website}<br/>` : ''}
              <strong>location:</strong> ${formData.location || ""}
            </div>
          </div>
        </div>

        <!-- Social Section -->
        <div style="padding: 15px 20px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            ${renderSocialIcons(formData)}
          </div>
        </div>
        
        ${sections.disclaimer}
      </div>
    `;
  },

};

// Main function - FIXED to call layout functions correctly!
export const generateSignatureHTML = (
  formData,
  selectedDesign,
  designStyle
) => {
  console.log("🎯 Generating signature for design:", selectedDesign);
  console.log("🎨 Design style:", designStyle);

  // Find the design template
  const design =
    designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];
  console.log("📋 Using layout:", design.layout, "for design:", selectedDesign);

  // Generate reusable content sections
  const sections = generateContentSections(formData, designStyle);
  console.log("📝 Generated sections:", Object.keys(sections));

  // Get the layout function and generate HTML - NOW CALLED CORRECTLY!
  const layoutFunction = layoutConfigs[design.layout] || layoutConfigs.standard;

  // Call with correct parameters: layoutFunction(designStyle, sections, formData)
  const html = layoutFunction(designStyle, sections, formData);

  console.log("✅ Generated HTML length:", html.length);
  console.log("🔍 HTML preview (first 200 chars):", html.substring(0, 200));

  return html;
};

// Function to load data from localStorage
export const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("emailSignatureState");
    if (savedState) {
      const parsed = JSON.parse(savedState);
      console.log("📥 Loaded from localStorage:", {
        selectedDesign: parsed.selectedDesign,
        activeTab: parsed.activeTab,
      });
      return parsed;
    }
  } catch (error) {
    console.error("❌ Error loading from localStorage:", error);
  }
  return null;
};

// Function to save state to localStorage
export const saveToLocalStorage = (stateToSave, currentState = null) => {
  try {
    let updatedState = stateToSave;

    if (stateToSave.formData && currentState) {
      const updatedFormData = ensureFiveCampaigns(stateToSave.formData);

      updatedState = {
        formData: updatedFormData,
        activeTab: stateToSave.activeTab || currentState.activeTab,
        selectedDesign:
          stateToSave.selectedDesign || currentState.selectedDesign,
      };
    } else {
      updatedState = {
        ...stateToSave,
        activeTab:
          stateToSave.activeTab ||
          (currentState ? currentState.activeTab : "Personal Info"),
      };
    }

    console.log("💾 Saving to localStorage:", {
      selectedDesign: updatedState.selectedDesign,
      activeTab: updatedState.activeTab,
    });
    localStorage.setItem("emailSignatureState", JSON.stringify(updatedState));
    return updatedState.formData;
  } catch (error) {
    console.error("❌ Error saving to localStorage:", error);
    return stateToSave.formData;
  }
};