import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
        <ul>
          <li>
            <Link to="/">
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