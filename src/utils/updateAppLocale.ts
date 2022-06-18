import { setCurrent } from "./current";
import { LocaleCode } from "./../types";
import { getAppConfig } from "../config/appConfigurations";
import { setCurrentLocaleCode } from "@mongez/localization";

/**
 * Update Application locale code
 *
 * @param {string} localeCode
 * @returns {void}
 */
export default function updateAppLocale(localeCode: string) {
  if (!localeCode) return;

  const localeCodeData: LocaleCode = getAppConfig(
    `localization.locales.${localeCode}`
  );

  const htmlElement = document.documentElement;

  htmlElement.setAttribute("lang", localeCode);
  setCurrent("localeCode", localeCode);

  setCurrentLocaleCode(localeCode);

  if (!localeCodeData) return;

  setCurrent("locale", localeCodeData);
  htmlElement.setAttribute("dir", localeCodeData.direction);

  if (localeCodeData.direction === 'rtl') {
    htmlElement.classList.add('rtl');
  } else {
    htmlElement.classList.remove('rtl');
  }
}
