import React from 'react';
import { Paper, Tabs, Tab, Grid, TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import { styles, ProjectsButton } from './styles';
import Logo from 'images/forkie.png';
import Profile from 'images/profile.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountTree from '@material-ui/icons/AccountTree';

class Profile extends React.Component {

	constructor(props) {
		super(props);

		this.state ={
			editProfile: false,
			email: "A01561680@itesm.mx",
			name: "Ricardo Luna",
			role: "Project Manager"
		}		

		this.updateInfo = this.updateInfo.bind(this)
		this.enableEditing = this.enableEditing.bind(this)
		this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount() {
        console.log(this.props.loggedInStatus)
        // If the user is already logged in, redirect them to the profile screen.
        if (this.props.loggedInStatus === 'NOT_LOGGED_IN') {
            this.props.history.push("/");
        }
    }

    componentDidUpdate() {
        // If the user is already logged in, redirect them to the profile screen.
        if (this.props.loggedInStatus === 'NOT_LOGGED_IN') {
            this.props.history.push("/");
        }
    }

	updateInfo(event) {
		event.preventDefault();
		this.setState({
			editProfile: !this.state.editProfile
		})
	}

	enableEditing() {
		this.setState({
			editProfile: !this.state.editProfile
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

    render() {
        return(
            <div style={styles.background}>
                {/* Container for the top menu */}
                <Grid container spacing={5} style={styles.navPanel}>
                  
					{/* Empty space at the left */}
					<Grid item xs={1}></Grid>

					{/* Brand container */}
					<Grid item xs={11}>

						{/* Top Panel: Logo */}
						<Grid container style={styles.topPanel}>
							<Grid item xs={1}>
								<img alt="logo" width="100%" src={Logo}></img>
							</Grid>
							<Grid item xs={7}></Grid>
							<Grid item xs={3} style={styles.contentCentered}>
								<ProjectsButton
									variant="contained"
									color="primary"
									startIcon={<AccountTree />}
									style={styles.navbarButtons}
								>
									Projects
								</ProjectsButton>
								<Button
									variant="contained"
									color="secondary"
									startIcon={<ExitToAppIcon />}
									style={styles.navbarButtons}
								>
									Sign out
								</Button>
							</Grid>
						</Grid>
						

						<Grid container>
							<Paper style={styles.tabPanel}>
								<Tabs  
								value={0}
								indicatorColor="secondary"
								centered
								>
									<Tab label="Admin"/>
									<Tab label="Analytics" disabled />
									<Tab label="Recent activity" disabled />
								</Tabs>
							</Paper> 
						</Grid>
					</Grid>
                </Grid>

				{/* Page Content */}
				<Grid container spacing={10} style={styles.profileBoard}>
					<Grid item xs={1}></Grid>

					{/* Left Menu */}
					<Grid item xs={3}>
						<Grid container style={styles.contentCentered}>

							{/* Profile Photo */}
							<Grid item xs={12}>
								<img alt="Forkie" width="70%" src={Profile} style={styles.profilePhoto}/>
							</Grid>

							{/* The information is not being edited */}
							{ !this.state.editProfile && 
								<>
									<Grid item xs={12}>
										<p style={styles.profileName}>{this.state.name}</p>
									</Grid>
									<Grid item xs={12}>
										<p style={styles.profileRole}>{this.state.role}</p>
									</Grid>
									<Grid item xs={12}>
										<p style={styles.profileEmail}><strong>{this.state.email}</strong></p>
									</Grid>
									<Grid item xs={12} style={styles.contentCentered}>
										<Button 
											style={{width: "60%"}} 
											variant="contained" 
											color="secondary"
											onClick={this.enableEditing}
										>EDIT INFO</Button>
									</Grid>
								</>
							}

							{/* The information is being edited */}
							{ this.state.editProfile &&
								<>
									<Grid item xs={12}>
										<Grid item xs={12}>
											<p style={styles.updateTitle}>Update your information</p>
										</Grid>
										<form onSubmit={this.updateInfo} noValidate autoComplete="off">
											<Grid item xs={12}>
												<TextField 
													name="name"
													onChange={this.handleChange} 
													label="Enter your name"
													value={this.state.name}
													style={styles.updateFormElement}
												/>
											</Grid>
											<Grid item xs={12}>
												<Grid item xs={12} style={{paddingLeft: "15%"}}>
													<InputLabel style={styles.roleLabel} id="role">Which is your role?</InputLabel>
												</Grid>
												<Select 
													labelId="role"
													name="role"
													value={this.state.role}
													onChange={this.handleChange}
													style={styles.updateFormElement}
												>
													<MenuItem value="Project Manager">Project Manager</MenuItem>
													<MenuItem value="Employee">Employee</MenuItem>
												</Select>
											</Grid>
											<Grid item xs={12} style={styles.contentCentered}>
												<Button 
													style={{width: "60%"}} 
													variant="contained" 
													color="primary"
													type="submit"
												>UPDATE INFO</Button>
											</Grid>
										</form>	
									</Grid>	
								</>
							}
						</Grid>		
					</Grid>
					
					{/* Right Menu */}
					<Grid item xs={7}>
						<Grid container>

							{/* Welcome back panel */}
							<Grid item xs={12} style={styles.profileContainer}>
								<p style={styles.profileTitle}>Welcome back!</p>
								<Grid item xs={9}>
									<p style={styles.profileText}>Have you seen what's happening with your projects today?
															Remember that the key of success is the teamwork. Do not forget
															to finish all your assigned tasks before you sign out or someone 
															will be hated by their teammates from now on.</p>
								</Grid>
								
							</Grid>

							{/* Projects panel */}
							<Grid item xs={12} style={styles.profileContainer}>
								<p style={styles.profileTitle}>Projects</p>
								<Grid item xs={9}>
									<p style={styles.profileText}>Projects, projects and more projects. What would the world be without 
															them? I don't even want to think about it. A project is an individual 
															or collaborative enterprise that is carefully planned to achieve a particular
															aim. You should check the projects in which you are currently involved.</p>
								</Grid>
								<Grid container>
									<Grid item xs={9}></Grid>
									<Grid item xs={2}>
										<ProjectsButton>GO TO PROJECTS</ProjectsButton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
            </div>
        )
    }
}

export default Profile;