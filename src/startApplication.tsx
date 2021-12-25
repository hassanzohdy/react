import router, { routerEvents } from "@mongez/react-router";
import { ApplicationOptions } from "./types";
import { appConfigurations } from "./config";
import detectDarkMode from "./utils/detectDarkMode";
import reportWebVitals from "./utils/reportWebVitals";
import detectDeviceAndBrowser from "./utils/detectDeviceAndBrowser";
import updateAppLocale from "./utils/updateAppLocale";

export default function startApplication(options: ApplicationOptions = {}) {
  const defaultOptions: ApplicationOptions = {
    debug: appConfigurations.app?.debug || false,
    debugMethod: appConfigurations.app?.debugMethod || console.log,
    detectDeviceAndBrowser:
      appConfigurations.app?.detectDeviceAndBrowser || true,
    detectDarkMode: appConfigurations.app?.detectDarkMode || true,
  };

  options = { ...defaultOptions, ...options };

  if (options.debug) {
    /**
     * If you want to start measuring performance in your app, pass a function
     * to log results (for example: reportWebVitals(console.log))
     * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
     */
    reportWebVitals(options.debugMethod);
  }

  if (options.detectDeviceAndBrowser) {
    detectDeviceAndBrowser();
  }

  if (options.detectDarkMode) {
    detectDarkMode();
  }

  // on locale code change, update app locale code
  routerEvents.onLocaleCodeChange((localeCode) => {
    updateAppLocale(localeCode);
  });

  router.scan();
}
