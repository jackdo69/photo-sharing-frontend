import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = props => {
  return (
    <div className="modal__wrapper">
      <header className="modal__header">
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className="modal__content">{props.children}</div>
        <footer className="modal__footer">{props.footer}</footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};
const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        time={300}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
