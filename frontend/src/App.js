import React, { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Restaurant from './components/Restaurant';
import RestaurantsList from './components/RestaurantsList';
import Review from './components/Review';
import Signup from './components/Signup';

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
          {!user && (
            <li className="navebar__item">
              <NavLink to={'/signup'} className="navbar__nav-link">
                Signup
              </NavLink>
            </li>
          )}
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
              <Login {...props} mockLogin={mockLogin} />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <Signup {...props} signup={signup} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
