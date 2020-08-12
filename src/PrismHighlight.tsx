import React, { FunctionComponent } from "react";
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer";

interface Props {
  className?: string;
  theme?: PrismTheme;
}

const PrismHighlight: FunctionComponent<Props> = ({
  children,
  className,
  theme,
}) => {
  const language = className ? className.replace(/language-/, "") : undefined;
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children as string}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.slice(0, tokens.length - 1).map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default PrismHighlight;
