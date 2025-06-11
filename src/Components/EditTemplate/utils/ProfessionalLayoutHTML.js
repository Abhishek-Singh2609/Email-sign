// Function to generate HTML for Professional Layout with inline CSS
export const generateProfessionalLayoutHTML = (formData, designStyle = {}) => {
  // Default form data with fallbacks
  const defaultData = {
    name: "Employee Name",
    jobTitle: "Job Title", 
    company: "Company Name",
    location: "Location",
    phone: "",
    mobilePhone: "",
    email: "",
    website: "",
    logo: null,
    profileImage: null,
    linkedin: "",
    youtube: "",
    instagram: "",
    facebook: "",
    twitter: "",
    github: "",
    ...formData
  };

  // Function to get user initials
  const getUserInitials = () => {
    if (!defaultData.name || defaultData.name === "Employee Name") return "ID";
    
    const nameParts = defaultData.name.trim().split(/\s+/);
    if (nameParts.length === 0) return "ID";
    
    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    
    if (nameParts.length === 1) return firstNameInitial;
    
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  };

  // Generate social icons HTML
  const renderSocialIcons = () => {
    const socialIcons = [
      {
        key: "linkedin",
        icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png",
        alt: "LinkedIn",
        url: defaultData.linkedin
      },
      {
        key: "youtube", 
        icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png",
        alt: "YouTube",
        url: defaultData.youtube
      },
      {
        key: "instagram",
        icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png", 
        alt: "Instagram",
        url: defaultData.instagram
      },
      {
        key: "facebook",
        icon: "https://cdn-icons-png.flaticon.com/24/145/145802.png",
        alt: "Facebook", 
        url: defaultData.facebook
      },
      {
        key: "twitter",
        icon: "https://cdn-icons-png.flaticon.com/24/145/145812.png",
        alt: "Twitter",
        url: defaultData.twitter
      },
      {
        key: "github",
        icon: "https://cdn-icons-png.flaticon.com/24/733/733553.png",
        alt: "GitHub",
        url: defaultData.github
      }
    ];

    const socialLinks = socialIcons
      .filter((social) => social.url && social.url.trim() !== "")
      .map((social, index, array) => 
        `<a href="${social.url}" style="margin-right: ${index === array.length - 1 ? "0" : "10px"}; text-decoration: none;">
          <img src="${social.icon}" alt="${social.alt}" style="vertical-align: middle; width: 24px; height: 24px;">
        </a>`
      );

    return socialLinks.length > 0 ? socialLinks.join("") : "";
  };

  // Main HTML template with inline CSS
  const htmlTemplate = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width: 600px; min-height: 180px; margin: 0; border-radius: 8px; overflow: hidden; ${designStyle.containerStyle ? Object.entries(designStyle.containerStyle).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ') : ''}">
  
  <!-- Header Section with Company Logo and Contact Info -->
  <div style="display: flex; align-items: center; background-color: #ffffff; min-height: 140px;">
    
    <!-- Logo Section - Always takes space even if empty -->
    <div style="width: 140px; min-width: 140px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      ${defaultData.logo ? 
        `<img src="${defaultData.logo}" alt="Company Logo" style="width: 100px; height: 83px; object-fit: contain; border-radius: 4px;">
         <div style="font-size: 12px; font-weight: 650; line-height: 1.2; color: #333333; text-align: center; margin-top: 4px;">
           ${defaultData.company}
         </div>` :
        `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
           <div style="width: 80px; height: 60px; background: linear-gradient(135deg, ${designStyle.accentColor || "#0066cc"}, ${designStyle.accentColor ? designStyle.accentColor.replace('#', '#00') + '99' : "#004499"}); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; margin-bottom: 8px;">
             ${getUserInitials()}
           </div>
           <div style="font-size: 12px; font-weight: 650; line-height: 1.2; color: #333333; text-align: center;">
             ${defaultData.company}
           </div>
         </div>`
      }
    </div>

    <!-- Contact Information -->
    <div style="flex: 1; padding-left: 20px; padding-right: 20px;">
      <div style="font-size: 18px; font-weight: 700; color: #333333; margin-bottom: 2px;">
        ${defaultData.name}
      </div>
      <div style="font-size: 14px; color: ${designStyle.accentColor || "#0066cc"}; margin-bottom: 8px;">
        ${defaultData.jobTitle}
      </div>
      <div style="font-size: 12px; color: #666666; line-height: 1.4;">
        ${(defaultData.mobilePhone || defaultData.phone) ? 
          `<strong>mobile:</strong> ${defaultData.mobilePhone || defaultData.phone}${defaultData.phone && defaultData.mobilePhone ? ` | <strong>tel:</strong> ${defaultData.phone}` : ''}<br/>` : 
          ''
        }
        ${defaultData.email ? 
          `<strong>email:</strong> <a href="mailto:${defaultData.email}" style="color: #666666; text-decoration: none;">${defaultData.email}</a><br/>` : 
          ''
        }
        ${defaultData.website ? 
          `<strong>website:</strong> <a href="${defaultData.website.startsWith('http') ? defaultData.website : `https://${defaultData.website}`}" target="_blank" rel="noopener noreferrer" style="color: #666666; text-decoration: none;">${defaultData.website.replace(/^https?:\/\//, '')}</a><br/>` : 
          ''
        }
        <strong>location:</strong> ${defaultData.location || ""}
      </div>
    </div>

    <!-- Profile Image - Always takes space even if empty -->
    <div style="min-width: 80px; height: 80px; ${!defaultData.profileImage ? 'visibility: hidden;' : ''}">
      ${defaultData.profileImage ? 
        `<img src="${defaultData.profileImage}" alt="${defaultData.name || 'Profile'}" style="width: 100%; height: 100%; border-radius: 6px; object-fit: cover; border: 2px solid #e0e0e0;">` :
        ''
      }
    </div>
  </div>

  <!-- Social Section -->
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 20px;">
    <div>
      <!-- Social Icons -->
      <div style="margin-top: 8px;">
        ${renderSocialIcons()}
      </div>
    </div>
  </div>
</div>`;

  return htmlTemplate;
};

// Updated layoutConfigs professional function to use the new HTML generator
export const professionalLayoutConfig = (designStyle, sections, formData) => {
  return generateProfessionalLayoutHTML(formData, designStyle);
};

// Example usage function
export const generateEmailSignaturePayload = (formData, designStyle = {}) => {
  const htmlSignature = generateProfessionalLayoutHTML(formData, designStyle);
  
  // This is the payload you can send to your email API
  const emailPayload = {
    signature: htmlSignature,
    // Add other email configuration as needed
    signatureType: "professional",
    isActive: true
  };
  
  return emailPayload;
};

// Template placeholder version for bulk generation
export const generateProfessionalTemplateHTML = (staticFormData = {}, designStyle = {}) => {
  const templateData = {
    name: "{{name}}",
    jobTitle: "{{jobTitle}}",
    company: staticFormData.company || "{{company}}",
    location: staticFormData.location || "{{location}}",
    email: "{{email}}",
    phone: "{{phone}}", 
    mobilePhone: "{{mobilePhone}}",
    website: staticFormData.website || "{{website}}",
    logo: staticFormData.logo || null,
    profileImage: "{{profileImage}}" || null,
    linkedin: staticFormData.linkedin || "{{linkedin}}",
    youtube: staticFormData.youtube || "{{youtube}}",
    instagram: staticFormData.instagram || "{{instagram}}",
    facebook: staticFormData.facebook || "{{facebook}}",
    twitter: staticFormData.twitter || "{{twitter}}",
    github: staticFormData.github || "{{github}}",
    ...staticFormData
  };

  return generateProfessionalLayoutHTML(templateData, designStyle);
};

// Function to replace template placeholders with actual data
export const replacePlaceholdersInHTML = (htmlTemplate, employeeData) => {
  let result = htmlTemplate;
  
  const placeholderMap = {
    '{{name}}': employeeData.displayName || employeeData.name || 'Employee Name',
    '{{jobTitle}}': employeeData.jobTitle || employeeData.title || 'Job Title',
    '{{email}}': employeeData.mail || employeeData.email || '',
    '{{phone}}': employeeData.businessPhones?.[0] || employeeData.phone || '',
    '{{mobilePhone}}': employeeData.mobilePhone || '',
    '{{location}}': employeeData.officeLocation || employeeData.location || 'Location',
    '{{company}}': employeeData.company || 'Company Name',
    '{{website}}': employeeData.website || '',
    '{{profileImage}}': employeeData.profileImage || '',
    '{{linkedin}}': employeeData.linkedin || '',
    '{{youtube}}': employeeData.youtube || '',
    '{{instagram}}': employeeData.instagram || '',
    '{{facebook}}': employeeData.facebook || '',
    '{{twitter}}': employeeData.twitter || '',
    '{{github}}': employeeData.github || ''
  };
  
  Object.entries(placeholderMap).forEach(([placeholder, value]) => {
    const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
    result = result.replace(regex, value || '');
  });
  
  return result;
};