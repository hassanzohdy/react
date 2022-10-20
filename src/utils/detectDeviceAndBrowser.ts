import Is from "@mongez/supportive-is";

export default function detectDeviceAndBrowser() {
  const classesList = document.documentElement.classList;

  const detectDeviceType = () => {
    const windowSize = document.body.clientWidth;
    for (const browserName of [
      "firefox",
      "chrome",
      "opera",
      "safari",
      "edge",
    ]) {
      if (Is.browser(browserName)) {
        classesList.add(browserName);
      }
    }

    const isMobileOf = Is.mobile;

    for (const deviceType in isMobileOf) {
      if (isMobileOf[deviceType]()) {
        classesList.add(deviceType);
      }
    }

    if (windowSize <= 570) {
      classesList.add("mobile");
      classesList.remove("desktop", "tablet");
    } else if (windowSize <= 1024) {
      classesList.add("tablet");
      classesList.remove("desktop", "mobile");
    } else {
      classesList.add("desktop");
      classesList.remove("mobile", "tablet");
    }
  };

  detectDeviceType();

  window.addEventListener("resize", detectDeviceType);
}
