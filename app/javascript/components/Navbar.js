import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { styles, ProjectsButton } from './styles';
import Logo from 'images/forkie.png'

class Navbar extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return(
			<Grid container>
				{/* Empty space at the left */}
				<Grid item xs={1}></Grid>

				{/* Brand container */}
				<Grid item xs={11}>

					{/* Top Panel: Logo */}
					<Grid container style={styles.topPanel}>
						<Grid item xs={1}>
							<Link style={styles.link} to="/profile">
								<img alt="logo" width="100%" src={Logo}></img>
							</Link>	
						</Grid>
						<Grid item xs={7}></Grid>
						<Grid item xs={3} style={styles.contentCentered}>
							<Link style={styles.link} to="/projects">
								<ProjectsButton
									variant="contained"
									color="primary"
									startIcon={<AccountTreeIcon />}
									style={styles.navbarButtons}
								>
									Projects
								</ProjectsButton>
							</Link>
							<Button
								variant="contained"
								color="secondary"
								startIcon={<ExitToAppIcon />}
								style={styles.navbarButtons}
								onClick={this.props.handleLogout}
							>
								Sign out
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default Navbar;