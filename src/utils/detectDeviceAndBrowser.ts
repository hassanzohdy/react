import Is from "@mongez/supportive-is";

interface Object {
  [key: string]: Function;
}

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

    let isMobileOf: Object = Is.mobile;

    for (const deviceType of ["ios", "android", "ipad", "iphone"]) {
      if (isMobileOf[deviceType] && isMobileOf[deviceType]()) {
        classesList.add(deviceType);
      }
    }

    if (windowSize <= 570) {
      classesList.add("mobile");
      classesList.remove("desktop");
      classesList.remove("tablet");
    } else if (windowSize <= 1024) {
      classesList.add("tablet");
      classesList.remove("desktop");
      classesList.remove("mobile");
    } else {
      classesList.add("desktop");
      classesList.remove("mobile");
      classesList.remove("tablet");
    }
  };

  detectDeviceType();

  window.addEventListener("resize", detectDeviceType);
}
