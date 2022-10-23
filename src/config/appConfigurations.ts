import { jsxConverter } from "@mongez/react-localization";
import { Obj } from "@mongez/reinforcements";
import { ApplicationConfigurations } from "../types";

let appConfigurations: ApplicationConfigurations = {
  localization: {
    converter: jsxConverter,
  },
};

export function getAppConfig(key: string, defaultValue: any = null): any {
  return Obj.get(appConfigurations, key, defaultValue);
}

export function updateConfigurationsList(
  newConfigurationsList: ApplicationConfigurations
): void {
  appConfigurations = newConfigurationsList;
}

export function getAppConfigurations(): ApplicationConfigurations {
  return appConfigurations;
}
