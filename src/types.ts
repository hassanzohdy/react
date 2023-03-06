import { LocalizationConfigurations } from "@mongez/localization";

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

export type ApplicationConfigurations = {
  /**
   * Localization Configurations
   */
  localization?: LocalizationConfigurations & {
    /**
     * Locale Codes
     */
    locales: LocaleCodes;
  };
  /**
   * Any other generic configurations
   */
  [configKey: string]: any;
};

export type Current = {
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
