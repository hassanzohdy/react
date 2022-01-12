import config from "@mongez/config";
import { Obj } from "@mongez/reinforcements";
import { ApplicationConfigurations } from "../types";
import {
  getAppConfigurations,
  getAppConfig,
  updateConfigurationsList,
} from "./appConfigurations";
import distributeConfigurations from "./distributeConfigurations";

export { getAppConfigurations, getAppConfig };

export function setAppConfigurations(
  newConfigurationsList: ApplicationConfigurations
) {
  const updatedAppConfigurations: ApplicationConfigurations = Obj.merge(
    getAppConfigurations(),
    newConfigurationsList
  );

  updateConfigurationsList(updatedAppConfigurations);

  distributeConfigurations(updatedAppConfigurations);

  config.set(updatedAppConfigurations);
}
