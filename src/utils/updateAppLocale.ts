import { setCurrent } from "./current";
import { LocaleCode } from "./../types";
import { getAppConfig } from "../config/appConfigurations";

/**
 * Update Application locale code
 *
 * @param {string} localeCode
 * @returns {void}
 */
export default function updateAppLocale(localeCode: string) {
  const localeCodeData: LocaleCode = getAppConfig(
    `localization.locales.${localeCode}`
  );

  if (!localeCode) return;

  const htmlElement = document.documentElement;

  setCurrent("locale", localeCodeData);
  setCurrent("localeCode", localeCode);

  htmlElement.setAttribute("lang", localeCode);
  htmlElement.setAttribute("dir", localeCodeData.direction);
}
