import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Tabs, Tab, Grid, TextField, Button, Select, MenuItem, InputLabel, Box, Typography } from '@material-ui/core';
import Logo from 'images/forkie.png';
import ProfileImg from 'images/profile.png'
import { URL } from '../GlobalVariables'; 
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountTree from '@material-ui/icons/AccountTree';
import axios from 'axios';
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

const NavPanel = styled(Grid)({
	backgroundColor: 'white'
});

const TopPanel = styled(Grid)({
    marginTop: '1rem'
});

const TabPanel = styled(Paper)({
	marginTop: '1rem',
	boxShadow: "none"
});

const BackgroundContainer = styled(Box)({
	backgroundColor: '#f5f5f5',
    minHeight: "104vh"
});

const ProfileBoard = styled(Grid)({
	paddingTop: "3.2rem"
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

const ProfileName = styled(Typography)({
	fontSize: '1.7rem',
	fontWeight: 'bold',
	marginTop: '1rem',
	marginBottom: '0rem'
});

const ProfileRole = styled(Typography)({
	fontSize: '1.2rem',
	marginBottom: '0.3rem'
});

const ProfileEmail = styled(Typography)({
	fontSize: '0.7rem',
	marginBottom: '1rem'
});

const UpdateTitle = styled(Typography)({
	fontSize: '1.7rem',
	marginTop: "1rem",
	marginBottom: "1rem"
});

const RoleLabel = styled(InputLabel)({
	fontSize: '12px',
	textAlign: 'left'
});

const UpdateTextField = styled(TextField)({
	width: "70%",
	marginBottom: "1rem",
	textAlign: "left"
});

const UpdateSelect = styled(Select)({
	width: "70%",
	marginBottom: "1rem",
	textAlign: "left"
});

const ProfileContainer = styled(Grid)({
	backgroundColor: "white",
	borderRadius: "0.5rem",
	paddingBottom: "2rem",
	marginBottom: "2rem"
});

const ContainerTitle = styled(Typography)({
	fontSize: '1.75rem',
	fontFamily: 'Verdana',
	margin: '2rem 0rem 1rem 2rem'
});

const ContainerText = styled(Typography)({
	fontSize: '1.05rem',
	fontFamily: 'Arial',
	lineHeight: '1.5rem',
	marginLeft: '2rem'
});

const FormattedLink = styled(Link)({
	textDecoration: 'none'
});


class Profile extends React.Component {

	constructor(props) {
		super(props);

		this.state ={
			editProfile: false,
			id: '',
			email: '',
			name: '',
			role: ''
		}		

		this.updateInfo = this.updateInfo.bind(this)
		this.enableEditing = this.enableEditing.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
		setTimeout(() => {
			// If the user is already logged in, redirect them to the profile screen.
			if (this.props.loggedInStatus === 'NOT_LOGGED_IN') {
				this.props.history.push("/");
			} else {
				this.setState({
					id: this.props.employee.id,
					email: this.props.user.email,
					name: this.props.employee.name,
					role: this.props.employee.role
				})
			}
		}, 1000)
    }

	// Function used to handle the user information's updates.
	updateInfo(event) {
		event.preventDefault();
		this.setState({
			editProfile: !this.state.editProfile
		})
	}

	// Function triggered if the user decides to edit their profile or
	// to stop doing it. 
	enableEditing() {
		this.setState({
			editProfile: !this.state.editProfile
		})
	}

	// Function used to update a given state value, everytime its TextField has been modified.
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
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

	handleSubmit() {
		let updated_employee = {
			name: this.state.name,
			role: this.state.role
		}
		axios.put(`${URL}/api/v1/employees/${this.state.id}`, updated_employee, { withCredentials: true })
			.then(response => {
				return;
			})
			.catch(error => {
				console.log("There was an error updating the info")
			})
	}

    render() {
        return(
            <BackgroundContainer>
                {/* Container for the top menu */}
                <NavPanel container spacing={5}>
                  
					{/* Empty space at the left */}
					<Grid item xs={1}></Grid>

					{/* Brand container */}
					<Grid item xs={11}>

						{/* Top Panel: Logo */}
						<TopPanel container>
							<Grid item xs={1}>
								<img alt="logo" width="100%" src={Logo}></img>
							</Grid>
							<Grid item xs={7}></Grid>
							<CenteredContainer item xs={3}>
								<FormattedLink to="/projects">
									<ProjectsNavbarButton
										variant="contained"
										color="primary"
										startIcon={<AccountTree />}
									>
										Projects
									</ProjectsNavbarButton>
								</FormattedLink>
									<LogoutNavbarButton
										variant="contained"
										color="secondary"
										startIcon={<ExitToAppIcon />}
										onClick={this.handleLogout}
									>
										Sign out
									</LogoutNavbarButton>
							</CenteredContainer>
						</TopPanel>
						

						<Grid container>
							<TabPanel>
								<Tabs  
								value={0}
								indicatorColor="secondary"
								centered
								>
									<Tab label="Admin"/>
									<Tab label="Analytics" disabled />
									<Tab label="Recent activity" disabled />
								</Tabs>
							</TabPanel> 
						</Grid>
					</Grid>
                </NavPanel>

				{/* Page Content */}
				<ProfileBoard container spacing={10}>
					<Grid item xs={1}></Grid>

					{/* Left Menu */}
					<Grid item xs={3}>
						<CenteredContainer container>

							{/* Profile Photo */}
							<Grid item xs={12}>
								<img alt="Forkie" width="70%" src={ProfileImg} style={{borderRadius: "1000px"}}/>
							</Grid>

							{/* The information is not being edited */}
							{ !this.state.editProfile && 
								<>
									<Grid item xs={12}>
										<ProfileName>{this.state.name}</ProfileName>
									</Grid>
									<Grid item xs={12}>
										<ProfileRole>{this.state.role}</ProfileRole>
									</Grid>
									<Grid item xs={12}>
										<ProfileEmail><strong>{this.state.email}</strong></ProfileEmail>
									</Grid>
									<CenteredContainer item xs={12}>
										<Button 
											style={{width: "60%"}} 
											variant="contained" 
											color="secondary"
											onClick={this.enableEditing}
										>EDIT INFO</Button>
									</CenteredContainer>
								</>
							}

							{/* The information is being edited */}
							{ this.state.editProfile &&
								<>
									<Grid item xs={12}>
										<Grid item xs={12}>
											<UpdateTitle>Update your information</UpdateTitle>
										</Grid>
										<form onSubmit={this.updateInfo} noValidate autoComplete="off">
											<Grid item xs={12}>
												<UpdateTextField 
													name="name"
													onChange={this.handleChange} 
													label="Enter your name"
													value={this.state.name}
												/>
											</Grid>
											<Grid item xs={12}>
												<Grid item xs={12} style={{paddingLeft: "15%"}}>
													<RoleLabel id="role">Which is your role?</RoleLabel>
												</Grid>
												<UpdateSelect 
													labelId="role"
													name="role"
													value={this.state.role}
													onChange={this.handleChange}
												>
													<MenuItem value="Project Manager">Project Manager</MenuItem>
													<MenuItem value="Employee">Employee</MenuItem>
												</UpdateSelect>
											</Grid>
											<CenteredContainer item xs={12}>
												<Button 
													style={{width: "60%"}} 
													variant="contained" 
													color="primary"
													type="submit"
													onClick={this.handleSubmit}
												>UPDATE INFO</Button>
											</CenteredContainer>
										</form>	
									</Grid>	
								</>
							}
						</CenteredContainer>		
					</Grid>
					
					{/* Right Menu */}
					<Grid item xs={7}>
						<Grid container>

							{/* Welcome back panel */}
							<ProfileContainer item xs={12}>
								<ContainerTitle>Welcome back!</ContainerTitle>
								<Grid item xs={9}>
									<ContainerText>Have you seen what's happening with your projects today?
															Remember that the key of success is the teamwork. Do not forget
															to finish all your assigned tasks before you sign out or someone 
															will be hated by their teammates from now on.</ContainerText>
								</Grid>
								
							</ProfileContainer>

							{/* Projects panel */}
							<ProfileContainer item xs={12}>
								<ContainerTitle>Projects</ContainerTitle>
								<Grid item xs={9}>
									<ContainerText>Projects, projects and more projects. What would the world be without 
															them? I don't even want to think about it. A project is an individual 
															or collaborative enterprise that is carefully planned to achieve a particular
															aim. You should check the projects in which you are currently involved.</ContainerText>
								</Grid>
								<Grid container>
									<Grid item xs={9}></Grid>
									<Grid item xs={2}>
										<FormattedLink to="/projects">
											<ProjectsButton>GO TO PROJECTS</ProjectsButton>
										</FormattedLink>
									</Grid>
								</Grid>
							</ProfileContainer>
						</Grid>
					</Grid>
				</ProfileBoard>
            </BackgroundContainer>
        )
    }
}

export default Profile;