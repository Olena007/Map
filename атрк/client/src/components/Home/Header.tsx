import { Link, Navigate } from "react-router-dom";

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountCircle } from '@mui/icons-material';

import './Header.css';
import { Avatar, Chip, Menu, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";



const drawerWidth = 310;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));
  
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));



const Header = (props: { name: string, setName: (name: string) => void }) => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [logouted, setLogout] = useState(false);
    const[redirect, setRedirect] = useState(false);
    const [test, setTest] = useState('0');
    const [reload, setReloaded] = useState(false);

   // var filtered = test.filter(x => x !== undefined);
   var arr: Array<any> = [];
    

    function func() {	
        //let str = window.location.href = "/";
      
        const logout = () => {
          fetch('http://localhost:7229/api/logout', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
          });
    
          setLogout(true);
          //setRedirect(true);
        }
         logout();

         setReloaded(true);
    }

    

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:7229/api/client', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
      
                const content = await response.json();
                // console.log("the first test " + test);
      
                setTest(content.email);
                // arr.push(content.email);
                // console.log("the first test " + arr);
            }
        )();
      });

      arr.push(props.name);
var filtered = arr.filter(x => x !== undefined);



      console.log("my test email " + filtered);

    if(redirect){
        return <Navigate to="/"/>;
    }
  
    if(reload){
        window.location.reload();
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const logout = () => {
        fetch('http://localhost:7229/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        props.setName('');
    }

    let menu;
    //let count = 0;

    if (filtered[0] == null || logouted == true) {
        menu = (
            <>
            <div className="body-auth">
                <Link to="/login" className="nav-link">Login</Link>
            </div>
            
            {/* <Link to="/register" className="nav-link">Register</Link> */}
            </>
        )
    } 
    if ( filtered[0] != null) {
        menu = (
           
            <div className="body-auth">
                {auth && (
            <div>
              {/* <Stack direction="row" spacing={1}>
                    <Chip avatar={<Avatar>U</Avatar>} label={props.name}/>
                </Stack> */}
                <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {/* <AccountCircle /> */}
                        <Stack direction="row" spacing={1}>
                    <Chip avatar={<Avatar>U</Avatar>} label={props.name}/>
                </Stack>
                    </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => func()}>Logout</MenuItem>
              </Menu>
            </div>
          )}
                {/* <Stack direction="row" spacing={1}>
                    <Chip avatar={<Avatar>U</Avatar>} label={props.name} onClick={() => func()}/>
                </Stack>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => func()}>Logout</MenuItem>
                </Menu> */}
                {/* {props.name} */}
                {/* <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                    </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => func()}>Logout</MenuItem>
                </Menu>
                </div>      */}
            </div>
                
            
            // <> 
            //     <Link to="" className="nav-link">{props.name}</Link>
            //     <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
            //     <Link to="/register" className="nav-link">Register</Link>
            // </>
        )
    }

    return (
        // <nav className="header-home">
        //     <div className="body-map-home">
        //         <span className="mappy-home">Mappy</span>
        //         <Link to="" className="navbar-brand">Home</Link>
        //         <Link to="/history" className="navbar-brand">History</Link>
        //     </div>
        //     <div className="body-auth-home">
        //         {menu}
        //     </div>
        // </nav>
        <Box className="box">
      <CssBaseline />
     
          <AppBar position="fixed" open={open} className='header'>
            <div className='body-map-header'>
              <div className='body-map'>
                <Toolbar>
              {/* <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h4" noWrap component="div">
                Mappy
              </Typography>
            </Toolbar>
              </div>
              <div className='search'>

              </div>
              {menu}
            {/* <div className="body-auth">
                {menu}
            </div> */}
            </div>
            
          </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <Divider />
      </Drawer>
      
      <Main open={open}>
        <DrawerHeader />
        <div className='menu'>
          {/* {props.menu} */}
        </div>
        
      </Main>
    </Box>
    );
};

export default Header;