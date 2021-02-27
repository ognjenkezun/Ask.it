import React, { useState } from 'react';
import { Dialog, DialogTitle, IconButton, DialogContent, TextField, DialogActions, Button, makeStyles, fade } from '@material-ui/core'
import CloseIcon  from '@material-ui/icons/Close';
import { sendUser } from '../../store/actions/user';
import { useDispatch } from 'react-redux';
import { showSuccessNotification } from './Toastify';

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
      // vertical padding + font size from searchIcon
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

export default function Registration({show, handleClose, history}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const register = (e) => {
        e.preventDefault();
        dispatch(sendUser({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password
        }));
        showSuccessNotification("User registered successfully.");
        history.push("/");
        handleClose();
    };

    const setInputs = (value, key) => {
        setUserData(state => ({
            ...state,
            [key]: value
        }));
    }

    return (
        <div>
            <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={(e) => register(e)} validate autoComplete="off">
                    <DialogTitle id="form-dialog-title">
                        Register
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{float: "right"}}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        {/* <FormLabel>First name</FormLabel> */}
                        {/* <TextField fullWidth value={userData.firstName} id="first-name" label="First name" type="text" onChange={(e)=>setUserData(e.target.value)} /> */}
                        <TextField fullWidth value={userData.firstName} id="first-name" label="Fisrt name" type="text" onChange={(e)=>setInputs(e.target.value, "firstName")} />
                        {/* <FormLabel>Last name</FormLabel> */}
                        <TextField fullWidth value={userData.lastName} id="last-name" label="Last name" type="text" onChange={(e)=>setInputs(e.target.value, "lastName")} />
                        {/* <FormLabel>Email*</FormLabel> */}
                        <TextField fullWidth required value={userData.email} id="email" label="Email" type="text" onChange={(e)=>setInputs(e.target.value, "email")} />
                        {/* <FormLabel>Password*</FormLabel> */}
                        <TextField fullWidth required value={userData.password} id="password" label="Password" type="password" autoComplete="current-password" onChange={(e)=>setInputs(e.target.value, "password")} />
                    </DialogContent>
                    <DialogActions>
                        <Button fullWidth variant="contained" color="primary" type="submit" style={{margin:15}}>Register</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}


