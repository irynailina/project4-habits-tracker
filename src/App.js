import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import RegistrationPage from './pages/auth/RegistrationPage.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import StatisticsPage from './pages/dashboard/StatisticsPage';
import Team from './components/Team/Team';

const App = () => {
  const { isAuth } = useSelector(state => state.auth);
  if (!isAuth) {
    return (
      <Switch>
        <Route path="/" exact component={RegistrationPage} />
        <Route path="/login" exact component={LoginPage} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/home" component={StatisticsPage} />
      <Route path="/team" exact component={Team} />
      <Redirect to="/home" />
    </Switch>
  );
};

export default App;
