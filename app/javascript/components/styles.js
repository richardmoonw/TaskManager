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
    }
}

const LoginTooltip = styled(Tooltip)({
    width: "90%",
    height: "2.7rem",
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
});

export {
    styles,
    LoginTooltip,
    SignUpButton,
    TopSignUpButton
};