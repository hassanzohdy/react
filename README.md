# Mongez React

A react app manager for organizing and utilizing react apps

> It's highly recommended to use Typescript with your react apps, this package work with javascript though and the documentation will will be with typescript as well.

## Installation

`yarn add @mognez/react`

Or

`npm i @mongez/react`

## Usage

First off, clear your `src/index.ts` or `src/index.js` file from everything inside it. 

Now, import the package in your `src/index.ts` or `src/index.js` file

```ts
import startApplication from '@mongez/react';

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
  |--- index.ts
```

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

import { setApps } from '@mongez/react-router';

// don't forget to add the module path alias as mentioned in MRR
import frontOfficeApp from 'apps/front-office/front-office-modules.json';

setApps([
  frontOfficeApp
]);
```

Let's head back to our `index.ts` file and import our `apps-list`.

```ts
// src/index.ts
import './apps-list';

import startApplication from '@mongez/react';

startApplication();

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
import './routes';
```

Now in our `routes.ts` file let's add our home page route.

```ts
// src/apps/front-office/home/routes.ts

import router from '@mongez/react-router';
import HomePage from './components/HomePage';

router.add('/', HomePage);
```





## TODO

- Completing Docs.
