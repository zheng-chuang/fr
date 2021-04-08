import React, { CSSProperties, memo, useCallback, useMemo } from "react";
import classnames from "classnames";
import {
  createNamespace,
  getZIndexStyle,
  isDef,
  noop,
  preventDefault,
} from "../utils";
import Transition from "../transition";
type HTMLDivElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
interface OverlayProps extends HTMLDivElementProps {
  show: boolean;
  zIndex?: number;
  duration?: number;
  lockScroll?: boolean;
}
const [name] = createNamespace("overlay");
const _Overlay: React.FC<OverlayProps> = (props) => {
  const {
    style: customStyle,
    zIndex,
    duration,
    show,
    lockScroll,
    ..._props
  } = props;

  const preventTouchMove = useCallback((event) => {
    preventDefault(event, true);
  }, []);

  const style = useMemo(() => {
    const _style: CSSProperties = {
      ...getZIndexStyle(zIndex),
      ...customStyle,
      display: show ? undefined : "none",
    };
    if (isDef(duration)) {
      _style.animationDuration = `${duration}s`;
    }
    return _style;
  }, [customStyle, zIndex, show, duration]);

  const cls = useMemo(() => {
    return classnames(props.className, name);
  }, [props.className]);

  return (
    <Transition name="van-fade" show={show}>
      <div
        {..._props}
        className={cls}
        style={style}
        onTouchMove={props.lockScroll ? preventTouchMove : noop}
      >
        {props.children}
      </div>
    </Transition>
  );
};
_Overlay.displayName = "Overlay";

_Overlay.defaultProps = {
  lockScroll: true,
};

export const Overlay = memo(_Overlay);
