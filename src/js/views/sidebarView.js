import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {sidebarWidth} from './../layoutVars.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sidebarWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const SidebarView=({moveCourses,username,userimage,currentIndex,logOut, moveHome,canvasCourses})=> {
  const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(currentIndex);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };

    return (
      <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List component="nav" aria-label="main mailbox folders">
        <ListItem>
        <ListItemAvatar align="center">
        <Avatar src={userimage} sizes="small" align="center"/>
        </ListItemAvatar>
        </ListItem>
        <ListItem button
        onClick={(event) =>{ handleListItemClick(event, 0); moveHome()}}
        selected={selectedIndex === 0}>
        <ListItemText primary={username} />
        </ListItem>
        <Divider/>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) =>{ handleListItemClick(event, 1); moveCourses()}}
          >
            <ListItemText primary="Courses" />
          </ListItem>
          <Divider />
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => {handleListItemClick(event, 3); canvasCourses()}}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) =>{ handleListItemClick(event, 4); logOut()}}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        </Drawer>

      </div>
    );
  }
