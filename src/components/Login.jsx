import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import UserStore from '../stores/UserStore';
import './Login.css';

@inject('UserStore')
@observer class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  login() {
    UserStore.login({ ...this.state })
    this.props.history.push('/');
  }

  toRegister() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => {this.login();}}>
          <div className="container">
            <label><b>Email</b></label>
            <input type="text" placeholder="Enter your email" name="email" value={ this.state.email } onChange={ this.handleChange } required/>
            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" value={ this.state.password } onChange={ this.handleChange } required/>
            <button type="submit">Login</button>
            <hr/>
            <a href="" onClick={ () => { this.toRegister(); }}>Don't have account? Register here</a>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;