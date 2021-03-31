import * as React from "react";

import Parse from "./Parse";

export type LinkyProps = {
  className?: string;
  email?: boolean;
  noopener?: boolean;
  noreferrer?: boolean;
  children: any;
  target?: "_self" | "_blank" | "_parent" | "_top";
};

const Linky: React.FC<LinkyProps> = ({
  children,
  className,
  target = "_self",
  email = true,
  noopener = true,
  noreferrer = true,
}) => {
  if (typeof children === "string") {
    return (
      <Parse
        email={email}
        className={className}
        noopener={noopener}
        noreferrer={noreferrer}
        text={children}
        target={target}
      />
    );
  } else if (
    React.isValidElement(children) &&
    children.type !== "a" &&
    children.type !== "button"
  ) {
    return React.cloneElement(
      children,
      undefined,
      <Linky email={email} className={className}>
        {(children as any).props.children}
      </Linky>
    );
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child) => (
          <Linky email={email} className={className}>
            {child}
          </Linky>
        ))}
      </>
    );
  }
  return <>{children}</>;
};

export default Linky;
