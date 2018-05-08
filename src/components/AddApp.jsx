import React, { Component } from 'react';
import Modal from 'react-modal';

import Search from './Search.jsx';
import UserStore from '../stores/UserStore';
import './AddApp.css';

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

class AddApp extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      app: '',
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      this.handleChangePassword()
    })
  }

  handleChangePassword = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
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
    })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
          <button className="add-app" onClick={ this.openModal }>Add App</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Add New App</h2>
          <form onSubmit={(e) => {this.addApp(); this.closeModal(); e.preventDefault();}}>
            <div className="container">
              <label><b>App</b></label>
              <input type="text" placeholder="App's name" name="app" value={ this.state.app } onChange={ this.handleChange } required/>
              <label><b>Username</b></label>
              <input type="text" placeholder="Your username" name="username" value={ this.state.username } onChange={ this.handleChange } required/>
              <label><b>Password</b></label>
              <input type="password" placeholder="Your password" name="password" value={ this.state.password } onChange={ this.handleChange } required/>
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
          <hr/>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default AddApp;