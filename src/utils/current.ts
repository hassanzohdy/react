import router from "@mongez/react-router";
import { Current } from "../types";

const currentData: Current = {};

export function setCurrent(key: keyof Current, value: any): any {
  currentData[key] = value;
}

export function current(currentKey: keyof Current): any {
  if (currentKey === "direction") {
    // get the current direction from html dir attribute
    return document.documentElement.dir || "ltr";
  }

  if (currentKey === "appName") {
    return router.getCurrentApp()?.name;
  }

  if (currentKey === "route") {
    return router.getCurrentRoute();
  }

  return currentData[currentKey];
}
