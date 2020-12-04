
  import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { fade } from '@material-ui/core/styles/colorManipulator';


import {drawerWidth} from './../layoutVars.js';
import {sidebarWidth} from './../layoutVars.js';
import {commentsWidth} from './../layoutVars.js';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width:`calc(100% - ${drawerWidth}px - ${sidebarWidth}px )`,
    marginLeft:sidebarWidth,
    marginRight:drawerWidth,
  },
  mainContent:{
    width:`calc(100% - ${drawerWidth}px - ${sidebarWidth}px )`,
    marginLeft:sidebarWidth,
    marginRight:drawerWidth,
    marginTop:theme.spacing(4),
  },
  container: {
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
  padding: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
},
check:{
  backgroundColor: fade('#555555', 0.06),

},
}));



export const CourseInfoView= ({h,checked,unChecked,name,onText,onCheck,handleClose,handleCloseAdd,handleClickOpen,open,onRemove,nav}) =>{
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Button onClick={nav}>
          <ArrowBackIosIcon className={classes.icon} />
        </Button>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mainContent}>
        <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
             <Grid container spacing={2}>
               {/* Chart */}
               <Grid item xs={12} md={6} lg={5}>
                 <Paper className={classes.paper}>
                   <Typography>
                   Course site for {name}
                   </Typography>
                 </Paper>
               </Grid>
               {/* Recent Deposits */}
               <Grid item xs={12} md={6} lg={5}>
                 <Paper className={classes.paper}>
                 <List>
                 <ListItem>
                   <ListItemText primary={"To-do"} />
                   <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                         +
                     </Button>
                     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                       <DialogTitle id="form-dialog-title">Add a To-Do</DialogTitle>
                       <DialogContent>
                         <TextField
                           onChange={(event)=>onText(event.target.value)}
                           autoFocus
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
                         <Button onClick={handleCloseAdd} color="primary">
                           Add
                         </Button>
                       </DialogActions>
                     </Dialog>
                 </ListItem>
                 {/*TO-DO*/}
                     {unChecked.map((value) => {
                       const labelId = `checkbox-list-label-${value}`;
                       return (
                         <ListItem key={value} role={undefined}>
                           <ListItemIcon>
                             <Checkbox
                               edge="start"
                               checked={value[1]}
                               disableRipple
                               onChange={()=>{onCheck(value)}}
                               inputProps={{ 'aria-labelledby': labelId }}
                             />
                           </ListItemIcon>
                           <ListItemText id={labelId} primary={value[0]} />
                           <Button onClick={()=>{onRemove(value)}}>
                             <DeleteIcon className={classes.icon} />
                           </Button>
                         </ListItem>
                       );
                     })}
                     {checked.map((value) => {
                       const labelId = `checkbox-list-label-${value}`;
                       return (
                         <ListItem key={value} role={undefined} className={classes.check}>
                           <ListItemIcon>
                             <Checkbox
                               edge="start"
                               checked={value[1]}
                               disableRipple
                               onChange={()=>{onCheck(value)}}
                               inputProps={{ 'aria-labelledby': labelId }}
                             />
                           </ListItemIcon>
                           <ListItemText id={labelId} primary={value[0]} />
                           <Button onClick={()=>{onRemove(value)}}>
                             <DeleteIcon className={classes.icon} />
                           </Button>
                         </ListItem>
                       );
                     })}
                   </List>
                 </Paper>
               </Grid>
             </Grid>
          </Container>
        </main>
    </div>
  </div>
  );
}
