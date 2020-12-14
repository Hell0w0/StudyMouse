import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
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
import { fade } from '@material-ui/core/styles/colorManipulator';


  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    appBar: {

          width: `calc(100% - ${sidebarWidth}px )`,
          marginLeft: sidebarWidth,
      zIndex: theme.zIndex.drawer + 1,
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


  export const CourseView=({onTextCourse,addCourse,latest,onCreateCourse,courses,remove,invalidNameCourse,goTo})=> {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [toRemove, setRemove] = React.useState(null);
    function handleClose(){setOpen(false)}
    function handleClickOpen(){setOpen(true)}
    function handleCloseAdd(){setOpen(false);onCreateCourse()}
    const [openVarning, setOpenVarning] = React.useState(false);
    function handleCloseVarning(){setOpenVarning(false)}
    function handleVarning(){setOpenVarning(true)}
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Courses
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
        <div className={classes.mainContent}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm" align="center">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Courses
              </Typography>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                      Add Course
                  </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add new course</DialogTitle>
                    <DialogContent>
                      <TextField
                        onChange={(event)=>onTextCourse(event.target.value)}
                        autoFocus
                        error={invalidNameCourse}
                        helperText={invalidNameCourse?'Course already added':''}
                        onKeyPress={(ev) => {
                           if (ev.key === 'Enter' && !invalidNameCourse) {
                               handleCloseAdd()
                               }
                             }}
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleCloseAdd} disabled={invalidNameCourse} color="primary">
                        Add
                      </Button>
                    </DialogActions>
                  </Dialog>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {courses.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card} style={{background:latest===card?fade('#555555', 0.06):"primary"}}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ wordWrap: "break-word" }}>
                        {card}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={(e)=>goTo(card)}>
                        View
                      </Button>
                      <Button size="small" color="primary" onClick={(e)=>{handleVarning();setRemove(card)}}>
                        Remove
                      </Button>
                      <Dialog open={openVarning} onClose={handleCloseVarning} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" color="secondary">Warning!</DialogTitle>
                        <DialogContent>
                        <Typography>
                          If you remove this course, all deadlines and to-do items assosiated with the course will be permanently deleted.
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseVarning} color="primary">
                            Back
                          </Button>
                          <Button onClick={()=>{setOpenVarning(false);remove(toRemove)}} color="secondary">
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
        </main>
      </React.Fragment>
    );
  }
