import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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
            <Link to={"/restaurants"} className="navbar__nav-link">
              Restaurants
            </Link>
          </li>
          <li className="navbar__item">
            { user ? (
              <a onClick={logout} className="navbar__nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (
              <Link to={'/login'} className="navbar__nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
    </div>
  );
}

export default App;
