# Mongez React (MR)

A react app manager for organizing and utilizing react apps

> It's highly recommended to use Typescript with your react apps, this package work with javascript though and the documentation will will be with typescript as well.

## Installation

`yarn add @mongez/react`

Or

`npm i @mongez/react`

## Usage

First off, clear your `src/index.ts` or `src/index.js` file from everything inside it.

Now, import the package in your `src/index.ts` or `src/index.js` file

```ts
import startApplication from "@mongez/react";

startApplication();
```

Before we move on, please have a look at [Mongez React Router (MRR)](https://github.com/hassanzohdy/react-router) so you will have a better idea about lazy loaded apps and modules.

## Project Structure

In your src directory, clear all files and folders from it but the index file as it is our entry point.

Now create the following directories: `apps` and `shared` directories, so your project structure should be like this:

```bash
|--- src
  |--- apps
  |--- shared
      |--- shared-provider.ts
  |--- index.ts
```

Here we've created two directories, `apps` and `shared`, now let's create a new our first app directory, we'll call it front-office

```bash
|--- src
  |--- apps
    |--- front-office
      |--- front-office-modules.json
      |--- front-office-provider.ts
  |--- shared
      |--- shared-provider.ts
  |--- index.ts
```

## Shared Provider

Let's create a shared provider so we can encapsulate our shared files such as configurations and apps list in one point to keep our `src/index.ts` cleaner.

Let's create `shared/shared-provider.ts` file

```ts
// empty for now, but let's import it anyway in our src/index.ts file
```

Now we go to `src/index.ts` file

```ts
import "./shared/shared-provider";
import startApplication from "@mongez/react";

startApplication();
```

## Creating our first app

We created our app with two empty files inside it, the app provider and app setup and modules declarations.

Now let's open our `front-office-modules.json` and add the following code inside it.

```json
{
  "path": "/",
  "name": "front-office",
  "modules": [
    {
      "entry": ["/"],
      "module": "home"
    }
  ]
}
```

Everything now is perfect, now let's create `apps-list.ts` file in `src/shared/apps-list.ts` to import our app.

```ts
// src/shared/apps-list.ts

import { setApps } from "@mongez/react-router";

// don't forget to add the module path alias as mentioned in MRR
import frontOfficeApp from "apps/front-office/front-office-modules.json";

setApps([frontOfficeApp]);
```

Let's head back to our `shared-provider.ts` file and import our `apps-list`.

```ts
// src/shared-provider.ts
import "./apps-list";
```

Now let's create our home module.

```bash
|--- src
  |--- apps
    |--- front-office
      |--- home
        |--- components
          |--- HomePage.tsx
        |--- routes.ts
        |--- provider.ts
      |--- front-office-modules.json
      |--- front-office-provider.ts
  |--- shared
  |--- index.ts
```

We created a new home directory inside `front-office` directory with a `components` directory which has `HomePage.tsx` for our home page component, also created our entry provider file and the routes file.

Let's import our `routes.ts` file in the home provider.

```ts
// src/apps/front-office/home/provider.ts
import "./routes";
```

Now in our `routes.ts` file let's add our home page route.

```ts
// src/apps/front-office/home/routes.ts

import router from "@mongez/react-router";
import HomePage from "./components/HomePage";

router.add("/", HomePage);
```

## Creating our base configurations

Navigate to `src/shared` directory and create a `config.ts` file.

```ts
// src/shared/config.ts
import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";

const configurationsList: ApplicationConfigurations = {};

setAppConfigurations(configurationsList);
```

Just an empty object for our configurations file, but what configurations can be declared in that objecT?

Well, the following packages's configurations are configured from one place using `setAppConfigurations`

- [Mongez Http](https://github.com/hassanzohdy/mongez-http#http-configurations-list)
- [Mongez React Router](https://github.com/hassanzohdy/react-router#router-configurations)
- [Mongez React Helmet](https://github.com/hassanzohdy/mongez-react-helmet#helmet-configurations-list)
- [Mongez Localization](https://github.com/hassanzohdy/mongez-localization#configuration-setup)
- [Mongez encryption](https://github.com/hassanzohdy/mongez-encryption#encryption-configurations)
- [Mongez Cache](https://github.com/hassanzohdy/mongez-cache#setting-key-prefix)

The entire app configurations as follows:

```ts
import { ReportHandler } from "web-vitals";
import { HttpConfigurations } from "@mongez/http";
import { CacheConfigurations } from "@mongez/cache";
import { RouterConfigurations } from "@mongez/react-router";
import { HelmetConfigurations } from "@mongez/react-helmet";
import { EncryptionConfigurations } from "@mongez/encryption";
import { LocalizationConfigurations } from "@mongez/localization";

type ApplicationOptions = {
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
   * Detect current used device and browser such as google chrome, ipad, tablet and so on, based on the current state of the browser and device, html tag class will be updated, i.e `chrome desktop` `safari ipad` and so on
   *
   * @default true
   */
  detectDeviceAndBrowser?: boolean;
  /**
   * Detect Dark Mode based on user's preferences, if found then a `dark` class will be added to html tag
   *
   * @default true
   */
  detectDarkMode?: boolean;
};

type ReactHttpConfigurations = HttpConfigurations & {
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

type LocaleCode = {
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

type LocaleCodes = {
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
type LangMode = "array" | "object";

type ApplicationConfigurations = {
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
   * Helmet Configurations
   */
  helmet?: HelmetConfigurations;
  /**
   * Any other generic configurations
   */
  [configKey: string]: any;
};
```

### Http configurations

Works exactly as document in [Mongez Http](https://github.com/hassanzohdy/mongez-http#http-configurations-list), except that `MR` covers the `Authorization` header automatically based on current user state whether is logged in or not.

Also don't forget to add `endpoint.apiKey` if your backend requires for unauthorized users an api key.

### Router Configurations

Not much here to talk about (So far), only locale codes list that's needed by `MRR` is set automatically if `locales` object is defined in `localization` object.

### Get current app info

To get a piece of information of the app, use `current` utility.

```ts
import { current } from "@mongez/react";

console.log(current("direction"));
console.log(current("appName"));
console.log(current("route"));
console.log(current("localeCode"));
console.log(current("locale"));
```

## Use Event Hook

This hook allows you to use [Mongez Events](https://github.com/hassanzohdy/mongez-events) and clean it up on component unmount.

```tsx
import React from "react";
import events from "@mongez/events";
import { useEvent } from "@mongez/react";

export default function MyComponent() {
  const [value, setValue] = React.useState(1);
  useEvent(() =>
    events.subscribe("some-event.change", () => {
      setValue(value + 1);
    })
  );

  return <h1>My Component Rendered {value} times</h1>;
}
```

Can be quite useful with all Mongez Packages Events Like router events, form events http events and so on.

## Change Log

- 1.0.20 (25 Mar 2022)
  - Fixed `useEvent` callback.
- 1.0.18 (22 Jan 2022)

  - Added [useEvent](#use-event-hook) hook.

- 1.0.13 (11 Jan 2022)
  - Added [Current Utility](#get-current-app-info)
  - Changed `locales` key in configurations to be set in `localization.locales`
