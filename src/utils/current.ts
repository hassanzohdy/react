import {
  currentDirection,
  currentRoute,
  getCurrentAppName,
} from "@mongez/react-router";
import { Current } from "../types";

const currentData: Current = {};

export function setCurrent(key: keyof Current, value: any): any {
  currentData[key] = value;
}

export function current(currentKey: keyof Current): any {
  if (currentKey === "direction") {
    return currentDirection();
  }

  if (currentKey === "appName") {
    return getCurrentAppName();
  }

  if (currentKey === "route") {
    return currentRoute();
  }

  return currentData[currentKey];
}
