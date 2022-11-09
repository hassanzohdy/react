import router, { routerEvents } from "@mongez/react-router";
import { getAppConfig } from "./config";
import { ApplicationOptions } from "./types";
import detectDarkMode from "./utils/detectDarkMode";
import detectDeviceAndBrowser from "./utils/detectDeviceAndBrowser";
import reportWebVitals from "./utils/reportWebVitals";
import updateAppLocale from "./utils/updateAppLocale";

export default function startApplication(options: ApplicationOptions = {}) {
  const defaultOptions: ApplicationOptions = {
    debug: getAppConfig("app.debug", false),
    debugMethod: getAppConfig("app.debugMethod", console.log),
    detectDeviceAndBrowser: getAppConfig("app.detectDeviceAndBrowser", true),
    detectDarkMode: getAppConfig("app.detectDarkMode", true),
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
  routerEvents.onLocaleChanging((localeCode: string) => {
    updateAppLocale(localeCode);
  });

  routerEvents.onInitialLocaleDetection((localeCode: string) => {
    updateAppLocale(localeCode);
  });

  router.scan();
}
