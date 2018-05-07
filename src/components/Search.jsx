import React, { Component } from 'react';

import UserStore from '../stores/UserStore';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      UserStore.search(this.state.search)
    })
  }

  render() {
    return (
      <div>
        <p>Search: <input type="search" name="search" value={ this.state.search } onChange={ this.handleChange }/></p>
      </div>
    );
  }
}

export default Search;