import events from "@mongez/events";
import { getCurrentUser } from "@mongez/user";
import { ApplicationConfigurations } from "../types";
import { setHttpConfigurations } from "@mongez/http";
import updateAppLocale from "../utils/updateAppLocale";
import { setCacheConfigurations } from "@mongez/cache";
import { setRouterConfigurations } from "@mongez/react-router";
import { setEncryptionConfigurations } from "@mongez/encryption";
import { setHelmetConfigurations } from "@mongez/react-helmet";
import { setLocalizationConfigurations } from "@mongez/localization";

export default function distributeConfigurations(
  appConfigurations: ApplicationConfigurations
) {
  let localeCodesList: string[] = [];

  if (appConfigurations.localization?.locales) {
    localeCodesList = Object.keys(appConfigurations.localization.locales);
  }

  if (!appConfigurations.router) {
    appConfigurations.router = {};
  }

  if (!appConfigurations.router?.localeCodes) {
    appConfigurations.router.localeCodes = localeCodesList;
  }

  if (appConfigurations.router) {
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

  if (appConfigurations.endpoint) {
    if (
      appConfigurations.endpoint.auth &&
      !appConfigurations.endpoint.setAuthorizationHeader
    ) {
      appConfigurations.endpoint.setAuthorizationHeader = () => {
        const user = getCurrentUser();

        if (user && user.isLoggedIn()) {
          return `Bearer ${user.getAccessToken()}`;
        } else if (appConfigurations?.endpoint?.apiKey) {
          return `key ${appConfigurations.endpoint.apiKey}`;
        }

        return "";
      };
    }

    setHttpConfigurations(appConfigurations.endpoint);
  }

  events.trigger("app.configurations", appConfigurations);
}
