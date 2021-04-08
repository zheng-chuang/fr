import React, {
  memo,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import classnames from "classnames";

interface TransitionProps {
  name: string;
  show?: boolean;
}

const _Transition: React.FC<PropsWithChildren<TransitionProps>> = (props) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const ref = useRef<HTMLElement>();
  const preChildren = useRef<ReactNode>();
  if (props.show) {
    preChildren.current = props.children;
  }
  useEffect(() => {
    const dom = ref.current;
    const animationend = () => {
      if (dom) {
        dom.classList.remove(
          `${props.name}-enter-active`,
          `${props.name}-leave-active`
        );
      }
      if (preChildren.current !== props.children) {
        preChildren.current = props.children;
        forceUpdate();
      }
    };
    if (dom) {
      dom.addEventListener("animationend", animationend);
    }
    return () => {
      if (dom) {
        dom.removeEventListener("animationend", animationend);
      }
    };
  }, [props.children]);

  const renderChildren = useCallback(() => {
    if (React.isValidElement(preChildren.current)) {
      const className = classnames(preChildren.current.props.className, {
        [`${props.name}-enter-active`]: props.show,
        [`${props.name}-leave-active`]: !props.show,
      });
      return React.cloneElement(React.Children.only(preChildren.current), {
        ref,
        className,
      });
    }
    return null;
  }, [props.show]);

  return renderChildren();
};

_Transition.displayName = "Transition";

_Transition.defaultProps = {
  show: false,
};

export const Transition = memo(_Transition);
