import config from "@mongez/config";
import { Obj } from "@mongez/reinforcements";
import { ApplicationConfigurations } from "../types";
import { getAppConfigurations, getAppConfig } from "./appConfigurations";
import distributeConfigurations from "./distributeConfigurations";

export { getAppConfigurations, getAppConfig };

export function setAppConfigurations(
  newConfigurationsList: ApplicationConfigurations
) {
  const updatedAppConfigurations: ApplicationConfigurations = Obj.merge(
    getAppConfigurations(),
    newConfigurationsList
  );

  distributeConfigurations(updatedAppConfigurations);

  config.set(updatedAppConfigurations);
}
