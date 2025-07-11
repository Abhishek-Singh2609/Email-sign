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


// Orange Layout
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
    ...formData
  };

  // Profile image section - kept your exact implementation
  const profileImageSection = defaultData.profileImage ? 
    '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block; object-fit: cover;">' :
    '<table cellpadding="0" cellspacing="0" border="0"><tr><td width="110" height="110" style="background-color: #FF6B35; color: white; font-weight: bold; font-size: 36px; border-radius: 55px; text-align: center; line-height: 110px; display: block;">' + getUserInitials(defaultData.name) + '</td></tr></table>';

  // Contact details - kept your exact table structure
  const contactDetails = [];
  
  if (defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle;">' + defaultData.mobilePhone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  if (defaultData.phone && defaultData.phone !== defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle;">' + defaultData.phone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  if (defaultData.email) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle;"><a href="mailto:' + defaultData.email + '" style="color: #333333; text-decoration: none;">' + defaultData.email + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  if (defaultData.website) {
    const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
    const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle;"><a href="' + websiteUrl + '" target="_blank" style="color: #333333; text-decoration: none;">' + displayUrl + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  if (defaultData.company) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px; padding-top: 10px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle;">' + defaultData.company + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  if (defaultData.location) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle;">' + defaultData.location + '</td>' +
      '</tr></table></td></tr>'
    );
  }

  // Only changed the main table structure slightly for Outlook compatibility
  return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse;">' +
    '<tr>' +
      '<td colspan="3" style="height: 4px; background-color: #FF6B35;"></td>' +
    '</tr>' +
    '<tr>' +
      // Profile image column - added explicit width
      '<td width="113" style="padding: 10px 3px 10px 0; text-align: left; vertical-align: middle;">' +
        profileImageSection +
      '</td>' +
      
      // Name & Title Section - added explicit width
      '<td width="108" style="padding: 10px 0px; text-align: center; vertical-align: middle;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="font-size: 17px; font-weight: 700; color: #333333; padding-bottom: 2px; line-height: 1.2; text-align: center;">' +
              (defaultData.name || "Your Name") +
            '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="font-size: 14px; font-weight: 600; color: #FF6B35; padding-bottom: 15px; letter-spacing: 0.5px; text-align: center;">' +
              (defaultData.jobTitle || "YOUR JOB TITLE") +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // Contact Information Section - remaining width
      '<td style="padding: 10px 10px; vertical-align: middle;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          contactDetails.join('') +
        '</table>' +
      '</td>' +
    '</tr>' +
    
    // Social icons section - unchanged
    '<tr>' +
      '<td colspan="3" style="padding: 0px 0px 5px 0px;">' +
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

// Orange Center Layout 
// orangecenter: (designStyle, sections, formData) => {
//   const defaultData = {
//     name: "Employee Name", 
//     jobTitle: "Job Title", 
//     company: "Company Name", 
//     location: "Location",
//     phone: "", 
//     mobilePhone: "", 
//     email: "", 
//     website: "", 
//     logo: null, 
//     profileImage: null,
//     linkedin: "", 
//     youtube: "", 
//     instagram: "", 
//     facebook: "", 
//     twitter: "", 
//     github: "", 
//     ...formData // This ensures formData overrides defaults
//   };
//   // Profile image section - email compatible with fallback to initials
//   const profileImageSection = defaultData.profileImage ? 
//     '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block; object-fit: cover;">' :
//     '<table cellpadding="0" cellspacing="0" border="0"><tr><td width="110" height="110" style="background-color: #FF6B35; color: white; font-weight: bold; font-size: 36px; border-radius: 55px; text-align: center; line-height: 110px; display: block;">' + getUserInitials(defaultData.name) + '</td></tr></table>';

//   // Contact details
//   const contactDetails = [];
  
//   // Mobile Phone
//   if (defaultData.mobilePhone) {
//     contactDetails.push(
//       '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
//       '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.mobilePhone + '</td>' +
//       '</tr></table></td></tr>'
//     );
//   }
  
//   // Phone (only show if different from mobile)
//   if (defaultData.phone && defaultData.phone !== defaultData.mobilePhone) {
//     contactDetails.push(
//       '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
//       '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.phone + '</td>' +
//       '</tr></table></td></tr>'
//     );
//   }
  
//   // Email
//   if (defaultData.email) {
//     contactDetails.push(
//       '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
//       '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;"><a href="mailto:' + defaultData.email + '" style="color: #333333; text-decoration: none;">' + defaultData.email + '</a></td>' +
//       '</tr></table></td></tr>'
//     );
//   }
  
//   // Website
//   if (defaultData.website) {
//     const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
//     const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
//     contactDetails.push(
//       '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
//       '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;"><a href="' + websiteUrl + '" target="_blank" style="color: #333333; text-decoration: none;">' + displayUrl + '</a></td>' +
//       '</tr></table></td></tr>'
//     );
//   }
  
//   // Company (with margin-top equivalent)
//   if (defaultData.company) {
//     contactDetails.push(
//       '<tr><td style="padding-bottom: 8px; padding-top: 10px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
//       '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.company + '</td>' +
//       '</tr></table></td></tr>'
//     );
//   }
  
//   // Location
//   if (defaultData.location) {
//     contactDetails.push(
//       '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
//       '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.location + '</td>' +
//       '</tr></table></td></tr>'
//     );
//   }

//   // EMAIL-COMPATIBLE TABLE STRUCTURE - Orange Center Layout
//   return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse; border: none; margin: 0; padding: 0; table-layout: fixed;">' +
//     // Orange gradient top border (4px height)
//     '<tr>' +
//       '<td colspan="3" style="height: 4px; background-color: #FF6B35; width: 100%;"></td>' +
//     '</tr>' +
    
//     // Main content row with three sections
//     '<tr>' +
      
//       // Left Section - Name, Title, Social Icons (Fixed 138px: 128px content + 10px left padding)
//       '<td width="138" style="width: 138px; min-width: 138px; max-width: 138px; padding: 10px 0px 10px 10px; vertical-align: middle; box-sizing: border-box; background-color: #ffffff;">' +
//         '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="table-layout: fixed;">' +
//           // Name
//           '<tr>' +
//             '<td style="font-size: 17px; font-weight: 700; color: #333333; padding-bottom: 2px; line-height: 1.2; word-wrap: break-word; overflow-wrap: break-word;">' +
//               (defaultData.name || "Your Name") +
//             '</td>' +
//           '</tr>' +
//           // Job Title
//           '<tr>' +
//             '<td style="font-size: 14px; font-weight: 600; color: #FF6B35; padding-bottom: 15px; letter-spacing: 0.5px; word-wrap: break-word; overflow-wrap: break-word;">' +
//               (defaultData.jobTitle || "YOUR JOB TITLE") +
//             '</td>' +
//           '</tr>' +
//           // Social Icons
//           '<tr>' +
//             '<td>' +
//               renderSocialIcons(defaultData) +
//             '</td>' +
//           '</tr>' +
//         '</table>' +
//       '</td>' +
      
//       // Center Section - Profile Image (Fixed 118px: 110px image + 4px margin each side)
//       '<td width="118" style="width: 118px; min-width: 118px; max-width: 118px; padding: 10px 0px; text-align: center; vertical-align: middle; box-sizing: border-box; background-color: #ffffff;">' +
//         '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
//           '<tr>' +
//             '<td style="text-align: center; padding: 0px 4px;">' +
//               profileImageSection +
//             '</td>' +
//           '</tr>' +
//         '</table>' +
//       '</td>' +
      
//       // Right Section - Contact Information (Fixed 344px: remaining width)
//       '<td width="344" style="width: 344px; min-width: 344px; max-width: 344px; padding: 10px 10px 10px 0px; vertical-align: middle; box-sizing: border-box; background-color: #ffffff;">' +
//         '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="table-layout: fixed;">' +
//           contactDetails.join('') +
//         '</table>' +
//       '</td>' +
//     '</tr>' +
//   '</table>';
// },

orangecenter: (designStyle, sections, formData) => {
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

  // Profile image section - kept your exact implementation
  const profileImageSection = defaultData.profileImage ? 
    '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block; object-fit: cover;">' :
    '<table cellpadding="0" cellspacing="0" border="0"><tr><td width="110" height="110" style="background-color: #FF6B35; color: white; font-weight: bold; font-size: 36px; border-radius: 55px; text-align: center; line-height: 110px; display: block;">' + getUserInitials(defaultData.name) + '</td></tr></table>';

  // Contact details - kept your exact table structure
  const contactDetails = [];
  
  // Mobile Phone
  if (defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.mobilePhone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Phone (only show if different from mobile)
  if (defaultData.phone && defaultData.phone !== defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.phone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Email
  if (defaultData.email) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;"><a href="mailto:' + defaultData.email + '" style="color: #333333; text-decoration: none;">' + defaultData.email + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Website
  if (defaultData.website) {
    const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
    const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;"><a href="' + websiteUrl + '" target="_blank" style="color: #333333; text-decoration: none;">' + displayUrl + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Company
  if (defaultData.company) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px; padding-top: 10px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.company + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Location
  if (defaultData.location) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.location + '</td>' +
      '</tr></table></td></tr>'
    );
  }

  // EMAIL-COMPATIBLE TABLE STRUCTURE - Orange Center Layout
  return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse; margin: 0; padding: 0; table-layout: fixed;">' +
    // Orange top border
    '<tr>' +
      '<td colspan="3" style="height: 4px; background-color: #FF6B35; width: 100%;"></td>' +
    '</tr>' +
    
    // Main content row
    '<tr>' +
      // Left Section - Name, Title, Social Icons
      '<td width="138" style="width: 138px; min-width: 138px; max-width: 138px; padding: 10px 0px 10px 10px; vertical-align: middle; box-sizing: border-box;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="table-layout: fixed;">' +
          // Name
          '<tr>' +
            '<td style="font-size: 17px; font-weight: 700; color: #333333; padding-bottom: 2px; line-height: 1.2; word-wrap: break-word;">' +
              (defaultData.name || "Your Name") +
            '</td>' +
          '</tr>' +
          // Job Title
          '<tr>' +
            '<td style="font-size: 14px; font-weight: 600; color: #FF6B35; padding-bottom: 15px; letter-spacing: 0.5px; word-wrap: break-word;">' +
              (defaultData.jobTitle || "YOUR JOB TITLE") +
            '</td>' +
          '</tr>' +
          // Social Icons
          '<tr>' +
            '<td>' +
              renderSocialIcons(defaultData) +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // Center Section - Profile Image
      '<td width="118" style="width: 118px; min-width: 118px; max-width: 118px; padding: 10px 0px; text-align: center; vertical-align: middle; box-sizing: border-box;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="text-align: center; padding: 0px 4px;">' +
              profileImageSection +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // Right Section - Contact Information
      '<td width="344" style="width: 344px; min-width: 344px; max-width: 344px; padding: 10px 10px 10px 0px; vertical-align: middle; box-sizing: border-box;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="table-layout: fixed;">' +
          contactDetails.join('') +
        '</table>' +
      '</td>' +
    '</tr>' +
  '</table>';
},

//  Orangetext loyout
 orangetext: (designStyle, sections, formData) => {
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

  // Contact details - kept your exact structure
  const contactDetails = [];
  
  // Mobile Phone
  if (defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.mobilePhone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Phone (only show if different from mobile)
  if (defaultData.phone && defaultData.phone !== defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.phone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Email
  if (defaultData.email) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;"><a href="mailto:' + defaultData.email + '" style="color: #333333; text-decoration: none;">' + defaultData.email + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Website
  if (defaultData.website) {
    const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
    const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;"><a href="' + websiteUrl + '" target="_blank" style="color: #333333; text-decoration: none;">' + displayUrl + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Company
  if (defaultData.company) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px; padding-top: 10px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.company + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Location
  if (defaultData.location) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding-left: 8px; font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.location + '</td>' +
      '</tr></table></td></tr>'
    );
  }

  return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse; margin: 0; padding: 0; table-layout: fixed;">' +
    // Orange top border
    '<tr>' +
      '<td colspan="2" style="height: 4px; background-color: #FF6B35;"></td>' +
    '</tr>' +
    

    '<tr>' +
      // Left Section - Name, Title, Social Icons
      '<td width="180" style="width: 180px; min-width: 180px; max-width: 180px; padding: 10px 20px 10px 10px; vertical-align: top; box-sizing: border-box;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="table-layout: fixed;">' +
          // Name
          '<tr>' +
            '<td style="font-size: 24px; font-weight: 700; color: #333333; padding-bottom: 8px; line-height: 1.2; word-wrap: break-word;">' +
              (defaultData.name || "Your Name") +
            '</td>' +
          '</tr>' +
          // Job Title
          '<tr>' +
            '<td style="font-size: 14px; font-weight: 600; color: #FF6B35; padding-bottom: 15px; letter-spacing: 0.5px; word-wrap: break-word;">' +
              (defaultData.jobTitle || "YOUR JOB TITLE") +
            '</td>' +
          '</tr>' +
          // Social Icons
          '<tr>' +
            '<td>' +
              renderSocialIcons(defaultData) +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // Right Section - Contact Information
      '<td style="padding: 10px; vertical-align: top;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="table-layout: fixed;">' +
          contactDetails.join('') +
        '</table>' +
      '</td>' +
    '</tr>' +
  '</table>';
}, 
   
  
 
orangeright: (designStyle, sections, formData) => {
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

  // Profile image section
  const profileImageSection = defaultData.profileImage ? 
    '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block; object-fit: cover;">' :
    '<table cellpadding="0" cellspacing="0" border="0"><tr><td width="110" height="110" style="background-color: #FF6B35; color: white; font-weight: bold; font-size: 36px; border-radius: 55px; text-align: center; line-height: 110px; display: block;">' + getUserInitials(defaultData.name) + '</td></tr></table>';

  // Contact details - kept your exact structure
  const contactDetails = [];
  
  // Mobile Phone
  if (defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.mobilePhone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Phone (only show if different from mobile)
  if (defaultData.phone && defaultData.phone !== defaultData.mobilePhone) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.phone + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Email
  if (defaultData.email) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;"><a href="mailto:' + defaultData.email + '" style="color: #333333; text-decoration: none;">' + defaultData.email + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Website
  if (defaultData.website) {
    const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
    const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;"><a href="' + websiteUrl + '" target="_blank" style="color: #333333; text-decoration: none;">' + displayUrl + '</a></td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Company
  if (defaultData.company) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px; padding-top: 10px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.company + '</td>' +
      '</tr></table></td></tr>'
    );
  }
  
  // Location
  if (defaultData.location) {
    contactDetails.push(
      '<tr><td style="padding-bottom: 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="font-size: 12px; color: #333333; vertical-align: middle; word-break: break-word;">' + defaultData.location + '</td>' +
      '</tr></table></td></tr>'
    );
  }

  return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; border-collapse: collapse; margin: 0; padding: 0; table-layout: fixed;">' +
    // Orange top border
    '<tr>' +
      '<td colspan="3" style="height: 4px; background-color: #FF6B35;"></td>' +
    '</tr>' +
    
   
    '<tr>' +
      // LEFT SECTION - Contact Info
      '<td width="325" style="width: 325px; min-width: 325px; max-width: 325px; padding: 10px 20px 10px 10px; vertical-align: top; box-sizing: border-box;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="table-layout: fixed;">' +
          contactDetails.join('') +
        '</table>' +
      '</td>' +
      
      // MIDDLE SECTION - Name, Title, Social Icons
      '<td width="145" style="width: 145px; min-width: 145px; max-width: 145px; padding: 10px 0px; vertical-align: top; box-sizing: border-box;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="table-layout: fixed;">' +
          // Name
          '<tr>' +
            '<td style="font-size: 24px; font-weight: 700; color: #333333; padding-bottom: 2px; line-height: 1.2; word-wrap: break-word;">' +
              (defaultData.name || "Your Name") +
            '</td>' +
          '</tr>' +
          // Job Title
          '<tr>' +
            '<td style="font-size: 14px; font-weight: 600; color: #FF6B35; padding-bottom: 15px; letter-spacing: 0.5px; word-wrap: break-word;">' +
              (defaultData.jobTitle || "YOUR JOB TITLE") +
            '</td>' +
          '</tr>' +
          // Social Icons
          '<tr>' +
            '<td>' +
              renderSocialIcons(defaultData) +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      
      // RIGHT SECTION - Profile Image
      '<td width="130" style="width: 130px; min-width: 130px; max-width: 130px; padding: 10px 10px 10px 20px; text-align: center; vertical-align: top; box-sizing: border-box;">' +
        '<table cellpadding="0" cellspacing="0" border="0" width="100%">' +
          '<tr>' +
            '<td style="text-align: center;">' +
              profileImageSection +
            '</td>' +
          '</tr>' +
        '</table>' +
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