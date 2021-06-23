import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Restaurant from './components/Restaurant';
import RestaurantsList from './components/RestaurantsList';
import Review from './components/Review';
import PrivacyPolicy from './components/PrivacyPolicy';
import TOS from './components/TermsOfService';
// import SignupForm from './components/SignupForm';
// import { placeholder } from './services/authServices.js';

const App = () => {
  const [user, setUser] = useState(null);
  const googleAuthData = JSON.parse(localStorage.getItem('profile'));
  //console.log(googleAuthData)

  const mockLogin = async(user = null) => {
    setUser(user);
  };

  const login = async() => {
    const googleAuthData = JSON.parse(localStorage.getItem('profile'));
    //console.log(googleAuthData)
    if (googleAuthData) {

    }

  }

  const signup = async() => {
    console.log("on TODO list");
  };

  const logout = async() => {
    setUser(null);
  };

  return (
    <div className="app">
      <NavBar user={user} logout={logout} mockLogin={mockLogin} login={login}/>
      <div className="main-page">
        <Switch>
          <Route
            path="/restaurants/:id/review"
            render={(props) => (
              <Review {...props} user={user} />
              )}
          />
          <Route
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
              )}
          />
          <Route
            exact path={"/restaurants"}
            component={RestaurantsList}
          />
          <Route
            exact path={"/privacy"}
            component={PrivacyPolicy}
          />
          <Route
            exact path={"/tos"}
            component={TOS}
          />
          <Route
            exact path={"/"}
            component={Home}
          />
          {/* <Route
            path="/login"
            render={(props) => (
              <LoginForm {...props} mockLogin={mockLogin} />
            )}
          /> */}
          {/* <Route
            path="/signup"
            render={(props) => (
              <SignupForm {...props} signup={signup} />
            )}
          /> */}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
