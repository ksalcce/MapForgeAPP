import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiContext from "../../ApiContext";
import TokenService from "../../services/token-service";
import "./Header.css";

export default class Header extends Component {
    static contextType = ApiContext;
	
	handleLogoutClick = () => {
		this.context.changeFlag();
		TokenService.clearAuthToken();
    };

    renderLogoutLink() {
        return (
            <
                // className="Header__logged-in"
            >
                <Link to="/account">Account</Link>
                {" - "}
                <Link onClick={this.handleLogoutClick} to="/">
                    Logout
                </Link>
            </>
        );
    }

    renderLoginLink() {
        return (
            <
                // className="Header__not-logged-in"
            >
                <Link to="/register">Register</Link>
                {" - "}
                <Link to="/login">Log in</Link>
            </>
        );
    }

    render() {
        return (
            <nav
            // className="Header"
            >
                <h1>
                    <Link to="/">MapForge</Link>{" "}
                </h1>
                <ul className="top-link-list">
                    <li className="top-link">
                        <Link to={`/maps`}>Maps</Link>
                    </li>
                    <li className="top-link">
                        {TokenService.hasAuthToken()
                            ? this.renderLogoutLink()
                            : this.renderLoginLink()}
                    </li>
                </ul>
            </nav>
        );
    }
}
