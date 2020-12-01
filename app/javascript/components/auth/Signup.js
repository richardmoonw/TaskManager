import React from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import Logo from 'images/forkie.png';
import background from 'images/background.jpg';
import { styled } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// Authentication Styled Components
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
	marginTop: "13rem"
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

const LogContainer = styled(Grid)({
    marginTop: "3rem"
});

const LoginText = styled(Typography)({
	color: "black",
	fontFamily: "Arial",
	textDecoration: "none",
	paddingBottom: "0.25rem",
	borderBottom: "0.005rem dotted lightgray"
});

const FormattedLink = styled(Link)({
	textDecoration: "none"
});

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            email_invalid: false,
            password_invalid: false,
            email_err: "",
            password_err: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
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

    // Function used to handle the request to sign up.
    async handleSubmit(event) {
        event.preventDefault();
        
        // Wait until both validations have finished
        await this.validateEmail();
        await this.validatePassword();

        // If email and passwords are valid
        if (this.state.email_invalid === false && 
            this.state.password_invalid === false){
            const new_user = {
                user: {
                    email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.password_confirmation
                }
            }

            axios
                .post(`/api/v1/registrations`, new_user, { withCredentials: true })
                .then(response => {
                    if (response.data.status === 'created') {
                        let user_data = response.data
                        let new_employee = {
                            name: "",
                            role: "",
                            user_id: user_data.user.id
                        }
                        axios
                            .post(`${URL}/api/v1/employees`, new_employee, { withCredentials: true })
                            .then(response => {
                                this.handleSuccessfulAuth(user_data.user.id);
                            })
                            .catch(error => {
                                switch(error.response.status) {
                                    case 400:
                                        console.log("There was an error with your request");
                                }
                            })
                    }
                })
                .catch(error => {
                    this.setState({
                        email_invalid: true,
                        email_err: "The email you entered is already in use",
                        password_invalid: false,
                        password_err: ""
                    });
                });
        }
    };

    // Function used to update a given state value, everytime its TextField has been modified.
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSuccessfulAuth(user_id) {
        this.props.handleLogin(user_id);
        this.props.history.push("/profile");
    }

    // Function used to validate if the email entered has a correct format.
    async validateEmail() {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(this.state.email)) {
            this.setState({
                email_invalid: false,
                email_err: ""
            })
        }
        else {
            this.setState({
                email_invalid: true,
                email_err: "Please enter a valid email"
            })
        }
    }  


    // Function used to validate if both passwords match and if they include both lower and
    // upper case characters, include at least one number and are at least 9 characters long.
    async validatePassword() {
        if(this.state.password != this.state.password_confirmation) {
            this.setState({
                password_invalid: true,
                password_err: "The passwords do not match"
            })
        } else {
            if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(this.state.password)) {
                this.setState({
                    password_invalid: false,
                    password_err: ""
                })
            } else {
                this.setState({
                    password_invalid: true,
                    password_err: "Your password needs to include both lower and upper case characters, \
                                    include at least one number and be at least 8 characters long"
                })
            }
        }
    }

    render() {
        return(
            <>
                {/* Container for the whole page */}
                <Grid container spacing={10}>

                    {/* Left panel (background image) */}
                    <BackgroundContainer item xs={5}></BackgroundContainer> 

                    {/* Right panel (sign up form) */}
                    <FormContainer item xs={7}>

                        {/* Logo */}
                        <Grid item xs={4}>
                            <FormattedLink to="/">
                                <img alt="logo" width="100%" src={Logo}/>
                            </FormattedLink>
                        </Grid>
                        <Grid item xs={12}>
                            <Title>Create a new account</Title> 
                        </Grid> 

                        {/* Sign up form */}
                        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                            <Grid item xs={6}>
                                <InputText
                                    error={this.state.email_invalid}
                                    helperText={this.state.email_invalid && this.state.email_err}
                                    name="email"
                                    label="Enter your email" 
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    error={this.state.password_invalid}
                                    helperText={this.state.password_invalid && this.state.password_err}
                                    name="password"
                                    type="password" 
                                    label="Enter your password" 
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    error={this.state.password_invalid}
                                    helperText={this.state.password_invalid && this.state.password_err}
                                    name="password_confirmation"
                                    type="password" 
                                    label="Repeat your password" 
                                    variant="outlined"
                                    value={this.state.password_confirmation}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SubmitButton type='submit'><strong>SIGN UP</strong></SubmitButton>
                            </Grid>
                        </form>

                        <LogContainer item xs={12}>
                            <FormattedLink to="/login">
                                <LoginText><strong>Do you already have an account? Log in here</strong></LoginText>
                            </FormattedLink>
                        </LogContainer>
                    </FormContainer>
                </Grid>
            </>
        );
    }
}

export default SignUp;