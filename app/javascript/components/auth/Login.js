import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Logo from 'images/forkie.png';
import background from 'images/background.jpg'
import axios from 'axios';

const LoginButton = styled(Button)({
  width: "100%",
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px'
});

const styles = {
  backgroundImg: {
    width: "100%",
    height: "104vh",
    backgroundImage: `url("${background}")`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  },

  loginContainer: {
    marginTop: "13rem"
  },

  title: {
    fontSize: "1.5rem",
    fontFamily: "Verdana"
  },

  textField: {
    width: "100%",
    marginBottom: "1.2rem"
  },

  forgottenContainer: {
    marginTop: "3rem",
  },

  forgottenText: {
    color: "#a1a1a1",
    textDecoration: "none"
  },

  signupContainer: {
    marginTop: "0.8rem"
  },

  signupText: {
    color: "black",
    textDecoration: "none",
    paddingBottom: "0.25rem",
    borderBottom: "0.005rem dotted lightgray"
  }
}

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
          this.props.handleSuccessfulAuth(response.data); 
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


  render () {
    return (
      <>
      {/* Container for the whole page */}
      <Grid container spacing={10}>

        {/* Left panel (background image) */}
        <Grid item xs={5} style={styles.backgroundImg}></Grid>

        {/* Right panel (logo and login form) */}
        <Grid item xs={7} style={styles.loginContainer}>

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
              <LoginButton type='submit'><strong>LOG IN</strong></LoginButton>
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
