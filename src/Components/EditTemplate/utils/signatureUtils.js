// // Minimal Clean signatureUtils.js - Guaranteed to work
// import { designTemplates } from "../Tabs/DesignTab";

// export const ensureFiveCampaigns = (formDataToUpdate) => {
//   if (!formDataToUpdate.campaigns || formDataToUpdate.campaigns.length < 5) {
//     const updatedCampaigns = [...(formDataToUpdate.campaigns || [])];
//     while (updatedCampaigns.length < 5) {
//       const newId = updatedCampaigns.length + 1;
//       updatedCampaigns.push({
//         id: newId,
//         name: "Campaign " + newId,
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

// const styleToString = (styleObj) => {
//   return Object.entries(styleObj)
//     .map(([key, value]) => {
//       const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
//       return cssKey + ": " + value;
//     })
//     .join("; ");
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
//       const marginRight = index === array.length - 1 ? "0" : "10px";
//       return '<a href="' + formData[social.key] + '" style="margin-right: ' + marginRight + '; text-decoration: none;"><img src="' + social.icon + '" alt="' + social.alt + '" style="vertical-align: middle; width: 24px; height: 24px;"></a>';
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
//       const row = Math.floor(index / 3);
//       const col = index % 3;
//       const marginRight = col === 2 ? '0' : '8px';
//       const marginBottom = row > 0 ? '0' : '8px';
      
//       return '<a href="' + formData[social.key] + '" style="background-color: #FF6B35 !important; border-radius: 50% !important; width: 25px !important; height: 25px !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; text-decoration: none !important; transition: all 0.3s ease !important; margin-right: ' + marginRight + ' !important; margin-bottom: ' + marginBottom + ' !important;"><img src="' + social.icon + '" alt="' + social.alt + '" style="width: 12px; height: 12px; filter: brightness(0) invert(1) !important;"></a>';
//     });

//   return socialLinks.length > 0 ? socialLinks.join("") : "";
// };

// const generateContentSections = (formData, designStyle) => {
//   const textColor = designStyle.textColor || "#333";
//   const nameColor = designStyle.nameColor || "#3498db";
//   const accentColor = designStyle.accentColor || "#3498db";

//   return {
//     greeting: '<p style="margin-bottom: 10px;">Thanks & Regards,</p>',
//     personalInfo: '<p style="margin: 0; font-size: 16px; font-weight: bold; color: ' + nameColor + ';">' + (formData.name || "Employee Name") + '</p><p style="margin: 2px 0; font-size: 14px; color: ' + accentColor + ';">' + (formData.jobTitle || "Employee Title") + '</p><p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: ' + textColor + ';">' + (formData.company || "AgileWorld Technology Ltd.") + '</p><p style="margin: 2px 0 0 0; font-size: 14px;">' + (formData.location || "Gurgaon, Haryana") + '</p>',
//     sidebarInfo: '<p style="margin: 0; font-size: 14px; font-weight: bold;">' + (formData.name || "Employee Name") + '</p><p style="margin: 5px 0; font-size: 12px;">' + (formData.jobTitle || "Employee Title") + '</p>',
//     companyInfo: '<p style="margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">' + (formData.company || "AgileWorld Technology Ltd.") + '</p><p style="margin: 2px 0 0 0; font-size: 14px;">' + (formData.location || "Gurgaon, Haryana") + '</p>',
//     contactInfo: '<p style="margin: 0; font-size: 14px;">📞 ' + (formData.phone || "+91 9876543210") + '</p><p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:' + formData.email + '" style="color: ' + accentColor + '; text-decoration: none;">' + (formData.email || "email@example.com") + '</a></p><p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://' + formData.website + '" style="color: ' + accentColor + '; text-decoration: none;">www.' + (formData.website || "agileworldtechnologies.com") + '</a></p>' + renderSocialIcons(formData),
//     banner: formData.banner ? '<div style="margin-top: 20px;"><img src="' + formData.banner + '" alt="Banner" style="width: 100%; height: auto; border-radius: 8px;"></div>' : "",
//     disclaimer: formData.disclaimer ? '<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><strong>DISCLAIMER</strong></p><p style="margin-top: 5px;">' + formData.disclaimer + '</p></div>' : "",
//   };
// };

// const layoutConfigs = {
//   professional: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Employee Name", jobTitle: "Job Title", company: "Company Name", location: "Location",
//       phone: "", mobilePhone: "", email: "", website: "", logo: null, profileImage: null,
//       linkedin: "", youtube: "", instagram: "", facebook: "", twitter: "", github: "", ...formData
//     };

//     const accentColor = designStyle.accentColor || "#0066cc";
//     const logoSection = defaultData.logo ? 
//       '<img src="' + defaultData.logo + '" alt="Company Logo" style="width: 100px; height: 83px; object-fit: contain; border-radius: 4px;"><div style="font-size: 12px; font-weight: 650; line-height: 1.2; color: #333333; text-align: center; margin-top: 4px;">' + defaultData.company + '</div>' :
//       '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;"><div style="width: 80px; height: 60px; background: linear-gradient(135deg, ' + accentColor + ', ' + (accentColor + '99') + '); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; margin-bottom: 8px;">' + getUserInitials(defaultData.name) + '</div><div style="font-size: 12px; font-weight: 650; line-height: 1.2; color: #333333; text-align: center;">' + defaultData.company + '</div></div>';

//     const contactDetails = [];
//     if (defaultData.mobilePhone || defaultData.phone) {
//       contactDetails.push('<strong>mobile:</strong> ' + (defaultData.mobilePhone || defaultData.phone) + (defaultData.phone && defaultData.mobilePhone ? ' | <strong>tel:</strong> ' + defaultData.phone : ''));
//     }
//     if (defaultData.email) {
//       contactDetails.push('<strong>email:</strong> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
//     }
//     if (defaultData.website) {
//       const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
//       const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
//       contactDetails.push('<strong>website:</strong> <a href="' + websiteUrl + '" target="_blank" rel="noopener noreferrer" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
//     }
//     contactDetails.push('<strong>location:</strong> ' + (defaultData.location || ""));

//     const profileImageSection = defaultData.profileImage ? 
//       '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" style="width: 100%; height: 100%; border-radius: 6px; object-fit: cover; border: 2px solid #e0e0e0;">' : '';

//     return '<div style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; width: 600px; min-height: 180px; margin: 0; border-radius: 8px; overflow: hidden;"><div style="display: flex; align-items: center; background-color: #ffffff; min-height: 140px;"><div style="width: 140px; min-width: 140px; display: flex; flex-direction: column; align-items: center; justify-content: center;">' + logoSection + '</div><div style="flex: 1; padding-left: 20px; padding-right: 20px;"><div style="font-size: 18px; font-weight: 700; color: #333333; margin-bottom: 2px;">' + defaultData.name + '</div><div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + defaultData.jobTitle + '</div><div style="font-size: 12px; color: #666666; line-height: 1.4;">' + contactDetails.join('<br/>') + '</div></div><div style="min-width: 80px; height: 80px; ' + (!defaultData.profileImage ? 'visibility: hidden;' : '') + '">' + profileImageSection + '</div></div><div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 20px;"><div><div style="margin-top: 8px;">' + renderSocialIcons(defaultData) + '</div></div></div></div>';
//   },

//   orange: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Sally Williams", jobTitle: "SALES MANAGER", phone: "+1 234 56789",
//       email: "s.williams@crossware365.com", website: "www.crossware365.com",
//       company: "Crossware Inc.", location: "New York, USA",
//       profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
//       ...formData
//     };

//     const profileSection = defaultData.profileImage ? 
//       '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid #FF6B35;">' :
//       '<div style="width: 110px; height: 110px; border-radius: 50%; background-color: #FF6B35; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">' + (defaultData.name ? defaultData.name.charAt(0) : "U") + '</div>';

//     const contactItems = [];
//     if (defaultData.phone) contactItems.push('<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 10px;">📞</span></div><span style="font-size: 12px; color: #333333;">' + defaultData.phone + '</span></div>');
//     if (defaultData.email) contactItems.push('<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 10px;">✉</span></div><span style="font-size: 12px; color: #333333;">' + defaultData.email + '</span></div>');
//     if (defaultData.website) contactItems.push('<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 10px;">🌐</span></div><span style="font-size: 12px; color: #333333;">' + defaultData.website + '</span></div>');
//     if (defaultData.company) contactItems.push('<div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;"><div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 10px;">🏢</span></div><span style="font-size: 12px; color: #333333;">' + defaultData.company + '</span></div>');
//     if (defaultData.location) contactItems.push('<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 10px;">📍</span></div><span style="font-size: 12px; color: #333333;">' + defaultData.location + '</span></div>');

//     return '<div style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; width: 600px; background-color: #ffffff; border: none; margin: 0; padding: 0;"><div style="height: 4px; background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%); width: 100%;"></div><div style="display: flex; align-items: center; padding: 20px; background-color: #ffffff;"><div style="margin-right: 20px;">' + profileSection + '</div><div style="flex: 1;"><div style="font-size: 24px; font-weight: 700; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div><div style="font-size: 14px; font-weight: 600; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div><div style="display: flex; flex-wrap: wrap; gap: 8px; max-width: 100px;">' + renderOrangeSocialIcons(defaultData) + '</div></div><div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start; margin-left: 20px; width: 200px;">' + contactItems.join('') + '</div></div></div>';
//   },

//   orangecenter: (designStyle, sections, formData) => {
//     return layoutConfigs.orange(designStyle, sections, formData);
//   },

//   orangetext: (designStyle, sections, formData) => {
//     const defaultData = {
//       name: "Sally Williams", jobTitle: "SALES MANAGER", phone: "+1 234 56789",
//       email: "s.williams@crossware365.com", website: "www.crossware365.com",
//       company: "Crossware Inc.", location: "New York, USA", ...formData
//     };

//     const contactItems = [];
//     if (defaultData.phone) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📞 ' + defaultData.phone + '</span></div>');
//     if (defaultData.email) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">✉ ' + defaultData.email + '</span></div>');
//     if (defaultData.website) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🌐 ' + defaultData.website + '</span></div>');
//     if (defaultData.company) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">🏢 ' + defaultData.company + '</span></div>');
//     if (defaultData.location) contactItems.push('<div style="margin-bottom: 5px;"><span style="font-size: 12px; color: #333333;">📍 ' + defaultData.location + '</span></div>');

//     return '<div style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; width: 600px; background-color: #ffffff; border: none; margin: 0; padding: 0;"><div style="height: 4px; background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%); width: 100%;"></div><div style="padding: 20px;"><div style="font-size: 24px; font-weight: 700; color: #333333; margin-bottom: 2px; line-height: 1.2;">' + (defaultData.name || "Your Name") + '</div><div style="font-size: 14px; font-weight: 600; color: #FF6B35; margin-bottom: 15px; letter-spacing: 0.5px;">' + (defaultData.jobTitle || "YOUR JOB TITLE") + '</div><div style="display: flex; flex-wrap: wrap; gap: 8px; max-width: 100px;">' + renderOrangeSocialIcons(defaultData) + '</div><div style="margin-top: 15px;">' + contactItems.join('') + '</div></div></div>';
//   },

//   standard: (designStyle, sections) => {
//     const containerStyle = {
//       fontFamily: "Arial, sans-serif",
//       color: designStyle.textColor || "#333",
//       backgroundColor: designStyle.backgroundColor || "#f0f0f0",
//       padding: "20px", maxWidth: "600px", borderRadius: "8px"
//     };
//     if (designStyle.borderStyle) containerStyle.border = designStyle.borderStyle;
//     if (designStyle.boxShadow) containerStyle.boxShadow = designStyle.boxShadow;

//     return '<div style="' + styleToString(containerStyle) + '">' + sections.greeting + '<table style="width: 100%; border-spacing: 0; color: ' + (designStyle.textColor || "#333") + ';"><tr><td style="padding-right: 20px; vertical-align: top;">' + sections.personalInfo + '</td><td style="border-left: 1px solid ' + (designStyle.accentColor || "#3498db") + '; padding-left: 20px; vertical-align: top;">' + sections.contactInfo + '</td></tr></table>' + sections.banner + sections.disclaimer + '</div>';
//   },

//   text: (designStyle, sections, formData) => {
//     const containerStyle = {
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       width: "600px", minHeight: "180px", margin: "0",
//       backgroundColor: "#ffffff", border: "1px solid #e0e0e0",
//       borderRadius: "8px", overflow: "hidden"
//     };

//     return '<div style="' + styleToString(containerStyle) + '"><div style="display: flex; align-items: center; padding: 20px; background-color: #ffffff; min-height: 140px;"><div style="width: 70%; padding-right: 20px;"><div style="font-size: 18px; font-weight: 700; color: #333333; margin-bottom: 2px;">' + (formData.name || "Employee Name") + '</div><div style="font-size: 14px; color: ' + (designStyle.accentColor || "#0066cc") + '; margin-bottom: 8px;">' + (formData.jobTitle || "Job Title") + '</div><div style="font-size: 12px; color: #666666; line-height: 1.4;">' + sections.contactInfo + '</div></div><div style="width: 30%; display: flex; align-items: center; justify-content: center; text-align: center;"><div style="font-size: 16px; font-weight: 700; color: #666666; padding: 10px; display: flex; align-items: center;">' + (formData.company || "Company Name") + '</div></div></div><div style="padding: 15px 20px; display: flex; align-items: center; justify-content: flex-start;">' + renderSocialIcons(formData) + '</div>' + sections.disclaimer + '</div>';
//   },
// };

// export const generateSignatureHTML = (formData, selectedDesign, designStyle) => {
//   console.log("Generating signature for design:", selectedDesign);
  
//   const design = designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];
//   const sections = generateContentSections(formData, designStyle);
//   const layoutFunction = layoutConfigs[design.layout] || layoutConfigs.standard;
//   const html = layoutFunction(designStyle, sections, formData);
  
//   const cleanHTML = html.replace(/\n\s*/g, '').replace(/>\s+</g, '><').trim();
//   return cleanHTML;
// };

// export const generateSignatureTemplate = (selectedDesign, designStyle, staticFormData = {}) => {
//   const templateFormData = {
//     name: "{{name}}",
//     jobTitle: "{{jobTitle}}",
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
//   const requiredPlaceholders = ['{{name}}', '{{email}}', '{{jobTitle}}', '{{company}}'];
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
//     '{{jobTitle}}': employeeData.jobTitle || employeeData.title || '',
//     '{{email}}': employeeData.mail || employeeData.email || '',
//     '{{phone}}': employeeData.businessPhones?.[0] || employeeData.phone || '',
//     '{{mobilePhone}}': employeeData.mobilePhone || '',
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






// Email-Compatible signatureUtils.js - Works perfectly in all email clients
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

// EMAIL-COMPATIBLE LAYOUT CONFIGURATIONS
const layoutConfigs = {
  // PROFESSIONAL LAYOUT - Email compatible version
  professional: (designStyle, sections, formData) => {
    const defaultData = {
      name: "Employee Name", jobTitle: "Job Title", company: "Company Name", location: "Location",
      phone: "", mobilePhone: "", email: "", website: "", logo: null, profileImage: null,
      linkedin: "", youtube: "", instagram: "", facebook: "", twitter: "", github: "", ...formData
    };

    const accentColor = designStyle.accentColor || "#0066cc";
    
    // Logo section - email compatible
    const logoSection = defaultData.logo ? 
      '<img src="' + defaultData.logo + '" alt="Company Logo" width="100" height="83" style="border: none; border-radius: 4px; display: block;">' :
      '<div style="width: 80px; height: 60px; background-color: ' + accentColor + '; color: white; font-weight: bold; font-size: 24px; border-radius: 4px; text-align: center; line-height: 60px; display: block;">' + getUserInitials(defaultData.name) + '</div>';

    // Contact details - email compatible
    const contactDetails = [];
    if (defaultData.mobilePhone || defaultData.phone) {
      contactDetails.push('<b>mobile:</b> ' + (defaultData.mobilePhone || defaultData.phone) + (defaultData.phone && defaultData.mobilePhone ? ' | <b>tel:</b> ' + defaultData.phone : ''));
    }
    if (defaultData.email) {
      contactDetails.push('<b>email:</b> <a href="mailto:' + defaultData.email + '" style="color: #666666; text-decoration: none;">' + defaultData.email + '</a>');
    }
    if (defaultData.website) {
      const websiteUrl = defaultData.website.startsWith('http') ? defaultData.website : 'https://' + defaultData.website;
      const displayUrl = defaultData.website.replace(/^https?:\/\//, '');
      contactDetails.push('<b>website:</b> <a href="' + websiteUrl + '" target="_blank" style="color: #666666; text-decoration: none;">' + displayUrl + '</a>');
    }
    contactDetails.push('<b>location:</b> ' + (defaultData.location || ""));

    // Profile image - email compatible
    const profileImageSection = defaultData.profileImage ? 
      '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="80" height="80" style="border-radius: 6px; border: 2px solid #e0e0e0; display: block;">' : '';

    // EMAIL-COMPATIBLE TABLE STRUCTURE
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

  // ORANGE LAYOUT - Email compatible version
  orange: (designStyle, sections, formData) => {
    const defaultData = {
      name: "Sally Williams", jobTitle: "SALES MANAGER", phone: "+1 234 56789",
      email: "s.williams@crossware365.com", website: "www.crossware365.com",
      company: "Crossware Inc.", location: "New York, USA",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      ...formData
    };

    // Profile section - email compatible
    const profileSection = defaultData.profileImage ? 
      '<img src="' + defaultData.profileImage + '" alt="' + (defaultData.name || 'Profile') + '" width="110" height="110" style="border-radius: 55px; border: 3px solid #FF6B35; display: block;">' :
      '<div style="width: 110px; height: 110px; border-radius: 55px; background-color: #FF6B35; color: white; font-size: 36px; font-weight: bold; text-align: center; line-height: 110px; display: block;">' + (defaultData.name ? defaultData.name.charAt(0) : "U") + '</div>';

    // Contact items - email compatible
    const contactItems = [];
    if (defaultData.phone) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📞</span><span style="font-size: 12px; color: #333333;">' + defaultData.phone + '</span></div>');
    if (defaultData.email) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">✉</span><span style="font-size: 12px; color: #333333;">' + defaultData.email + '</span></div>');
    if (defaultData.website) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🌐</span><span style="font-size: 12px; color: #333333;">' + defaultData.website + '</span></div>');
    if (defaultData.company) contactItems.push('<div style="margin-bottom: 8px; margin-top: 10px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">🏢</span><span style="font-size: 12px; color: #333333;">' + defaultData.company + '</span></div>');
    if (defaultData.location) contactItems.push('<div style="margin-bottom: 8px;"><span style="display: inline-block; width: 16px; height: 16px; background-color: #FF6B35; border-radius: 2px; text-align: center; color: white; font-size: 10px; line-height: 16px; margin-right: 8px;">📍</span><span style="font-size: 12px; color: #333333;">' + defaultData.location + '</span></div>');

    // EMAIL-COMPATIBLE TABLE STRUCTURE
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

  orangecenter: (designStyle, sections, formData) => {
    return layoutConfigs.orange(designStyle, sections, formData);
  },

  orangetext: (designStyle, sections, formData) => {
    const defaultData = {
      name: "Sally Williams", jobTitle: "SALES MANAGER", phone: "+1 234 56789",
      email: "s.williams@crossware365.com", website: "www.crossware365.com",
      company: "Crossware Inc.", location: "New York, USA", ...formData
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

  // STANDARD LAYOUT - Email compatible
  standard: (designStyle, sections) => {
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

  // TEXT LAYOUT - Email compatible
  text: (designStyle, sections, formData) => {
    const accentColor = designStyle.accentColor || "#0066cc";
    
    return '<table width="600" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">' +
      '<tr>' +
        '<td width="70%" valign="top" style="padding: 20px;">' +
          '<div style="font-size: 18px; font-weight: bold; color: #333333; margin-bottom: 2px;">' + (formData.name || "Employee Name") + '</div>' +
          '<div style="font-size: 14px; color: ' + accentColor + '; margin-bottom: 8px;">' + (formData.jobTitle || "Job Title") + '</div>' +
          '<div style="font-size: 12px; color: #666666; line-height: 1.4;">' + sections.contactInfo + '</div>' +
        '</td>' +
        '<td width="30%" valign="middle" style="padding: 20px; text-align: center;">' +
          '<div style="font-size: 16px; font-weight: bold; color: #666666;">' + (formData.company || "Company Name") + '</div>' +
        '</td>' +
      '</tr>' +
      '<tr>' +
        '<td colspan="2" style="padding: 15px 20px;">' +
          renderSocialIcons(formData) +
        '</td>' +
      '</tr>' +
    '</table>';
  },
};

// Generate content sections with email compatibility
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
    
    contactInfo: '<p style="margin: 0; font-size: 14px;">📞 ' + (formData.phone || "+91 9876543210") + '</p>' +
      '<p style="margin: 2px 0; font-size: 14px;">📧 <a href="mailto:' + formData.email + '" style="color: ' + accentColor + '; text-decoration: none;">' + (formData.email || "email@example.com") + '</a></p>' +
      '<p style="margin: 2px 0; font-size: 14px;">🌐 <a href="https://' + formData.website + '" style="color: ' + accentColor + '; text-decoration: none;">www.' + (formData.website || "agileworldtechnologies.com") + '</a></p>' +
      renderSocialIcons(formData),
    
    banner: formData.banner ? '<div style="margin-top: 20px;"><img src="' + formData.banner + '" alt="Banner" width="100%" style="height: auto; border-radius: 8px; display: block; border: none;"></div>' : "",
    
    disclaimer: formData.disclaimer ? '<div style="margin-top: 20px; font-size: 11px; color: #cccccc;"><p><b>DISCLAIMER</b></p><p style="margin-top: 5px;">' + formData.disclaimer + '</p></div>' : "",
  };
};

export const generateSignatureHTML = (formData, selectedDesign, designStyle) => {
  console.log("Generating EMAIL-COMPATIBLE signature for design:", selectedDesign);
  
  const design = designTemplates.find((d) => d.id === selectedDesign) || designTemplates[0];
  const sections = generateContentSections(formData, designStyle);
  const layoutFunction = layoutConfigs[design.layout] || layoutConfigs.standard;
  const html = layoutFunction(designStyle, sections, formData);
  
  // Clean HTML but keep it email-compatible
  const cleanHTML = html.replace(/\s+/g, ' ').trim();
  return cleanHTML;
};

export const generateSignatureTemplate = (selectedDesign, designStyle, staticFormData = {}) => {
  const templateFormData = {
    name: "{{name}}",
    jobTitle: "{{jobTitle}}",
    company: staticFormData.company || "{{company}}",
    email: "{{email}}",
    phone: "{{phone}}",
    mobilePhone: "{{mobilePhone}}",
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

export const replacePlaceholders = (template, employeeData) => {
  let result = template;
  
  const placeholderMap = {
    '{{name}}': employeeData.displayName || employeeData.name || '',
    '{{jobTitle}}': employeeData.jobTitle || employeeData.title || '',
    '{{email}}': employeeData.mail || employeeData.email || '',
    '{{phone}}': employeeData.businessPhones?.[0] || employeeData.phone || '',
    '{{mobilePhone}}': employeeData.mobilePhone || '',
    '{{location}}': employeeData.officeLocation || employeeData.location || '',
    '{{company}}': employeeData.company || 'agileworldtechnologies.com',
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