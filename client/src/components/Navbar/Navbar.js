import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import DarkMode from '../DarkMode/DarkMode';
import * as actionType from '../../constants/actionTypes';

import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit" elevation={1}>
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h1" align="center" color="primary">Snapmoment</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <DarkMode />
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}><LogoutIcon>Logout</LogoutIcon></Button>
          </div>
        ) : (
          <>
          <DarkMode />
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up or Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;