import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import logo from 'images/forkie.png';
import background from 'images/background.jpg';

const SignUpButton = styled(Button)({
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

    logContainer: {
        marginTop: "3rem"
    },

    loginText: {
        color: "black",
        textDecoration: "none",
        paddingBottom: "0.25rem",
        borderBottom: "0.005rem dotted lightgray"
    },

    select: {
        width: "100%",
        marginBottom: "1.2rem"
    }
}

function SignUp(){

    const [ role, setRole ] = useState('');

    const handleRoleChange = (event) => {
        const role = event.target.value;
        setRole(role);
    };

    return (
        <>
            {/* Container for the whole page */}
            <Grid container spacing={10}>

                {/* Left panel (background image) */}
                <Grid style={styles.backgroundImg} item xs={5}></Grid> 

                {/* Right panel (sign up form) */}
                <Grid style={styles.loginContainer} item xs={7}>

                    {/* Logo */}
                    <Grid item xs={4}>
                        <img alt="logo" width="100%" src={logo}/>
                    </Grid>
                    <Grid item xs={12}>
                        <p style={styles.title}>Create a new account</p> 
                    </Grid> 

                    {/* Sign up form */}
                    <form noValidate autoComplete="off">
                        <Grid item xs={6}>
                            <TextField style={styles.textField} id="email" label="Enter your email" variant="outlined"/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField style={styles.textField} id="email" type="password" label="Enter your password" variant="outlined"/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField style={styles.textField} id="email" type="password" label="Repeat your password" variant="outlined"/>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl style={styles.select} >
                                <InputLabel htmlFor="account_type">Which role do you have in your team?</InputLabel>
                                <Select id="account_type" value={role} onChange={handleRoleChange}>
                                    <MenuItem value={"manager"}>Project Manager</MenuItem>
                                    <MenuItem value={"team_member"}>Team Member</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <SignUpButton><strong>SIGN UP</strong></SignUpButton>
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

export default SignUp;