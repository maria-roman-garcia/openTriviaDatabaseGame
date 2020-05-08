import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MyContext from '../context';
import './Game.scss';
import logoImage from '../Img/openTrivia.png';
import Confetti from './Confetti';
import EndGame from './EndGame';
import ModalReturn from './ModalReturn';

const Game = () => {

    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //Guardamos las preguntas que han salido. El length lo comparamos con el total de preguntas que queremos responder 'clientInfoFromContext.numberOfQuestions'
    const [showQuestions, setShowQuestions] = useState([]);

    //Posibles soluciones respuestas correcta + Incorrecta
    const [possibleSolutions, setPossibleSolutions] = useState([]);

    //Final del juego
    const [endGame, setEndGame] = useState(false);

    const valueFromContext = useContext(MyContext); //Nuestro contexto
    const apiInfoFromContext = valueFromContext.Context.apiInfo;
    let clientInfoFromContext = valueFromContext.Context.ClientInfo;
    const setContextFunctionFromContext = valueFromContext.setContext;

    const nextQuestion = () => {
        showQuestions.length < clientInfoFromContext.numberOfQuestions ? getQuestion() : setEndGame(true);
    }

    const getQuestion = () => {

        // Ejemplo de Api Url --> https://opentdb.com/api.php?amount=10&category=11&difficulty=easy
        // Ejemplo de Api Url en caso de level 'Any Difficulty' --> https://opentdb.com/api.php?amount=10&category=11

        // NOTA: Traemos solo una pregunta para poder usar diferentes categorias. De esta manera llamamos cada vez a una categoria random que hayamos escogido.

        const amountUrl = `https://opentdb.com/api.php?amount=1`;
        const categoryUrl = clientInfoFromContext.category.length === 0
            ? ''
            : `&category=${clientInfoFromContext.category[Math.floor(Math.random() * clientInfoFromContext.category.length)]}`;
        const difficultyUrl = clientInfoFromContext.level !== 1
            ? `&difficulty=${apiInfoFromContext.level.find(levelId => levelId.id === clientInfoFromContext.level).name}`
            : '';

        const totalUrl = `${amountUrl}${categoryUrl}${difficultyUrl.toLowerCase()}`

        //Llamamos a la pregunta de la api y la guardamos en showQuestions
        fetch(totalUrl)
            .then(fetchInfo => {
                return fetchInfo.json();
            })
            .then(jsonInfo => {
                setShowQuestions([...showQuestions, jsonInfo.results[0]]);
                //Al gurdar las posibles respuestas, lo hacemos de forma desordenada para despues hacer  el map directamente
                setPossibleSolutions([jsonInfo.results[0].correct_answer, ...jsonInfo.results[0].incorrect_answers].sort(function () { return Math.random() - 0.5 }));
            })
    }

    useEffect(() => { nextQuestion() }, []);

    const rightAnswer = () => {
        setContextFunctionFromContext({
            ...valueFromContext.Context,
            ClientInfo: { ...clientInfoFromContext, totalPoints: clientInfoFromContext.totalPoints + 10 }
        })
        Confetti.start()
        setTimeout(() => {
            Confetti.stop()
        }, 2000)
        setTimeout(() => { nextQuestion() }, 1000)
    }

    //Comprobamos si la respuesta seleccionada es correcta o no
    const checkAnswer = (answer) => {
        answer === showQuestions[showQuestions.length - 1].correct_answer
            ? rightAnswer()

            : setContextFunctionFromContext({
                ...valueFromContext.Context,
                ClientInfo: { ...clientInfoFromContext, totalPoints: clientInfoFromContext.totalPoints - 2 }
            })
    }

    return (
        !endGame
            ? (showQuestions.length !== 0 &&
                <div className="gamecard">
                    <img className="imgLogo" src={logoImage} alt="GameLogo" onClick={()=>toggle()}/>
                    <ModalReturn modal={modal} toggle={toggle}/>
                    <div className="row">
                        {/* Mirar -> https://www.npmjs.com/package/react-circular-progressbar */}
                        <div className="col-6 justifyAround">Tiempo</div>
                        <div className="col-6 justifyAround">
                            <p className="points">Points: <span style={{ fontWeight: 'bold', fontSize: '30px' }}>{clientInfoFromContext.totalPoints}</span> pts</p>
                        </div>
                    </div>
                    <div className="row numberQuestionAndDifficulty">
                        <div className="col-6 justifyAround">
                            <p className="questionNumber">{`${showQuestions.length} / ${clientInfoFromContext.numberOfQuestions}`}</p>
                        </div>
                        <div className="col-6 justifyAround">
                            <p className="questionDifficulty">{showQuestions[showQuestions.length - 1].difficulty.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="row question">
                        <div className="col-12 justifyAround">
                            <p>
                                <span role="img" aria-label='manoSeñalando'>👉</span>
                                {showQuestions[showQuestions.length - 1].category}
                                <span role="img" aria-label='manoSeñalando'>👈</span>
                            </p>
                        </div>
                        <div className="col-12 justifyAround">
                            <p>{showQuestions[showQuestions.length - 1].question}</p>
                        </div>
                    </div>
                    <div className="row justifyAround answers">
                        {possibleSolutions.map((answer, index) =>
                            <div key={index} onClick={() => checkAnswer(answer)}>
                                <p>{answer}</p>
                            </div>)}
                    </div>
                </div>)
            : <EndGame puntos={clientInfoFromContext.totalPoints}/>
    )
}

export default Game;