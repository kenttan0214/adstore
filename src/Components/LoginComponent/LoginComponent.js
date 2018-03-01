import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './LoginComponentStyle.css';

class Login extends Component {
    static propTypes = {
        handleLogin: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            userName: ''
        };

        this.handleUserNameInput = this.handleUserNameInput.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleUserNameInput (e) {
        this.setState({
            userName: e.target.value
        });
    }

    handleLoginSubmit (e) {
        e.preventDefault();
        this.props.handleLogin(this.state.userName);
    }

    render () {
        const {
            userName
        } = this.state;

        return (
            <div className="LoginComponent__container">
                <h1 className="LoginComponent__title"> Login </h1>

                <form className="LoginComponent__form" onSubmit={this.handleLoginSubmit}>
                    <div>
                        <input className="LoginComponent__usernameTextInput" name="username" onChange={this.handleUserNameInput} placeholder="Please enter your user name" type="text" value={userName} />
                    </div>
                    <button className="LoginComponent__longinButton" type="submit"> Log in </button>
                    <div className="LoginComponent__specialCustomer">Special Customer User Name</div>
                    <strong>Apple, Ford, Nike, Unilever</strong>
                </form>
            </div>
        );
    }
}

export default Login;
