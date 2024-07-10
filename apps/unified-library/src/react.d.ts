/* Please see https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/69006 */
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    placeholder?: string;
    onPointerEnterCapture?: (e: React.PointerEvent<T>) => void;
    onPointerLeaveCapture?: (e: React.PointerEvent<T>) => void;
  }
  interface RefAttributes<T> {
    placeholder?: string;
    onPointerEnterCapture?: (e: React.PointerEvent<T>) => void;
    onPointerLeaveCapture?: (e: React.PointerEvent<T>) => void;
  }
}
