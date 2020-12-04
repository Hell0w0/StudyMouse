import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {drawerWidth} from './../layoutVars.js';
import {sidebarWidth} from './../layoutVars.js';

  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px - ${sidebarWidth}px )`,
      marginLeft:sidebarWidth,
    },
    mainContent:{
      width:`calc(100% - ${drawerWidth}px - ${sidebarWidth}px )`,
      marginLeft:sidebarWidth,
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },

  }));

export const HomeView= ({}) =>{
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
      <div className={classes.mainContent}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Study Mouse
            </Typography>
            <Typography align="center">
              The best way to keep track of your studies!
            </Typography>
          </Container>
        </div>
      </div>
      </main>
    </React.Fragment>
  );
}
