import { useEffect } from "react";

export const useKeyDown = (keys: string[], callback: VoidFunction) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        callback();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [keys, callback]);
};
