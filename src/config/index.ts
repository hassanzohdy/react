import config from "@mongez/config";
import { merge } from "@mongez/reinforcements";
import { ApplicationConfigurations } from "../types";
import {
  getAppConfig,
  getAppConfigurations,
  updateConfigurationsList,
} from "./appConfigurations";
import distributeConfigurations from "./distributeConfigurations";

export { getAppConfigurations, getAppConfig };

export function setAppConfigurations(
  newConfigurationsList: ApplicationConfigurations
) {
  const updatedAppConfigurations: ApplicationConfigurations = merge(
    getAppConfigurations(),
    newConfigurationsList
  );

  updateConfigurationsList(updatedAppConfigurations);

  distributeConfigurations(updatedAppConfigurations);

  config.set(updatedAppConfigurations);
}
