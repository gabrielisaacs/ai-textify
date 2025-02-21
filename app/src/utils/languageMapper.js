const languageMap = {
  en: 'English',
  fr: 'French',
  ru: 'Russian',
  pt: 'Portuguese',
  tr: 'Turkish',
  es: 'Spanish',
  de: 'German',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  ar: 'Arabic',
  hi: 'Hindi',
  bn: 'Bengali',
};

const getLanguageName = (languageCode) => {
  return languageMap[languageCode] || 'Unknown';
};

export default getLanguageName;
