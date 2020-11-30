import React from 'react';
import './App.css'
import Navbar from '../Navbar'
import Projects from './projects'
import { Grid } from '@material-ui/core'
import { URL } from '../GlobalVariables';
import axios from 'axios';


class Dashboard extends React.Component {
	
	constructor(props){
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		axios
            .delete(`${URL}/api/v1/logout`, { withCredentials: true })
            .then(response => {
                this.props.handleLogout();
                this.props.history.push("/");
            })
            .catch(error => {
                console.log("logout error", error);
            })   
	}

	render() {
		// const classes = useStyles();
		return (
			<>
				<Navbar handleLogout={this.handleLogout}/>
				<Grid container>
					<Grid item xs={1}></Grid>
					<Grid item xs={10}>
						<Projects/>
					</Grid>
				</Grid>
			</>
	  	);
	}
  	
}

export default Dashboard;
