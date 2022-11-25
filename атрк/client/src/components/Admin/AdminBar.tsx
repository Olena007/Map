import * as React from 'react';
import { styled, useTheme} from '@mui/material/styles';
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
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './AdminBar.css';
import { AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

const drawerWidth = 310;

function func() : string {	
  let str = window.location.href = "/";

  const logout = () => {
    fetch('http://localhost:7229/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
  }
  logout(); 

  
  return str;
}

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


export default function AdminBar(props: { menu: any, name: string, setName: (name: string) => void, setTrans: (trans: boolean) => void, setTimetbl: (time: boolean) => void, setLines: (lines: boolean) => void, setStations: (stations: boolean) => void,setIntervals: (intervals: boolean) => void,setPeriods: (periods: boolean) => void,setPrice: (price: boolean) => void }){

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    fetch('http://localhost:7229/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
}
    function TransOnClick(){
        props.setTrans(true);
        props.setIntervals(false);
        props.setLines(false);
        props.setPeriods(false);
        props.setPrice(false);
        props.setStations(false);
        props.setTimetbl(false);
    }

    function TimetblOnClick(){
        props.setTrans(false);
        props.setIntervals(false);
        props.setLines(false);
        props.setPeriods(false);
        props.setPrice(false);
        props.setStations(false);
        props.setTimetbl(true);
    }

    function LinesOnClick(){
        props.setTrans(false);
        props.setIntervals(false);
        props.setLines(true);
        props.setPeriods(false);
        props.setPrice(false);
        props.setStations(false);
        props.setTimetbl(false);
    }

    function StationsOnClick(){
        props.setTrans(false);
        props.setIntervals(false);
        props.setLines(false);
        props.setPeriods(false);
        props.setPrice(false);
        props.setStations(true);
        props.setTimetbl(false);
    }

    function IntervalsOnClick(){
        props.setTrans(false);
        props.setIntervals(true);
        props.setLines(false);
        props.setPeriods(false);
        props.setPrice(false);
        props.setStations(false);
        props.setTimetbl(false);
    }

    function PeriodsOnClick(){
        props.setTrans(false);
        props.setIntervals(false);
        props.setLines(false);
        props.setPeriods(true);
        props.setPrice(false);
        props.setStations(false);
        props.setTimetbl(false);
    }

    function PriceOnClick(){
        props.setTrans(false);
        props.setIntervals(false);
        props.setLines(false);
        props.setPeriods(false);
        props.setPrice(true);
        props.setStations(false);
        props.setTimetbl(false);
    }
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    return(
      <Box className="box">
      <CssBaseline />
     
          <AppBar position="fixed" open={open} className='header'>
            <div className='body-map-header'>
              <div className='body-map'>
                <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" noWrap component="div">
                Mappy
              </Typography>
            </Toolbar>
              </div>
              <div className='search'>

              </div>
            <div className="body-auth">
            {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                <MenuItem onClick={() => window.open(func())}>Logout</MenuItem>
              </Menu>
            </div>
          )}
              {/* <Link to="" className="nav-link">{props.name}</Link>
              <Link to="/login" className="nav-link" onClick={logout}>Logout</Link> */}
            </div>
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
        <List>
          <ListItem disablePadding onClick={TransOnClick}>
              <ListItemButton>
                <ListItemIcon>
                  <DirectionsBusIcon />
                </ListItemIcon>
                <ListItemText primary="Transport" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={TimetblOnClick}>
              <ListItemButton>
                <ListItemIcon>
                  <DepartureBoardIcon />
                </ListItemIcon>
                <ListItemText primary="TimeTable" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={LinesOnClick}>
              <ListItemButton>
                <ListItemIcon>
                  <ForkRightIcon />
                </ListItemIcon>
                <ListItemText primary="Lines" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={StationsOnClick}>
              <ListItemButton>
                <ListItemIcon>
                  <TransferWithinAStationIcon />
                </ListItemIcon>
                <ListItemText primary="Stations" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={IntervalsOnClick}>
              <ListItemButton>
                <ListItemIcon>
                  <MoreHorizIcon />
                </ListItemIcon>
                <ListItemText primary="Intervals" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={PeriodsOnClick}>
              <ListItemButton>
                <ListItemIcon>
                  <HourglassEmptyIcon />
                </ListItemIcon>
                <ListItemText primary="Periods" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={PriceOnClick}>
              <ListItemButton>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Price" />
              </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      
      <Main open={open}>
        <DrawerHeader />
        <div className='menu'>
          {props.menu}
        </div>
        
      </Main>
    </Box>
           
        
    );
}