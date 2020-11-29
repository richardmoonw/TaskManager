import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { styles, SignUpButton, TopSignUpButton, LoginTooltip } from './styles';
import Logo from 'images/forkie.png';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        return(
            <>
                {/* Container for the whole page */}
                <Grid container spacing={10} style={styles.backgroundImg}>
                    
                    {/* Empty space at the left */}
                    <Grid item xs={1}></Grid>

                    {/* Brand container */}
                    <Grid item xs={6}>

                    {/* Top Panel: Logo */}
                    <Grid item xs={3} style={styles.topPanel}>
                        <img alt="logo" width="100%" src={Logo}></img>
                    </Grid>

                    {/* Slogan and description */}
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={7} style={styles.homeContainer}>
                        <p style={styles.title}>Smart Communication, Smart Brands</p>
                        <p style={styles.homeDescription}>Forkie is an incredible easy, flexible, visual and free solution 
                                                            to manage your projects and organize all their elements in a single 
                                                            place. Millions of people around the world trust in us.</p>
                        <Grid container>
                            <Grid item xs={5}>
                                <Link to='/signup' style={styles.link}>
                                    <SignUpButton><strong>Get Started</strong></SignUpButton>
                                </Link>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>

                    {/* Empty space */}
                    <Grid item xs={1}></Grid>

                    {/* Top Panel: Login and Sing up buttons */}
                    <Grid item xs={3} style={styles.topPanel}>
                    <Grid container>

                        {/* Login button */}
                        <Grid item xs={2}></Grid>
                        <Grid item xs={5}>
                            <Link to="/login" style={styles.link}>
                                <LoginTooltip title=''>
                                    <Button><strong>LOGIN</strong></Button>
                                </LoginTooltip>
                            </Link>
                        </Grid>
                    
                        {/* Sign up button */}
                        <Grid item xs={5}>
                            <Link to="/signup" style={styles.link}>
                                <TopSignUpButton><strong>GET STARTED</strong></TopSignUpButton>
                            </Link>
                        </Grid>
                    </Grid>
                    
                    
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default Home;