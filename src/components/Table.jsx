import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import UserStore from '../stores/UserStore';

@inject('UserStore')
@observer class Table extends Component {
  render() {
    return (
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
              <th> { this.props.that.dateFormat( app.createdAt ) } </th>
              <th> { this.props.that.dateFormat( app.updatedAt ) } </th>
              <th>
                <a onClick={ (e) => { this.props.that.changeIndex(i); }} href="#open-modal-password">
                  <i class="fa fa-eye"></i>
                </a> | 
                <a onClick={ (e) => { this.props.that.editState(app.key, app.app, app.username, app.password, app.createdAt); }} href="#open-modal-edit-app">
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
    );
  }
}

export default Table;