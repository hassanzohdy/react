import { setCurrentLocaleCode } from "@mongez/localization";
import { getAppConfig } from "../config/appConfigurations";
import { LocaleCode } from "./../types";
import { setCurrent } from "./current";

/**
 * Update Application locale code
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

  if (localeCodeData.direction === "rtl") {
    htmlElement.classList.add("rtl");
  } else {
    htmlElement.classList.remove("rtl");
  }
}
