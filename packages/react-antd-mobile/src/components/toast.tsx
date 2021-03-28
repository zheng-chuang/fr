import React from "react";
import { createPortal } from "@goson/react-cdk";
import { LoadingOutlined } from "@ant-design/icons";

const ToastPortal = createPortal();

const Toast: React.FC<{ visible: boolean }> = (props) => {
  return (
    <ToastPortal visible={props.visible}>
      <div className="am-toast am-toast-mask">
        <span>
          <div className="am-toast-notice am-toast-notice-closable">
            <div className="am-toast-notice-content">
              <div className="am-toast-text am-toast-text-icon">
                {props.children}
              </div>
            </div>
          </div>
        </span>
      </div>
    </ToastPortal>
  );
};

export const loading: React.FC<{ visible: boolean }> = (props) => {
  const icon = React.useMemo(() => {
    return <LoadingOutlined />;
  }, [props.visible]);
  return (
    <Toast visible={props.visible}>
      {icon}
      <div className="am-toast-text-info">{props.children}</div>
    </Toast>
  );
};

export default Toast;
