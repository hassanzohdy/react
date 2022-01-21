import React from "react";
import { EventSubscription } from "@mongez/events";

/**
 * Clear the given event subscription on component unmount
 * The event subscription will be called only after component first render.
 * On component unmount, the even will be removed from the event loop for better performance.
 */
export default function useEvent(eventSubscription: EventSubscription) {
  React.useEffect(() => {
    return eventSubscription.unsubscribe();
  }, []);
}
