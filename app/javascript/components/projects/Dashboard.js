import React from 'react';
import axios from 'axios';  

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
        axios
            .delete("https://forkie.heroku.com:3000/api/v1/logout", { withCredentials: true })
            .then(response => {
                this.props.handleLogout();
                this.props.history.push("/");
            })
            .catch(error => {
                console.log("logout error", error);
            })   
    }

    render() {
        return(
            <>
            <h1>Status: {this.props.loggedInStatus}</h1>
            <button onClick={this.handleLogoutClick}>Logout</button> 
            </>
        );
    }
}

export default Dashboard