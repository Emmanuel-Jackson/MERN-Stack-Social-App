import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const authRedirect = () => {
    return !user ? <Auth /> : <Navigate to="/posts" />;
  };
  
  const authRedirectHome = () => {
    return <Navigate to="/posts" />;
  };
  
  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={authRedirectHome()} />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetails />} />
        <Route path="/auth" exact element={authRedirect()} />
        <Route path="/profile/:id" exact element={<Profile />}/>
      </Routes>
    </Container>
  </BrowserRouter>
  );
};

export default App;