import React from "react";
import ReactDOM from "react-dom";

export function createPortal() {
  const dom: Element = document.createElement("div");
  let el = dom;
  const portal: React.FC<{ visible: boolean; dom?: Element }> = (props) => {
    React.useEffect(() => {
      if (el.parentElement) return;
      document.body.appendChild(el);
      return () => {
        if (!el.parentElement) return;
        document.body.removeChild(el);
      };
    }, []);

    React.useEffect(() => {
      if (!props.dom) {
        el = dom;
      } else {
        el = props.dom;
      }
      return () => {
        el = dom;
      };
    }, [props.dom]);

    return props.visible ? ReactDOM.createPortal(props.children, el) : null;
  };
  return portal;
}
