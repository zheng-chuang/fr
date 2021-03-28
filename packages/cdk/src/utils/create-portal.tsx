import React from "react";
import ReactDOM from "react-dom";

export function createPortal() {
  let el: Element = document.createElement("div");

  const portal: React.FC<{ visible: boolean; selector?: string }> = (props) => {
    React.useEffect(() => {
      document.body.appendChild(el);
      return () => {
        document.body.removeChild(el);
      };
    }, []);

    React.useEffect(() => {
      if (!props.selector) return;
      const dom = document.querySelector(props.selector);
      if (!dom) return;
      el = dom;
    }, [props.selector]);

    return props.visible ? ReactDOM.createPortal(props.children, el) : null;
  };
  return portal;
}
