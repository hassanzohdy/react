import { CacheConfigurations } from "@mongez/cache";
import { EncryptionConfigurations } from "@mongez/encryption";
import { LocalizationConfigurations } from "@mongez/localization";
import { HelmetConfigurations } from "@mongez/react-helmet";
import { RouterConfigurations } from "@mongez/react-router";
import { ReportHandler } from "web-vitals";

export type ApplicationOptions = {
  /**
   * Determine whether to enable debugging mode or not
   *
   * @default false
   */
  debug?: boolean;
  /**
   * Debug method that is passed to reportWebVitals function
   *
   * @default console.log
   */
  debugMethod?: ReportHandler;
  /**
   * Detect current used device and browser such as google chrome, ipad, tablet and so on
   *
   * @default true
   */
  detectDeviceAndBrowser?: boolean;
  /**
   * Detect Dark Mode based on user's preferences, if found then a `dark` class will be added to body
   *
   * @default true
   */
  detectDarkMode?: boolean;

  /**
   * Determine whether to use the application in strict mode
   *
   * @default true
   */
  strict?: boolean;
};

export type LocaleCode = {
  /**
   * Locale code name i.e English | Arabic..etc
   */
  name: string;
  /**
   * Locale Code direction
   */
  direction: "ltr" | "rtl";
  /**
   * Language flag image path
   */
  flag?: string | object;
};

export type LocaleCodes = {
  /**
   * The object key is the locale code itself
   */
  [localeCode: string]: LocaleCode;
};

/**
 * Lang mode is the type of languages that will be rendered
 *
 * If type is array, then the structure of the data will be [name][index][localeCode] = $localeCode
 * If type is object, then the structure of the data will be [name][localeCode] = $localeCode
 *
 * @default auto detected
 */
export type LangMode = "array" | "object";

export type ApplicationConfigurations = {
  /**
   * Application general configurations
   */
  app?: ApplicationOptions;
  /**
   * Localization Configurations
   */
  localization?: LocalizationConfigurations & {
    /**
     * Lang mode is the type of languages that will be rendered
     *
     * If type is array, then the structure of the data will be [name][index][localeCode] = $localeCode
     * If type is object, then the structure of the data will be [name][localeCode] = $localeCode
     */
    langMode?: LangMode;
    /**
     * Locale Codes
     */
    locales?: LocaleCodes;
  };
  /**
   * Router configurations
   */
  router?: RouterConfigurations;
  /**
   * Cache configurations
   */
  cache?: CacheConfigurations;
  /**
   * Encryption configurations
   */
  encryption?: EncryptionConfigurations;
  /**
   * Helmet Configurations
   */
  helmet?: HelmetConfigurations;
  /**
   * Any other generic configurations
   */
  [configKey: string]: any;
};

export type CurrentType = {
  /**
   * Current locale code
   */
  localeCode?: string;
  /**
   * Current locale object
   */
  locale?: LocaleCode;
  /**
   * Current direction
   */
  direction?: "ltr" | "rtl";
  /**
   * Current route
   */
  route?: string;
  /**
   * Current app name
   */
  appName?: string;
};
