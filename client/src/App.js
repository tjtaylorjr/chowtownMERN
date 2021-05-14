import React, { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import Restaurant from './components/Restaurant';
import RestaurantsList from './components/RestaurantsList';
import Review from './components/Review';
import SignupForm from './components/SignupForm';

const App = () => {
  const [user, setUser] = useState(null);

  const mockLogin = async(user = null) => {
    setUser(user);
  };

  const signup = async() => {
    console.log("on TODO list");
  };

  const logout = async() => {
    setUser(null);
  };

  return (
    <div className="app">
      <NavBar user={user} logout={logout}/>
      <div className="main-page">
        <Switch>
          <Route
            exact path={["/", "/restaurants"]}
            component={RestaurantsList}
          />
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
            path="/login"
            render={(props) => (
              <LoginForm {...props} mockLogin={mockLogin} />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <SignupForm {...props} signup={signup} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
