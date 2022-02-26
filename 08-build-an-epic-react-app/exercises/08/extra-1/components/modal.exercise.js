/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import { Dialog } from "./lib";

const ModalContext = React.createContext();

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

// 💯 Create a function `callAll` that accepts any number of functions
// and runs them all one by one
function callAll(...fns) {
  return function (...args) {
    fns.forEach((fn) => {
      fn && fn(...args);
    });
  };
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    // 💯 Add support for users providing their own onClick handler
    // onClick: () => setIsOpen(false),
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    // 💯 Add support for users providing their own onClick handler
    // onClick: () => setIsOpen(true),
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContents(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
