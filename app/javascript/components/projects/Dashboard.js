import React from 'react';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return(
            <h1>Status: {this.props.loggedInStatus}</h1>
        );
    }
}

export default Dashboard