import React from 'react';
import { Grid, Button, Tooltip, Typography } from '@material-ui/core';
import Logo from 'images/forkie.png';
import { Link } from 'react-router-dom';
import home_background from 'images/home_background.jpg';
import { styled } from '@material-ui/core/styles';

// Styled components
const BackgroundImageContainer = styled(Grid)({
    width: "104%",
    height: "104vh",
    backgroundImage: `url(${home_background})`,
    backgroundPosition: "center"
});

const TopPanel = styled(Grid)({
    marginTop: '1rem'
});

const HomeContainer = styled(Grid)({
    marginTop: '12rem'
});

const Title = styled(Typography)({
    fontSize: "3rem",
    fontFamily: "Arial",
    fontWeight: "bold",
    marginBottom: "0rem"
});

const Description = styled(Typography)({
    fontSize: "1.3rem",
    color: "#5e5e5e",
    fontFamily: "Verdana"
});

const FormattedLink = styled(Link)({
    textDecoration: "none"
})

const LoginTooltip = styled(Tooltip)({
    width: "10%",
    height: "2.7rem",
    fontSize: "0.8rem",
})

const SignUpButton = styled(Button)({
    width: "100%",
    marginTop: "1rem",
    background: '#ff6b6b',
    border: 0,
    borderRadius: "100px",
    color: 'white',
    height: 53,
    padding: '0 30px',
    '&:hover': {
        backgroundColor: '#c24f4f'
    }
});

const TopSignUpButton = styled(Button)({
    width: "90%",
    background: '#ff6b6b',
    border: 0,
    borderRadius: "100px",
    color: 'white',
    height: "2.7rem",
    fontSize: "0.8rem",
    padding: '0 30px',
    '&:hover': {
        backgroundColor: '#c24f4f'
    }
});

// Home Component
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
                <BackgroundImageContainer container spacing={10}>
                    
                    {/* Empty space at the left */}
                    <Grid item xs={1}></Grid>

                    {/* Brand container */}
                    <Grid item xs={6}>

                        {/* Top Panel: Logo */}
                        <TopPanel item xs={3}>
                            <img alt="logo" width="100%" src={Logo}></img>
                        </TopPanel>

                        {/* Slogan and description */}
                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <HomeContainer item xs={7}>
                                <Title>Smart Communication, Smart Brands</Title>
                                <Description>Forkie is an incredible easy, flexible, visual and free solution 
                                                                    to manage your projects and organize all their elements in a single 
                                                                    place. Millions of people around the world trust in us.</Description>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <FormattedLink to='/signup'>
                                            <SignUpButton><strong>Get Started</strong></SignUpButton>
                                        </FormattedLink>
                                    </Grid>
                                </Grid>
                            </HomeContainer>
                        </Grid>
                    </Grid>

                    {/* Empty space */}
                    <Grid item xs={1}></Grid>

                    {/* Top Panel: Login and Sing up buttons */}
                    <TopPanel item xs={3}>
                        <Grid container>

                            {/* Login button */}
                            <Grid item xs={2}></Grid>
                            <Grid item xs={4}>
                                <FormattedLink to="/login">
                                    <LoginTooltip title=''>
                                        <Button><strong>LOGIN</strong></Button>
                                    </LoginTooltip>
                                </FormattedLink>
                            </Grid>
                        
                            {/* Sign up button */}
                            <Grid item xs={6}>
                                <FormattedLink to="/signup">
                                    <TopSignUpButton><strong>GET STARTED</strong></TopSignUpButton>
                                </FormattedLink>
                            </Grid>
                        </Grid>                    
                    </TopPanel>
                </BackgroundImageContainer>
            </>
        )
    }
}

export default Home;