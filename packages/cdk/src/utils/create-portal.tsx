import React from "react";
import ReactDOM from "react-dom";

export function createPortal() {
  let el: Element = document.createElement("div");

  const portal: React.FC<{ visible: boolean; dom?: Element }> = (props) => {
    React.useEffect(() => {
      document.body.appendChild(el);
      return () => {
        document.body.removeChild(el);
      };
    }, []);

    React.useEffect(() => {
      if (!props.dom) return;
      el = props.dom;
    }, [props.dom]);

    return props.visible ? ReactDOM.createPortal(props.children, el) : null;
  };
  return portal;
}
