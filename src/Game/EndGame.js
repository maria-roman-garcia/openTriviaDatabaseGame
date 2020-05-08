import React from 'react';
import { Link } from 'react-router-dom';
import './EndGame.scss';

const EndGame = (props) => {

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
            <div div className="row justifyCenter playButton">
                <Link to='/'>
                    <div className="row">
                        <span role="img" aria-label='game'>🎮</span>
                        <h4>PLAY AGAIN!</h4>
                        <span role="img" aria-label='game'>🎮</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default EndGame;