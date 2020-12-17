import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 0, 6),
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



export const HomeView= ({h,invalidCommentName,courses,courseType,onCourseType,onCreateComment,comments,onTextComment,onCheck,onRemoveComment,nav}) =>{
const classes = useStyles();
const [open, setOpen] = React.useState(false);
function handleClose(){setOpen(false)}
function handleClickOpen(){
  setOpen(true)}
function handleCloseAdd(){setOpen(false);onCreateComment()}
/*Moves checked items to bottom of list.*/
/*To be able to find the checked comments, we need to save the courseName aswell to keep track of what course the comment belongs to.*/
let checked =[];
let unChecked = [];
comments.forEach((elemen,i) => elemen.forEach(comment=>{
    if (comment[1]===false)
      unChecked=[[comment[0],comment[1],courses[i]],...unChecked]
    else
      checked=[[comment[0],comment[1],courses[i]],...checked]
    }))
return (
  <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Home
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.mainContent}>
      <main className={classes.content}>

      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Study Mouse
      </Typography>
      <Typography align="center">
      The best way to keep track of your studies!
      </Typography>
      </main>

      <Container maxWidth="lg" className={classes.container}>
             {/* To-do */}
               <Paper className={classes.paper}>
               <Typography align="center" component="h2"variant="h5" >
               To-do Overview
               </Typography>
               <Table>
               <TableHead>
                 <TableRow>
                 <TableCell>
                 </TableCell>
                  <TableCell>
                    Course
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                  <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                        +
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Add a To-Do</DialogTitle>
                      <DialogContent>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                          Course
                        </InputLabel>
                        <Select
                          value={courseType}
                          labelId="demo-simple-select-placeholder-label-label"
                          id="demo-simple-select-placeholder-label"
                          onChange={(event)=>{onCourseType(event.target.value)}}
                        >
                        {courses.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                        </Select>
                      </FormControl>
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
                 </TableCell>
                </TableRow>
                </TableHead>
               <TableBody>
                   {unChecked.map((value) => {
                     const labelId = `checkbox-list-label-${value}`;
                     return (
                       <TableRow key={value}>
                       <TableCell>
                           <Checkbox
                             edge="start"
                             checked={value[1]}
                             disableRipple
                             onChange={()=>{onCheck(value)}}
                             inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          <TableCell style={{whiteSpace: 'normal',wordBreak: 'break-word'}} >
                            {value[2]}
                          </TableCell>
                          <TableCell style={{whiteSpace: 'normal',wordBreak: 'break-word'}}>
                          {value[0]}
                          </TableCell>
                          <TableCell>
                          <Button onClick={()=>{onRemoveComment(value)}}>
                            <DeleteIcon className={classes.icon} />
                          </Button>
                          </TableCell>
                       </TableRow>
                     );
                   })}
                 {checked.map((value) => {
                   const labelId = `checkbox-list-label-${value}`;
                   return (
                     <TableRow key={value} className={classes.check}>
                     <TableCell>
                         <Checkbox
                           edge="start"
                           checked={value[1]}
                           disableRipple
                           onChange={()=>{onCheck(value)}}
                           inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell>
                          {value[2]}
                        </TableCell>
                        <TableCell>
                        {value[0]}
                        </TableCell>
                        <TableCell>
                        <Button onClick={()=>{onRemoveComment(value)}}>
                          <DeleteIcon className={classes.icon} />
                        </Button>
                        </TableCell>
                     </TableRow>
                   );
                 })}
                   </TableBody>
                   </Table>
               </Paper>
        </Container>
  </div>
</div>
);
}
