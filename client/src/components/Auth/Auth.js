import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signin, signup } from '../../actions/auth';


import useStyles from './styles';
import Input from './Input';


const Auth = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
 const [showPassword, setShowPassword] = useState(false);
 const [isSignup, setIsSignUp] = useState(false);
 const [formData, setFormData] = useState(initialState);
 const [isLoading, setIsLoading] = useState(false); // State to track loading state


 const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);


 const classes = useStyles();


 const handleSubmit = async (e) => {
   e.preventDefault();
   setIsLoading(true); // Set loading state to true


   if (isSignup) {
     await dispatch(signup(formData, navigate));
   } else {
     await dispatch(signin(formData, navigate));
   }


   setIsLoading(false); // Set loading state to false after dispatching the action
 };




 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
 };


 const switchMode = () => {
   setIsSignUp((prevIsSignUp) => !prevIsSignUp);
   handleShowPassword(false);
 };


 return (
   <Container component="main" maxWidth="md">
     <Paper className={classes.paper} elevation={3}>
       <Avatar className={classes.avatar}>
         <LockOutlinedIcon />
       </Avatar>
       <Typography component="h1" variant="h5">
         {isSignup ? 'Sign up' : 'Sign in'}
       </Typography>
       <form className={classes.form} onSubmit={handleSubmit}>
         <Grid container spacing={2}>
           {isSignup && (
             <>
               <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
               <Input name="lastName" label="Last Name" handleChange={handleChange} half />
             </>
           )}
           <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
           <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />   
             
         </Grid>
         {!isSignup && (
           <Typography color="secondary" variant="subtitle2" className={{ fontFamily: '9px' }}>
             **If it didn't sign you in, your password or username is invalid and user doesn't exists. Please try again.**
           </Typography>
         )}
          {isSignup && (
           <Typography color="secondary" variant="subtitle2" className={{ fontFamily: '9px' }}>
             **If it didn't sign you in, you already have an account and user does exist. Please try again.**
           </Typography>
         )}
         <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
           {isLoading ? <CircularProgress color='black' size={24} /> : isSignup ? 'Sign Up' : 'Sign In'}
         </Button>
         <Grid container justifyContent="flex-end">
           <Grid item>
             <Button onClick={switchMode}>
               {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
             </Button>
           </Grid>
         </Grid>
       </form>
     </Paper>
   </Container>
 );
};




export default Auth;
