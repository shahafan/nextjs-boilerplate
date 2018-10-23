import i18n from 'i18next';
import 'isomorphic-unfetch';

/**
 * Initialize a i18next instance.
 * @function startI18n
 * @param {object} files - Translation files.
 * @param {string} lang - Active language.
 */
const startI18n = (files, lang) => i18n.init({
  lng        : lang, // active language http://i18next.com/translate/
  fallbackLng: 'en',
  resources  : files,
  ns         : ['common'],
  defaultNS  : 'common',
  joinArrays : '\n',
  debug      : true,
});

export default startI18n;

/**
 * Fetch translation file(s).
 * @function getTranslation
 * @param {string} lang - Language to fetch.
 * @param {array} files - Translation files to fetch.
 * @param {string} baseUrl - Locale location.
 * @return {object} Fetched translation files.
 */
export async function getTranslation(lang, files, baseUrl) {
  const translation = {};

  for (const file of files) {
    const response = await fetch(`${baseUrl}/${lang}/${file}.json`);
    translation[file] = await response.json();
  }

  return { [lang]: translation };
}
