import React from 'react';
import Modal from 'react-bootstrap/Modal';

import './ModalWindow.scss';

interface ModalWindowInterface {
  children: JSX.Element;
  show: boolean;
  onHide: () => void;
  title: string;
}

export function ModalWindow(props: ModalWindowInterface) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal__window"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}
