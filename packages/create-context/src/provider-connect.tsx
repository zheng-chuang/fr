import React, { FunctionComponent } from "react";
import { providers } from "./create-context";

export const ProviderConnect: FunctionComponent = (props) => {
  return providers.reduce((children, Provider) => {
    if (Provider) {
      return <Provider>{children}</Provider>;
    }
    return children;
  }, <>{props.children}</>);
};
