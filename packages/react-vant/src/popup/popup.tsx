import React, {
  CSSProperties,
  Fragment,
  memo,
  useCallback,
  useMemo,
} from "react";
import classnames from "classnames";
import { createNamespace } from "../utils";
import Overlay from "../overlay";
import { PopupSharedProps } from "./shared";
import Transition from "../transition";

export type PopupPosition = "top" | "left" | "bottom" | "right" | "center" | "";

export type PopupCloseIconPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const [name, bem] = createNamespace("popup");

interface PopupProps extends PopupSharedProps {
  round?: string;
  closeable?: boolean;
  transition?: string;
  onClose?: () => void;
  safeAreaInsetBottom?: boolean;
  position?: string;
}

const _Popup: React.FC<PopupProps> = (props) => {
  const close = useCallback(() => {
    if (props.onClose) {
      props.onClose();
    }
  }, []);

  const onClickOverlay = () => {
    if (props.closeOnClickOverlay) {
      close();
    }
  };

  const renderOverlay = () => {
    if (props.overlay) {
      return (
        <Overlay
          show={props.show}
          className={props.overlayClass}
          zIndex={props.zIndex}
          duration={props.duration}
          style={props.overlayStyle}
          onClick={onClickOverlay}
        />
      );
    }
    return null;
  };

  const renderPopup = () => {
    const { round, position = "center", safeAreaInsetBottom } = props;
    const bemParams = {
      round,
      [position]: position,
      "safe-area-inset-bottom": safeAreaInsetBottom,
    };
    const cls = classnames(bem(bemParams));

    const _style: CSSProperties = {
      ...props.style,
      display: props.show ? undefined : "none",
      zIndex: props.zIndex,
    };
    return (
      <div className={cls} style={_style} onClick={props.onClick}>
        {props.children}
      </div>
    );
  };

  const renderTransition = () => {
    const { position, transition } = props;
    const name =
      position === "center" ? "van-fade" : `van-popup-slide-${position}`;
    return (
      <Transition show={props.show} name={transition || name}>
        {renderPopup()}
      </Transition>
    );
  };

  return (
    <Fragment>
      {renderOverlay()}
      {renderTransition()}
    </Fragment>
  );
};

_Popup.defaultProps = {
  overlay: true,
  closeOnClickOverlay: true,
  position: "center",
  safeAreaInsetBottom: true,
};

_Popup.displayName = "Popup";

export const Popup = memo(_Popup);
