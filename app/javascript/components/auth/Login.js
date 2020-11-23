import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import Logo from 'images/forkie.png';
import axios from 'axios';
import { styles, SubmitButton } from './styles'

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      login_errors: ''
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

  handleSubmit(event) {
    event.preventDefault();

    const new_session = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    }
    
    axios
      .post("http://localhost:3000/api/v1/sessions", new_session, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in === true) {
          this.handleSuccessfulAuth(response.data); 
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/projects");
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
                style={styles.textField} 
                name="email" 
                label="Enter your email" 
                onChange={this.handleChange}
                variant="outlined"/>
            </Grid>
            <Grid item xs={6}>
              <TextField 
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
            <a style={styles.signupText} href="">Don't have an account? Register here</a>
          </Grid>
          
        </Grid>
      </Grid>    
      </>
    );
  }
}

export default Login;
