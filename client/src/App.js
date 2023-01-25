import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/routing/PrivateRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/layout/About';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
//
import Dashboard from './components/dashboard/Dashboard';
import Messenger from './components/messenger/Messenger';
import Post from './components/post/Post';
import Profile from './components/profile/Profile';

//
import Profiles from './components/profiles/Profiles';
import Followers from './components/profiles/Followers';
import Followings from './components/profiles/Followings';
import Search from './components/profiles/Search';
import SearchResult from './components/profiles/SearchResult';
import MyGroups from './components/profiles/MyGroups';
//
import AllGroups from './components/groups/AllGroups';
import Groups from './components/groups/Groups';
import Group from './components/groups/Group';
import GroupForm from './components/groups/GroupForm';
//
import VideoCall from './components/zoom/VideoCall';
import Room from './components/zoom/Room';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <section className="container">
        <Alert />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/profiles" element={<Profiles />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          {/*  */}
          <Route
            exact
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/create-profile"
            element={
              <RequireAuth>
                <CreateProfile />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/edit-profile"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/create-group"
            element={
              <RequireAuth>
                <GroupForm />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/adminGroups"
            element={
              <RequireAuth>
                <Groups />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/group/:id"
            element={
              <RequireAuth>
                <Group />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/posts/:id"
            element={
              <RequireAuth>
                <Post />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/groups"
            element={
              <RequireAuth>
                <AllGroups />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/followers"
            element={
              <RequireAuth>
                <Followers />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/followings"
            element={
              <RequireAuth>
                <Followings />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/myGroups"
            element={
              <RequireAuth>
                <MyGroups />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/search"
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/searchResult"
            element={
              <RequireAuth>
                <SearchResult />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/messenger"
            element={
              <RequireAuth>
                <Messenger />
              </RequireAuth>
            }
          />
          {/* zoom */}
          <Route
            exact
            path="/videocall"
            element={
              <RequireAuth>
                <VideoCall />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/room/:roomID"
            element={
              <RequireAuth>
                <Room />
              </RequireAuth>
            }
          />
        </Routes>
      </section>
    </Router>
  );
};

export default App;
