import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import AddApp from './AddApp.jsx';
import Table from './Table.jsx';
import UserStore from '../stores/UserStore';
import './TablePasswordManager.css'

@observer class TablePasswordManager extends Component {
  constructor() {
    super();
    this.state = {
      key: '',
      app: '',
      username: '',
      password: '',
      index: '',
      createdAt: '',
    }
  }

  componentDidMount() {
    UserStore.getAppList()
  }

  editState(key, app, username, password, createdAt) {
    this.setState({
      key, app, username, password, createdAt
    })
  }

  editApp() {
    const editThisApp = {
      app: this.state.app,
      username: this.state.username,
      password: this.state.password,
      createdAt: this.state.createdAt,
    }
    UserStore.editApp(this.state.key, {...editThisApp});
    UserStore.getAppList();
  }

  showPassword(appkey, pwd) {
    let app = document.getElementById(appkey);
    app.classList = "show-password";
    this.hidePassword(appkey, pwd);
  }

  checkOpenPwd = (pwd) => {
    UserStore.checkPassword(pwd, this.state.index)
  }

  changeIndex(i) {
    this.setState({
      index: i
    })
  }

  dateFormat (times) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(times).getDate()
    let month = new Date(times).getMonth()
    let year = new Date(times).getFullYear()
    return (date < 10)? `0${date} ${months[month]} ${year}`: `${date} ${months[month]} ${year}`
  }

  render() {
    return (
      <div>
        <AddApp/>
        <Table that={this}/>

        {/* Modal with css*/}
        <div id="open-modal-password" class="modal-password-window">
          <div>
            <a href="#modal-password-close" title="Close" class="modal-close">Close</a>
            <div className="container">
              <label><b>Password</b></label>
              <input type="password" placeholder="Your password" name="password" value={ this.state.password } onChange={ UserStore.handleChange(this) } required/>
              <button type="button" onClick={() => {this.checkOpenPwd(this.state.password);}}>
                <a href="#modal-password-close" title="Close">Show Password</a>
              </button>
            </div>
          </div>
        </div>

        {/* Modal edit app*/}
        <div id="open-modal-edit-app" class="modal-edit-app-window">
          <div>
            <a href="#modal-edit-app-close" title="Close" class="modal-edit-app-close">Close</a>
            <div className="container">
              <label><b>App</b></label>
              <input type="text" placeholder="App's name" name="app" value={ this.state.app } onChange={ UserStore.handleChange(this) } required/>
              <label><b>Username</b></label>
              <input type="text" placeholder="Your username" name="username" value={ this.state.username } onChange={ UserStore.handleChange(this) } required/>
              <label><b>Password</b></label>
              <input type="password" placeholder="Your password" name="password" value={ this.state.password } onChange={ UserStore.handleChangePassword(this) } required/>
              <button type="button" onClick={() => {this.editApp();}}>
                <a href="#modal-edit-app-close" title="Close">Edit App</a>
              </button>
            </div>
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

export default TablePasswordManager;