
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

export const SidebarView=({moveHome,moveCourses,moveBooks, currentIndex,logOut, canvasCourses})=> {
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
            onClick={(event) => {handleListItemClick(event, 0); moveHome()}}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) =>{ handleListItemClick(event, 1); moveCourses()}}
          >
            <ListItemText primary="Courses" />
          </ListItem>
        </List>
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) =>{ handleListItemClick(event, 2); moveBooks()}}
          >
            <ListItemText primary="Books" />
          </ListItem>
          <Divider />
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3), canvasCourses}
          >
            <ListItemText primary="Sync Canvas" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) =>{ handleListItemClick(event, 4); logOut()}}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        </Drawer>

      </div>
    );
  }
