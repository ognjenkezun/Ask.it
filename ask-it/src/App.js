import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import QuestionPage from './containers/QuestionPage';
import PageNotFound from './containers/PageNotFound';
import MyQuestions from './containers/MyQuestions';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <div className="App">
      <ToastContainer className="toastContainer"/>
      <Switch>
        <Route
          path="/"
          exact
          component={Home}
        />
        <PrivateRoute
          path="/question/:questionId"
          exact
          component={QuestionPage}
        />
        <PrivateRoute
          path="/my-questions"
          exact
          component={MyQuestions}
        />
        <Route
          component={PageNotFound}
        />
      </Switch>
    </div>
  );
}

export default App;
