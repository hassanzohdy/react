import React from "react";

export default function useOnce(callback: any) {
  React.useEffect(callback, []);
}
