import { setLocalizationConfigurations } from "@mongez/localization";
import { ApplicationConfigurations } from "../types";
import updateAppLocale from "../utils/updateAppLocale";

export default function distributeConfigurations(
  appConfigurations: ApplicationConfigurations
) {
  if (appConfigurations.localization) {
    setLocalizationConfigurations(appConfigurations.localization);

    if (appConfigurations.localization.defaultLocaleCode) {
      updateAppLocale(appConfigurations.localization.defaultLocaleCode);
    }
  }
}
