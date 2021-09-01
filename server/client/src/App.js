import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Restaurant from './components/Restaurant';
import RestaurantsList from './components/RestaurantsList';
import Review from './components/Review';
import PrivacyPolicy from './components/PrivacyPolicy';
import TOS from './components/TermsOfService';

const App = () => {

  const [user, setUser] = useState();

  return (
    <div className="app">
      <NavBar setUser={setUser} />
      <div className="main-page">
        <Switch>
          <Route
            path="/restaurant/:id/review"
            render={(props) => (
              <Review {...props} user={user} />
              )}
          />
          <Route
            path="/restaurant/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
              )}
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
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
