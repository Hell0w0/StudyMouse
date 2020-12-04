/*
const SidebarView=({moveHome,moveCourses,moveBooks, logOut})=>
<div>
<span onClick={()=>moveHome()}><img src="icon.png" width="80"></img></span>
  <div class="sidebarBtn">
  <button onClick={()=>moveHome()}>Home</button>
  </div>
  <div class="sidebarBtn">
  <button onClick={()=>moveCourses()}>Courses</button>
  </div>
  <div class="sidebarBtn">
  <button onClick={()=>moveBooks()}>All books</button>
  </div>
  <div class="sidebarBtn">
  <button onClick={()=>logOut()}>log out</button>
  </div>
</div>
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {sidebarWidth} from './../layoutVars.js';


const useStyles = makeStyles((theme) => ({

    root: {
      display: 'flex',

      width: '100%',
      maxWidth: sidebarWidth,
      backgroundColor: theme.palette.background.paper,
    },
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sidebarWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export const SidebarView=({moveHome,moveCourses,moveBooks, currentIndex,logOut})=> {
  const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(currentIndex);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };

    return (
      <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0), moveHome}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1),moveCourses}
          >
            <ListItemText primary="Courses" />
          </ListItem>
        </List>
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2), moveBooks}
          >
            <ListItemText primary="Books" />
          </ListItem>
          <Divider />

          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3), logOut}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        </Drawer>

      </div>
    );
  }
