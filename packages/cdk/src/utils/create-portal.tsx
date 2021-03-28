import React from "react";
import ReactDOM from "react-dom";

export function createPortal(selector?: string) {
  let el: Element = document.createElement("div");

  const portal: React.FC<{ visible: boolean }> = (props) => {
    const [init, setInit] = React.useState(false);
    React.useEffect(() => {
      setInit(true);
      if (selector) return;
      document.body.appendChild(el);
      return () => {
        document.body.removeChild(el);
      };
    }, [props.visible]);

    if (selector && !init) {
      const dom = document.querySelector(selector);
      if (dom) {
        el = dom;
      }
    }
    return props.visible ? ReactDOM.createPortal(props.children, el) : null;
  };
  return portal;
}
