import React, { Component } from 'react';
// import { inject } from 'mobx-react';

import UserStore from '../stores/UserStore';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  register() {
    UserStore.register({ ...this.state })
  }

  toLogin() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => {this.register(); e.preventDefault();}}>
          <div className="container">
            <label><b>Email</b></label>
            <input type="text" placeholder="Enter your email" name="email" value={ this.state.email } onChange={ this.handleChange } required/>
            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" value={ this.state.password } onChange={ this.handleChange } required/>
            <button type="submit">Register</button>
            <hr/>
            <a href="" onClick={ () => { this.toLogin(); }}>Already have account? Login here</a>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;