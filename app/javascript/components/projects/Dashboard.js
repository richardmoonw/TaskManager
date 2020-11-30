import React from 'react';
import './App.css'
import ButtonAppBar from './appBar'
import Projects from './projects'
import { makeStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Forkie
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  app:{
    textAlign: "center"
  }
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <ButtonAppBar/>
      <Projects/>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
}

export default Dashboard;
