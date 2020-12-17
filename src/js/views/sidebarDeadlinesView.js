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
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 4,
    width: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  filter:{
    marginLeft:10,
  },
  menu:{
  width: 200,
},
add:{
marginTop: 10,
},
  formControl:{
    minWidth: 120,

  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  cellDeadline:{
    maxWidth: 95,
    wordWrap: 'break-word',
  },
}));

export const SidebarDeadlinesView=({noCourses,today,date,courses,deadlineIndex,latestDeadline,courseType,type,onType,onRemove,onDate,onCourseType,deadlines,onCreate,onName,invalidDeadlineName,invalidDate})=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deadlinesList, setDeadlinesList] = React.useState([]);
  function handleClose(){setOpen(false)}
  function handleClickOpen(){setOpen(true)}
  function handleCloseAdd(){setOpen(false);onCreate()}
  // Getcourseindex return -1 if name == All
   function getCourses() {
     if (deadlineIndex >= 0) return setDeadlinesList(deadlines[deadlineIndex]);
     setDeadlinesList(getAllDeadlines())
   }

  function getAllDeadlines(){
    var list=[];
    // deadlines     [courseName,Name,Date]
    if (deadlines===undefined)
       return []
   deadlines.forEach(elemen => elemen.forEach(ele=>ele.length>0?list.push(ele):list=list));
    if (list.length===0){
      return []
    }
    list.sort(function(a,b){
        if(a[2]<b[2])
          return -1;
        else if(a[2]>b[2])
          return 1;
      })
    return list
  }

  React.useEffect(function(){
     getCourses();
  }, [deadlineIndex,deadlines]);

  return (
    <div className={classes.root}>
      <CssBaseline />

        {/*Header*/}

      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Deadlines
          </Typography>
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
      {/*New Deadline Button/Window*/}

        <div className={classes.toolbar} />

        <div align="center">
        <Button onClick={handleClickOpen} variant="outlined" disabled={noCourses} className={classes.add}>Add deadline</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">New deadline</DialogTitle>
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
                  error={invalidDeadlineName}
                  helperText={invalidDeadlineName?'Empty field':''}
                  onKeyPress={(ev) => {
                            if (ev.key === 'Enter' && !invalidDate && !invalidDeadlineName && today<date) {
                                handleCloseAdd()
                                }
                              }}
                />
                <InputLabel shrink id="date">
                  Date
                </InputLabel>
                <TextField
                  onChange={(event)=>{onDate(event.target.value)}}
                  autoFocus
                  placeholder="yyyy-mm-dd"
                  margin="dense"
                  min={today}
                  id="date"
                  type="date"
                  error={invalidDate||today>date}
                  helperText={invalidDate?'Invalid input':today>date?'Date has passed':''}
                  onKeyPress={(ev) => {
                            if (ev.key === 'Enter' && !invalidDate && !invalidDeadlineName && today<date) {
                                handleCloseAdd()
                                }
                              }}
                  fullWidth
                />

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCloseAdd} disabled={invalidDeadlineName||invalidDate||today>date} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        <div className={classes.filter}>
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
        <Divider />

         <Table >
           <TableHead>
             <TableRow>
               <TableCell>Course</TableCell>
               <TableCell align="right">Name</TableCell>
               <TableCell align="right">Deadline</TableCell>
               <TableCell  className={classes.small}  width={50}> </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {deadlinesList.map((row) => (
               <TableRow key={row}  width={335}style={{background:latestDeadline[0]===row[0]&&latestDeadline[1]===row[1]&&latestDeadline[2]===row[2]?fade('#555555', 0.06):"primary"}}>
               <TableCell component="th" scope="row" className={classes.cellDeadline}>
                 {row[0]}
               </TableCell>
                 <TableCell component="th" scope="row" className={classes.cellDeadline}>
                   {row[1]}
                 </TableCell>
                 <TableCell component="th" scope="row" className={classes.cellDeadline}>
                  {row[2]}
                 </TableCell>
                 <TableCell>
                 <Button onClick={()=>{onRemove(row)}} size="small">
                   <DeleteIcon className={classes.icon} />
                 </Button>
                 </TableCell>
               </TableRow>
          ))}
           </TableBody>
         </Table>
      </Drawer>
    </div>
  );
}
