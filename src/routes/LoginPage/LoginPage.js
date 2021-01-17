import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Section } from "../../components/Utils/Utils";
import ErrorHandler from "../../ErrorHandler";
import ApiContext from "../../ApiContext";

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    };

    static contextType = ApiContext;

    handleLoginSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || "/";
        this.context.changeFlag();
        history.push(destination);
    };

    render() {
        return (
            <Section className="LoginPage sub-header">
                <h2>Login</h2>
                <ErrorHandler>
                    <LoginForm onLoginSuccess={this.handleLoginSuccess} />
                </ErrorHandler>
            </Section>
        );
    }
}
