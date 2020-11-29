import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, TextField } from '@material-ui/core';
import Logo from 'images/forkie.png';
import axios from 'axios';
import { styles, SubmitButton } from './styles'
import { URL } from '../GlobalVariables';

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
          this.handleSuccessfulAuth(response.data); 
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

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/profile");
  }


  render () {
    return (
      <>
      {/* Container for the whole page */}
      <Grid container spacing={10}>

        {/* Left panel (background image) */}
        <Grid item xs={5} style={styles.backgroundImg}></Grid>

        {/* Right panel (logo and login form) */}
        <Grid item xs={7} style={styles.formContainer}>

          {/* Logo */}
          <Grid item xs={4}>
            <img alt="logo" width="100%" src={Logo}/>
          </Grid>
          <Grid item xs={12}>
            <p style={styles.title}>Sign into your account</p> 
          </Grid> 

          {/* Login form */}
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Grid item xs={6}>
              <TextField 
                error={this.state.not_user_err}
                helperText={this.state.not_user_err && "This email does not have any linked account"}
                style={styles.textField} 
                name="email" 
                label="Enter your email" 
                onChange={this.handleChange}
                variant="outlined"/>
            </Grid>
            <Grid item xs={6}>
              <TextField 
                error={this.state.invalid_password_err}
                helperText={this.state.invalid_password_err && "Wrong password"}
                style={styles.textField} 
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

          <Grid style={styles.forgottenContainer} item xs={12}>
            <a style={styles.forgottenText} href="">Forgot your password?</a>
          </Grid>
          <Grid style={styles.signupContainer} item xs={12}>
            <Link to="/signup" style={styles.link}>
              <span style={styles.accountText}><strong>Don't have an account? Register here</strong></span>
            </Link>
          </Grid>
          
        </Grid>
      </Grid>    
      </>
    );
  }
}

export default Login;
