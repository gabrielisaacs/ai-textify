const languageMap = {
  en: 'English',
  fr: 'French',
  ru: 'Russian',
  pt: 'Portuguese',
  tr: 'Turkish',
  es: 'Spanish',
};

const getLanguageName = (languageCode) => {
  return languageMap[languageCode] || 'Unknown';
};

export default getLanguageName;
