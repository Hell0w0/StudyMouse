import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {drawerWidth} from './../layoutVars.js';
import {sidebarWidth} from './../layoutVars.js';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';


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


  export const SettingsView=({updateCourses,updateFavouriteCourses,setDefaultSource,setCustomSource,retrieveCourses,setKey})=> {
    const classes = useStyles();
    const [buttonDisabled,setButtonDisabled]=React.useState(true)
    const [open, setOpen] = React.useState(false);
    function handleClose(){setOpen(false)}
    function handleClickOpen(){setOpen(true)}
    function setCustom(){setOpen(false);setCustomSource()}
    function setDefault(){setOpen(false);setDefaultSource()}
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
              <Typography>
              To access canvas courses you need to activate a custom key from canvas.
              </Typography>
              <Typography component={'span'}>
               <Box fontWeight="fontWeightBold">Go to your canvas site, Account - Settings - New Accesstoken</Box>
              </Typography>
              <Typography>
               Fill out the requested information and enter this token as your custom api key.
              </Typography>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                      Enter Custom API Key
                  </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Get canvas courses</DialogTitle>
                    <DialogContent>
                      <TextField
                        onChange={(event)=>{setKey(event.target.value);event.target.value!==""?setButtonDisabled(false):setButtonDisabled(true)}}
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
                      <Button onClick={setDefault} color="primary">
                        Use Default Courses
                      </Button>
                      <Button onClick={setCustom} disabled={buttonDisabled}color="primary">
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
