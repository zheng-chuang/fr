import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import classNames from "classnames";
import { getZIndexStyle, isDef, noop, preventDefault } from "../utils";
type HTMLDivElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export interface OverlayProps extends HTMLDivElementProps {
  show: boolean;
  zIndex?: number | string;
  duration?: number | string;
  customStyle?: CSSProperties;
  lockScroll?: boolean;
}

export const Overlay: React.FC<OverlayProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { customStyle, zIndex, duration } = props;
  const preventTouchMove = useCallback((event) => {
    preventDefault(event, true);
  }, []);

  const style = useMemo(() => {
    const _style: CSSProperties = {
      ...getZIndexStyle(zIndex),
      ...customStyle,
    };
    if (isDef(duration)) {
      _style.animationDuration = `${duration}s`;
    }
    return _style;
  }, [customStyle, zIndex, duration]);

  const className = useMemo(() => {
    return classNames("van-overlay", props.className);
  }, [props.className]);

  useEffect(() => {
    if (!ref.current) return;
    if (props.show) {
      ref.current.style.display = "block";
    } else {
      ref.current.style.display = "none";
    }
  }, [props.show]);

  return (
    <div
      ref={ref}
      {...props}
      className={className}
      style={style}
      onTouchMove={props.lockScroll ? preventTouchMove : noop}
    >
      {props.children}
    </div>
  );
};

Overlay.defaultProps = {
  lockScroll: true,
};
