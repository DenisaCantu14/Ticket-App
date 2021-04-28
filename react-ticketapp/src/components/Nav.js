import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../CSS/Nav.css";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>{isAuthenticated() && <Link to="/profile">Profile</Link>}</li>

          <li className="log-button">
            <button
              className="log"
              onClick={isAuthenticated() ? logout : login}
            >
              {isAuthenticated() ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
