export const SITE_SETTINGS = {
  id: "site-settings-global",
  title: "TEDx Integral",
  description: "TEDx event independently organized by volunteers.",
  themeColor: "#e62b1e",
  basePath: "/sa/tedxiitg",
  contactEmail: "contact@tedxintegral.com",
  socials: {
    instagram: "https://www.instagram.com/tedx_integral/",
    linkedin: "https://www.linkedin.com/company/tedx-integral/",
    
  },
  meta: {
    title: "TEDx Integral",
    description: "TEDx event independently organized by volunteers."
  },
  questionPortal: {
    formUrl: "https://docs.google.com/forms/d/1Rvr03Uyd_L99dugsPexm7LG3w078p7vkQMeFoeokqao/formResponse",
    entrySpeaker: "entry.1618045074",
    entryQuestion: "entry.104691745"
  }
};

export const resolveAsset = (path) => {
  if (!path) return '';
  if (typeof path !== 'string') return path;
  if (path.startsWith('/') && !path.startsWith('/sa/tedxiitg')) {
    return `/sa/tedxiitg${path}`;
  }
  return path;
};

