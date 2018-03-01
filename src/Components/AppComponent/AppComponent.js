import React, { Component } from 'react';
import LoginComponent from '../LoginComponent/LoginComponent';
import AdStoreComponent from '../AdStoreComponent/AdStoreComponent';
import { userAccounts } from '../../Model/userAccounts';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user: {
                username: '',
                discounts: [],
                isLoggedIn: false
            }
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin (username) {
        const isExistingUser = userAccounts.find((item) => item.username === username);
        const userState = isExistingUser ? {
            ...isExistingUser,
            isLoggedIn: true
        } : {
            username: username || 'Anonymous',
            discounts: [],
            isLoggedIn: true
        };

        this.setState({
            user: userState
        });
    }

    render () {
        const { user } = this.state;
        return (
            <div className="App">
                {
                    (user.isLoggedIn) ? <AdStoreComponent user={user} /> : <LoginComponent handleLogin={(this.handleLogin)}/>
                }
            </div>
        );
    }
}

export default App;
