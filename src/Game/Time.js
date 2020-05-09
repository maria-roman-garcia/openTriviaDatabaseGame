import React, { useState } from 'react';

const Time = (props) => {

    const [seconds, setSeconds] = useState(5);

    const startCountDown = () => {
        seconds !== 0 ? setSeconds(seconds - 1) : reset();
    }

    setTimeout(() => {
        startCountDown();
    }, 1000);

    //Reiniciamos el tiempo ycargamos la siguiente pregunta
    const reset = () => {
        setSeconds(5);
        props.nextQuestion();
    }

    return (
        <div className="row">
            <p>{`Time ${seconds}`}</p>
        </div>
    )
}

export default Time;