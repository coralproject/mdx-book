import React, { FunctionComponent } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

import PrismThemeContext from "./PrismThemeContext";

export interface PlaygroundProps {
  __scope: Record<string, unknown>;
  __position: number;
  __code: string;
}

export const Playground: FunctionComponent<PlaygroundProps> = ({
  __scope,
  __code,
}) => {
  const context = React.useContext(PrismThemeContext);
  return (
    <LiveProvider code={__code} scope={__scope} theme={context.theme}>
      <LivePreview />
      <LiveEditor />
      <LiveError />
    </LiveProvider>
  );
};
