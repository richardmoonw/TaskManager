import { Button, Tooltip } from '@material-ui/core';
import home_background from 'images/home_background.jpg';
import { styled } from '@material-ui/core/styles';

const styles = {
    backgroundImg: {
        width: "104%",
        height: "104vh",
        backgroundImage: `url(${home_background})`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat"
    },

    topPanel: {
        marginTop: '1rem'
    },

    homeContainer: {
        marginTop: '12rem'
    },

    title: {
        fontSize: "3rem",
        fontFamily: "Arial",
        fontWeight: "bold",
        marginBottom: "0rem"
    },

    homeDescription: {
        fontSize: "1.3rem",
        color: "#5e5e5e",
        fontFamily: "Verdana"
    },

    link: {
        textDecoration: "none"
    },

    // Profile screen
    navPanel: {
        backgroundColor: 'white'
    },
    
    topPanel: {
        marginTop: '1rem'
    },

    tabPanel: {
        marginTop: '1rem',
        boxShadow: "none"
    },

    background: {
        backgroundColor: '#f5f5f5',
        minHeight: "104vh"
    },

    homeContainer: {
        marginTop: '12rem'
    },

    title: {
        fontSize: "3rem",
        fontFamily: "Arial",
        fontWeight: "bold",
        marginBottom: "0rem"
    },

    homeDescription: {
        fontSize: "1.3rem",
        color: "#5e5e5e",
        fontFamily: "Verdana"
    },

    profileBoard: {
        paddingTop: "3.2rem"
    },

    profilePhoto: {
        borderRadius: "1000px"
    }, 

    contentCentered: {
        textAlign: 'center'
    },

    navbarButtons: {
        width: '40%',
        marginLeft: '1rem'
    },

    profileName: {
        fontSize: '1.7rem',
        fontWeight: 'bold',
        marginTop: '1rem',
        marginBottom: '0px'
    },

    profileRole: {
        fontSize: '1.2rem',
        marginTop: '0.2rem',
        marginBottom: '0.3rem'
    },

    profileEmail: {
        fontSize: '0.7rem',
        marginTop: '0.2rem'
    },

    updateTitle: {
        fontSize: '1.7rem',
        marginTop: "1rem",
        marginBottom: "1rem"
    },

    roleLabel: {
        fontSize: '12px',
        textAlign: 'left'
    },

    updateFormElement: {
        width: "70%",
        marginBottom: "1rem",
        textAlign: "left"
    },

    profileContainer: {
        backgroundColor: "white",
        borderRadius: "0.5rem",
        paddingBottom: "2rem",
        marginBottom: "2rem"
    },


    profileTitle: {
        fontSize: '1.75rem',
        fontFamily: 'Verdana',
        marginLeft: '2rem'
    },

    profileText: {
        fontSize: '1.05rem',
        fontFamily: 'Arial',
        lineHeight: '1.5rem',
        marginLeft: '2rem'
    }
}

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

const ProjectsButton = styled(Button)({
    width: "100%",
    background: "#3bb1d1",
    boxShadow: '2px 2px 5px lightgray',
    color: 'white',
    '&:hover': {
        background: '#0d83a3'
    }
})

export {
    styles,
    LoginTooltip,
    SignUpButton,
    TopSignUpButton,
    ProjectsButton
};