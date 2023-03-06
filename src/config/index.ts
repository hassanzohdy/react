import { ApplicationConfigurations } from "../types";
import {
  getAppConfigurations,
  updateConfigurationsList,
} from "./appConfigurations";
import distributeConfigurations from "./distributeConfigurations";

export function setAppConfigurations(
  newConfigurationsList: ApplicationConfigurations
) {
  const updatedAppConfigurations: ApplicationConfigurations = {
    ...getAppConfigurations(),
    ...newConfigurationsList,
  };

  updateConfigurationsList(newConfigurationsList);

  distributeConfigurations(updatedAppConfigurations);
}
