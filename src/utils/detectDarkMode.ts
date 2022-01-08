import { userPrefersDarkMode } from "@mongez/dom";

export default function detectDarkMode() {
  if (userPrefersDarkMode()) {
    document.documentElement.classList.add("dark");
  }
}
