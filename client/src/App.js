import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    setUser(null);
    //history.push('/');
  };

  return (
    <div className="app">
      <NavBar user={user} setUser={setUser} logout={logout} />
      <div className="main-page">
      <Home />
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
            component={RestaurantsList}
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
