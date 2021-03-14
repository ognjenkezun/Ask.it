import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { Button, Divider } from '@material-ui/core';
import { logoutUser } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Registration from './Registration';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: 10,
    marginRight: 30
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navbarItem: {
    marginLeft: 10,
    marginRight: 10,
    textDecoration: 'none',
    color: 'white'
  }
}));

export default function Navbar(props) {
  const dispatch = useDispatch();

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [token, setToken] = useState('');
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [user]);

  useEffect(() => {
  }, [token]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logout = () => {
    dispatch(logoutUser());
    handleMenuClose();
    props.history.push("/");
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="/my-questions" style={{textDecoration: "none", color: "black"}}>My questions</Link></MenuItem>
      <Divider />
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );


  return (
    <div className={classes.grow} key={token}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Aks.it
          </Typography>
          <Link to="/" className={classes.navbarItem}>Home</Link>
          <div className={classes.grow} />
          <div>
            { token ?
              <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              >
              <AccountCircle />
            </IconButton> 
              :
              <Button className={classes.navbarItem} onClick={() => setOpenLogin(true)}>Login</Button>
            }
            { !token ?
              <Button className={classes.navbarItem} onClick={() => setOpenRegister(true)}>Register </Button> : null
            }
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Login history={props.history} show={openLogin} handleClose={()=>setOpenLogin(false)} />
      <Registration history={props.history} show={openRegister} handleClose={()=>setOpenRegister(false)} />
    </div>
  );
}
