import { LocaleCode } from "./../types";
import { appConfigurations } from "../config";

/**
 * Update Application locale code
 *
 * @param {string} localeCode
 * @returns {void}
 */
export default function updateAppLocale(localeCode: string) {
  if (!appConfigurations.locales || !appConfigurations.locales[localeCode])
    return;

  const htmlElement = document.documentElement;
  const localeCodeData: LocaleCode = appConfigurations.locales[localeCode];

  appConfigurations.currentLocaleCode = localeCode;

  htmlElement.setAttribute("lang", localeCode);
  htmlElement.setAttribute("dir", localeCodeData.direction);
}
