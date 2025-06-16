// Email-Compatible signatureUtils.js - Fixed phone numbers and bulk apply
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
  if (!name || name === "Employee Name") return "ID";
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

// EMAIL-COMPATIBLE LAYOUT CONFIGURATIONS - FIXED
const layoutConfigs = {
  // PROFESSIONAL LAYOUT - Fixed to use actual formData
 professional: (designStyle, sections, formData) => {
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
      ...formData // This ensures formData overrides defaults
    };

    const accentColor = designStyle.accentColor || "#0066cc";
    
    // Logo section - email compatible
    const logoSection = defaultData.logo ? 
      '<img src="' + defaultData.logo + '" alt="Company Logo" width="100" height="83" style="border: none; border-radius: 4px; display: block;">' :
      '<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;"><tr><td width="80" height="60" style="background-color: ' + accentColor + '; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; text-align: center; line-height: 60px;">' + getUserInitials(defaultData.name) + '</td></tr></table>';

    // Contact details
    const contactDetails = [];
    if (defaultData.mobilePhone || defaultData.phone) {
      const phoneToShow = defaultData.mobilePhone || defaultData.phone;
      contactDetails.push('<b>mobile:</b> ' + phoneToShow + (defaultData.phone && defaultData.mobilePhone && defaultData.phone !== defaultData.mobilePhone ? ' | <b>tel:</b> ' + defaultData.phone : ''));
    }
    if (defaultData.email) {
      contactDetails.push('<b>email:</b> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
    }
    if (defaultData.website) {
      const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
      const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
      contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
    }
    if (defaultData.location) {
      contactDetails.push('<b>location:</b> ' + defaultData.location);
    }

    // Profile image - email compatible
    const profileImageSection = defaultData.profileImage ? 
      '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="80" height="80" style="border-radius: 6px; border: 2px solid #e0e0e0; display: block;">' : '';

    // EMAIL-COMPATIBLE TABLE STRUCTURE
    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse;">' +
      '<tr>' +
         '<td width="140" style="padding: 20px 0px 20px 0px; text-align: center;">' +
      logoSection +
      '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
        '<tr>' +
          '<td style="font-size: 12px; font-weight: bold; color: #333333; padding-top: 4px;">' +
            defaultData.company +
          '</td>' +
        '</tr>' +
      '</table>' +
    '</td>' +
        '<td valign="top" style="padding: 20px 0px 20px 0px">' +
          '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
        '<tr>' +
          '<td style="font-size: 18px; font-weight: bold; color: #333333; padding-bottom: 2px;">' +
            defaultData.name +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="font-size: 14px; color: ' + accentColor + '; padding-bottom: 8px;">' +
            defaultData.jobTitle +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="font-size: 12px; color: #666666; line-height: 1.4;">' +
            contactDetails.join('<br>') +
          '</td>' +
        '</tr>' +
      '</table>' +
        '</td>' +
      '<td width="80" valign="top" style="padding: 7px; text-align: center;">' +
      (defaultData.profileImage ? profileImageSection : '') +
    '</td>' +
      '</tr>' +
      '<tr>' +
        '<td colspan="3" style="padding: 8px 0px;">' +
          '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
        '<tr>' +
          '<td style="padding-top: 8px;">' +
            renderSocialIcons(defaultData) +
          '</td>' +
        '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
    '</table>';
  },
// Logo Layout - Email Compatible HTML Table Version
logo: (designStyle, sections, formData) => {
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
    ...formData // This ensures formData overrides defaults
  };

  const accentColor = designStyle.accentColor || "#0066cc";
  
  // Logo section - email compatible
  const logoSection = defaultData.logo ? 
    '<img src="' + defaultData.logo + '" alt="Company Logo" width="100" height="83" style="border: none; border-radius: 4px; display: block; object-fit: contain;">' :
    '<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;"><tr><td width="80" height="60" style="background-color: ' + accentColor + ';  color: white; font-weight: bold; font-size: 24px; border-radius: 4px; text-align: center; line-height: 60px;">' + getUserInitials(defaultData.name) + '</td></tr></table>';

  // Contact details with proper formatting
  const contactDetails = [];
  
  if (defaultData.mobilePhone || defaultData.phone) {
    const phoneToShow = defaultData.mobilePhone || defaultData.phone;
    contactDetails.push('<b>mobile:</b> ' + phoneToShow + (defaultData.phone && defaultData.mobilePhone && defaultData.phone !== defaultData.mobilePhone ? ' | <b>tel:</b> ' + defaultData.phone : ''));
  }
  
  if (defaultData.email) {
    contactDetails.push('<b>email:</b> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
  }
  
  if (defaultData.website) {
    const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
    const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
    contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
  }
  
  if (defaultData.location) {
    contactDetails.push('<b>location:</b> ' + defaultData.location);
  }

  // EMAIL-COMPATIBLE TABLE STRUCTURE
  return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse; background-color: #ffffff; min-height: 180px;">' +
    // Main content row
    '<tr>' +
      // Logo Section (118px width)
      '<td width="118" style="padding: 20px 0px 20px 0px; text-align: center; min-width: 118px;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="text-align: center;">' +
              logoSection +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // Contact Information Section (flex: 1 equivalent)
      '<td style="padding: 20px 0px 20px 0px;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="font-size: 18px; font-weight: 700; color: #333333; padding-bottom: 2px;">' +
              defaultData.name +
            '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="font-size: 14px; color: ' + accentColor + '; padding-bottom: 8px;">' +
              defaultData.jobTitle +
            '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="font-size: 12px; color: #666666; line-height: 1.4;">' +
              contactDetails.join('<br>') +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // Company Name Section (100px width)
      '<td width="100" style="padding: 20px 0px 20px 20px; text-align: center; vertical-align: middle; min-width: 100px;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="font-size: 16px; font-weight: 700; color: #666666; text-align: center;">' +
              defaultData.company +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
    '</tr>' +
    
    // Social Icons Section
    '<tr>' +
      '<td colspan="3" style="padding: 8px 20px;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="padding-top: 8px;">' +
              renderSocialIcons(defaultData) +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
    '</tr>' +
  '</table>';
},
// WithoutLogo Layout - Email Compatible HTML Table Version
withoutProfile: (designStyle, sections, formData) => {
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
    ...formData // This ensures formData overrides defaults
  };

  const accentColor = designStyle.accentColor || "#0066cc";
  // Logo section - email compatible with company name below
  const logoSection = defaultData.logo ? 
    '<img src="' + defaultData.logo + '" alt="Company Logo" width="100" height="83" style="border: none; border-radius: 4px; display: block; object-fit: contain; padding-bottom: 8px;">' :
    '<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 8px auto;"><tr><td width="80" height="60" style="background-color:' + accentColor + '; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; text-align: center; line-height: 60px;">' + 
    getUserInitials(defaultData.name) + 
    '</td></tr></table>';

  // Contact details with proper formatting
  const contactDetails = [];
  
  if (defaultData.mobilePhone || defaultData.phone) {
    const phoneToShow = defaultData.mobilePhone || defaultData.phone;
    contactDetails.push('<b>mobile:</b> ' + phoneToShow + (defaultData.phone && defaultData.mobilePhone && defaultData.phone !== defaultData.mobilePhone ? ' | <b>tel:</b> ' + defaultData.phone : ''));
  }
  
  if (defaultData.email) {
    contactDetails.push('<b>email:</b> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
  }
  
  if (defaultData.website) {
    const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
    const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
    contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
  }
  
  if (defaultData.location) {
    contactDetails.push('<b>location:</b> ' + defaultData.location);
  }

  // EMAIL-COMPATIBLE TABLE STRUCTURE
  return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse; background-color: #ffffff; min-height: 180px; border-radius: 8px; overflow: hidden;">' +
    // Main content row
    '<tr>' +
      // Logo Section (140px width with company name below)
      '<td width="140" style="padding: 20px 10px 20px 20px; text-align: center;min-width: 140px;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="text-align: center;">' +
              logoSection +
            '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="font-size: 13px; font-weight: 700; line-height: 1.2; color: #333333; text-align: center; padding-top: 8px;">' +
              (defaultData.company || "Company Name") +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // Contact Information Section (flex: 1 equivalent)
      '<td valign="top" style="padding: 20px 20px 20px 0px; vertical-align: top;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="font-size: 18px; font-weight: 700; color: #333333; padding-bottom: 2px;">' +
              (defaultData.name || "Employee Name") +
            '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="font-size: 14px; color: ' + accentColor + '; padding-bottom: 8px;">' +
              (defaultData.jobTitle || "Job Title") +
            '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="font-size: 12px; color: #666666; line-height: 1.4;">' +
              contactDetails.join('<br>') +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
    '</tr>' +
    
    // Social Icons Section with padding
    '<tr>' +
      '<td colspan="2" style="padding-top: 5px;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td>' +
              renderSocialIcons(defaultData) +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
    '</tr>' +
  '</table>';
},


// Orange Layout - Email Compatible with FontAwesome SVG Icons
orange: (designStyle, sections, formData) => {
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
    ...formData // This ensures formData overrides defaults
  };

  // Profile image section - email compatible with fallback to initials
  const profileImageSection = defaultData.profileImage ? 
    '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block; object-fit: cover;">' :
    '<table cellpadding="0" cellspacing="0" border="0"><tr><td width="110" height="110" style="background-color: #FF6B35; color: white; font-weight: bold; font-size: 36px; border-radius: 55px; text-align: center; line-height: 110px; display: block;">' + getUserInitials(defaultData.name) + '</td></tr></table>';

  // FontAwesome SVG Icons for email compatibility
  const getIconSVG = (iconType) => {
    const icons = {
      mobile: '<svg width="12" height="12" viewBox="0 0 384 512" fill="#FF6B35"><path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zM96 64H288c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16z"/></svg>',
      phone: '<svg width="12" height="12" viewBox="0 0 512 512" fill="#FF6B35"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3l49.4-40.4c13.7-11.1 18.4-30 11.6-46.3l-40-96z"/></svg>',
      envelope: '<svg width="12" height="12" viewBox="0 0 512 512" fill="#FF6B35"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
      globe: '<svg width="12" height="12" viewBox="0 0 512 512" fill="#FF6B35"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H8.1C38 85.6 101.7 28.8 180 8.1C154.5 42.3 134.7 95.8 124.7 160zM8.1 352c29.9 74.1 93.6 130.9 171.9 151.6C154.5 469.7 134.7 416.2 124.7 352H8.1zm123.6 0c10 63.9 29.8 117.4 55.3 151.6C109.7 483.9 46 427.1 16.1 352H131.7zm32.4 0H344.3c-6.1 36.4-15.5 68.6-27 94.7c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5c-11.6-26-20.9-58.2-27-94.7zm283.7 0c-10 63.9-29.8 117.4-55.3 151.6C465.3 483.9 529 427.1 558.9 352H448.1z"/></svg>',
      building: '<svg width="12" height="12" viewBox="0 0 384 512" fill="#FF6B35"><path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/></svg>',
      location: '<svg width="12" height="12" viewBox="0 0 384 512" fill="#FF6B35"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>'
    };
    return icons[iconType] || '';
  };

  // Contact details with FontAwesome SVG icons
  const contactDetails = [];
  
  // Mobile Phone
  if (defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="vertical-align: middle; width: 16px; height: 16px;">' + getIconSVG('mobile') + '</td>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle;">' + defaultData.mobilePhone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Phone (only show if different from mobile)
  if (defaultData.phone && defaultData.phone !== defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="vertical-align: middle; width: 16px; height: 16px;">' + getIconSVG('phone') + '</td>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle;">' + defaultData.phone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Email
  if (defaultData.email) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="vertical-align: middle; width: 16px; height: 16px;">' + getIconSVG('envelope') + '</td>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle;"><a href="mailto:' + defaultData.email + '" style="color: #333333; text-decoration: none;">' + defaultData.email + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Website
  if (defaultData.website) {
    const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
    const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="vertical-align: middle; width: 16px; height: 16px;">' + getIconSVG('globe') + '</td>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle;"><a href="' + websiteUrl + '" target="_blank" style="color: #333333; text-decoration: none;">' + displayUrl + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Company (with margin-top equivalent)
  if (defaultData.company) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px; padding-top: 10px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="vertical-align: middle; width: 16px; height: 16px;">' + getIconSVG('building') + '</td>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle;">' + defaultData.company + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Location
  if (defaultData.location) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="vertical-align: middle; width: 16px; height: 16px;">' + getIconSVG('location') + '</td>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle;">' + defaultData.location + '</td>' +
      '</tr></table></td></tr>'
    );
  }

  // EMAIL-COMPATIBLE TABLE STRUCTURE - Exact Layout Match
  return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse; border: none; margin: 0; padding: 0;">' +
    // Orange gradient top border (4px height)
    '<tr>' +
      '<td colspan="3" style="height: 4px; background-color: #FF6B35; width: 100%;"></td>' +
    '</tr>' +
    
    // Main content row with exact spacing
    '<tr>' +
      // Profile Image Section (110px + 3px margin = 113px)
      '<td width="113" style="padding-right: 3px; text-align: left; vertical-align: middle;">' +
        profileImageSection +
      '</td>' +
      
      // Name & Title Section (108px, center-aligned)
      '<td width="108" style="text-align: center; vertical-align: middle;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          // Name (17px font-size)
          '<tr>' +
            '<td style="font-size: 17px; font-weight: 700; color: #333333; padding-bottom: 2px; line-height: 1.2; text-align: center;">' +
              (defaultData.name || "Your Name") +
            '</td>' +
          '</tr>' +
          // Job Title
          '<tr>' +
            '<td style="font-size: 14px; font-weight: 600; color: #FF6B35; padding-bottom: 15px; letter-spacing: 0.5px; text-align: center;">' +
              (defaultData.jobTitle || "YOUR JOB TITLE") +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // Contact Information Section (remaining width)
      '<td style="padding: 10px 0px; padding-left: 1px; vertical-align: middle;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          contactDetails.join('') +
        '</table>' +
      '</td>' +
    '</tr>' +
    
    // Social Icons Section (at bottom, outside main content)
    '<tr>' +
      '<td colspan="3" style="padding: 0px;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="padding: 5px;">' +
             renderSocialIcons(defaultData) +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
    '</tr>' +
  '</table>';
},  

  orangecenter: (designStyle, sections, formData) => {
    return layoutConfigs.orange(designStyle, sections, formData);
  },

  orangetext: (designStyle, sections, formData) => {
    const defaultData = {
      name: "Employee Name", 
      jobTitle: "Job Title", 
      phone: "",
      email: "", 
      website: "",
      company: "Company Name", 
      location: "Location", 
      ...formData // 🔧 Fixed to use actual formData
    };

    const contactItems = [];
    if (defaultData.phone) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📞 ' + defaultData.phone + '</span></div>');
    if (defaultData.email) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">✉ ' + defaultData.email + '</span></div>');
    if (defaultData.website) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🌐 ' + defaultData.website + '</span></div>');
    if (defaultData.company) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🏢 ' + defaultData.company + '</span></div>');
    if (defaultData.location) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📍 ' + defaultData.location + '</span></div>');

    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
      '<tr>' +
        '<td style="height: 4px; background-color: #FF6B35;"></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="padding: 20px;">' +
          '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div>' +
          '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
          '<div style="margin-bottom: 15px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
          '<div>' + contactItems.join('') + '</div>' +
        '</td>' +
      '</tr>' +
    '</table>';
  },

  // STANDARD LAYOUT - Fixed to use actual formData
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

  // TEXT LAYOUT - Fixed to use actual formData
  text: (designStyle, sections, formData) => {
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
      ...formData // This ensures formData overrides defaults
    };

  const accentColor = designStyle.accentColor || "#0066cc";
 // Contact details
    const contactDetails = [];
    if (defaultData.mobilePhone || defaultData.phone) {
      const phoneToShow = defaultData.mobilePhone || defaultData.phone;
      contactDetails.push('<b>mobile:</b> ' + phoneToShow + (defaultData.phone && defaultData.mobilePhone && defaultData.phone !== defaultData.mobilePhone ? ' | <b>tel:</b> ' + defaultData.phone : ''));
    }
    if (defaultData.email) {
      contactDetails.push('<b>email:</b> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
    }
    if (defaultData.website) {
      const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
      const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
      contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
    }
    if (defaultData.location) {
      contactDetails.push('<b>location:</b> ' + defaultData.location);
    }

  return (
    '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif;">' +
      // Header Row with Contact Info and Company
      '<tr>' +
        '<td style="padding: 20px;" width="70%" valign="top">' +
          '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
            '<tr>' +
              '<td style="font-size: 18px; font-weight: bold; color: #333333; padding-bottom: 2px;">' +
                (defaultData.name || "Employee Name") +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="font-size: 14px; color: ' + accentColor + '; padding-bottom: 8px;">' +
                (defaultData.jobTitle || "Job Title") +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="font-size: 12px; color: #666666; line-height: 1.4;">' +
            contactDetails.join('<br>') +
          '</td>' +
            '</tr>' +
          '</table>' +
        '</td>' +

        // Company Name on Right
        '<td style="padding: 20px; text-align: center;" width="30%" valign="middle">' +
          '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
            '<tr>' +
              '<td style="font-size: 16px; font-weight: bold; color: #666666;">' +
                (defaultData.company || "Company Name") +
              '</td>' +
            '</tr>' +
          '</table>' +
        '</td>' +
      '</tr>' +

      // Social Icons Row
      '<tr>' +
        '<td colspan="2" style="padding: 15px 20px; text-align: left;">' +
          renderSocialIcons(defaultData) +
        '</td>' +
      '</tr>' +
    '</table>'
  );

  }
};

// 🔧 FIXED: Generate content sections with actual formData
const generateContentSections = (formData, designStyle) => {
  const textColor = designStyle.textColor || "#333";
  const nameColor = designStyle.nameColor || "#3498db";
  const accentColor = designStyle.accentColor || "#3498db";

  return {
    greeting: '<p style="margin-bottom: 10px; color: ' + textColor + ';">Thanks & Regards,</p>',
    
    personalInfo: '<p style="margin: 0; font-size: 16px; font-weight: bold; color: ' + nameColor + ';">' + (formData.name || "Employee Name") + '</p>' +
      '<p style="margin: 2px 0; font-size: 14px; color: ' + accentColor + ';">' + (formData.jobTitle || "Employee Title") + '</p>' +
      '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: ' + textColor + ';">' + (formData.company || "AgileWorld Technology Ltd.") + '</p>' +
      '<p style="margin: 2px 0 0 0; font-size: 14px; color: ' + textColor + ';">' + (formData.location || "Gurgaon, Haryana") + '</p>',
    
    sidebarInfo: '<p style="margin: 0; font-size: 14px; font-weight: bold;">' + (formData.name || "Employee Name") + '</p>' +
      '<p style="margin: 5px 0; font-size: 12px;">' + (formData.jobTitle || "Employee Title") + '</p>',
    
    companyInfo: '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">' + (formData.company || "AgileWorld Technology Ltd.") + '</p>' +
      '<p style="margin: 2px 0 0 0; font-size: 14px;">' + (formData.location || "Gurgaon, Haryana") + '</p>',
    
    // 🔧 FIXED: Contact info now uses actual phone numbers
    contactInfo: '<p style="margin: 0; font-size: 14px;">📞 ' + (formData.phone || formData.mobilePhone || "+91 9876543210") + '</p>' +
      '<p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:' + formData.email + '" style="color: ' + accentColor + '; text-decoration: none;">' + (formData.email || "email@example.com") + '</a></p>' +
      '<p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://' + formData.website + '" style="color: ' + accentColor + '; text-decoration: none;">www.' + (formData.website || "agileworldtechnologies.com") + '</a></p>' +
      renderSocialIcons(formData),
    
    banner: formData.banner ? '<div style="margin-top: 20px;"><img src="' + formData.banner + '" alt="Banner" width="100%" style="height: auto; border-radius: 8px; display: block; border: none;"></div>' : "",
    
    disclaimer: formData.disclaimer ? '<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><b>DISCLAIMER</b></p><p style="margin-top: 5px;">' + formData.disclaimer + '</p></div>' : "",
  };
};

export const generateSignatureHTML = (formData, selectedDesign, designStyle) => {

  
  const design = designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];
  const sections = generateContentSections(formData, designStyle);
  const layoutFunction = layoutConfigs[design.layout] || layoutConfigs.standard;
  const html = layoutFunction(designStyle, sections, formData);
  
  // Clean HTML but keep it email-compatible
  const cleanHTML = html.replace(/\s+/g, ' ').trim();
  return cleanHTML;
};

// 🔧 FIXED: Template generation for bulk apply - now generates individual signatures
export const generateSignatureTemplate = (selectedDesign, designStyle, staticFormData = {}) => {
  const templateFormData = {
    name: "{{name}}",
    jobTitle: "{{jobTitle}}",
    company: staticFormData.company || "{{company}}",
    email: "{{email}}",
    mobilePhone: "{{phone}}", // 🔧 This will be replaced with actual employee phone
    Phone: "{{phone}}",
    location: staticFormData.location || "{{location}}",
    website: staticFormData.website || "{{website}}",
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
    ...staticFormData
  };

  return generateSignatureHTML(templateFormData, selectedDesign, designStyle);
};

export const validateTemplatePlaceholders = (htmlTemplate) => {
  const requiredPlaceholders = ['{{name}}', '{{email}}', '{{jobTitle}}', '{{company}}'];
  const missingPlaceholders = requiredPlaceholders.filter(placeholder => 
    !htmlTemplate.includes(placeholder)
  );
  
  if (missingPlaceholders.length > 0) {
    console.warn('Missing required placeholders:', missingPlaceholders);
  }
  
  return missingPlaceholders.length === 0;
};

// 🔧 FIXED: Placeholder replacement now handles phone numbers correctly
export const replacePlaceholders = (template, employeeData) => {
  let result = template;
  
  const placeholderMap = {
    '{{name}}': employeeData.displayName || employeeData.name || '',
    '{{jobTitle}}': employeeData.jobTitle || employeeData.title || '',
    '{{email}}': employeeData.mail || employeeData.email || '',
    '{{phone}}': employeeData.businessPhones?.[0] || employeeData.mobilePhone || employeeData.phone || '', // 🔧 Fixed phone handling
    '{{location}}': employeeData.officeLocation || employeeData.location || '',
    '{{company}}': employeeData.company || 'Agile World Technologies LLC',
    '{{website}}': employeeData.website || 'www.agileworldtechnologies.com',
    '{{department}}': employeeData.department || ''
  };
  
  Object.entries(placeholderMap).forEach(([placeholder, value]) => {
    result = result.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
  });
  
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