import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserStore from './stores/UserStore';
import logo from './logo.svg';
import DevTools from 'mobx-react-devtools';

import './App.css';
import Navbar from './components/Navbar';
import TablePasswordManager from './components/TablePasswordManager';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <Provider UserStore={UserStore}>
          <div className="App">
            <Navbar/>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Password Manager</h1>
            </header>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" render={
              (props => {
                if (localStorage.key) {
                  return <TablePasswordManager props={props} />
                } else {
                  return <Redirect to="/login"/>
                }
              })
            } />
            </Switch>
            <DevTools/>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
