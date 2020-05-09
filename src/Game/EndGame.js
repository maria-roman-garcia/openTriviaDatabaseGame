import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context';
import './EndGame.scss';

const EndGame = (props) => {

    const valueFromContext = useContext(MyContext); //Nuestro contexto
    const setContextFunctionFromContext = valueFromContext.setContext;

    const gif = 'https://media.giphy.com/media/l378xVg7JY3tefx3W/giphy.gif'
    return (
        <div>
            <div className="row justifyCenter">
                <img className="endGif" src={gif} alt='playGif' />
            </div>
            <div className="row justifyCenter">
                <h4>----- END OF THE GAME -----</h4>
            </div>
            <div className="row justifyCenter">
                <p>{`Total Points: ${props.puntos}`}</p>
            </div>
            <div className="row justifyCenter playButton" onClick={() =>
                setContextFunctionFromContext({
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
                })}>
                <Link to='/'>
                    <div className="row">
                        <span role="img" aria-label='game'>🎮</span>
                        <h4>PLAY AGAIN!</h4>
                        <span role="img" aria-label='game'>🎮</span>
                    </div>
                </Link>
            </div>
            <div div className="row justifyCenter playButton" >
                <Link Link to='/questionsReview' >
                    <div className="row">
                        <span role="img" aria-label='nerdface'>🤓</span>
                        <h4>REVIEW ANSWERS</h4>
                        <span role="img" aria-label='nerdface'>🤓</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default EndGame;