import React, { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/login';
import Restaurant from './components/restaurant';
import RestaurantsList from './components/restaurantsList';
import Review from './components/review';
import Signup from './components/signup';

const App = () => {
  const [user, setUser] = useState(null);

  const login = async(user = null) => {
    setUser(user);
  };

  const logout = async() => {
    setUser(null);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <a href="/restaurants" className="navbar__site-name">
          ChowTown
        </a>
        <div className="navbar__links">
          <li className="navbar__item">
            <NavLink to={"/restaurants"} className="navbar__nav-link">
              Restaurants
            </NavLink>
          </li>
          <li className="navbar__item">
            { user ? (
              <a onClick={logout} className="navbar__nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (
              <NavLink to={'/login'} className="navbar__nav-link">
                Login
              </NavLink>
            )}
          </li>
          <li className="navbar__item">
            {user ? (
              <div></div>
            ) : (
              <NavLink to={'/signup'} className="navbar__nav-link">
                Signup
              </NavLink>
            )}
          </li>
        </div>
      </nav>
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
              <Login {...props} user={user} />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <Signup {...props} user={user} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
