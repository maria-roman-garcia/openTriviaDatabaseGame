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
                <h4>----- FIN DEL JUEGO -----</h4>
            </div>
            <div className="row justifyCenter">
                <p>{`Puntuación total: ${props.puntos}`}</p>
            </div>
            <div div className="row justifyCenter playButton">
                <Link to='/'>
                    <div>
                        <h4>PLAY AGAIN!</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default EndGame;