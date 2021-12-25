import { HttpConfigurations } from "@mongez/http";
import { CacheConfigurations } from "@mongez/cache";
import { EncryptionConfigurations } from "@mongez/encryption";
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
};

export type ReactHttpConfigurations = HttpConfigurations & {
  /**
   * If set to true, then each request will determine the Authorization Header Based on current user state
   * If user is logged in, then A `Bearer xxx` token wil lbe sent in `Authorization` Header,
   * Otherwise, if `apiKey` is set, then a `key xxx` wil lbe sent in `Authorization` Header.
   *
   * @default true
   */
  auth?: boolean;
  /**
   * Sent in every request in the `Authorization` header if user is not logged in
   * Will not be used if no apiKey is passed or if `auth` prop is set to false
   */
  apiKey?: string;
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
  flag?: string;
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
   * Lang mode is the type of languages that will be rendered
   *
   * If type is array, then the structure of the data will be [name][index][localeCode] = $localeCode
   * If type is object, then the structure of the data will be [name][localeCode] = $localeCode
   */
  langMode?: LangMode;
  /**
   * Default locale code
   * If no value, then it will be detected from html tag attributes
   */
  defaultLocaleCode?: string;
  /**
   * Current locale code for the app
   *
   * This value is set automatically through Mongez
   */
  currentLocaleCode?: string;
  /**
   * Locale Codes
   */
  locales?: LocaleCodes;
  /**
   * Router configurations
   */
  router?: RouterConfigurations;
  /**
   * Http configurations
   */
  endpoint?: ReactHttpConfigurations;
  /**
   * Cache configurations
   */
  cache?: CacheConfigurations;
  /**
   * Encryption configurations
   */
  encryption?: EncryptionConfigurations;
  /**
   * Any other generic configurations
   */
  [configKey: string]: any;
};
