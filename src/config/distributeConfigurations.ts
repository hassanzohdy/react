import { setCacheConfigurations } from "@mongez/cache";
import { setEncryptionConfigurations } from "@mongez/encryption";
import events from "@mongez/events";
import { setLocalizationConfigurations } from "@mongez/localization";
import { setHelmetConfigurations } from "@mongez/react-helmet";
import { setRouterConfigurations } from "@mongez/react-router";
import { ApplicationConfigurations } from "../types";
import updateAppLocale from "../utils/updateAppLocale";

export default function distributeConfigurations(
  appConfigurations: ApplicationConfigurations
) {
  if (appConfigurations.router) {
    if (!appConfigurations.router.localeCodes) {
      let localeCodesList: string[] = [];

      if (appConfigurations.localization?.locales) {
        localeCodesList = Object.keys(appConfigurations.localization.locales);
      }

      appConfigurations.router.localeCodes = localeCodesList;
    }

    setRouterConfigurations(appConfigurations.router);
  }

  if (appConfigurations.encryption) {
    setEncryptionConfigurations(appConfigurations.encryption);
  }

  if (appConfigurations.cache) {
    setCacheConfigurations(appConfigurations.cache);
  }

  if (appConfigurations.localization) {
    setLocalizationConfigurations(appConfigurations.localization);

    if (appConfigurations.localization.defaultLocaleCode) {
      updateAppLocale(appConfigurations.localization.defaultLocaleCode);
    }
  }

  if (appConfigurations.helmet) {
    setHelmetConfigurations(appConfigurations.helmet);
  }

  events.trigger("app.configurations", appConfigurations);
}
