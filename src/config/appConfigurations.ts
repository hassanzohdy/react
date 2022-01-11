import { Obj } from "@mongez/reinforcements";
import { ApplicationConfigurations } from "../types";

let appConfigurations: ApplicationConfigurations = {
  endpoint: {
    auth: true,
  },
  localization: {},
};

export function getAppConfig(key?: string, defaultValue?: any): any {
  if (arguments.length === 0) return appConfigurations;

  return Obj.get(appConfigurations, key as string, defaultValue);
}

export function updateConfigurationsList(
  newConfigurationsList: ApplicationConfigurations
): void {
  appConfigurations = newConfigurationsList;
}

export function getAppConfigurations(): ApplicationConfigurations {
  return appConfigurations;
}
