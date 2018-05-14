import React, { Component } from 'react';

import Search from './Search.jsx';
import UserStore from '../stores/UserStore';
import './AddApp.css';

class AddApp extends Component {
  constructor() {
    super();

    this.state = {
      app: '',
      username: '',
      password: '',
    };
  }

  addApp() {
    const newApp = {
      app: this.state.app,
      username: this.state.username,
      password: this.state.password,
    }
    UserStore.addApp({...newApp});
    UserStore.getAppList();
  }

  render() {
    return (
      <div>
        <div className="left">
          <Search/>
        </div>
        <div className="right">
          <button className="add-app">
            <a href="#open-modal">
              Add App
            </a>
          </button>
        </div>

        {/* Modal with css */}
        <div id="open-modal" class="modal-window">
          <div>
            <a href="#modal-close" title="Close" class="modal-close">Close</a>
            <form onSubmit={(e) => {this.addApp(); e.preventDefault();}}>
              <div className="container">
                <label><b>App</b></label>
                <input type="text" placeholder="App's name" name="app" id="appId" value={ this.state.app } onChange={ UserStore.handleChange(this) } required/>
                <label><b>Username</b></label>
                <input type="text" placeholder="Your username" name="username" id="usernameId" value={ this.state.username } onChange={ UserStore.handleChange(this) } required/>
                <label><b>Password</b></label>
                <input type="password" placeholder="Your password" name="password" id="passwordId" value={ this.state.password } onChange={ UserStore.handleChangePassword(this) } required/>
                <button type="submit">Add App</button>
              </div>
            </form>
            <hr/>
            <div>
              <p>Password Must Contain: </p>
              <div id="uppercase" className="invalid">Upper Case</div>
              <div id="lowercase" className="invalid">Lower Case</div>
              <div id="specialcase" className="invalid">Special Character</div>
              <div id="number" className="invalid">At least 1 number</div>
              <div id="minimaldigit" className="invalid">Minimal 6 Digits</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddApp;