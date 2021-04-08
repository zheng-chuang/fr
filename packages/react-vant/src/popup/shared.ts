import { CSSProperties } from "react";
type HTMLDivElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export interface PopupSharedProps extends HTMLDivElementProps {
  show: boolean;
  zIndex?: number
  duration?: number
  overlayStyle?: CSSProperties
  overlayClass?: string;
  overlay?: boolean;
  closeOnClickOverlay?: boolean
}