import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signin, signup } from '../../actions/auth';

import useStyles from './styles';
import Input from './Input';
const Auth = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const [showPassword, setShowPassword] = useState(false)
const [isSignup, setIsSignUp] = useState(false)
const [formData, setFormData] = useState(initialState)

const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

const classes = useStyles();

const handleSubmit = (e) => {
  e.preventDefault();

  if (isSignup) {
    dispatch(signup(formData, navigate));
  } else {
    dispatch(signin(formData, navigate));
  }
};


const handleChange = (e) => {
  setFormData({ ...formData,  [e.target.name]: e.target.value })
}

const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    handleShowPassword(false)
}

  return (
    <Container component="main" maxWidth="md">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          { isSignup && (
          <>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
          </>
          )}
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
        </Grid>
        { !isSignup && (
          <Typography color="secondary" variant="subtitle2" className={{ fontFamily: "9px" }}>Note: For Sign in, if you haven't been logged in after including your password and username, your password or username is invalid.</Typography>
        )}
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          { isSignup ? 'Sign Up' : 'Sign In' }
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
  )
};

//https://stackoverflow.com/questions/43964539/google-api-not-a-valid-origin-for-the-client-url-has-not-been-whitelisted-for/45761277#45761277

//"You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. 
//New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. 
//See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
//https://www.youtube.com/watch?v=75aTZq-qoZk

export default Auth;