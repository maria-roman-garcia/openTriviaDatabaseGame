import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

const ModalReturn = (props) => {

  return (
    <div>
      <Modal isOpen={props.modal}>
        <ModalBody>
          ¿Estás seguro de que quieres volver? Perderás la partida.
        </ModalBody>
        <ModalFooter>
            <Link to="/">
                <Button color="primary">Si, seguro</Button>
            </Link>
          <Button color="secondary" onClick={props.toggle}>Seguir jugando</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalReturn;