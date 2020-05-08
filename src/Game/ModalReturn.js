import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

const ModalReturn = (props) => {

  return (
    <div>
      <Modal isOpen={props.modal}>
        <ModalBody>
          Are you sure you want to come back? You will lose all changes...
        </ModalBody>
        <ModalFooter>
            <Link to="/">
                <Button color="primary">Yes, sure</Button>
            </Link>
          <Button color="secondary" onClick={props.toggle}>keep on playing</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalReturn;