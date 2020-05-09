import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../context';
import './Game.scss';
import logoImage from '../Img/openTrivia.png';
import Confetti from './Confetti';
import EndGame from './EndGame';
import ModalReturn from './ModalReturn';
// import Time from './Time';

const Game = () => {

    const valueFromContext = useContext(MyContext); //Nuestro contexto
    const apiInfoFromContext = valueFromContext.Context.apiInfo;
    let clientInfoFromContext = valueFromContext.Context.ClientInfo;
    const setContextFunctionFromContext = valueFromContext.setContext;

    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //Final del juego
    const [endGame, setEndGame] = useState(false);

    const nextQuestion = (newPuntuation) => {
        console.log('Soy next question')
        clientInfoFromContext.allQuestions.length < clientInfoFromContext.numberOfQuestions ? getQuestion(newPuntuation) : setEndGame(true);
    }

    const getQuestion = (newPuntuation) => {
        console.log('Soy get Question...hago fetch')
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

        //Llamamos a la pregunta de la api y la guardamos en clientInfoFromContext.allQuestions (contexto)
        fetch(totalUrl)
            .then(fetchInfo => {
                return fetchInfo.json();
            })
            .then(jsonInfo => {
                setContextFunctionFromContext({
                    ...valueFromContext.Context,
                    ClientInfo: {
                        ...clientInfoFromContext,
                        allQuestions: [...clientInfoFromContext.allQuestions, jsonInfo.results[0]],
                        totalPoints: newPuntuation || clientInfoFromContext.totalPoints
                    }
                })
            })
        console.log(totalUrl)
        console.log(clientInfoFromContext)
    }

    const mezclarSoluciones = () => {
        console.log('Soy mezclar soluciones')
        return (
            [clientInfoFromContext.allQuestions[clientInfoFromContext.allQuestions.length - 1].correct_answer, ...clientInfoFromContext.allQuestions[clientInfoFromContext.allQuestions.length - 1].incorrect_answers].sort(function () {
                return Math.random() - 0.5
            })
        )
    }

    useEffect(() => {
        nextQuestion()
        console.log('useEffect')
    }, []);

    //Comprobamos si la respuesta seleccionada es correcta o no y cargamos la siguiente pregunta
    const checkAnswer = (answer) => {
        console.log('Soy check answer')
        let actualPuntuation = clientInfoFromContext.totalPoints;
        if (answer === clientInfoFromContext.allQuestions[clientInfoFromContext.allQuestions.length - 1].correct_answer) {
            Confetti.start()
            setTimeout(() => {
                Confetti.stop()
            }, 2000);
            nextQuestion(actualPuntuation + 10)


        } else {
            nextQuestion(actualPuntuation === 0 ? 0 : actualPuntuation - 2)
        }
    }

    return (
        !endGame
            ? (clientInfoFromContext.allQuestions.length !== 0 &&
                <div className="gamecard">
                    <img className="imgLogo" src={logoImage} alt="GameLogo" onClick={() => toggle()} />
                    <ModalReturn modal={modal} toggle={toggle} />
                    <div className="row">
                        {/* Mirar -> https://www.npmjs.com/package/react-circular-progressbar */}
                        <div className="col-6 justifyAround">
                            {/* <Time nextQuestion={nextQuestion} /> */}
                        </div>
                        <div className="col-6 justifyAround">
                            <p className="points">Points: <span style={{ fontWeight: 'bold', fontSize: '30px' }}>{clientInfoFromContext.totalPoints}</span> pts</p>
                        </div>
                    </div>
                    <div className="row numberQuestionAndDifficulty">
                        <div className="col-6 justifyAround">
                            <p className="questionNumber">{`${clientInfoFromContext.allQuestions.length} / ${clientInfoFromContext.numberOfQuestions}`}</p>
                        </div>
                        <div className="col-6 justifyAround">
                            <p className="questionDifficulty">{clientInfoFromContext.allQuestions[clientInfoFromContext.allQuestions.length - 1].difficulty.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="row question">
                        <div className="col-12 justifyAround">
                            <p>
                                <span role="img" aria-label='manoSeñalando'>👉</span>
                                {clientInfoFromContext.allQuestions[clientInfoFromContext.allQuestions.length - 1].category}
                                <span role="img" aria-label='manoSeñalando'>👈</span>
                            </p>
                        </div>
                        <div className="col-12 justifyAround">
                            <p>{clientInfoFromContext.allQuestions[clientInfoFromContext.allQuestions.length - 1].question}</p>
                        </div>
                    </div>
                    <div className="row justifyAround answers">
                        {mezclarSoluciones().map((answer, index) =>
                            <div key={index} onClick={() => checkAnswer(answer)}>
                                <p>{answer}</p>
                            </div>)}
                    </div>
                </div>)
            : <EndGame puntos={clientInfoFromContext.totalPoints} />
    )
}

export default Game;