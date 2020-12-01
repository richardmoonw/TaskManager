import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import Logo from 'images/forkie.png';
import axios from 'axios';
import background from 'images/background.jpg';
import { styled } from '@material-ui/core/styles';
import { URL } from '../GlobalVariables';

// Styled Components
const SubmitButton = styled(Button)({
	width: "100%",
	background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	border: 0,
	borderRadius: 3,
	boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	color: 'white',
	height: 48,
	padding: '0 30px'
});

const BackgroundContainer = styled(Grid)({
	width: "100%",
	height: "104vh",
	backgroundImage: `url("${background}")`,
	backgroundPosition: "center",
	backgroundSize: "cover"
});

const FormContainer = styled(Grid)({
	marginTop: "15rem"
});

const Title = styled(Typography)({
	fontSize: "1.5rem",
	margin: "1.5rem 0 1rem 0",
	fontFamily: "Verdana"
});

const InputText = styled(TextField)({
	width: "100%",
	marginBottom: "1.2rem"
});

const SignUpText = styled(Typography)({
	color: "black",
	fontFamily: "Arial",
	textDecoration: "none",
	paddingBottom: "0.25rem",
	borderBottom: "0.005rem dotted lightgray"
});

const ForgottenContainer = styled(Grid)({
	marginTop: "3rem"
});

const ForgottenText = styled(Typography)({
	color: "#a1a1a1",
	fontFamily: "Arial",
	textDecoration: "none"
});

const FormattedLink = styled(Link)({
	textDecoration: "none"
});

const SignUpContainer = styled(Grid)({
	marginTop: "0.8rem"
});


// Login Component
class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		email: '',
		password: '',
		not_user_err: false,
		invalid_password_err: false 
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
	}

	componentDidMount() {
		// If the user is already logged in, redirect them to the profile screen.
		if (this.props.loggedInStatus === 'LOGGED_IN') {
			this.props.history.push("/profile")
		}
	}

	componentDidUpdate() {
		// If the user is already logged in, redirect them to the profile screen.
		if (this.props.loggedInStatus === 'LOGGED_IN') {
			this.props.history.push("/profile")
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		const new_session = {
		user: {
			email: this.state.email,
			password: this.state.password
		}
		}
		
		axios
		.post(`${URL}/api/v1/sessions`, new_session, { withCredentials: true })
		.then(response => {
			if (response.data.logged_in === true) {
			this.setState({
				not_user_err: false,
				invalid_password_err: false
			});
			this.handleSuccessfulAuth(response.data.user.id); 
			}
		})
		.catch(error => {
			switch(error.response.status) {
			case 404:
				this.setState({
				not_user_err: true,
				invalid_password_err: false
				});
				break;
			case 422:
				this.setState({
				invalid_password_err: true,
				not_user_err: false
				});
			}
		})
	}

	// Function used to update a given state value, everytime its TextField has been modified.
	handleChange(event) {
		this.setState({
		[event.target.name]: event.target.value
		})
	}

	handleSuccessfulAuth(user_id) {
		this.props.handleLogin(user_id);
		this.props.history.push("/profile");
	}


	render () {
		return (
		<>
			{/* Container for the whole page */}
			<Grid container spacing={10}>

				{/* Left panel (background image) */}
				<BackgroundContainer item xs={5}></BackgroundContainer>

				{/* Right panel (logo and login form) */}
				<FormContainer item xs={7}>

					{/* Logo */}
					<Grid item xs={4}>
						<FormattedLink to="/">
							<img alt="logo" width="100%" src={Logo}/>
						</FormattedLink>	
					</Grid>
					<Grid item xs={12}>
						<Title>Sign into your account</Title> 
					</Grid> 

					{/* Login form */}
					<form onSubmit={this.handleSubmit} noValidate autoComplete="off">
						<Grid item xs={6}>
						<InputText
							error={this.state.not_user_err}
							helperText={this.state.not_user_err && "This email does not have any linked account"}
							name="email" 
							label="Enter your email" 
							onChange={this.handleChange}
							variant="outlined"/>
						</Grid>
						<Grid item xs={6}>
						<InputText 
							error={this.state.invalid_password_err}
							helperText={this.state.invalid_password_err && "Wrong password"}
							name="password" 
							type="password" 
							label="Enter your password" 
							onChange={this.handleChange}
							variant="outlined"/>
						</Grid>
						<Grid item xs={6}>
						<SubmitButton type='submit'><strong>LOG IN</strong></SubmitButton>
						</Grid>
					</form>

					<ForgottenContainer item xs={12}>
						<ForgottenText>Forgot your password?</ForgottenText>
					</ForgottenContainer>
					<SignUpContainer item xs={12}>
						<FormattedLink to="/signup">
							<SignUpText><strong>Don't have an account? Register here</strong></SignUpText>
						</FormattedLink>
					</SignUpContainer>
				
				</FormContainer>
			</Grid>    
		</>
		);
	}
}

export default Login;
