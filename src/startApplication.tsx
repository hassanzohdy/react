import router, { routerEvents } from "@mongez/react-router";
import updateAppLocale from "./utils/updateAppLocale";

export default function startApplication() {
  // on locale code change, update app locale code
  routerEvents.onLocaleChanging(updateAppLocale);

  routerEvents.onDetectingInitialLocaleCode(updateAppLocale);

  router.scan();
}
