import React, {useContext} from 'react';
import './PrincipalPage.scss';
import logoImage from '../Img/openTrivia.png';
import Level from './Level/Level';
import Category from './Category/Category';
import NumberOfQuestions from './NumberOfQuestions/NumberOfQuestions';
import { Link } from 'react-router-dom';


const PrincipalPage = () => {

    return (
        <div className="principalPage">
            <div className="row logoImg justifyCenter">
                <img src={logoImage} alt="GameLogo" />
            </div>
            <Level/>
            <Category/>
            <NumberOfQuestions/>
            <div div className = "row justifyCenter playButton">
                <Link to='/game'>
                    <div>
                        <h4>GO!</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default PrincipalPage;