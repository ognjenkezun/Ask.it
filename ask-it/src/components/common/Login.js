import React, { useState } from 'react'
import { Dialog, DialogTitle, IconButton, TextField, DialogContent, Button, DialogActions, makeStyles, fade } from '@material-ui/core'
import CloseIcon  from '@material-ui/icons/Close'
import { authenticateUser } from '../../store/actions/user';
import { useDispatch } from 'react-redux';
import { isObjectExists, isValidEmail } from '../../helpers';
import { showFailNotification } from './Toastify';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
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
  }));

export default function Login({show, handleClose, history}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const setInputs = (value, key) => {
        setUserData(state => ({
            ...state,
            [key]: value
        }));
    }
    
    const login = (e) => {
        e.preventDefault();
        dispatch(authenticateUser({
            email: userData.email,
            password: userData.password
        })).then(res => validation(res));
    }
    
    const validation = (res) => {
        if(res && isObjectExists(res.user)){
            history.push("/my-questions")
            handleClose();
            userData.email = "";
            userData.password = "";
        }
        else {
            if(!isValidEmail(userData.email)){
                showFailNotification("Email isn't valid!");
                return;
            }
            showFailNotification("Email or password invalid!");
        }
    }

    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={(e) => login(e)} validate autoComplete="off">
          <DialogTitle id="form-dialog-title">
            Login
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float: "right"}}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
              <TextField fullWidth required value={userData.email} id="email" label="Email" type="email" onChange={(e)=>setInputs(e.target.value, "email")} />
              <TextField fullWidth required value={userData.password} id="password" label="Password" type="password" autoComplete="current-password" onChange={(e)=>setInputs(e.target.value, "password")} />
          </DialogContent>
          <DialogActions>
            <Button fullWidth variant="contained" color="primary" type="submit" style={{margin:15}}>Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    )
}
