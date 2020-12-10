import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {drawerWidth} from './../layoutVars.js';
import {sidebarWidth} from './../layoutVars.js';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${sidebarWidth}px )`,
      marginLeft: sidebarWidth,
    },
    mainContent:{
      width:`calc(100% - ${drawerWidth}px- ${sidebarWidth}px)`,
      marginLeft: sidebarWidth,
      marginRight:drawerWidth,

    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },

  }));


  export const SettingsView=({handleClose,handleClickOpen,handleCloseAdd,open,updateCourses,updateFavouriteCourses,setDefaultSource,setCustomSource,retrieveCourses,setKey})=> {
    const classes = useStyles();
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.mainContent}>
            <div className={classes.heroContent}>
            <Container maxWidth="sm" align="center">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Settings
              </Typography>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                      Enter Custom API Key
                  </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add new course</DialogTitle>
                    <DialogContent>
                      <TextField
                        onChange={(event)=>setKey(event.target.value)}
                        autoFocus
                        margin="dense"
                        id="Canvas_API_Key"
                        label="Canvas API Key"
                        type="text"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={setDefaultSource} color="primary">
                        Use Default Courses
                      </Button>
                      <Button onClick={setCustomSource} color="primary">
                        Get Custom Courses
                      </Button>

                    </DialogActions>
                  </Dialog>
                  <Button variant="outlined" color="primary" onClick={updateCourses}>
                        Retrieve All Courses
                    </Button>
                  <Button variant="outlined" color="primary" onClick={updateFavouriteCourses}>
                        Retrieve Favourite Courses
                    </Button>
            </Container>
          </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
