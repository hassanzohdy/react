import { userPrefersDarkMode } from "@mongez/dom";

export default function detectDarkMode() {
  if (userPrefersDarkMode()) {
    const bodyClasses = document.body.classList;
    bodyClasses.add("dark");
  }
}
