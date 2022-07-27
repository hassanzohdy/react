import React from "react";

/**
 * Loop over the given array and render the given component for each element in the array.
 */
export default function mapElements(
  data: any[],
  Component: React.ComponentType,
  as: string = "item",
  key: string = "id",
): React.ReactNode {
  return data.map((item: any, index: number) => {
    const props = { [as]: item, index };
    return <Component key={item[key] || index} {...props} />;
  });
}
