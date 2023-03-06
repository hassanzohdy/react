import { jsxConverter } from "@mongez/react-localization";
import { ApplicationConfigurations } from "../types";

let appConfigurations: ApplicationConfigurations = {
  localization: {
    converter: jsxConverter,
    locales: {},
  },
};

export function updateConfigurationsList(
  newConfigurationsList: ApplicationConfigurations
): void {
  appConfigurations = newConfigurationsList;
}

export function getAppConfigurations(): ApplicationConfigurations {
  return appConfigurations;
}
