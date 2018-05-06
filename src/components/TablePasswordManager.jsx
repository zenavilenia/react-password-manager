import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-modal';

import AddApp from './AddApp.jsx';
import UserStore from '../stores/UserStore';
import './TablePasswordManager.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

@inject('UserStore')
@observer class TablePasswordManager extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      key: '',
      app: '',
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  editState(key, app, username, password) {
    this.setState({
      key, app, username, password
    })
  }

  handleChangePassword = (e) => {
    this.handleChange(e);

    let uppercase = document.getElementById('uppercase');
    let lowercase = document.getElementById('lowercase');
    let specialcase = document.getElementById('specialcase');
    let number = document.getElementById('number');
    let minimaldigit = document.getElementById('minimaldigit');
    
    let upperCaseTest = /[A-Z]/g;
    if (this.state.password.match(upperCaseTest)) { 
      uppercase.classList = "valid";
    } else {
      uppercase.classList = "invalid";
    }

    let lowerCaseTest = /[a-z]/g;
    if (this.state.password.match(lowerCaseTest)) { 
      lowercase.classList = "valid";
    } else {
      lowercase.classList = "invalid";
    }

    let specialCaseTest = /[$&+,:;=?@#|'<>.^*()%!-]/g;
    if (this.state.password.match(specialCaseTest)) { 
      specialcase.classList = "valid";
    } else {
      specialcase.classList = "invalid";
    }

    let numberTest = /[0-9]/g;
    if (this.state.password.match(numberTest)) { 
      number.classList = "valid";
    } else {
      number.classList = "invalid";
    }

    let minimalDigitTest = /^.{6,}$/g;
    if (this.state.password.match(minimalDigitTest)) { 
      minimaldigit.classList = "valid";
    } else {
      minimaldigit.classList = "invalid";
    }
  }

  editApp() {
    const editThisApp = {
      app: this.state.app,
      username: this.state.username,
      password: this.state.password,
    }
    UserStore.editApp(this.state.key, {...editThisApp});
    UserStore.getAppList();
  }

  componentDidMount() {
    UserStore.getAppList()
  }

  showPassword(appkey, pwd) {
    let app = document.getElementById(appkey);
    app.classList = "show-password";
    this.hidePassword(appkey, pwd);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  hidePassword(appkey, pwd) {
    console.log('masuk')
    let app = document.getElementById(appkey);
    if(app) {
      if(app.className === "show-password") {
        console.log('masukkk')
        app.value = pwd;
      } else {
        return app.value = '*'.repeat(pwd.length);
      }
    } else {
      return '*'.repeat(pwd.length);
    }

    console.log(app.value)
  }

  render() {
    return (
      <div>
        <AddApp/>
        <table id="password-generator">
          <thead>
            <tr>
              <th>No</th>
              <th>App</th>
              <th>Username</th>
              <th>Password</th>
              <th>---</th>
              <th>---</th>
            </tr>
          </thead>
          <tbody>
            { UserStore.apps.map((app, i) => 
              <tr key={ app.key }>
                <th> { i+1 } </th>
                <th> { app.app } </th>
                <th> { app.username } </th>
                <th> <p id={ app.key }> { this.hidePassword(app.key, app.password) } </p> </th>
                <th> <a href="" onClick={ (e) => { this.showPassword(app.key, app.password); e.preventDefault(); }}>Show Password</a> </th>
                <th> <a href="" onClick={ (e) => { this.editState(app.key, app.app, app.username, app.password); this.openModal(); e.preventDefault(); }}>Edit</a> |
                    <a href="" onClick={ (e) => { UserStore.deleteApp(app.key); e.preventDefault(); }}>delete</a>
                </th>
              </tr>
             ) }
          </tbody>
        </table>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Edit App</h2>
          <form onSubmit={(e) => {this.editApp(); this.closeModal(); e.preventDefault();}}>
            <div className="container">
              <label><b>App</b></label>
              <input type="text" placeholder="App's name" name="app" value={ this.state.app } onChange={ this.handleChange } required/>
              <label><b>Username</b></label>
              <input type="text" placeholder="Your username" name="username" value={ this.state.username } onChange={ this.handleChange } required/>
              <label><b>Password</b></label>
              <input type="password" placeholder="Your password" name="password" value={ this.state.password } onChange={ this.handleChangePassword } required/>
              <button type="submit">Edit App</button>
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
          <hr/>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default TablePasswordManager;