import React, { useContext } from 'react';
import MyContext from '../../context';
import './QuestionsReview.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const QuestionsReview = () => {
    const valueFromContext = useContext(MyContext); //Nuestro contexto
    let clientInfoFromContext = valueFromContext.Context.ClientInfo;

    const closeIcon = <FontAwesomeIcon icon={faTimes} color='#64FFE5' /> //Icono cerrar de font-awesome

    console.log(clientInfoFromContext)

    return (
        <div>
            <div className="row closeButton">
                <Link to='/endGame'>
                    {closeIcon}
                </Link>
            </div>
            {clientInfoFromContext.allQuestions.map(question =>
                <div className="row questionsReview">
                    <div className="col-12 justifyCenter">
                        <span role="img" aria-label='manoSeñalando'>👉</span>
                            <p>{question.category}</p>
                        <span role="img" aria-label='manoSeñalando'>👈</span>
                    </div>
                    <div className="col-12 justifyCenter">
                        <p>{question.question}</p>
                    </div>
                    <div className="col-12 justifyCenter">
                        <div className="answer">
                            <p>{question.correct_answer}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuestionsReview;