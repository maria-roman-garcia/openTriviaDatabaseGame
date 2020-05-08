import React, { useContext } from 'react';
import MyContext from '../../context';
import './NumberOfQuestions.scss';

const NumberOfQuestions = () => {

    const valueFromContext = useContext(MyContext); //Nuestro contexto
    let clientInfoFromContext = valueFromContext.Context.ClientInfo;
    const setContextFunctionFromContext = valueFromContext.setContext;

    return (
        <div className="row filters alignCenter">
            <div className="col-12 col-md-5">
                <h4>NUMBER OF QUESTIONS</h4>
            </div>
            <div className="col-12 col-md-6 justifyCenter alignCenter">
                <input
                    id="slider"
                    type="range"
                    min="1"
                    max="50"
                    value={clientInfoFromContext.numberOfQuestions}
                    onChange={(event) => setContextFunctionFromContext({ ...valueFromContext.Context, ClientInfo: { ...clientInfoFromContext, numberOfQuestions: event.target.value.toString().padStart(2, '0')}})} />
                <div id="totalQuestions">
                    <p>{clientInfoFromContext.numberOfQuestions}</p>
                </div>
            </div>
        </div>
    )
}

export default NumberOfQuestions;