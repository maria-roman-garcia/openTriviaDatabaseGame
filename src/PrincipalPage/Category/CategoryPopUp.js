import React, { useContext, useState } from 'react';
import MyContext from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import './CategoryPopUp.scss';
import { Link } from 'react-router-dom';

const CategoryPopUp = () => {

    const valueFromContext = useContext(MyContext); //Nuestro contexto
    const apiInfoFromContext = valueFromContext.Context.apiInfo;
    let clientInfoFromContext = valueFromContext.Context.ClientInfo;
    const setContextFunctionFromContext = valueFromContext.setContext;

    const closeIcon = <FontAwesomeIcon icon={faTimes} color='#64FFE5' /> //Icono cerrar de font-awesome
    const deleteIcon = <FontAwesomeIcon icon={faTimesCircle} color='#64FFE5' /> //Icono NO añadido de font-awesome
    const searchIcon = <FontAwesomeIcon icon={faSearch} color='#64FFE5' /> //Icono buscar de font-awesome

    const [inputSearch, setInputSearch] = useState('')

    return (
        <div className="row categoryPopUp">
            <div className="col-12 closeButton">
                <Link to='/'>
                    {closeIcon}
                </Link>
            </div>
            {/* Categorias no añadidas + Buscador */}
            <div className="col-12 col-lg-5 addCategory">
                <input className="inputSearch" type="text" placeholder="Search something..." onChange={(e) => setInputSearch(e.target.value.toLocaleLowerCase())} />
                {searchIcon}

                {apiInfoFromContext.category.filter(categoryItem => categoryItem.name.toLowerCase().includes(inputSearch) && !clientInfoFromContext.category.some(id => id === categoryItem.id)).map((categoryItem, index) =>

                    <div className="AllCategories" key={index} onClick={() => setContextFunctionFromContext({ ...valueFromContext.Context, ClientInfo: { ...clientInfoFromContext, category: [...clientInfoFromContext.category, categoryItem.id]}})}>
                        <span role="img" aria-label='loveBullet'>❥</span>
                        <p>{categoryItem.name}</p>
                    </div>)
                }
            </div>

            {/* Todas las categorias añadidas*/}
            <div className="col-12 col-lg-5 deleteCategory">
                {clientInfoFromContext.category.length === 0
                    ? <p>Add some category!</p>
                    : clientInfoFromContext.category.map((categoryItemId, index) =>
                        <div className="row clientCategories" key={index}>
                            <p>{apiInfoFromContext.category.find(categoryId => categoryId.id === categoryItemId).name}</p>
                            <span onClick={() => setContextFunctionFromContext({
                                ...valueFromContext.Context, ClientInfo: {
                                    ...clientInfoFromContext, category: clientInfoFromContext.category.filter(item =>
                                item !== categoryItemId)}})}>{deleteIcon}</span>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default CategoryPopUp;