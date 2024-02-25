import React, { PropsWithChildren, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";
import { useClickOutside } from "hooks/useClickOutside";
import { useKeyDown } from "hooks/useKeyDown";

type Props = {
  isOpen: boolean;
  handleClose: VoidFunction;
};

export const Modal = (props: PropsWithChildren<Props>) => {
  const { isOpen, handleClose, children } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(handleClose, contentRef);
  useKeyDown(["Escape"], handleClose);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content} ref={contentRef}>
        {children}
        <button className={styles.close} type="button" onClick={handleClose}>
          X
        </button>
      </div>
    </div>,
    document.getElementById("portal")!,
  );
};
