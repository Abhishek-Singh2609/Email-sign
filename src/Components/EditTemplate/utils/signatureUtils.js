// Email-Compatible signatureUtils.js - FIXED Mobile Phone & Job Title Issues
import { designTemplates } from "../Tabs/DesignTab";

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
          { url: "", text: "Link 1", area: { x: 0, y: 0, width: 33, height: 100 } },
          { url: "", text: "Link 2", area: { x: 33, y: 0, width: 34, height: 100 } },
          { url: "", text: "Link 3", area: { x: 67, y: 0, width: 33, height: 100 } },
        ],
      });
    }
    return { ...formDataToUpdate, campaigns: updatedCampaigns };
  }
  return formDataToUpdate;
};

export const getActiveCampaigns = (campaigns) => {
  return campaigns.filter(
    (campaign) =>
      campaign.active &&
      campaign.image &&
      !(campaign.startDate && new Date() < new Date(campaign.startDate)) &&
      !(campaign.expiryDate && new Date() > new Date(campaign.expiryDate))
  );
};

const getUserInitials = (name) => {
  if (!name || name === "Employee Name" || name.includes("{{")) return "ID";
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length === 0) return "ID";
  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
  if (nameParts.length === 1) return firstNameInitial;
  const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  return firstNameInitial + lastNameInitial;
};

const renderSocialIcons = (formData) => {
  const socialIcons = [
    { key: "linkedin", icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png", alt: "LinkedIn" },
    { key: "youtube", icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png", alt: "YouTube" },
    { key: "instagram", icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png", alt: "Instagram" },
    { key: "facebook", icon: "https://cdn-icons-png.flaticon.com/24/145/145802.png", alt: "Facebook" },
    { key: "twitter", icon: "https://cdn-icons-png.flaticon.com/24/145/145812.png", alt: "Twitter" },
    { key: "github", icon: "https://cdn-icons-png.flaticon.com/24/733/733553.png", alt: "GitHub" },
  ];

  const socialLinks = socialIcons
    .filter((social) => formData[social.key])
    .map((social, index, array) => {
      const marginRight = index === array.length - 1 ? "0" : "8";
      return '<a href="' + formData[social.key] + '" style="text-decoration: none; margin-right: ' + marginRight + 'px;"><img src="' + social.icon + '" alt="' + social.alt + '" width="20" height="20" style="vertical-align: middle; border: none; display: inline-block;"></a>';
    });

  return socialLinks.length > 0 ? socialLinks.join("") : "";
};

const renderOrangeSocialIcons = (formData) => {
  const socialIcons = [
    { key: "linkedin", icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png", alt: "LinkedIn" },
    { key: "youtube", icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png", alt: "YouTube" },
    { key: "instagram", icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png", alt: "Instagram" },
    { key: "facebook", icon: "https://cdn-icons-png.flaticon.com/24/145/145802.png", alt: "Facebook" },
    { key: "twitter", icon: "https://cdn-icons-png.flaticon.com/24/145/145812.png", alt: "Twitter" },
    { key: "github", icon: "https://cdn-icons-png.flaticon.com/24/733/733553.png", alt: "GitHub" },
  ];

  const socialLinks = socialIcons
    .filter((social) => formData[social.key])
    .map((social, index) => {
      const marginRight = index === 2 ? "0" : "6";
      return '<a href="' + formData[social.key] + '" style="text-decoration: none; margin-right: ' + marginRight + 'px; margin-bottom: 4px; display: inline-block; background-color: #FF6B35; border-radius: 12px; width: 24px; height: 24px; text-align: center; line-height: 24px;"><img src="' + social.icon + '" alt="' + social.alt + '" width="12" height="12" style="vertical-align: middle; border: none; filter: brightness(0) invert(1);"></a>';
    });

  return socialLinks.length > 0 ? socialLinks.join("") : "";
};

// FIXED: Ensure all form data fields are properly accessible with correct API mapping
const ensureFormData = (formData) => {
  console.log("🔧 ensureFormData input:", formData);
  
  // Handle API data format vs form data format
  const result = {
    name: formData.displayName || formData.name || "Employee Name",
    jobTitle: formData.jobTitle || "Job Title", 
    company: formData.company || "Agile World Technologies LLC",
    email: formData.mail || formData.email || "email@example.com",
    phone: formData.businessPhones?.[0] || formData.phone || "", // Regular phone
    mobilePhone: formData.mobilePhone || "", // Mobile phone from API
    location: formData.officeLocation || formData.location || "Location",
    website: formData.website || "www.agileworldtechnologies.com",
    linkedin: formData.linkedin || "",
    twitter: formData.twitter || "",
    instagram: formData.instagram || "",
    facebook: formData.facebook || "",
    youtube: formData.youtube || "",
    github: formData.github || "",
    portfolio: formData.portfolio || "",
    profileImage: formData.profileImage || null,
    logo: formData.logo || null,
    banner: formData.banner || null,
    disclaimer: formData.disclaimer || "",
    campaigns: formData.campaigns || [],
  };
  
  console.log("🔧 ensureFormData output:", {
    name: result.name,
    jobTitle: result.jobTitle,
    phone: result.phone,
    mobilePhone: result.mobilePhone,
    email: result.email
  });
  
  return result;
};

// EMAIL-COMPATIBLE LAYOUT CONFIGURATIONS - FIXED
const layoutConfigs = {
  // PROFESSIONAL LAYOUT - Fixed to show mobile phone and job title properly
  professional: (designStyle, sections, formData) => {
    const data = ensureFormData(formData);
    const accentColor = designStyle.accentColor || "#0066cc";
    
    console.log("🎯 Professional layout data:", {
      name: data.name,
      jobTitle: data.jobTitle,
      phone: data.phone,
      mobilePhone: data.mobilePhone
    });
    
    // Logo section
    const logoSection = data.logo ? 
      '<img src="' + data.logo + '" alt="Company Logo" width="100" height="83" style="border: none; border-radius: 4px; display: block;">' :
      '<div style="width: 80px; height: 60px; background-color: ' + accentColor + '; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; text-align: center; line-height: 60px; display: block;">' + getUserInitials(data.name) + '</div>';

    // FIXED: Enhanced contact details with proper phone handling
    const contactDetails = [];
    
    // Mobile phone gets priority and "mobile:" label
    if (data.mobilePhone) {
      contactDetails.push('<b>mobile:</b> ' + data.mobilePhone);
    }
    
    // Regular phone with "tel:" label if both phones exist, or "phone:" if only regular exists
    if (data.phone && data.phone !== data.mobilePhone) {
      const phoneLabel = data.mobilePhone ? "tel" : "phone";
      contactDetails.push('<b>' + phoneLabel + ':</b> ' + data.phone);
    }
    
    // If no mobile phone but regular phone exists, use "mobile:" label for regular phone
    if (!data.mobilePhone && data.phone) {
      contactDetails.push('<b>mobile:</b> ' + data.phone);
    }
    
    if (data.email) {
      contactDetails.push('<b>email:</b> <a href="mailto:' + data.email + '" style="color: #666666; text-decoration: none;">' + data.email + '</a>');
    }
    
    if (data.website) {
      const websiteUrl = data.website.startsWith('http') ? data.website : 'https://' + data.website;
      const displayUrl = data.website.replace(/^https?:\/\//, '');
      contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
    }
    
    if (data.location) {
      contactDetails.push('<b>location:</b> ' + data.location);
    }

    // Profile image
    const profileImageSection = data.profileImage ? 
      '<img src="' + data.profileImage + '" alt="' + data.name + '" width="80" height="80" style="border-radius: 6px; border: 2px solid #e0e0e0; display: block;">' : '';

    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse;">' +
      '<tr>' +
        '<td width="140" valign="top" style="padding: 20px; text-align: center;">' +
          logoSection +
          '<div style="font-size: 12px; font-weight: bold; color: #333333; margin-top: 4px;">' + data.company + '</div>' +
        '</td>' +
        '<td valign="top" style="padding: 20px;">' +
          '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 2px;">' + data.name + '</div>' +
          '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + data.jobTitle + '</div>' +
          '<div style="font-size: 12px; color: #666666; line-height: 1.4;">' + contactDetails.join('<br>') + '</div>' +
        '</td>' +
        '<td width="80" valign="top" style="padding: 20px; text-align: center;">' +
          profileImageSection +
        '</td>' +
      '</tr>' +
      '<tr>' +
        '<td colspan="3" style="padding: 8px 20px;">' +
          '<div style="margin-top: 8px;">' + renderSocialIcons(data) + '</div>' +
        '</td>' +
      '</tr>' +
    '</table>';
  },

  // ORANGE LAYOUT - Fixed to show mobile phone and job title properly
  orange: (designStyle, sections, formData) => {
    const data = ensureFormData(formData);
    
    console.log("🍊 Orange layout data:", {
      name: data.name,
      jobTitle: data.jobTitle,
      phone: data.phone,
      mobilePhone: data.mobilePhone
    });
    
    // Profile section
    const profileSection = data.profileImage ? 
      '<img src="' + data.profileImage + '" alt="' + data.name + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block;">' :
      '<div style="width: 110px; height: 110px; border-radius: 55px; background-color: #FF6B35; color: white; font-size: 36px; font-weight: bold; text-align: center; line-height: 110px; display: block;">' + (data.name && !data.name.includes('{{') ? data.name.charAt(0) : "U") + '</div>';

    // FIXED: Contact items with proper phone handling for Orange layout
    const contactItems = [];
    
    // Mobile phone gets priority
    if (data.mobilePhone) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📱</span><span style="font-size: 12px; color: #333333;">' + data.mobilePhone + '</span></div>');
    }
    
    // Regular phone with different icon if both exist
    if (data.phone && data.phone !== data.mobilePhone) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📞</span><span style="font-size: 12px; color: #333333;">' + data.phone + '</span></div>');
    }
    
    // If no mobile phone but regular phone exists, use mobile icon for regular phone
    if (!data.mobilePhone && data.phone) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📱</span><span style="font-size: 12px; color: #333333;">' + data.phone + '</span></div>');
    }
    
    if (data.email) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">✉</span><span style="font-size: 12px; color: #333333;">' + data.email + '</span></div>');
    }
    
    if (data.website) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🌐</span><span style="font-size: 12px; color: #333333;">' + data.website + '</span></div>');
    }
    
    if (data.company) {
      contactItems.push('<div style="margin-bottom: 8px; margin-top: 10px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🏢</span><span style="font-size: 12px; color: #333333;">' + data.company + '</span></div>');
    }
    
    if (data.location) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📍</span><span style="font-size: 12px; color: #333333;">' + data.location + '</span></div>');
    }

    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
      '<tr>' +
        '<td colspan="3" style="height: 4px; background-color: #FF6B35;"></td>' +
      '</tr>' +
      '<tr>' +
        '<td width="130" valign="top" style="padding: 20px; text-align: center;">' +
          profileSection +
        '</td>' +
        '<td valign="top" style="padding: 20px;">' +
          '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + data.name + '</div>' +
          '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + data.jobTitle.toUpperCase() + '</div>' +
          '<div style="margin-bottom: 10px;">' + renderOrangeSocialIcons(data) + '</div>' +
        '</td>' +
        '<td width="200" valign="top" style="padding: 20px;">' +
          contactItems.join('') +
        '</td>' +
      '</tr>' +
    '</table>';
  },

  orangecenter: (designStyle, sections, formData) => {
    return layoutConfigs.orange(designStyle, sections, formData);
  },

  orangetext: (designStyle, sections, formData) => {
    const data = ensureFormData(formData);
    
    const contactItems = [];
    
    // FIXED: Phone handling for orangetext layout
    if (data.mobilePhone) {
      contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📱 ' + data.mobilePhone + '</span></div>');
    }
    
    if (data.phone && data.phone !== data.mobilePhone) {
      contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📞 ' + data.phone + '</span></div>');
    }
    
    if (!data.mobilePhone && data.phone) {
      contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📱 ' + data.phone + '</span></div>');
    }
    
    if (data.email) {
      contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">✉ ' + data.email + '</span></div>');
    }
    
    if (data.website) {
      contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🌐 ' + data.website + '</span></div>');
    }
    
    if (data.company) {
      contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🏢 ' + data.company + '</span></div>');
    }
    
    if (data.location) {
      contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📍 ' + data.location + '</span></div>');
    }

    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
      '<tr>' +
        '<td style="height: 4px; background-color: #FF6B35;"></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="padding: 20px;">' +
          '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + data.name + '</div>' +
          '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + data.jobTitle.toUpperCase() + '</div>' +
          '<div style="margin-bottom: 15px;">' + renderOrangeSocialIcons(data) + '</div>' +
          '<div>' + contactItems.join('') + '</div>' +
        '</td>' +
      '</tr>' +
    '</table>';
  },

  // STANDARD LAYOUT - Fixed to use proper form data
  standard: (designStyle, sections, formData) => {
    const textColor = designStyle.textColor || "#333";
    const accentColor = designStyle.accentColor || "#3498db";
    const backgroundColor = designStyle.backgroundColor || "#f0f0f0";

    return '<table width="600" cellpadding="20" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: ' + backgroundColor + '; border-radius: 8px;">' +
      '<tr>' +
        '<td>' +
          '<p style="margin-bottom: 10px; color: ' + textColor + ';">Thanks & Regards,</p>' +
          '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">' +
            '<tr>' +
              '<td width="50%" valign="top" style="padding-right: 20px; color: ' + textColor + ';">' + sections.personalInfo + '</td>' +
              '<td width="1" style="background-color: ' + accentColor + ';"></td>' +
              '<td width="50%" valign="top" style="padding-left: 20px; color: ' + textColor + ';">' + sections.contactInfo + '</td>' +
            '</tr>' +
          '</table>' +
          sections.banner + sections.disclaimer +
        '</td>' +
      '</tr>' +
    '</table>';
  },

  // TEXT LAYOUT - Fixed to show all data
  text: (designStyle, sections, formData) => {
    const data = ensureFormData(formData);
    const accentColor = designStyle.accentColor || "#0066cc";
    
    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">' +
      '<tr>' +
        '<td width="70%" valign="top" style="padding: 20px;">' +
          '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 2px;">' + data.name + '</div>' +
          '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + data.jobTitle + '</div>' +
          '<div style="font-size: 12px; color: #666666; line-height: 1.4;">' + sections.contactInfo + '</div>' +
        '</td>' +
        '<td width="30%" valign="middle" style="padding: 20px; text-align: center;">' +
          '<div style="font-size: 16px; font-weight: bold; color: #666666;">' + data.company + '</div>' +
        '</td>' +
      '</tr>' +
      '<tr>' +
        '<td colspan="2" style="padding: 15px 20px;">' +
          renderSocialIcons(data) +
        '</td>' +
      '</tr>' +
    '</table>';
  },
};

// FIXED: Generate content sections with proper phone handling
const generateContentSections = (formData, designStyle) => {
  const data = ensureFormData(formData);
  const textColor = designStyle.textColor || "#333";
  const nameColor = designStyle.nameColor || "#3498db";
  const accentColor = designStyle.accentColor || "#3498db";

  // FIXED: Enhanced phone handling with mobile priority
  let phoneInfo = "";
  if (data.mobilePhone) {
    phoneInfo = '<p style="margin: 0; font-size: 14px;">📱 ' + data.mobilePhone + '</p>';
    if (data.phone && data.phone !== data.mobilePhone) {
      phoneInfo += '<p style="margin: 2px 0; font-size: 14px;">📞 ' + data.phone + '</p>';
    }
  } else if (data.phone) {
    phoneInfo = '<p style="margin: 0; font-size: 14px;">📱 ' + data.phone + '</p>';
  }

  return {
    greeting: '<p style="margin-bottom: 10px; color: ' + textColor + ';">Thanks & Regards,</p>',
    
    personalInfo: '<p style="margin: 0; font-size: 16px; font-weight: bold; color: ' + nameColor + ';">' + data.name + '</p>' +
      '<p style="margin: 2px 0; font-size: 14px; color: ' + accentColor + ';">' + data.jobTitle + '</p>' +
      '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: ' + textColor + ';">' + data.company + '</p>' +
      '<p style="margin: 2px 0 0 0; font-size: 14px; color: ' + textColor + ';">' + data.location + '</p>',
    
    sidebarInfo: '<p style="margin: 0; font-size: 14px; font-weight: bold;">' + data.name + '</p>' +
      '<p style="margin: 5px 0; font-size: 12px;">' + data.jobTitle + '</p>',
    
    companyInfo: '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">' + data.company + '</p>' +
      '<p style="margin: 2px 0 0 0; font-size: 14px;">' + data.location + '</p>',
    
    contactInfo: phoneInfo +
      '<p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:' + data.email + '" style="color: ' + accentColor + '; text-decoration: none;">' + data.email + '</a></p>' +
      '<p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://' + data.website + '" style="color: ' + accentColor + '; text-decoration: none;">' + data.website + '</a></p>' +
      renderSocialIcons(data),
    
    banner: data.banner ? '<div style="margin-top: 20px;"><img src="' + data.banner + '" alt="Banner" width="100%" style="height: auto; border-radius: 8px; display: block; border: none;"></div>' : "",
    
    disclaimer: data.disclaimer ? '<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><b>DISCLAIMER</b></p><p style="margin-top: 5px;">' + data.disclaimer + '</p></div>' : "",
  };
};

export const generateSignatureHTML = (formData, selectedDesign, designStyle) => {
  console.log("🔧 Generating signature HTML with data:", {
    name: formData.name || formData.displayName,
    jobTitle: formData.jobTitle,
    email: formData.email || formData.mail,
    phone: formData.phone || (formData.businessPhones ? formData.businessPhones[0] : null),
    mobilePhone: formData.mobilePhone,
    company: formData.company,
    location: formData.location || formData.officeLocation
  });
  
  const design = designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];
  const sections = generateContentSections(formData, designStyle);
  const layoutFunction = layoutConfigs[design.layout] || layoutConfigs.standard;
  const html = layoutFunction(designStyle, sections, formData);
  
  // Clean HTML but keep it email-compatible
  const cleanHTML = html.replace(/\s+/g, ' ').trim();
  return cleanHTML;
};

export const generateSignatureTemplate = (selectedDesign, designStyle, staticFormData = {}) => {
  console.log("🎯 Generating TEMPLATE with placeholders for design:", selectedDesign);
  
  // Create template data with placeholders for dynamic fields and static data for others
  const templateFormData = {
    // Dynamic fields that should be replaced per employee
    name: "{{name}}",
    displayName: "{{name}}", // Ensure both forms work
    jobTitle: "{{jobTitle}}",
    email: "{{email}}",
    mail: "{{email}}", // Ensure both forms work
    phone: "{{phone}}",
    businessPhones: ["{{phone}}"], // API format
    mobilePhone: "{{mobilePhone}}",
    location: "{{location}}",
    officeLocation: "{{location}}", // API format
    
    // Static fields that remain the same for all employees
    company: staticFormData.company || "Agile World Technologies LLC",
    website: staticFormData.website || "www.agileworldtechnologies.com",
    linkedin: staticFormData.linkedin || "",
    twitter: staticFormData.twitter || "",
    instagram: staticFormData.instagram || "",
    facebook: staticFormData.facebook || "",
    youtube: staticFormData.youtube || "",
    github: staticFormData.github || "",
    portfolio: staticFormData.portfolio || "",
    profileImage: staticFormData.profileImage || null,
    logo: staticFormData.logo || null,
    banner: staticFormData.banner || null,
    disclaimer: staticFormData.disclaimer || "",
    campaigns: staticFormData.campaigns || [],
  };

  console.log("📝 Template data:", {
    name: templateFormData.name,
    email: templateFormData.email,
    jobTitle: templateFormData.jobTitle,
    phone: templateFormData.phone,
    mobilePhone: templateFormData.mobilePhone,
    company: templateFormData.company,
    website: templateFormData.website
  });

  const templateHTML = generateSignatureHTML(templateFormData, selectedDesign, designStyle);
  
  // Verify template has placeholders
  const hasPlaceholders = templateHTML.includes('{{name}}') && templateHTML.includes('{{email}}') && templateHTML.includes('{{jobTitle}}');
  console.log("✅ Template contains placeholders:", hasPlaceholders);
  console.log("📄 Template preview:", templateHTML.substring(0, 300) + "...");
  
  return templateHTML;
};

export const validateTemplatePlaceholders = (htmlTemplate) => {
  const requiredPlaceholders = ['{{name}}', '{{email}}', '{{jobTitle}}', '{{phone}}', '{{mobilePhone}}'];
  const missingPlaceholders = requiredPlaceholders.filter(placeholder => 
    !htmlTemplate.includes(placeholder)
  );
  
  if (missingPlaceholders.length > 0) {
    console.warn('Missing required placeholders:', missingPlaceholders);
  }
  
  return missingPlaceholders.length === 0;
};

export const replacePlaceholders = (template, employeeData) => {
  let result = template;
  
  console.log("🔄 Replacing placeholders with employee data:", {
    displayName: employeeData.displayName,
    jobTitle: employeeData.jobTitle,
    mail: employeeData.mail,
    businessPhones: employeeData.businessPhones,
    mobilePhone: employeeData.mobilePhone,
    officeLocation: employeeData.officeLocation
  });
  
  const placeholderMap = {
    '{{name}}': employeeData.displayName || employeeData.name || '',
    '{{jobTitle}}': employeeData.jobTitle || employeeData.title || '',
    '{{email}}': employeeData.mail || employeeData.email || '',
    '{{phone}}': employeeData.businessPhones?.[0] || employeeData.phone || '',
    '{{mobilePhone}}': employeeData.mobilePhone || '',
    '{{location}}': employeeData.officeLocation || employeeData.location || '',
    '{{company}}': employeeData.company || 'Agile World Technologies LLC',
    '{{website}}': employeeData.website || 'www.agileworldtechnologies.com',
    '{{department}}': employeeData.department || ''
  };
  
  console.log("🔄 Placeholder mapping:", placeholderMap);
  
  Object.entries(placeholderMap).forEach(([placeholder, value]) => {
    result = result.replace(new RegExp(placeholder.replace(/[{}]/g, '\\    officeLocation: "{{'), 'g'), value);
  });
  
  console.log("✅ Template after replacement preview:", result.substring(0, 300));
  
  return result;
};

export const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("emailSignatureState");
    if (savedState) {
      const parsed = JSON.parse(savedState);
      console.log("Loaded from localStorage");
      return parsed;
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
  return null;
};

export const saveToLocalStorage = (stateToSave, currentState = null) => {
  try {
    let updatedState;

    if (stateToSave.formData && currentState) {
      const updatedFormData = ensureFiveCampaigns(stateToSave.formData);
      updatedState = {
        formData: updatedFormData,
        activeTab: stateToSave.activeTab || currentState.activeTab,
        selectedDesign: stateToSave.selectedDesign || currentState.selectedDesign,
      };
    } else {
      updatedState = {
        ...stateToSave,
        activeTab: stateToSave.activeTab || (currentState ? currentState.activeTab : "Personal Info"),
      };
    }

    console.log("Saving to localStorage");
    localStorage.setItem("emailSignatureState", JSON.stringify(updatedState));
    return updatedState.formData;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return stateToSave.formData;
  }
};