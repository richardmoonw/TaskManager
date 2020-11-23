import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import logo from 'images/forkie.png';
import { styles, SubmitButton } from './styles';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registration_errors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
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
    handleSubmit = (event) => {
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
                console.log("Registration error ", error);
            });

        event.preventDefault();
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
                            <a style={styles.loginText} href=""><strong>Do you already have an account? Log in here</strong></a>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default SignUp;