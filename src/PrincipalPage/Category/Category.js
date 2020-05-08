import React, { useContext } from 'react';
import MyContext from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Category = () => {

    const valueFromContext = useContext(MyContext); //Nuestro contexto
    const apiInfoFromContext = valueFromContext.Context.apiInfo;
    let clientInfoFromContext = valueFromContext.Context.ClientInfo;

    const editIcon = <FontAwesomeIcon icon={faEdit} color='#282c34' /> //Icono editar de font-awesome

    return (
        <div className="row filters alignCenter justifyCenter">
            {
                // Si no tenemos ninguna categoria seleccionada
                clientInfoFromContext.category.length === 0
                    ? <Link to='/categoryFilter'>
                        <div className="alignCenter" style={{ width: '100%' }}>
                            <p style={{color: 'white'}}>Choose a category here!
                        <span role="img" aria-label='manoSeñalando'>👉</span>
                            </p>
                            <div className="levelItem">Categories &nbsp; {editIcon}</div>
                        </div>
                    </Link>
                    //Si ya tenemos algun id de categoria guardado en 'clientInfoFromContext.category'
                    : <div>
                        {
                            clientInfoFromContext.category.map((categoryId, index) =>
                                <p key={index}>{
                                    apiInfoFromContext.category.find(categoryItem => categoryItem.id === categoryId).name
                                }</p>
                            )
                        }
                        <Link to='/categoryFilter'>
                            <div className="levelItem justifyCenter alignCenter">Edit categories &nbsp; {editIcon}</div>
                        </Link>
                    </div>
            }
        </div>
    )
}

export default Category;