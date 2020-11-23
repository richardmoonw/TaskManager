import { Button } from '@material-ui/core';
import background from 'images/background.jpg';
import { styled } from '@material-ui/core/styles';

const styles = {
    backgroundImg: {
        width: "100%",
        height: "104vh",
        backgroundImage: `url("${background}")`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    },

    formContainer: {
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
  

export {
    styles,
    SubmitButton
};