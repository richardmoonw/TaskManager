import React from 'react';
import axios from 'axios';
import SignUp from './auth/Signup';
import Login from './auth/Login'

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/projects")
    }

    handleLogoutClick() {
        axios
            .delete("http://localhost:3000/api/v1/logout", { withCredentials: true })
            .then(response => {
                this.props.handleLogout();
            })
            .catch(error => {
                console.log("logout error", error);
            })   
    }

    render() {
        return(
            <>
                <div>This is the home screen</div>
                <SignUp handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <button onClick={this.handleLogoutClick}>Logout</button>
            </>
        )
    }
}

export default Home;