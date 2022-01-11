import { CurrentType } from "../types";
import {
  getCurrentAppName,
  currentDirection,
  currentRoute,
} from "@mongez/react-router";

const currentData: CurrentType = {};

export function setCurrent(key: keyof CurrentType, value: any): any {
  currentData[key] = value;
}

export function current(currentKey: keyof CurrentType): any {
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
