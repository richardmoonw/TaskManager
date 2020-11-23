import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Login from './auth/Login';
import SignUp from './auth/Signup';
import Dashboard from './projects/Dashboard';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    checkLoginStatus() {
        axios
            .get("http://localhost:3000/api/v1/logged_in", { withCredentials: true })
            .then(response => {
                if (response.data.logged_in === true && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
                    this.setState({
                        loggedInStatus: 'LOGGED_IN',
                        user: response.data.user
                    })
                } else if (response.data.logged_in === false && this.state.loggedInStatus === 'LOGGED_IN') {
                    this.setState({
                        loggedInStatus: 'NOT_LOGGED_IN',
                        user: {}
                    })
                }
                console.log("logged in?", response);
            })
            .catch(error => {
                console.log("check login error ", error);
            })
    }

    handleLogin(data) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user
        })
    }

    handleLogout() {
        this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            users: {}
        })
    }

    render() {
        return(
            <Switch>
                <Route 
                    exact 
                    path="/"
                    render={props => (
                        <Home {...props} 
                            loggedInStatus={this.state.loggedInStatus}
                            handleLogin={this.handleLogin} 
                            handleLogout={this.handleLogout} />
                    )} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/login' component={Login} />
                <Route 
                    exact 
                    path='/projects' 
                    render={props => (
                        <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
                    )} />
            </Switch>
        )
    }
}


export default App;