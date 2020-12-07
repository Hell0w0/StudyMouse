
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {drawerWidth} from './../layoutVars.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  small:{
    fullWidth: false,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

}));

export const SidebarDeadlinesView=({noCourses,today,courses,courseType,type,onType,onRemove,onDate,onCourseType,deadlines,onCreate,onName,invalidName,invalidDate})=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  function handleClose(){setOpen(false)}
  function handleClickOpen(){setOpen(true)}
  function handleCloseAdd(){setOpen(false);onCreate()}
  return (
    <div className={classes.root}>
      <CssBaseline />

        {/*Header*/}

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Deadlines
          </Typography>

            {/*New Deadline Button/Window*/}

        </Toolbar>
      </AppBar>

        {/*Sidebar, Displays deadlines*/}

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >

        <div className={classes.toolbar} />
        <Button onClick={handleClickOpen} variant="outlined" disabled={noCourses}>Add deadline</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">New deadline</DialogTitle>
              <DialogContent>
              <InputLabel shrink id="name">
                Name
              </InputLabel>
                <TextField
                  onChange={(event)=>onName(event.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  type="text"
                  fullWidth
                />
                <InputLabel shrink id="date">
                  Date
                </InputLabel>
                <TextField
                  onChange={(event)=>onDate(event.target.value)}
                  autoFocus
                  placeholder="yyyy-mm-dd"
                  margin="dense"
                  min={today}
                  id="date"
                  type="date"
                  fullWidth
                />
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
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCloseAdd} disabled={invalidName||invalidDate} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
        <Divider />
        <div>
        Filter:
        <span> </span>
        <Select
          labelId="select"
          id="select"
          value={type}
          onChange={(event)=>{onType(event.target.value)}}
        >
        <MenuItem key="All" value="All" align="center">All</MenuItem>
        {courses.map((option) => (
          <MenuItem key={option} value={option} align="center">
            {option}
          </MenuItem>
        ))}
        </Select>
        </div>
        <TableContainer component={Paper}>
         <Table aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>Course</TableCell>
               <TableCell align="right">Name</TableCell>
               <TableCell align="right">Deadline</TableCell>
               <TableCell> </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {deadlines.map((row) => (
               <TableRow key={row}>
               <TableCell component="th" scope="row">
                 {row[0]}
               </TableCell>
                 <TableCell component="th" scope="row">
                   {row[1]}
                 </TableCell>
                 <TableCell component="th" scope="row">
                  {row[2]}
                 </TableCell>
                 <TableCell>
                 <Button onClick={()=>{onRemove(row)}} className={classes.small}>
                   <DeleteIcon className={classes.icon} />
                 </Button>
                 </TableCell>
               </TableRow>
          ))}
           </TableBody>
         </Table>
        </TableContainer>
      </Drawer>
    </div>
  );
}
