# Mongez React (MR)

A react app manager for organizing and utilizing react apps

> It's highly recommended to use Typescript with your react apps, this package works with javascript though and the documentation will be with typescript as well.

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

- [Mongez React Router](https://github.com/hassanzohdy/react-router#router-configurations)
- [Mongez React Helmet](https://github.com/hassanzohdy/mongez-react-helmet#helmet-configurations-list)
- [Mongez Localization](https://github.com/hassanzohdy/mongez-localization#configuration-setup)
- [Mongez encryption](https://github.com/hassanzohdy/mongez-encryption#encryption-configurations)
- [Mongez Cache](https://github.com/hassanzohdy/mongez-cache#setting-key-prefix)

The entire app configurations as follows:

```ts
import { ReportHandler } from "web-vitals";
import { CacheConfigurations } from "@mongez/cache";
import { RouterConfigurations } from "@mongez/react-router";
import { HelmetConfigurations } from "@mongez/react-helmet";
import { EncryptionConfigurations } from "@mongez/encryption";
import { LocalizationConfigurations } from "@mongez/localization";

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

type ApplicationConfigurations = {
  /**
   * Localization Configurations
   */
  localization?: LocalizationConfigurations & {
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
```

### Router Configurations

Not much here to talk about (So far), only locale codes list that's needed by `MRR` is set automatically if `locales` object is defined in `localization` object.

### Get current app info

To get a piece of information of the app, use `current` utility.

```ts
import { current } from "@mongez/react";

console.log(current("direction")); // ltr | rtl
console.log(current("appName"));
console.log(current("route"));
console.log(current("localeCode"));
console.log(current("locale"));
```

## Change Log

- 2.0.5 (22 Oct 2022)
  - Enhanced Docs
  - Removed all hooks as it has been moved to [Mongez React Hooks](https://github.com/hassanzohdy/react-hooks).
- 1.0.20 (25 Mar 2022)
  - Fixed `useEvent` callback.
- 1.0.18 (22 Jan 2022)
  - Added `useEvent` hook.
- 1.0.13 (11 Jan 2022)
  - Added [Current Utility](#get-current-app-info)
  - Changed `locales` key in configurations to be set in `localization.locales`
