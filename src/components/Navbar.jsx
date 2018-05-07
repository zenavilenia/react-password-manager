import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
  logout() {
    localStorage.removeItem('key');
    localStorage.removeItem('email');
  }

  render() {
    return (
      <div>
        <nav>
        <ul>
          <li>
          <Link to="/login" onClick={ this.logout.bind(this, null) }>
            <span>
              Logout
            </span>
          </Link>
          </li>
        </ul>
      </nav>
      </div>
    );
  }
}

export default Navbar;