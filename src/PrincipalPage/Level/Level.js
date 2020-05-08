import React, { useContext } from 'react';
import MyContext from '../../context';

const Level = () => {

    const valueFromContext = useContext(MyContext); //Nuestro contexto
    const apiInfoFromContext = valueFromContext.Context.apiInfo;
    let clientInfoFromContext = valueFromContext.Context.ClientInfo;
    const setContextFunctionFromContext = valueFromContext.setContext;

    return (
        <div className="row filters alignCenter">
            <h4>LEVEL</h4>
            {apiInfoFromContext.level.map((level, index) =>
                <div key={index} className={level.id === clientInfoFromContext.level ? 'levelItemSelected' : 'levelItem'}
                    onClick={() => setContextFunctionFromContext({ ...valueFromContext.Context, ClientInfo: { ...clientInfoFromContext, level: level.id } })}>
                        <p>{level.name}</p>
                </div>
            )}
        </div>
    )
}

export default Level;