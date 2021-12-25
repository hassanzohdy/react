import config from "@mongez/config";
import events from "@mongez/events";
import { getCurrentUser } from "@mongez/user";
import { setHttpConfigurations } from "@mongez/http";
import { ApplicationConfigurations } from "../types";
import updateAppLocale from "../utils/updateAppLocale";
import { setCacheConfigurations } from "@mongez/cache";
import { setRouterConfigurations } from "@mongez/react-router";
import { Obj } from "@mongez/reinforcements";

export let appConfigurations: ApplicationConfigurations = {};

export function getAppConfig(key?: string, defaultValue?: any): any {
  if (arguments.length === 0) return appConfigurations;

  return Obj.get(appConfigurations, key as string, defaultValue);
}

export function setAppConfigurations(
  newConfigurationsList: ApplicationConfigurations
) {
  appConfigurations = { ...appConfigurations, newConfigurationsList };

  config.set(appConfigurations);

  distributeConfigurations();
}

function distributeConfigurations() {
  let localeCodesList: string[] = [];
  if (appConfigurations.locales) {
    localeCodesList = Object.keys(appConfigurations.locales);
  }

  if (!appConfigurations.router) {
    appConfigurations.router = {};
  }

  if (!appConfigurations?.router?.localeCodes) {
    appConfigurations.router.localeCodes = localeCodesList;
  }

  if (appConfigurations.router) {
    setRouterConfigurations(appConfigurations.router);
  }

  if (appConfigurations.cache) {
    setCacheConfigurations(appConfigurations.cache);
  }

  if (appConfigurations.defaultLocaleCode) {
    updateAppLocale(appConfigurations.defaultLocaleCode);
  }

  if (appConfigurations.endpoint) {
    if (appConfigurations?.endpoint?.auth) {
      appConfigurations.endpoint.setAuthorizationHeader = () => {
        const user = getCurrentUser();

        if (user.isLoggedIn()) {
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
