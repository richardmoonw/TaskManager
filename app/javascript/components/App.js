import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import NotFound from './NotFound';
import Login from './auth/Login';
import SignUp from './auth/Signup';
import Dashboard from './projects/Dashboard';
import Profile from './employee/Profile';
import TicketsBoard from './tickets_components/TicketsBoard'

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
            employee: {}
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        // Verify if the user is already logged in
        this.checkLoginStatus();
    }

    checkLoginStatus() {
        axios.get(`/api/v1/logged_in`, { withCredentials: true })
            .then(response => {
                if (response.data.logged_in === true && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
                    axios.get(`/api/v1/users/${response.data.user.id}`, { withCredentials: true })
                        .then(response => {
                            this.setState({
                                loggedInStatus: 'LOGGED_IN',
                                user: response.data,
                                employee: response.data.employee
                            })
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

    // Change the state status once a user has logged in.
    handleLogin(user_id) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
        })
        axios.get(`/api/v1/users/${user_id}`, { withCredentials: true })
            .then(response => {
                this.setState({
                    user: response.data,
                    employee: response.data.employee
                })
            })
            .catch(error => {
                console.log("There was an error retrieving the user data");
            })
    }

    // Change the state status once a user has logged out.
    handleLogout() {
        this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {},
            employees: {} 
        })
    }

    // Change the state if the user updates their information.
    handleUpdate() {
        axios.get(`/api/v1/users/${this.state.user.id}`, { withCredentials: true })
            .then(response => {
                this.setState({
                    user: response.data,
                    employee: response.data.employee
                })
            })
            .catch(error => {
                console.log("There was an error updating your information");
            })
    }

    render() {
        return(
            <Switch>

                {/* Home Screen */}
                <Route 
                    exact 
                    path="/"
                    render={props => (
                        <Home {...props} 
                            loggedInStatus={this.state.loggedInStatus} />
                    )} 
                />

                {/* Sign up Screen */}
                <Route 
                    exact 
                    path='/signup' 
                    render={props => (
                        <SignUp {...props} 
                            loggedInStatus={this.state.loggedInStatus}
                            handleLogin={this.handleLogin} />
                    )} 
                />

                {/* Login Screen */}
                <Route 
                    exact 
                    path='/login' 
                    render={props => (
                        <Login {...props}
                            loggedInStatus={this.state.loggedInStatus}
                            handleLogin={this.handleLogin} />
                    )} 
                />

                {/* Profile Screen */}
                <Route 
                    exact 
                    path='/profile' 
                    render={props => (
                        this.state.loggedInStatus === "LOGGED_IN"
                        ? <Profile {...props}
                            handleLogout={this.handleLogout}
                            handleUpdate={this.handleUpdate}
                            user={this.state.user}
                            employee={this.state.employee} />
                        : <NotFound />
                       
                    )} 
                />

                {/* Specific Project Screen */}
                <Route
                    exact
                    path='/ticketsboard/:id'
                    render={props =>(
                        this.state.loggedInStatus === "LOGGED_IN"
                        ? <TicketsBoard {...props}
                            handleLogout={this.handleLogout}
                            employee={this.state.employee} 
                        />
                        : <NotFound />
                    )}
                />

                {/* Projects Dashboard */}
                <Route
                    exact
                    path='/projects'
                    render={props =>(   
                        this.state.loggedInStatus === "LOGGED_IN"  
                        ? <Dashboard {...props}
                            handleLogout={this.handleLogout}
                            employee={this.state.employee} />
                        : <NotFound />
                    )}
                />
                
                {/* Any other page */}
                <Route 
                    path="/"
                    render={() => (
                        <NotFound />
                    )}
                />
                

            </Switch>
        )
    }
}


export default App;