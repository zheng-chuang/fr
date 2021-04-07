import { memo, PropsWithChildren } from "react";
import { Overlay as _Overlay, OverlayProps } from "./overlay";

const Overlay = memo<PropsWithChildren<OverlayProps>>(_Overlay);
Overlay.displayName = "Overlay";

export default Overlay;
export { Overlay };
