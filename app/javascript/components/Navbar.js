import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logo from 'images/forkie.png';
import { styled } from '@material-ui/core/styles';

// Styled Components
const ProjectsButton = styled(Button)({
    width: "100%",
    background: "#3bb1d1",
    boxShadow: '2px 2px 5px lightgray',
    color: 'white',
    '&:hover': {
        background: '#0d83a3'
	}
});

const TopPanel = styled(Grid)({
    marginTop: '1rem'
});

const FormattedLink = styled(Link)({
	textDecoration: 'none'
});

const CenteredContainer = styled(Grid)({
	textAlign: 'center'
});

const LogoutNavbarButton = styled(Button)({
	width: '40%',
	marginLeft: '1rem'
});

const ProjectsNavbarButton = styled(ProjectsButton)({
	width: '40%',
	marginLeft: '1rem'
});


// Navbar Component
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
					<TopPanel container>
						<Grid item xs={1}>
							<FormattedLink to="/profile">
								<img alt="logo" width="100%" src={Logo}></img>
							</FormattedLink>	
						</Grid>
						<Grid item xs={7}></Grid>
						<CenteredContainer item xs={3}>
							<FormattedLink to="/projects">
								<ProjectsNavbarButton
									variant="contained"
									color="primary"
									startIcon={<AccountTreeIcon />}
								>
									Projects
								</ProjectsNavbarButton>
							</FormattedLink>
							<LogoutNavbarButton
								variant="contained"
								color="secondary"
								startIcon={<ExitToAppIcon />}
								onClick={this.props.handleLogout}
							>
								Sign out
							</LogoutNavbarButton>
						</CenteredContainer>
					</TopPanel>
				</Grid>
			</Grid>
		)
	}
}

export default Navbar;