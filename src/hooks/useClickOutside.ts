import React, { useEffect } from "react";

export const useClickOutside = (
  callback: VoidFunction,
  elementRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(elementRef.current);
      if (
        elementRef?.current &&
        !elementRef?.current.contains(event.target as HTMLElement)
      ) {
        callback();
        event.stopPropagation();
      }
    };

    document.addEventListener("click", handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
    };
  }, [callback, elementRef]);
};
