import { PrismTheme } from "prism-react-renderer";
import React from "react";

export default React.createContext<{ theme: PrismTheme | undefined }>({
  theme: undefined,
});
