// // Email-Compatible signatureUtils.js - Fixed phone numbers and bulk apply
// import { designTemplates } from "../Tabs/DesignTab";

// export const ensureFiveCampaigns = (formDataToUpdate) => {
//   if (!formDataToUpdate.campaigns || formDataToUpdate.campaigns.length < 5) {
//     const updatedCampaigns = [...(formDataToUpdate.campaigns || [])];
//     while (updatedCampaigns.length < 5) {
//       const newId = updatedCampaigns.length + 1;
//       updatedCampaigns.push({
//         id: newId,
//         name: `Campaign ${newId}`,
//         image: null,
//         startDate: "",
//         expiryDate: "",
//         active: false,
//         links: [
//           { url: "", text: "Link 1", area: { x: 0, y: 0, width: 33, height: 100 } },
//           { url: "", text: "Link 2", area: { x: 33, y: 0, width: 34, height: 100 } },
//           { url: "", text: "Link 3", area: { x: 67, y: 0, width: 33, height: 100 } },
//         ],
//       });
//     }
//     return { ...formDataToUpdate, campaigns: updatedCampaigns };
//   }
//   return formDataToUpdate;
// };

// export const getActiveCampaigns = (campaigns) => {
//   return campaigns.filter(
//     (campaign) =>
//       campaign.active &&
//       campaign.image &&
//       !(campaign.startDate && new Date() < new Date(campaign.startDate)) &&
//       !(campaign.expiryDate && new Date() > new Date(campaign.expiryDate))
//   );
// };

// const getUserInitials = (name) => {
//   if (!name || name === "Employee Name") return "ID";
//   const nameParts = name.trim().split(/\s+/);
//   if (nameParts.length === 0) return "ID";
//   const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
//   if (nameParts.length === 1) return firstNameInitial;
//   const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
//   return firstNameInitial + lastNameInitial;
// };

// const renderSocialIcons = (formData) => {
//   const socialIcons = [
//     { key: "linkedin", icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png", alt: "LinkedIn" },
//     { key: "youtube", icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png", alt: "YouTube" },
//     { key: "instagram", icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png", alt: "Instagram" },
//     { key: "facebook", icon: "https://cdn-icons-png.flaticon.com/24/145/145802.png", alt: "Facebook" },
//     { key: "twitter", icon: "https://cdn-icons-png.flaticon.com/24/145/145812.png", alt: "Twitter" },
//     { key: "github", icon: "https://cdn-icons-png.flaticon.com/24/733/733553.png", alt: "GitHub" },
//   ];

//   const socialLinks = socialIcons
//     .filter((social) => formData[social.key])
//     .map((social, index, array) => {
//       const marginRight = index === array.length - 1 ? "0" : "8";
//       return '<a href="' + formData[social.key] + '" style="text-decoration: none; margin-right: ' + marginRight + 'px;"><img src="' + social.icon + '" alt="' + social.alt + '" width="20" height="20" style="vertical-align: middle; border: none; display: inline-block;"></a>';
//     });

//   return socialLinks.length > 0 ? socialLinks.join("") : "";
// };

// const renderOrangeSocialIcons = (formData) => {
//   const socialIcons = [
//     { key: "linkedin", icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png", alt: "LinkedIn" },
//     { key: "youtube", icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png", alt: "YouTube" },
//     { key: "instagram", icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png", alt: "Instagram" },
//     { key: "facebook", icon: "https://cdn-icons-png.flaticon.com/24/145/145802.png", alt: "Facebook" },
//     { key: "twitter", icon: "https://cdn-icons-png.flaticon.com/24/145/145812.png", alt: "Twitter" },
//     { key: "github", icon: "https://cdn-icons-png.flaticon.com/24/733/733553.png", alt: "GitHub" },
//   ];

//   const socialLinks = socialIcons
//     .filter((social) => formData[social.key])
//     .map((social, index) => {
//       const marginRight = index === 2 ? "0" : "6";
//       return '<a href="' + formData[social.key] + '" style="text-decoration: none; margin-right: ' + marginRight + 'px; margin-bottom: 4px; display: inline-block; background-color: #FF6B35; border-radius: 12px; width: 24px; height: 24px; text-align: center; line-height: 24px;"><img src="' + social.icon + '" alt="' + social.alt + '" width="12" height="12" style="vertical-align: middle; border: none; filter: brightness(0) invert(1);"></a>';
//     });

//   return socialLinks.length > 0 ? socialLinks.join("") : "";
// };

// // EMAIL-COMPATIBLE LAYOUT CONFIGURATIONS - FIXED
// const layoutConfigs = {
//   // PROFESSIONAL LAYOUT - Fixed to use actual formData
//   professional: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", 
//       jobTitle: "Job Title", 
//       company: "Company Name", 
//       location: "Location",
//       phone: "", 
//       mobilePhone: "", 
//       email: "", 
//       website: "", 
//       logo: null, 
//       profileImage: null,
//       linkedin: "", 
//       youtube: "", 
//       instagram: "", 
//       facebook: "", 
//       twitter: "", 
//       github: "", 
//       ...formData // 🔧 This ensures formData overrides defaults
//     };

//     const accentColor = designStyle.accentColor || "#0066cc";
    
//     // Logo section - email compatible
//     const logoSection = defaultData.logo ? 
//       '<img src="' + defaultData.logo + '" alt="Company Logo" width="100" height="83" style="border: none; border-radius: 4px; display: block;">' :
//       '<div style="width: 80px; height: 60px; background-color: ' + accentColor + '; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; text-align: center; line-height: 60px; display: block;">' + getUserInitials(defaultData.name) + '</div>';

//     // 🔧 FIXED: Contact details now use actual phone numbers
//     const contactDetails = [];
//     if (defaultData.mobilePhone || defaultData.phone) {
//       const phoneToShow = defaultData.mobilePhone || defaultData.phone;
//       contactDetails.push('<b>mobile:</b> ' + phoneToShow + (defaultData.phone && defaultData.mobilePhone && defaultData.phone !== defaultData.mobilePhone ? ' | <b>tel:</b> ' + defaultData.phone : ''));
//     }
//     if (defaultData.email) {
//       contactDetails.push('<b>email:</b> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
//     }
//     if (defaultData.website) {
//       const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
//       const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
//       contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
//     }
//     if (defaultData.location) {
//       contactDetails.push('<b>location:</b> ' + defaultData.location);
//     }

//     // Profile image - email compatible
//     const profileImageSection = defaultData.profileImage ? 
//       '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="80" height="80" style="border-radius: 6px; border: 2px solid #e0e0e0; display: block;">' : '';

//     // EMAIL-COMPATIBLE TABLE STRUCTURE
//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse;">' +
//       '<tr>' +
//         '<td width="140" valign="top" style="padding: 20px; text-align: center;">' +
//           logoSection +
//           '<div style="font-size: 12px; font-weight: bold; color: #333333; margin-top: 4px;">' + defaultData.company + '</div>' +
//         '</td>' +
//         '<td valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 2px;">' + defaultData.name + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + defaultData.jobTitle + '</div>' +
//           '<div style="font-size: 12px; color: #666666; line-height: 1.4;">' + contactDetails.join('<br>') + '</div>' +
//         '</td>' +
//         '<td width="80" valign="top" style="padding: 20px; text-align: center;">' +
//           (defaultData.profileImage ? profileImageSection : '') +
//         '</td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td colspan="3" style="padding: 8px 20px;">' +
//           '<div style="margin-top: 8px;">' + renderSocialIcons(defaultData) + '</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // 🔧 FIXED: ORANGE LAYOUT - Now uses actual formData instead of hardcoded data
//   orange: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", 
//       jobTitle: "Job Title", 
//       phone: "",
//       email: "", 
//       website: "",
//       company: "Company Name", 
//       location: "Location",
//       profileImage: null,
//       ...formData // 🔧 This ensures formData overrides defaults
//     };

//     // Profile section - email compatible
//     const profileSection = defaultData.profileImage ? 
//       '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block;">' :
//       '<div style="width: 110px; height: 110px; border-radius: 55px; background-color: #FF6B35; color: white; font-size: 36px; font-weight: bold; text-align: center; line-height: 110px; display: block;">' + (defaultData.name ? defaultData.name.charAt(0) : "U") + '</div>';

//     // 🔧 FIXED: Contact items now use actual data
//     const contactItems = [];
//     if (defaultData.phone) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📞</span><span style="font-size: 12px; color: #333333;">' + defaultData.phone + '</span></div>');
//     if (defaultData.email) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">✉</span><span style="font-size: 12px; color: #333333;">' + defaultData.email + '</span></div>');
//     if (defaultData.website) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🌐</span><span style="font-size: 12px; color: #333333;">' + defaultData.website + '</span></div>');
//     if (defaultData.company) contactItems.push('<div style="margin-bottom: 8px; margin-top: 10px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🏢</span><span style="font-size: 12px; color: #333333;">' + defaultData.company + '</span></div>');
//     if (defaultData.location) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📍</span><span style="font-size: 12px; color: #333333;">' + defaultData.location + '</span></div>');

//     // EMAIL-COMPATIBLE TABLE STRUCTURE
//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
//       '<tr>' +
//         '<td colspan="3" style="height: 4px; background-color: #FF6B35;"></td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td width="130" valign="top" style="padding: 20px; text-align: center;">' +
//           profileSection +
//         '</td>' +
//         '<td valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div>' +
//           '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
//           '<div style="margin-bottom: 10px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
//         '</td>' +
//         '<td width="200" valign="top" style="padding: 20px;">' +
//           contactItems.join('') +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   orangecenter: (designStyle, sections, formData) => {
//     return layoutConfigs.orange(designStyle, sections, formData);
//   },

//   orangetext: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", 
//       jobTitle: "Job Title", 
//       phone: "",
//       email: "", 
//       website: "",
//       company: "Company Name", 
//       location: "Location", 
//       ...formData // 🔧 Fixed to use actual formData
//     };

//     const contactItems = [];
//     if (defaultData.phone) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📞 ' + defaultData.phone + '</span></div>');
//     if (defaultData.email) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">✉ ' + defaultData.email + '</span></div>');
//     if (defaultData.website) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🌐 ' + defaultData.website + '</span></div>');
//     if (defaultData.company) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🏢 ' + defaultData.company + '</span></div>');
//     if (defaultData.location) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📍 ' + defaultData.location + '</span></div>');

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
//       '<tr>' +
//         '<td style="height: 4px; background-color: #FF6B35;"></td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td style="padding: 20px;">' +
//           '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div>' +
//           '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
//           '<div style="margin-bottom: 15px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
//           '<div>' + contactItems.join('') + '</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // STANDARD LAYOUT - Fixed to use actual formData
//   standard: (designStyle, sections, formData) => {
//     const textColor = designStyle.textColor || "#333";
//     const accentColor = designStyle.accentColor || "#3498db";
//     const backgroundColor = designStyle.backgroundColor || "#f0f0f0";

//     return '<table width="600" cellpadding="20" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: ' + backgroundColor + '; border-radius: 8px;">' +
//       '<tr>' +
//         '<td>' +
//           '<p style="margin-bottom: 10px; color: ' + textColor + ';">Thanks & Regards,</p>' +
//           '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">' +
//             '<tr>' +
//               '<td width="50%" valign="top" style="padding-right: 20px; color: ' + textColor + ';">' + sections.personalInfo + '</td>' +
//               '<td width="1" style="background-color: ' + accentColor + ';"></td>' +
//               '<td width="50%" valign="top" style="padding-left: 20px; color: ' + textColor + ';">' + sections.contactInfo + '</td>' +
//             '</tr>' +
//           '</table>' +
//           sections.banner + sections.disclaimer +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // TEXT LAYOUT - Fixed to use actual formData
//   text: (designStyle, sections, formData) => {
//     const accentColor = designStyle.accentColor || "#0066cc";
    
//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">' +
//       '<tr>' +
//         '<td width="70%" valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 2px;">' + (formData.name || "Employee Name") + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + (formData.jobTitle || "Job Title") + '</div>' +
//           '<div style="font-size: 12px; color: #666666; line-height: 1.4;">' + sections.contactInfo + '</div>' +
//         '</td>' +
//         '<td width="30%" valign="middle" style="padding: 20px; text-align: center;">' +
//           '<div style="font-size: 16px; font-weight: bold; color: #666666;">' + (formData.company || "Company Name") + '</div>' +
//         '</td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td colspan="2" style="padding: 15px 20px;">' +
//           renderSocialIcons(formData) +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },
// };

// // 🔧 FIXED: Generate content sections with actual formData
// const generateContentSections = (formData, designStyle) => {
//   const textColor = designStyle.textColor || "#333";
//   const nameColor = designStyle.nameColor || "#3498db";
//   const accentColor = designStyle.accentColor || "#3498db";

//   return {
//     greeting: '<p style="margin-bottom: 10px; color: ' + textColor + ';">Thanks & Regards,</p>',
    
//     personalInfo: '<p style="margin: 0; font-size: 16px; font-weight: bold; color: ' + nameColor + ';">' + (formData.name || "Employee Name") + '</p>' +
//       '<p style="margin: 2px 0; font-size: 14px; color: ' + accentColor + ';">' + (formData.jobTitle || "Employee Title") + '</p>' +
//       '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: ' + textColor + ';">' + (formData.company || "AgileWorld Technology Ltd.") + '</p>' +
//       '<p style="margin: 2px 0 0 0; font-size: 14px; color: ' + textColor + ';">' + (formData.location || "Gurgaon, Haryana") + '</p>',
    
//     sidebarInfo: '<p style="margin: 0; font-size: 14px; font-weight: bold;">' + (formData.name || "Employee Name") + '</p>' +
//       '<p style="margin: 5px 0; font-size: 12px;">' + (formData.jobTitle || "Employee Title") + '</p>',
    
//     companyInfo: '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">' + (formData.company || "AgileWorld Technology Ltd.") + '</p>' +
//       '<p style="margin: 2px 0 0 0; font-size: 14px;">' + (formData.location || "Gurgaon, Haryana") + '</p>',
    
//     // 🔧 FIXED: Contact info now uses actual phone numbers
//     contactInfo: '<p style="margin: 0; font-size: 14px;">📞 ' + (formData.phone || formData.mobilePhone || "+91 9876543210") + '</p>' +
//       '<p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:' + formData.email + '" style="color: ' + accentColor + '; text-decoration: none;">' + (formData.email || "email@example.com") + '</a></p>' +
//       '<p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://' + formData.website + '" style="color: ' + accentColor + '; text-decoration: none;">www.' + (formData.website || "agileworldtechnologies.com") + '</a></p>' +
//       renderSocialIcons(formData),
    
//     banner: formData.banner ? '<div style="margin-top: 20px;"><img src="' + formData.banner + '" alt="Banner" width="100%" style="height: auto; border-radius: 8px; display: block; border: none;"></div>' : "",
    
//     disclaimer: formData.disclaimer ? '<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><b>DISCLAIMER</b></p><p style="margin-top: 5px;">' + formData.disclaimer + '</p></div>' : "",
//   };
// };

// export const generateSignatureHTML = (formData, selectedDesign, designStyle) => {
//   // console.log("Generating EMAIL-COMPATIBLE signature for design:", selectedDesign);
//   // console.log("📱 Phone data:", formData.phone, "Mobile:", formData.mobilePhone);
  
//   const design = designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];
//   const sections = generateContentSections(formData, designStyle);
//   const layoutFunction = layoutConfigs[design.layout] || layoutConfigs.standard;
//   const html = layoutFunction(designStyle, sections, formData);
  
//   // Clean HTML but keep it email-compatible
//   const cleanHTML = html.replace(/\s+/g, ' ').trim();
//   return cleanHTML;
// };

// // 🔧 FIXED: Template generation for bulk apply - now generates individual signatures
// export const generateSignatureTemplate = (selectedDesign, designStyle, staticFormData = {}) => {
//   const templateFormData = {
//     name: "{{name}}",
//     jobTitle: "{{jobTitle}}",
//     company: staticFormData.company || "{{company}}",
//     email: "{{email}}",
//     phone: "{{phone}}", // 🔧 This will be replaced with actual employee phone
//     mobilePhone: "{{mobilePhone}}",
//     location: staticFormData.location || "{{location}}",
//     website: staticFormData.website || "{{website}}",
//     linkedin: staticFormData.linkedin || "",
//     twitter: staticFormData.twitter || "",
//     instagram: staticFormData.instagram || "",
//     facebook: staticFormData.facebook || "",
//     youtube: staticFormData.youtube || "",
//     github: staticFormData.github || "",
//     portfolio: staticFormData.portfolio || "",
//     profileImage: staticFormData.profileImage || null,
//     logo: staticFormData.logo || null,
//     banner: staticFormData.banner || null,
//     disclaimer: staticFormData.disclaimer || "",
//     campaigns: staticFormData.campaigns || [],
//     ...staticFormData
//   };

//   return generateSignatureHTML(templateFormData, selectedDesign, designStyle);
// };

// export const validateTemplatePlaceholders = (htmlTemplate) => {
//   const requiredPlaceholders = ['{{name}}', '{{email}}', '{{jobTitle}}', '{{company}}'];
//   const missingPlaceholders = requiredPlaceholders.filter(placeholder => 
//     !htmlTemplate.includes(placeholder)
//   );
  
//   if (missingPlaceholders.length > 0) {
//     console.warn('Missing required placeholders:', missingPlaceholders);
//   }
  
//   return missingPlaceholders.length === 0;
// };

// // 🔧 FIXED: Placeholder replacement now handles phone numbers correctly
// export const replacePlaceholders = (template, employeeData) => {
//   let result = template;
  
//   const placeholderMap = {
//     '{{name}}': employeeData.displayName || employeeData.name || '',
//     '{{jobTitle}}': employeeData.jobTitle || employeeData.title || '',
//     '{{email}}': employeeData.mail || employeeData.email || '',
//     '{{phone}}': employeeData.businessPhones?.[0] || employeeData.mobilePhone || employeeData.phone || '', // 🔧 Fixed phone handling
//     '{{mobilePhone}}': employeeData.mobilePhone || employeeData.businessPhones?.[0] || '',
//     '{{location}}': employeeData.officeLocation || employeeData.location || '',
//     '{{company}}': employeeData.company || 'agileworldtechnologies.com',
//     '{{website}}': employeeData.website || 'www.agileworldtechnologies.com',
//     '{{department}}': employeeData.department || ''
//   };
  
//   Object.entries(placeholderMap).forEach(([placeholder, value]) => {
//     result = result.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
//   });
  
//   return result;
// };

// export const loadFromLocalStorage = () => {
//   try {
//     const savedState = localStorage.getItem("emailSignatureState");
//     if (savedState) {
//       const parsed = JSON.parse(savedState);
//       console.log("Loaded from localStorage");
//       return parsed;
//     }
//   } catch (error) {
//     console.error("Error loading from localStorage:", error);
//   }
//   return null;
// };

// export const saveToLocalStorage = (stateToSave, currentState = null) => {
//   try {
//     let updatedState;

//     if (stateToSave.formData && currentState) {
//       const updatedFormData = ensureFiveCampaigns(stateToSave.formData);
//       updatedState = {
//         formData: updatedFormData,
//         activeTab: stateToSave.activeTab || currentState.activeTab,
//         selectedDesign: stateToSave.selectedDesign || currentState.selectedDesign,
//       };
//     } else {
//       updatedState = {
//         ...stateToSave,
//         activeTab: stateToSave.activeTab || (currentState ? currentState.activeTab : "Personal Info"),
//       };
//     }

//     console.log("Saving to localStorage");
//     localStorage.setItem("emailSignatureState", JSON.stringify(updatedState));
//     return updatedState.formData;
//   } catch (error) {
//     console.error("Error saving to localStorage:", error);
//     return stateToSave.formData;
//   }
// };



// // Complete Email-Compatible signatureUtils.js - Fixed ALL designs for individual and bulk apply
// import { designTemplates } from "../Tabs/DesignTab";

// export const ensureFiveCampaigns = (formDataToUpdate) => {
//   if (!formDataToUpdate.campaigns || formDataToUpdate.campaigns.length < 5) {
//     const updatedCampaigns = [...(formDataToUpdate.campaigns || [])];
//     while (updatedCampaigns.length < 5) {
//       const newId = updatedCampaigns.length + 1;
//       updatedCampaigns.push({
//         id: newId,
//         name: `Campaign ${newId}`,
//         image: null,
//         startDate: "",
//         expiryDate: "",
//         active: false,
//         links: [
//           { url: "", text: "Link 1", area: { x: 0, y: 0, width: 33, height: 100 } },
//           { url: "", text: "Link 2", area: { x: 33, y: 0, width: 34, height: 100 } },
//           { url: "", text: "Link 3", area: { x: 67, y: 0, width: 33, height: 100 } },
//         ],
//       });
//     }
//     return { ...formDataToUpdate, campaigns: updatedCampaigns };
//   }
//   return formDataToUpdate;
// };

// export const getActiveCampaigns = (campaigns) => {
//   return campaigns.filter(
//     (campaign) =>
//       campaign.active &&
//       campaign.image &&
//       !(campaign.startDate && new Date() < new Date(campaign.startDate)) &&
//       !(campaign.expiryDate && new Date() > new Date(campaign.expiryDate))
//   );
// };

// const getUserInitials = (name) => {
//   if (!name || name === "Employee Name") return "ID";
//   const nameParts = name.trim().split(/\s+/);
//   if (nameParts.length === 0) return "ID";
//   const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
//   if (nameParts.length === 1) return firstNameInitial;
//   const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
//   return firstNameInitial + lastNameInitial;
// };

// const renderSocialIcons = (formData) => {
//   const socialIcons = [
//     { key: "linkedin", icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png", alt: "LinkedIn" },
//     { key: "youtube", icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png", alt: "YouTube" },
//     { key: "instagram", icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png", alt: "Instagram" },
//     { key: "facebook", icon: "https://cdn-icons-png.flaticon.com/24/145/145802.png", alt: "Facebook" },
//     { key: "twitter", icon: "https://cdn-icons-png.flaticon.com/24/145/145812.png", alt: "Twitter" },
//     { key: "github", icon: "https://cdn-icons-png.flaticon.com/24/733/733553.png", alt: "GitHub" },
//   ];

//   const socialLinks = socialIcons
//     .filter((social) => formData[social.key])
//     .map((social, index, array) => {
//       const marginRight = index === array.length - 1 ? "0" : "8";
//       return '<a href="' + formData[social.key] + '" style="text-decoration: none; margin-right: ' + marginRight + 'px;"><img src="' + social.icon + '" alt="' + social.alt + '" width="20" height="20" style="vertical-align: middle; border: none; display: inline-block;"></a>';
//     });

//   return socialLinks.length > 0 ? socialLinks.join("") : "";
// };

// const renderOrangeSocialIcons = (formData) => {
//   const socialIcons = [
//     { key: "linkedin", icon: "https://cdn-icons-png.flaticon.com/24/145/145807.png", alt: "LinkedIn" },
//     { key: "youtube", icon: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png", alt: "YouTube" },
//     { key: "instagram", icon: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png", alt: "Instagram" },
//     { key: "facebook", icon: "https://cdn-icons-png.flaticon.com/24/145/145802.png", alt: "Facebook" },
//     { key: "twitter", icon: "https://cdn-icons-png.flaticon.com/24/145/145812.png", alt: "Twitter" },
//     { key: "github", icon: "https://cdn-icons-png.flaticon.com/24/733/733553.png", alt: "GitHub" },
//   ];

//   const socialLinks = socialIcons
//     .filter((social) => formData[social.key])
//     .map((social, index) => {
//       const marginRight = index === 2 ? "0" : "6";
//       return '<a href="' + formData[social.key] + '" style="text-decoration: none; margin-right: ' + marginRight + 'px; margin-bottom: 4px; display: inline-block; background-color: #FF6B35; border-radius: 12px; width: 24px; height: 24px; text-align: center; line-height: 24px;"><img src="' + social.icon + '" alt="' + social.alt + '" width="12" height="12" style="vertical-align: middle; border: none; filter: brightness(0) invert(1);"></a>';
//     });

//   return socialLinks.length > 0 ? socialLinks.join("") : "";
// };

// // COMPLETE EMAIL-COMPATIBLE LAYOUT CONFIGURATIONS - ALL DESIGNS FIXED
// const layoutConfigs = {
//   // PROFESSIONAL LAYOUT
//   professional: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", 
//       jobTitle: "Job Title", 
//       company: "Company Name", 
//       location: "Location",
//       phone: "", 
//       mobilePhone: "", 
//       email: "", 
//       website: "", 
//       logo: null, 
//       profileImage: null,
//       ...formData
//     };

//     const accentColor = designStyle.accentColor || "#0066cc";
    
//     const logoSection = defaultData.logo ? 
//       '<img src="' + defaultData.logo + '" alt="Company Logo" width="100" height="83" style="border: none; border-radius: 4px; display: block;">' :
//       '<div style="width: 80px; height: 60px; background-color: ' + accentColor + '; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; text-align: center; line-height: 60px; display: block;">' + getUserInitials(defaultData.name) + '</div>';

//     const contactDetails = [];
//     if (defaultData.mobilePhone || defaultData.phone) {
//       const phoneToShow = defaultData.mobilePhone || defaultData.phone;
//       contactDetails.push('<b>mobile:</b> ' + phoneToShow + (defaultData.phone && defaultData.mobilePhone && defaultData.phone !== defaultData.mobilePhone ? ' | <b>tel:</b> ' + defaultData.phone : ''));
//     }
//     if (defaultData.email) {
//       contactDetails.push('<b>email:</b> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
//     }
//     if (defaultData.website) {
//       const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
//       const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
//       contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
//     }
//     if (defaultData.location) {
//       contactDetails.push('<b>location:</b> ' + defaultData.location);
//     }

//     const profileImageSection = defaultData.profileImage ? 
//       '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="80" height="80" style="border-radius: 6px; border: 2px solid #e0e0e0; display: block;">' : '';

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse;">' +
//       '<tr>' +
//         '<td width="140" valign="top" style="padding: 20px; text-align: center;">' +
//           logoSection +
//           '<div style="font-size: 12px; font-weight: bold; color: #333333; margin-top: 4px;">' + defaultData.company + '</div>' +
//         '</td>' +
//         '<td valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 2px;">' + defaultData.name + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + defaultData.jobTitle + '</div>' +
//           '<div style="font-size: 12px; color: #666666; line-height: 1.4;">' + contactDetails.join('<br>') + '</div>' +
//         '</td>' +
//         '<td width="80" valign="top" style="padding: 20px; text-align: center;">' +
//           (defaultData.profileImage ? profileImageSection : '') +
//         '</td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td colspan="3" style="padding: 8px 20px;">' +
//           '<div style="margin-top: 8px;">' + renderSocialIcons(defaultData) + '</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // ORANGE LAYOUT
//   orange: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", 
//       jobTitle: "Job Title", 
//       phone: "",
//       email: "", 
//       website: "",
//       company: "Company Name", 
//       location: "Location",
//       profileImage: null,
//       ...formData
//     };

//     const profileSection = defaultData.profileImage ? 
//       '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block;">' :
//       '<div style="width: 110px; height: 110px; border-radius: 55px; background-color: #FF6B35; color: white; font-size: 36px; font-weight: bold; text-align: center; line-height: 110px; display: block;">' + (defaultData.name ? defaultData.name.charAt(0) : "U") + '</div>';

//     const contactItems = [];
//     if (defaultData.phone) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📞</span><span style="font-size: 12px; color: #333333;">' + defaultData.phone + '</span></div>');
//     if (defaultData.email) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">✉</span><span style="font-size: 12px; color: #333333;">' + defaultData.email + '</span></div>');
//     if (defaultData.website) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🌐</span><span style="font-size: 12px; color: #333333;">' + defaultData.website + '</span></div>');
//     if (defaultData.company) contactItems.push('<div style="margin-bottom: 8px; margin-top: 10px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🏢</span><span style="font-size: 12px; color: #333333;">' + defaultData.company + '</span></div>');
//     if (defaultData.location) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📍</span><span style="font-size: 12px; color: #333333;">' + defaultData.location + '</span></div>');

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
//       '<tr>' +
//         '<td colspan="3" style="height: 4px; background-color: #FF6B35;"></td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td width="130" valign="top" style="padding: 20px; text-align: center;">' +
//           profileSection +
//         '</td>' +
//         '<td valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div>' +
//           '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
//           '<div style="margin-bottom: 10px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
//         '</td>' +
//         '<td width="200" valign="top" style="padding: 20px;">' +
//           contactItems.join('') +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // ORANGE CENTER LAYOUT
//   orangecenter: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", 
//       jobTitle: "Job Title", 
//       phone: "",
//       email: "", 
//       website: "",
//       company: "Company Name", 
//       location: "Location",
//       profileImage: null,
//       ...formData
//     };

//     const profileSection = defaultData.profileImage ? 
//       '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="80" height="80" style="border-radius: 40px; border: 2px solid #FF6B35; display: block; margin: 0 auto;">' :
//       '<div style="width: 80px; height: 80px; border-radius: 40px; background-color: #FF6B35; color: white; font-size: 28px; font-weight: bold; text-align: center; line-height: 80px; display: block; margin: 0 auto;">' + (defaultData.name ? defaultData.name.charAt(0) : "U") + '</div>';

//     const contactItems = [];
//     if (defaultData.phone) contactItems.push(defaultData.phone);
//     if (defaultData.email) contactItems.push(defaultData.email);
//     if (defaultData.website) contactItems.push(defaultData.website);
//     if (defaultData.location) contactItems.push(defaultData.location);

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
//       '<tr>' +
//         '<td style="height: 4px; background-color: #FF6B35;"></td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td style="padding: 30px; text-align: center;">' +
//           profileSection +
//           '<div style="font-size: 24px; font-weight: bold; color: #333333; margin: 15px 0 5px 0;">' + (defaultData.name || "Your Name") + '</div>' +
//           '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
//           '<div style="font-size: 16px; font-weight: bold; color: #333333; margin-bottom: 10px;">' + (defaultData.company || "Company Name") + '</div>' +
//           '<div style="margin-bottom: 15px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
//           '<div style="font-size: 12px; color: #666666; line-height: 1.5;">' + contactItems.join(' | ') + '</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // ORANGE TEXT LAYOUT
//   orangetext: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", 
//       jobTitle: "Job Title", 
//       phone: "",
//       email: "", 
//       website: "",
//       company: "Company Name", 
//       location: "Location", 
//       ...formData
//     };

//     const contactItems = [];
//     if (defaultData.phone) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📞 ' + defaultData.phone + '</span></div>');
//     if (defaultData.email) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">✉ ' + defaultData.email + '</span></div>');
//     if (defaultData.website) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🌐 ' + defaultData.website + '</span></div>');
//     if (defaultData.company) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🏢 ' + defaultData.company + '</span></div>');
//     if (defaultData.location) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📍 ' + defaultData.location + '</span></div>');

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
//       '<tr>' +
//         '<td style="height: 4px; background-color: #FF6B35;"></td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td style="padding: 20px;">' +
//           '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div>' +
//           '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
//           '<div style="margin-bottom: 15px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
//           '<div>' + contactItems.join('') + '</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // ORANGE RIGHT LAYOUT
//   orangeright: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", 
//       jobTitle: "Job Title", 
//       phone: "",
//       email: "", 
//       website: "",
//       company: "Company Name", 
//       location: "Location",
//       profileImage: null,
//       ...formData
//     };

//     const profileSection = defaultData.profileImage ? 
//       '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block;">' :
//       '<div style="width: 110px; height: 110px; border-radius: 55px; background-color: #FF6B35; color: white; font-size: 36px; font-weight: bold; text-align: center; line-height: 110px; display: block;">' + (defaultData.name ? defaultData.name.charAt(0) : "U") + '</div>';

//     const contactItems = [];
//     if (defaultData.phone) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📞</span><span style="font-size: 12px; color: #333333;">' + defaultData.phone + '</span></div>');
//     if (defaultData.email) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">✉</span><span style="font-size: 12px; color: #333333;">' + defaultData.email + '</span></div>');
//     if (defaultData.website) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🌐</span><span style="font-size: 12px; color: #333333;">' + defaultData.website + '</span></div>');
//     if (defaultData.company) contactItems.push('<div style="margin-bottom: 8px; margin-top: 10px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🏢</span><span style="font-size: 12px; color: #333333;">' + defaultData.company + '</span></div>');
//     if (defaultData.location) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📍</span><span style="font-size: 12px; color: #333333;">' + defaultData.location + '</span></div>');

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
//       '<tr>' +
//         '<td colspan="3" style="height: 4px; background-color: #FF6B35;"></td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td width="200" valign="top" style="padding: 20px;">' +
//           contactItems.join('') +
//         '</td>' +
//         '<td valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div>' +
//           '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
//           '<div style="margin-bottom: 10px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
//         '</td>' +
//         '<td width="130" valign="top" style="padding: 20px; text-align: center;">' +
//           profileSection +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // TEXT LAYOUT
//   text: (designStyle, sections, formData) => {
//     const accentColor = designStyle.accentColor || "#0066cc";
//     const defaultData = { ...formData };
    
//     const contactDetails = [];
//     if (defaultData.phone) contactDetails.push('<b>phone:</b> ' + defaultData.phone);
//     if (defaultData.email) contactDetails.push('<b>email:</b> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
//     if (defaultData.website) {
//       const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
//       const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
//       contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
//     }
//     if (defaultData.location) contactDetails.push('<b>location:</b> ' + defaultData.location);
    
//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">' +
//       '<tr>' +
//         '<td width="70%" valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 2px;">' + (defaultData.name || "Employee Name") + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + (defaultData.jobTitle || "Job Title") + '</div>' +
//           '<div style="font-size: 12px; color: #666666; line-height: 1.4;">' + contactDetails.join('<br>') + '</div>' +
//         '</td>' +
//         '<td width="30%" valign="middle" style="padding: 20px; text-align: center;">' +
//           '<div style="font-size: 16px; font-weight: bold; color: #666666;">' + (defaultData.company || "Company Name") + '</div>' +
//         '</td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td colspan="2" style="padding: 15px 20px;">' +
//           renderSocialIcons(defaultData) +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // LOGO LAYOUT
//   logo: (designStyle, sections, formData) => {
//     const defaultData = { ...formData };
//     const accentColor = designStyle.accentColor || "#0066cc";
    
//     const logoSection = defaultData.logo ? 
//       '<img src="' + defaultData.logo + '" alt="Company Logo" width="120" height="100" style="border: none; border-radius: 4px; display: block;">' :
//       '<div style="width: 100px; height: 80px; background-color: ' + accentColor + '; color: white; font-weight: bold; font-size: 28px; border-radius: 4px; text-align: center; line-height: 80px; display: block;">' + getUserInitials(defaultData.name) + '</div>';

//     const contactDetails = [];
//     if (defaultData.phone) contactDetails.push('📞 ' + defaultData.phone);
//     if (defaultData.email) contactDetails.push('✉ ' + defaultData.email);
//     if (defaultData.website) contactDetails.push('🌐 ' + defaultData.website);
//     if (defaultData.location) contactDetails.push('📍 ' + defaultData.location);

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">' +
//       '<tr>' +
//         '<td width="150" valign="top" style="padding: 20px; text-align: center;">' +
//           logoSection +
//         '</td>' +
//         '<td valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 20px; font-weight: bold; color: #333333; margin-bottom: 5px;">' + (defaultData.name || "Employee Name") + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 10px;">' + (defaultData.jobTitle || "Job Title") + '</div>' +
//           '<div style="font-size: 16px; font-weight: bold; color: #333333; margin-bottom: 10px;">' + (defaultData.company || "Company Name") + '</div>' +
//           '<div style="font-size: 12px; color: #666666; line-height: 1.6;">' + contactDetails.join('<br>') + '</div>' +
//           '<div style="margin-top: 15px;">' + renderSocialIcons(defaultData) + '</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // WITHOUT PROFILE LAYOUT
//   withoutProfile: (designStyle, sections, formData) => {
//     const defaultData = { ...formData };
//     const accentColor = designStyle.accentColor || "#0066cc";
    
//     const contactDetails = [];
//     if (defaultData.phone) contactDetails.push('<div style="margin-bottom: 5px;">📞 ' + defaultData.phone + '</div>');
//     if (defaultData.email) contactDetails.push('<div style="margin-bottom: 5px;">✉ <a href="mailto:' + defaultData.email + '" style="color: ' + accentColor + '; text-decoration: none;">' + defaultData.email + '</a></div>');
//     if (defaultData.website) {
//       const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
//       contactDetails.push('<div style="margin-bottom: 5px;">🌐 <a href="' + websiteUrl + '" target="_blank" style="color: ' + accentColor + '; text-decoration: none;">' + defaultData.website + '</a></div>');
//     }
//     if (defaultData.location) contactDetails.push('<div style="margin-bottom: 5px;">📍 ' + defaultData.location + '</div>');

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">' +
//       '<tr>' +
//         '<td style="padding: 25px;">' +
//           '<div style="font-size: 22px; font-weight: bold; color: #333333; margin-bottom: 5px;">' + (defaultData.name || "Employee Name") + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px; font-weight: 600;">' + (defaultData.jobTitle || "Job Title") + '</div>' +
//           '<div style="font-size: 16px; font-weight: bold; color: #333333; margin-bottom: 15px;">' + (defaultData.company || "Company Name") + '</div>' +
//           '<div style="font-size: 12px; color: #666666; margin-bottom: 15px;">' + contactDetails.join('') + '</div>' +
//           '<div>' + renderSocialIcons(defaultData) + '</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // STANDARD LAYOUT
//   standard: (designStyle, sections, formData) => {
//     const textColor = designStyle.textColor || "#333";
//     const accentColor = designStyle.accentColor || "#3498db";
//     const backgroundColor = designStyle.backgroundColor || "#f0f0f0";

//     return '<table width="600" cellpadding="20" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: ' + backgroundColor + '; border-radius: 8px;">' +
//       '<tr>' +
//         '<td>' +
//           '<p style="margin-bottom: 10px; color: ' + textColor + ';">Thanks & Regards,</p>' +
//           '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">' +
//             '<tr>' +
//               '<td width="50%" valign="top" style="padding-right: 20px; color: ' + textColor + ';">' + sections.personalInfo + '</td>' +
//               '<td width="1" style="background-color: ' + accentColor + ';"></td>' +
//               '<td width="50%" valign="top" style="padding-left: 20px; color: ' + textColor + ';">' + sections.contactInfo + '</td>' +
//             '</tr>' +
//           '</table>' +
//           sections.banner + sections.disclaimer +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // SPLIT LAYOUT
//   split: (designStyle, sections, formData) => {
//     const accentColor = designStyle.accentColor || "#3498db";
//     const defaultData = { ...formData };

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
//       '<tr>' +
//         '<td width="120" valign="top" style="background-color: ' + accentColor + '; padding: 20px; text-align: center;">' +
//           '<div style="color: white; font-size: 14px; font-weight: bold; margin-bottom: 10px;">' + (defaultData.name || "Employee Name") + '</div>' +
//           '<div style="color: white; font-size: 12px; margin-bottom: 15px;">' + (defaultData.jobTitle || "Job Title") + '</div>' +
//           renderSocialIcons(defaultData) +
//         '</td>' +
//         '<td valign="top" style="padding: 20px;">' +
//           '<div style="font-size: 16px; font-weight: bold; color: #333333; margin-bottom: 5px;">' + (defaultData.company || "Company Name") + '</div>' +
//           '<div style="font-size: 12px; color: #666666; line-height: 1.5;">' +
//             (defaultData.phone ? '📞 ' + defaultData.phone + '<br>' : '') +
//             (defaultData.email ? '✉ ' + defaultData.email + '<br>' : '') +
//             (defaultData.website ? '🌐 ' + defaultData.website + '<br>' : '') +
//             (defaultData.location ? '📍 ' + defaultData.location : '') +
//           '</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // CENTERED LAYOUT
//   centered: (designStyle, sections, formData) => {
//     const accentColor = designStyle.accentColor || "#3498db";
//     const defaultData = { ...formData };

//     const contactItems = [];
//     if (defaultData.phone) contactItems.push(defaultData.phone);
//     if (defaultData.email) contactItems.push(defaultData.email);
//     if (defaultData.website) contactItems.push(defaultData.website);
//     if (defaultData.location) contactItems.push(defaultData.location);

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">' +
//       '<tr>' +
//         '<td style="padding: 30px; text-align: center;">' +
//           '<div style="font-size: 20px; font-weight: bold; color: #333333; margin-bottom: 5px;">' + (defaultData.name || "Employee Name") + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 10px;">' + (defaultData.jobTitle || "Job Title") + '</div>' +
//           '<div style="width: 60%; margin: 15px auto; height: 2px; background-color: ' + accentColor + ';"></div>' +
//           '<div style="font-size: 16px; font-weight: bold; color: #333333; margin-bottom: 10px;">' + (defaultData.company || "Company Name") + '</div>' +
//           '<div style="font-size: 12px; color: #666666; margin-bottom: 15px;">' + contactItems.join(' | ') + '</div>' +
//           renderSocialIcons(defaultData) +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // HORIZONTAL LAYOUT
//   horizontal: (designStyle, sections, formData) => {
//     const accentColor = designStyle.accentColor || "#3498db";
//     const defaultData = { ...formData };

//     const contactDetails = [];
//     if (defaultData.phone) contactDetails.push('📞 ' + defaultData.phone);
//     if (defaultData.email) contactDetails.push('✉ ' + defaultData.email);
//     if (defaultData.website) contactDetails.push('🌐 ' + defaultData.website);
//     if (defaultData.location) contactDetails.push('📍 ' + defaultData.location);

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">' +
//       '<tr>' +
//         '<td style="padding: 20px;">' +
//           '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 5px;">' + (defaultData.name || "Employee Name") + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 10px;">' + (defaultData.jobTitle || "Job Title") + '</div>' +
//           '<div style="font-size: 16px; font-weight: bold; color: #333333; margin-bottom: 10px;">' + (defaultData.company || "Company Name") + '</div>' +
//           '<div style="font-size: 12px; color: #666666; margin-bottom: 15px;">' + contactDetails.join(' | ') + '</div>' +
//           renderSocialIcons(defaultData) +
//         '</td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td style="background-color: ' + accentColor + '; padding: 12px; border-radius: 0 0 8px 8px;">' +
//           '<div style="color: white; text-align: center; font-size: 12px;">Email Signature</div>' +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // BORDERED LAYOUT
//   bordered: (designStyle, sections, formData) => {
//     const accentColor = designStyle.accentColor || "#3498db";
//     const defaultData = { ...formData };

//     const contactDetails = [];
//     if (defaultData.phone) contactDetails.push('<div style="margin-bottom: 5px;">📞 ' + defaultData.phone + '</div>');
//     if (defaultData.email) contactDetails.push('<div style="margin-bottom: 5px;">✉ ' + defaultData.email + '</div>');
//     if (defaultData.website) contactDetails.push('<div style="margin-bottom: 5px;">🌐 ' + defaultData.website + '</div>');
//     if (defaultData.location) contactDetails.push('<div style="margin-bottom: 5px;">📍 ' + defaultData.location + '</div>');

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 3px solid ' + accentColor + '; border-radius: 8px;">' +
//       '<tr>' +
//         '<td style="padding: 25px;">' +
//           '<div style="font-size: 20px; font-weight: bold; color: #333333; margin-bottom: 5px;">' + (defaultData.name || "Employee Name") + '</div>' +
//           '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 10px;">' + (defaultData.jobTitle || "Job Title") + '</div>' +
//           '<div style="font-size: 16px; font-weight: bold; color: #333333; margin-bottom: 15px;">' + (defaultData.company || "Company Name") + '</div>' +
//           '<div style="font-size: 12px; color: #666666; margin-bottom: 15px;">' + contactDetails.join('') + '</div>' +
//           renderSocialIcons(defaultData) +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },

//   // BANNER LAYOUT
//   banner: (designStyle, sections, formData) => {
//     const accentColor = designStyle.accentColor || "#34495e";
//     const defaultData = { ...formData };

//     const contactDetails = [];
//     if (defaultData.phone) contactDetails.push(defaultData.phone);
//     if (defaultData.email) contactDetails.push(defaultData.email);
//     if (defaultData.website) contactDetails.push(defaultData.website);
//     if (defaultData.location) contactDetails.push(defaultData.location);

//     return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
//       '<tr>' +
//         '<td style="background-color: ' + accentColor + '; padding: 20px; text-align: center;">' +
//           '<div style="color: white; font-size: 24px; font-weight: bold; margin-bottom: 5px;">' + (defaultData.name || "Employee Name") + '</div>' +
//           '<div style="color: white; font-size: 14px; margin-bottom: 10px;">' + (defaultData.jobTitle || "Job Title") + '</div>' +
//           '<div style="color: white; font-size: 16px; font-weight: bold;">' + (defaultData.company || "Company Name") + '</div>' +
//         '</td>' +
//       '</tr>' +
//       '<tr>' +
//         '<td style="padding: 20px; text-align: center;">' +
//           '<div style="font-size: 12px; color: #666666; margin-bottom: 15px;">' + contactDetails.join(' | ') + '</div>' +
//           renderSocialIcons(defaultData) +
//         '</td>' +
//       '</tr>' +
//     '</table>';
//   },
// };

// // Generate content sections with actual formData
// const generateContentSections = (formData, designStyle) => {
//   const textColor = designStyle.textColor || "#333";
//   const nameColor = designStyle.nameColor || "#3498db";
//   const accentColor = designStyle.accentColor || "#3498db";

//   return {
//     greeting: '<p style="margin-bottom: 10px; color: ' + textColor + ';">Thanks & Regards,</p>',
    
//     personalInfo: '<p style="margin: 0; font-size: 16px; font-weight: bold; color: ' + nameColor + ';">' + (formData.name || "Employee Name") + '</p>' +
//       '<p style="margin: 2px 0; font-size: 14px; color: ' + accentColor + ';">' + (formData.jobTitle || "Employee Title") + '</p>' +
//       '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: ' + textColor + ';">' + (formData.company || "AgileWorld Technology Ltd.") + '</p>' +
//       '<p style="margin: 2px 0 0 0; font-size: 14px; color: ' + textColor + ';">' + (formData.location || "Gurgaon, Haryana") + '</p>',
    
//     sidebarInfo: '<p style="margin: 0; font-size: 14px; font-weight: bold;">' + (formData.name || "Employee Name") + '</p>' +
//       '<p style="margin: 5px 0; font-size: 12px;">' + (formData.jobTitle || "Employee Title") + '</p>',
    
//     companyInfo: '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">' + (formData.company || "AgileWorld Technology Ltd.") + '</p>' +
//       '<p style="margin: 2px 0 0 0; font-size: 14px;">' + (formData.location || "Gurgaon, Haryana") + '</p>',
    
//     contactInfo: '<p style="margin: 0; font-size: 14px;">📞 ' + (formData.phone || formData.mobilePhone || "+91 9876543210") + '</p>' +
//       '<p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:' + formData.email + '" style="color: ' + accentColor + '; text-decoration: none;">' + (formData.email || "email@example.com") + '</a></p>' +
//       '<p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://' + formData.website + '" style="color: ' + accentColor + '; text-decoration: none;">www.' + (formData.website || "agileworldtechnologies.com") + '</a></p>' +
//       renderSocialIcons(formData),
    
//     banner: formData.banner ? '<div style="margin-top: 20px;"><img src="' + formData.banner + '" alt="Banner" width="100%" style="height: auto; border-radius: 8px; display: block; border: none;"></div>' : "",
    
//     disclaimer: formData.disclaimer ? '<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><b>DISCLAIMER</b></p><p style="margin-top: 5px;">' + formData.disclaimer + '</p></div>' : "",
//   };
// };

// export const generateSignatureHTML = (formData, selectedDesign, designStyle) => {
//   console.log("🔧 Generating signature for design:", selectedDesign, "Phone:", formData.phone);
  
//   const design = designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];
//   const sections = generateContentSections(formData, designStyle);
//   const layoutFunction = layoutConfigs[design.layout] || layoutConfigs.standard;
//   const html = layoutFunction(designStyle, sections, formData);
  
//   const cleanHTML = html.replace(/\s+/g, ' ').trim();
//   return cleanHTML;
// };

// export const generateSignatureTemplate = (selectedDesign, designStyle, staticFormData = {}) => {
//   const templateFormData = {
//     name: "{{name}}",
//     jobTitle: "{{title}}",
//     company: staticFormData.company || "{{company}}",
//     email: "{{email}}",
//     phone: "{{phone}}",
//     mobilePhone: "{{mobilePhone}}",
//     location: staticFormData.location || "{{location}}",
//     website: staticFormData.website || "{{website}}",
//     linkedin: staticFormData.linkedin || "",
//     twitter: staticFormData.twitter || "",
//     instagram: staticFormData.instagram || "",
//     facebook: staticFormData.facebook || "",
//     youtube: staticFormData.youtube || "",
//     github: staticFormData.github || "",
//     portfolio: staticFormData.portfolio || "",
//     profileImage: staticFormData.profileImage || null,
//     logo: staticFormData.logo || null,
//     banner: staticFormData.banner || null,
//     disclaimer: staticFormData.disclaimer || "",
//     campaigns: staticFormData.campaigns || [],
//     ...staticFormData
//   };

//   return generateSignatureHTML(templateFormData, selectedDesign, designStyle);
// };

// export const validateTemplatePlaceholders = (htmlTemplate) => {
//   const requiredPlaceholders = ['{{name}}', '{{email}}', '{{title}}', '{{company}}'];
//   const missingPlaceholders = requiredPlaceholders.filter(placeholder => 
//     !htmlTemplate.includes(placeholder)
//   );
  
//   if (missingPlaceholders.length > 0) {
//     console.warn('Missing required placeholders:', missingPlaceholders);
//   }
  
//   return missingPlaceholders.length === 0;
// };

// export const replacePlaceholders = (template, employeeData) => {
//   let result = template;
  
//   const placeholderMap = {
//     '{{name}}': employeeData.displayName || employeeData.name || '',
//     '{{title}}': employeeData.jobTitle || employeeData.title || '',
//     '{{email}}': employeeData.mail || employeeData.email || '',
//     '{{phone}}': employeeData.businessPhones?.[0] || employeeData.mobilePhone || employeeData.phone || '',
//     '{{mobilePhone}}': employeeData.mobilePhone || employeeData.businessPhones?.[0] || '',
//     '{{location}}': employeeData.officeLocation || employeeData.location || '',
//     '{{company}}': employeeData.company || 'agileworldtechnologies.com',
//     '{{website}}': employeeData.website || 'www.agileworldtechnologies.com',
//     '{{department}}': employeeData.department || ''
//   };
  
//   Object.entries(placeholderMap).forEach(([placeholder, value]) => {
//     result = result.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
//   });
  
//   return result;
// };

// export const loadFromLocalStorage = () => {
//   try {
//     const savedState = localStorage.getItem("emailSignatureState");
//     if (savedState) {
//       const parsed = JSON.parse(savedState);
//       console.log("Loaded from localStorage");
//       return parsed;
//     }
//   } catch (error) {
//     console.error("Error loading from localStorage:", error);
//   }
//   return null;
// };

// export const saveToLocalStorage = (stateToSave, currentState = null) => {
//   try {
//     let updatedState;

//     if (stateToSave.formData && currentState) {
//       const updatedFormData = ensureFiveCampaigns(stateToSave.formData);
//       updatedState = {
//         formData: updatedFormData,
//         activeTab: stateToSave.activeTab || currentState.activeTab,
//         selectedDesign: stateToSave.selectedDesign || currentState.selectedDesign,
//       };
//     } else {
//       updatedState = {
//         ...stateToSave,
//         activeTab: stateToSave.activeTab || (currentState ? currentState.activeTab : "Personal Info"),
//       };
//     }

//     console.log("Saving to localStorage");
//     localStorage.setItem("emailSignatureState", JSON.stringify(updatedState));
//     return updatedState.formData;
//   } catch (error) {
//     console.error("Error saving to localStorage:", error);
//     return stateToSave.formData;
//   }
// };





// Fixed signatureUtils.js - Proper placeholder handling for bulk apply
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

// 🔧 FIXED: Proper user initials handling for both individual and bulk
const getUserInitials = (name) => {
  // Handle template placeholders for bulk apply
  if (name === "{{name}}" || !name || name === "Employee Name") {
    return "{{INITIALS}}"; // This will be replaced by backend
  }
  
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

// 🔧 FIXED: Proper phone number handling for both individual and bulk
const getPhoneNumber = (formData) => {
  // For bulk apply templates, use placeholder
  if (formData.phone === "{{phone}}" || formData.name === "{{name}}") {
    return "{{phone}}";
  }
  
  // For individual apply, use actual phone numbers with priority:
  // 1. mobilePhone (if exists)
  // 2. phone (fallback)
  // 3. businessPhones[0] (from employee data)
  const phone = formData.mobilePhone || formData.phone || formData.businessPhones?.[0];
  
  // Don't show default placeholder phone numbers
  if (phone === "+1 (555) 123-4567" || phone === "{{phone}}" || !phone) {
    return ""; // Return empty if no real phone
  }
  
  return phone;
};

// COMPLETE EMAIL-COMPATIBLE LAYOUT CONFIGURATIONS - ALL DESIGNS FIXED
const layoutConfigs = {
  // 🔧 FIXED: PROFESSIONAL LAYOUT - Proper placeholder and phone handling
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
      ...formData
    };

    const accentColor = designStyle.accentColor || "#0066cc";
    
    // 🔧 FIXED: Logo section with proper initials handling
    const logoSection = defaultData.logo ? 
      '<img src="' + defaultData.logo + '" alt="Company Logo" width="100" height="83" style="border: none; border-radius: 4px; display: block;">' :
      '<div style="width: 80px; height: 60px; background-color: ' + accentColor + '; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; text-align: center; line-height: 60px; display: block;">' + getUserInitials(defaultData.name) + '</div>';

    // 🔧 FIXED: Contact details with proper phone handling
    const contactDetails = [];
    const phoneNumber = getPhoneNumber(defaultData);
    if (phoneNumber) {
      contactDetails.push('<b>phone:</b> ' + phoneNumber);
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

    const profileImageSection = defaultData.profileImage ? 
      '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="80" height="80" style="border-radius: 6px; border: 2px solid #e0e0e0; display: block;">' : '';

    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse;">' +
      '<tr>' +
        '<td width="140" valign="top" style="padding: 20px; text-align: center;">' +
          logoSection +
          '<div style="font-size: 12px; font-weight: bold; color: #333333; margin-top: 4px;">' + defaultData.company + '</div>' +
        '</td>' +
        '<td valign="top" style="padding: 20px;">' +
          '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 2px;">' + defaultData.name + '</div>' +
          '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + defaultData.jobTitle + '</div>' +
          '<div style="font-size: 12px; color: #666666; line-height: 1.4;">' + contactDetails.join('<br>') + '</div>' +
        '</td>' +
        '<td width="80" valign="top" style="padding: 20px; text-align: center;">' +
          (defaultData.profileImage ? profileImageSection : '') +
        '</td>' +
      '</tr>' +
      '<tr>' +
        '<td colspan="3" style="padding: 8px 20px;">' +
          '<div style="margin-top: 8px;">' + renderSocialIcons(defaultData) + '</div>' +
        '</td>' +
      '</tr>' +
    '</table>';
  },

  // 🔧 FIXED: ORANGE LAYOUT - Proper placeholder and phone handling
  orange: (designStyle, sections, formData) => {
    const defaultData = {
      name: "Employee Name", 
      jobTitle: "Job Title", 
      phone: "",
      email: "", 
      website: "",
      company: "Company Name", 
      location: "Location",
      profileImage: null,
      ...formData
    };

    // 🔧 FIXED: Profile section with proper initials for bulk apply
    const profileSection = defaultData.profileImage ? 
      '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block;">' :
      '<div style="width: 110px; height: 110px; border-radius: 55px; background-color: #FF6B35; color: white; font-size: 36px; font-weight: bold; text-align: center; line-height: 110px; display: block;">' + getUserInitials(defaultData.name) + '</div>';

    // 🔧 FIXED: Contact items with proper phone handling
    const contactItems = [];
    const phoneNumber = getPhoneNumber(defaultData);
    if (phoneNumber) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📞</span><span style="font-size: 12px; color: #333333;">' + phoneNumber + '</span></div>');
    }
    if (defaultData.email) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">✉</span><span style="font-size: 12px; color: #333333;">' + defaultData.email + '</span></div>');
    }
    if (defaultData.website) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🌐</span><span style="font-size: 12px; color: #333333;">' + defaultData.website + '</span></div>');
    }
    if (defaultData.company) {
      contactItems.push('<div style="margin-bottom: 8px; margin-top: 10px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🏢</span><span style="font-size: 12px; color: #333333;">' + defaultData.company + '</span></div>');
    }
    if (defaultData.location) {
      contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📍</span><span style="font-size: 12px; color: #333333;">' + defaultData.location + '</span></div>');
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
          '<div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div>' +
          '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
          '<div style="margin-bottom: 10px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
        '</td>' +
        '<td width="200" valign="top" style="padding: 20px;">' +
          contactItems.join('') +
        '</td>' +
      '</tr>' +
    '</table>';
  },

  // Apply same fixes to other layouts...
  orangecenter: (designStyle, sections, formData) => {
    const defaultData = { ...formData };
    const phoneNumber = getPhoneNumber(defaultData);
    
    const profileSection = defaultData.profileImage ? 
      '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="80" height="80" style="border-radius: 40px; border: 2px solid #FF6B35; display: block; margin: 0 auto;">' :
      '<div style="width: 80px; height: 80px; border-radius: 40px; background-color: #FF6B35; color: white; font-size: 28px; font-weight: bold; text-align: center; line-height: 80px; display: block; margin: 0 auto;">' + getUserInitials(defaultData.name) + '</div>';

    const contactItems = [];
    if (phoneNumber) contactItems.push(phoneNumber);
    if (defaultData.email) contactItems.push(defaultData.email);
    if (defaultData.website) contactItems.push(defaultData.website);
    if (defaultData.location) contactItems.push(defaultData.location);

    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff;">' +
      '<tr>' +
        '<td style="height: 4px; background-color: #FF6B35;"></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="padding: 30px; text-align: center;">' +
          profileSection +
          '<div style="font-size: 24px; font-weight: bold; color: #333333; margin: 15px 0 5px 0;">' + (defaultData.name || "Your Name") + '</div>' +
          '<div style="font-size: 14px; font-weight: bold; color: #FF6B35; margin-bottom: 15px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div>' +
          '<div style="font-size: 16px; font-weight: bold; color: #333333; margin-bottom: 10px;">' + (defaultData.company || "Company Name") + '</div>' +
          '<div style="margin-bottom: 15px;">' + renderOrangeSocialIcons(defaultData) + '</div>' +
          '<div style="font-size: 12px; color: #666666; line-height: 1.5;">' + contactItems.join(' | ') + '</div>' +
        '</td>' +
      '</tr>' +
    '</table>';
  },

  // Continue with other layouts using same pattern...
  orangetext: (designStyle, sections, formData) => {
    const defaultData = { ...formData };
    const phoneNumber = getPhoneNumber(defaultData);

    const contactItems = [];
    if (phoneNumber) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📞 ' + phoneNumber + '</span></div>');
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

  // Add other layouts with same fixes...
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
};

// 🔧 FIXED: Generate content sections with proper phone handling
const generateContentSections = (formData, designStyle) => {
  const textColor = designStyle.textColor || "#333";
  const nameColor = designStyle.nameColor || "#3498db";
  const accentColor = designStyle.accentColor || "#3498db";
  const phoneNumber = getPhoneNumber(formData);

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
    
    // 🔧 FIXED: Contact info with proper phone handling
    contactInfo: (phoneNumber ? '<p style="margin: 0; font-size: 14px;">📞 ' + phoneNumber + '</p>' : '') +
      '<p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:' + formData.email + '" style="color: ' + accentColor + '; text-decoration: none;">' + (formData.email || "email@example.com") + '</a></p>' +
      '<p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://' + formData.website + '" style="color: ' + accentColor + '; text-decoration: none;">www.' + (formData.website || "agileworldtechnologies.com") + '</a></p>' +
      renderSocialIcons(formData),
    
    banner: formData.banner ? '<div style="margin-top: 20px;"><img src="' + formData.banner + '" alt="Banner" width="100%" style="height: auto; border-radius: 8px; display: block; border: none;"></div>' : "",
    
    disclaimer: formData.disclaimer ? '<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><b>DISCLAIMER</b></p><p style="margin-top: 5px;">' + formData.disclaimer + '</p></div>' : "",
  };
};

export const generateSignatureHTML = (formData, selectedDesign, designStyle) => {
  console.log("🔧 Generating signature for design:", selectedDesign, "Phone:", getPhoneNumber(formData));
  
  const design = designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];
  const sections = generateContentSections(formData, designStyle);
  const layoutFunction = layoutConfigs[design.layout] || layoutConfigs.standard;
  const html = layoutFunction(designStyle, sections, formData);
  
  const cleanHTML = html.replace(/\s+/g, ' ').trim();
  return cleanHTML;
};

// 🔧 FIXED: Template generation for bulk apply with proper placeholders
export const generateSignatureTemplate = (selectedDesign, designStyle, staticFormData = {}) => {
  const templateFormData = {
    name: "{{name}}",
    jobTitle: "{{title}}",
    company: staticFormData.company || "Agile World Technologies LLC",
    email: "{{email}}",
    phone: "{{phone}}", // This will be replaced with actual employee phone
    mobilePhone: "{{mobilePhone}}",
    location: staticFormData.location || "{{location}}",
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
    ...staticFormData
  };

  return generateSignatureHTML(templateFormData, selectedDesign, designStyle);
};

export const validateTemplatePlaceholders = (htmlTemplate) => {
  const requiredPlaceholders = ['{{name}}', '{{email}}', '{{title}}', '{{company}}'];
  const missingPlaceholders = requiredPlaceholders.filter(placeholder => 
    !htmlTemplate.includes(placeholder)
  );
  
  if (missingPlaceholders.length > 0) {
    console.warn('Missing required placeholders:', missingPlaceholders);
  }
  
  return missingPlaceholders.length === 0;
};

// 🔧 FIXED: Enhanced placeholder replacement with proper phone and initials handling
export const replacePlaceholders = (template, employeeData) => {
  let result = template;
  
  // Get actual employee phone number
  const employeePhone = employeeData.businessPhones?.[0] || 
                       employeeData.mobilePhone || 
                       employeeData.phone || 
                       employeeData.mobile || "";
  
  // Generate initials from employee name
  const employeeName = employeeData.displayName || employeeData.name || "";
  const employeeInitials = getUserInitials(employeeName);
  
  const placeholderMap = {
    '{{name}}': employeeName,
    '{{title}}': employeeData.jobTitle || employeeData.title || '',
    '{{email}}': employeeData.mail || employeeData.email || '',
    '{{phone}}': employeePhone,
    '{{mobilePhone}}': employeeData.mobilePhone || employeePhone,
    '{{location}}': employeeData.officeLocation || employeeData.location || '',
    '{{company}}': employeeData.company || 'Agile World Technologies LLC',
    '{{website}}': employeeData.website || 'www.agileworldtechnologies.com',
    '{{department}}': employeeData.department || '',
    '{{INITIALS}}': employeeInitials // Special placeholder for initials
  };
  
  // Replace all placeholders
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