import { setCurrentLocaleCode } from "@mongez/localization";
import { getAppConfigurations } from "../config/appConfigurations";
import { setCurrent } from "./current";

/**
 * Update Application locale code
 */
export default function updateAppLocale(localeCode: string) {
  if (!localeCode) return;

  const localeCodeData =
    getAppConfigurations().localization?.locales[localeCode];

  const htmlElement = document.documentElement;

  htmlElement.setAttribute("lang", localeCode);
  setCurrent("localeCode", localeCode);

  setCurrentLocaleCode(localeCode);

  if (!localeCodeData) return;

  setCurrent("locale", localeCodeData);
  htmlElement.setAttribute("dir", localeCodeData.direction);
}
