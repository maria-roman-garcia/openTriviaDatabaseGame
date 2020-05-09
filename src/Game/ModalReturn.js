import React, {useContext} from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import MyContext from '../context';

const ModalReturn = (props) => {

  const valueFromContext = useContext(MyContext); //Nuestro contexto
  const setContextFunctionFromContext = valueFromContext.setContext;

  return (
    <div>
      <Modal isOpen={props.modal}>
        <ModalBody>
          Are you sure you want to come back? You will lose all changes...
        </ModalBody>
        <ModalFooter>
            <Link to="/">
                <Button color="primary" onClick={() => setContextFunctionFromContext({
                    apiInfo: {
                        level: [{
                            name: 'Any Difficulty',
                            id: 1
                        },
                        {
                            name: 'Easy',
                            id: 2
                        },
                        {
                            name: 'Medium',
                            id: 3
                        },
                        {
                            name: 'Hard',
                            id: 4
                        }
                        ],
                        category: []
                    },
                    ClientInfo: {
                        level: 1,
                        category: [],
                        numberOfQuestions: 10,
                        totalPoints: 0,
                        allQuestions: []
                    }
                })}>Yes, sure</Button>
            </Link>
          <Button color="secondary" onClick={props.toggle}>keep on playing</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalReturn;