import React from 'react';
import Navbar from '../Navbar';
import Projects from './Project';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { styled } from '@material-ui/core/styles';

// Styled components
const BackgroundContainer = styled(Grid)({
	backgroundColor: '#f5f5f5',
	minHeight: "100vh",
	height: "100%",
	paddingBottom: "2rem"
});

class Dashboard extends React.Component {
	
	constructor(props){
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
	}

	// Function used to handle the logout of the application.
	handleLogout() {
		axios
            .delete(`/api/v1/logout`, { withCredentials: true })
            .then(response => {
                this.props.handleLogout();
                this.props.history.push("/");
            })
            .catch(error => {
                console.log("logout error", error);
            })   
	}

	render() {
		return (
			<>
				<Navbar handleLogout={this.handleLogout}/>
				<BackgroundContainer container>
					<Projects/>
				</BackgroundContainer>
			</>
	  	);
	}
  	
}

export default Dashboard;
