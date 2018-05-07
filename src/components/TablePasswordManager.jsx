import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

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

@inject('UserStore')
@observer class TablePasswordManager extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      modalCheckPwdIsOpen: false,
      key: '',
      app: '',
      username: '',
      password: '',
      index: '',
      createdAt: '',
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

  editState(key, app, username, password, createdAt) {
    this.setState({
      key, app, username, password, createdAt
    })
  }

  handleChangePassword = (e) => {
    let uppercase = document.getElementById('uppercase');
    let lowercase = document.getElementById('lowercase');
    let specialcase = document.getElementById('specialcase');
    let number = document.getElementById('number');
    let minimaldigit = document.getElementById('minimaldigit');

    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
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

  openModalCheckPwd() {
    this.setState({modalCheckPwdIsOpen: true});
  }

  afterOpenModalCheckPwd() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModalCheckPwd() {
    this.setState({modalCheckPwdIsOpen: false});
  }

  checkOpenPwd = (pwd) => {
    console.log(pwd)
    console.log('testing', this.state.index)
    UserStore.checkPassword(pwd, this.state.index)
  }

  changeIndex(i) {
    console.log('masuk change index')
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
        <table id="password-generator">
          <thead>
            <tr>
              <th>No</th>
              <th>App</th>
              <th>Username</th>
              <th>Password</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { UserStore.apps.map((app, i) => 
              <tr key={ app.key }>
                <th> { i+1 } </th>
                <th> { app.app } </th>
                <th> { app.username } </th>
                <th> { app.showedPassword } </th>
                <th> { this.dateFormat( app.createdAt ) } </th>
                <th> { this.dateFormat( app.updatedAt ) } </th>
                <th>
                  <a onClick={ (e) => { this.changeIndex(i); }} href="#open-modal">
                    <i class="fa fa-eye"></i>
                  </a> | 
                  <a onClick={ (e) => { this.editState(app.key, app.app, app.username, app.password, app.createdAt); }} href="#open-modal-edit-app">
                  <i class="fa fa-dot-circle-o"></i>
                  </a> | 
                  <a href="" onClick={ (e) => { UserStore.deleteApp(app.key); e.preventDefault(); }}>
                    <i class="fa fa-close"></i>
                  </a>
                </th>
              </tr>
             ) }
          </tbody>
        </table>

        {/* Modal with css*/}
        <div id="open-modal" class="modal-window">
          <div>
            <a href="#modal-close" title="Close" class="modal-close">Close</a>
            <div className="container">
              <label><b>Password</b></label>
              <input type="password" placeholder="Your password" name="password" value={ this.state.password } onChange={ this.handleChange } required/>
              <button type="button" onClick={() => {this.checkOpenPwd(this.state.password);}}>
                <a href="#modal-close" title="Close">Show Password</a>
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
              <input type="text" placeholder="App's name" name="app" value={ this.state.app } onChange={ this.handleChange } required/>
              <label><b>Username</b></label>
              <input type="text" placeholder="Your username" name="username" value={ this.state.username } onChange={ this.handleChange } required/>
              <label><b>Password</b></label>
              <input type="password" placeholder="Your password" name="password" value={ this.state.password } onChange={ this.handleChangePassword } required/>
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