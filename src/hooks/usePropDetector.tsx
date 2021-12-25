import React from "react";

/**
 * Re-Render the component when the prop value is changed
 *
 * @param {Function} stateUpdater
 * @param {any} prop
 * @param {Function} propHandler
 */
export default function usePropDetector(
  stateUpdater: Function,
  prop = null,
  propHandler: Function | null | undefined
) {
  React.useEffect(() => {
    if (prop === undefined) return;
    if (!propHandler) {
      propHandler = (prop: any) => prop;
    }

    stateUpdater(propHandler(prop));
  }, [prop, stateUpdater, propHandler]);
}
