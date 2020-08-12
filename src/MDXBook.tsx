import { MDXProvider, MDXProviderComponentsProp } from "@mdx-js/react";
import { PrismTheme } from "prism-react-renderer";
import React, { FunctionComponent, useMemo } from "react";

import PrismHighlight from "./PrismHighlight";
import PrismThemeContext from "./PrismThemeContext";

interface Props {
  documents: __WebpackModuleApi.RequireContext;
  playgroundTheme?: PrismTheme;
}

const MDXMain: FunctionComponent<Props> = (props) => {
  const documents = props.documents;
  const resolved = useMemo(
    () => documents.keys().map((key) => documents(key)),
    [documents]
  );
  const mdxComponents: MDXProviderComponentsProp = useMemo(
    () => ({
      // eslint-disable-next-line react/display-name
      pre: (p) => <div {...p} />,
      // eslint-disable-next-line react/display-name
      code: (p) => <PrismHighlight {...p} theme={props.playgroundTheme} />,
    }),
    [props.playgroundTheme]
  );
  return (
    <MDXProvider components={mdxComponents}>
      <PrismThemeContext.Provider value={{ theme: props.playgroundTheme }}>
        {React.createElement(resolved[0].default)}
      </PrismThemeContext.Provider>
    </MDXProvider>
  );
};

export default MDXMain;
