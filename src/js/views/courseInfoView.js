
  import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
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
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {drawerWidth} from './../layoutVars.js';
import {sidebarWidth} from './../layoutVars.js';


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



export const CourseInfoView= ({h,invalidCommentName,index,deadlinesInfo,onCreateComment,comments,onRemove,currentCourse,onTextComment,onCheck,onRemoveComment,nav}) =>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  function handleClose(){setOpen(false)}
  function handleClickOpen(){setOpen(true)}
  function handleCloseAdd(){setOpen(false);onCreateComment()}
  if (deadlinesInfo===undefined)
    deadlinesInfo=[]
  /*Moves checked items to bottom of list.*/
  let commentsList = comments[index];
  let checked =[];
  let unChecked = [];
  if(commentsList!==undefined){
      commentsList.forEach((ele)=>{
      if (ele[1]===false)
        unChecked.push([ele[0],ele[1],currentCourse])
        else
        checked.push([ele[0],ele[1],currentCourse])
      })}
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Button onClick={nav}>
          <ArrowBackIosIcon className={classes.icon} />
        </Button>
          <Typography variant="h6" noWrap>
            {currentCourse}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mainContent}>
        <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
             <Grid container spacing={2}>
               {/* Name */}
               <Grid item xs={12}>
                 <Paper className={classes.paper}>
                   <Typography align="center">
                   Course site for {currentCourse}
                   </Typography>
                 </Paper>
               </Grid>
               {/* To-do */}
               <Grid item xs={6}>
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
                           onChange={(event)=>onTextComment(event.target.value)}
                           autoFocus
                           margin="dense"
                           id="name"
                           label="Name"
                           type="text"
                           fullWidth
                           error={invalidCommentName}
                           helperText={invalidCommentName?'Name taken':''}
                           onKeyPress={(ev) => {
                              if (ev.key === 'Enter'&& !invalidCommentName) {
                                  handleCloseAdd()
                                  }
                                }}/>

                       </DialogContent>
                       <DialogActions>
                         <Button onClick={handleClose} color="primary">
                           Cancel
                         </Button>
                         <Button onClick={handleCloseAdd} disabled={invalidCommentName}color="primary">
                           Add
                         </Button>
                       </DialogActions>
                     </Dialog>
                 </ListItem>
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
                           <ListItemText primary={value[0]} style={{whiteSpace: 'normal',wordBreak: 'break-word'}} id={labelId} />
                           <Button onClick={()=>{onRemoveComment(value)}}>
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
                           <ListItemText primary={value[0]} style={{whiteSpace: 'normal',wordBreak: 'break-word'}} id={labelId} />
                           <Button onClick={()=>{onRemoveComment(value)}}>
                             <DeleteIcon className={classes.icon} />
                           </Button>
                         </ListItem>
                       );
                     })}
                   </List>
                 </Paper>
               </Grid>
               <Grid item xs={6}>
                 <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell >Name</TableCell>
                        <TableCell >Deadline</TableCell>
                        <TableCell  className={classes.small}> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deadlinesInfo.map((row) => (
                        <TableRow key={row}>
                          <TableCell component="th" scope="row" style={{whiteSpace: 'normal',wordBreak: 'break-word'}} >
                               {row[1]}
                          </TableCell>
                          <TableCell component="th" scope="row" style={{whiteSpace: 'normal',wordBreak: 'break-word'}}>
                           {row[2]}
                          </TableCell>
                          <TableCell  className={classes.small}>
                          <Button onClick={()=>{onRemove(row)}} size="small">
                            <DeleteIcon className={classes.icon}/>
                          </Button>
                          </TableCell>
                        </TableRow>
                   ))}
                    </TableBody>
                  </Table>
                 </TableContainer>
               </Grid>
             </Grid>
          </Container>
        </main>
    </div>
  </div>
  );
}
