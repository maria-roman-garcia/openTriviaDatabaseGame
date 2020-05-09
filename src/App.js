import React, { useState, useEffect } from 'react';
import './App.css';
import PrincipalPage from './PrincipalPage/PrincipalPage';
import Game from './Game/Game';
import CategoryPopUp from './PrincipalPage/Category/CategoryPopUp';
import EndGame from './Game/EndGame';
import QuestionsReview from './Game/QuestionsReview/QuestionsReview'
import MyContext from './context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  //Contexto global con todos los datos...plantilla
  const [Context, setContext] = useState({
    apiInfo: {
      level: [
        {
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
  });

  const categoryUrl = 'https://opentdb.com/api_category.php';
  useEffect(() => {
    //Para las categorias llamamos directamente a la Api
    fetch(categoryUrl)
      .then(fetchInfo => {
        return fetchInfo.json();
      })
      .then(jsonInfo => {
        setContext({
          ...Context,
          apiInfo: { ...Context.apiInfo, category: jsonInfo.trivia_categories }
        })
      })
  },[])

  //Para poder pasar tanto el estado como la funcion que lo cambia a los hijos lo guardamos en una constante
  const exportContext = { Context, setContext }

  //Todos los componentes tendrán acceso a MyContext
  return (
    <MyContext.Provider value={exportContext}>
      <div className="App">
        <Router>
          <Route path='/' exact component={PrincipalPage} />
          <Route path='/game' component={Game} />
          <Route path='/categoryFilter' component={CategoryPopUp}/>
          <Route path='/questionsReview' component={QuestionsReview}/>
          <Route path='/endGame' component={EndGame}/>
        </Router>
      </div>
    </MyContext.Provider>
  );
}

export default App;
