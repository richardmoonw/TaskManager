import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import logo from 'images/forkie.png';
import { styles, SubmitButton } from './styles';
import { Link } from 'react-router-dom';

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
        // If the user is already logged in, redirect them to the projects screen.
        if (this.props.loggedInStatus === 'LOGGED_IN') {
            this.props.history.push("/projects")
        }
    }

    componentDidUpdate() {
        // If the user is already logged in, redirect them to the projects screen.
        if (this.props.loggedInStatus === 'LOGGED_IN') {
            this.props.history.push("/projects")
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
                .post("http://localhost:3000/api/v1/registrations", new_user, { withCredentials: true })
                .then(response => {
                    if (response.data.status === 'created') {
                        this.handleSuccessfulAuth(response.data);
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

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/projects");
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
                    <Grid style={styles.backgroundImg} item xs={5}></Grid> 

                    {/* Right panel (sign up form) */}
                    <Grid style={styles.formContainer} item xs={7}>

                        {/* Logo */}
                        <Grid item xs={4}>
                            <img alt="logo" width="100%" src={logo}/>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={styles.title}>Create a new account</p> 
                        </Grid> 

                        {/* Sign up form */}
                        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                            <Grid item xs={6}>
                                <TextField 
                                    error={this.state.email_invalid}
                                    helperText={this.state.email_invalid && this.state.email_err}
                                    style={styles.textField} 
                                    name="email"
                                    label="Enter your email" 
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    error={this.state.password_invalid}
                                    helperText={this.state.password_invalid && this.state.password_err}
                                    style={styles.textField} 
                                    name="password"
                                    type="password" 
                                    label="Enter your password" 
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    error={this.state.password_invalid}
                                    helperText={this.state.password_invalid && this.state.password_err}
                                    style={styles.textField} 
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

                        <Grid style={styles.logContainer} item xs={12}>
                            <Link to="/login" style={styles.link}>
                                <span style={styles.accountText}><strong>Do you already have an account? Log in here</strong></span>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default SignUp;