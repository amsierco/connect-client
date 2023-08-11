import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './components/Home/Home';
import PostForm from './components/PostForm/PostForm';
import Timeline from "./pages/Timeline/Timeline";
import Profile from './pages/Profile/Profile';
import Friends from './components/Friends/Friends';
import Notifications from './components/Notifications/Notifications';
import Search from './components/Search/Search';

// Utils
import ProtectedRoute from './utils/ProtectedRoute';
import Loading from './utils/Loading';

const RouterController = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        {/* LOGIN */}
        <Route path='/login' element={ <Login /> } />
        {/* SIGNUP */}
        <Route path='/signup' element={ <Signup /> } />

        {/* LOADING TESTING ONLY */}
        <Route path='/loading' element={ <Loading /> } />

        {/* HOME */}
        <Route path='/' element={ <ProtectedRoute><Home /></ProtectedRoute> }>
          {/* TIMELINE */}
          <Route path='' element={ <Timeline /> }/>
          {/* POST FORM */}
          <Route path='post-form' element={ <PostForm /> } />
          {/* PROFILE */}
          <Route path='profile/:id' element={ <Profile /> } />
          {/* FRIENDS */}
          {/* <Route path='friends' element={ <Friends /> } /> */}
          {/* NOTIFICATIONS */}
          <Route path='notifications' element={ <Notifications /> } />
          {/* SEARCH */}
          {/* <Route path='search' element={ <Search /> } /> */}
        </Route>

        {/* 404 PAGE */}
        <Route path='*'
          element={ <ErrorPage /> }
        />
      </Routes>
      </BrowserRouter>
  )
};

export default RouterController;