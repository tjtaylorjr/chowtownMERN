import React, { useState, useEffect } from 'react';
import { getAllRestaurants, getCuisines, findRestaurants, findYelpRestaurants } from '../services/restaurantServices.js';
import QueryCard from './QueryCard';

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const geoApi = process.env.REACT_APP_GEO_API;

  useEffect(() => {
    if(restaurants.length > 0) {
      setIsLoaded(true);
    }
  }, [restaurants]);

  const onChangeQueryLocation = event => {
    const input = event.target.value;
    setLocation(input);
  };

  const onChangeSearchQuery = event => {
    const input = event.target.value;
    setSearchInput(input);
  };

  const search = async () => {
    const geoInfo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location},us&limit=1&appid=${geoApi}`);
    if (!geoInfo.ok) {
      throw geoInfo
    }
    const result = await geoInfo.json();
    const {lat, lon} = result[0];
    const payload = await findYelpRestaurants(searchInput, lat, lon);
    if (payload) {
      console.log(payload);
      setRestaurants(payload);
    };
  };

  return (
    <div className="restaurants-list">
      <div className="restaurant-list__search-bar">
        <form className="search-form" >
          <input
            type="text"
            className="search-form__input"
            placeholder="find Restaurants"
            value={searchInput}
            onChange={onChangeSearchQuery}
          />
          <input
            type="text"
            className="search-form__input"
            placeholder="City, State Code"
            value={location}
            onChange={onChangeQueryLocation}
          />
          <div className="search-form__submit-button-container">
            <button
              className="search-form__submit-button"
              type="button"
              onClick={search}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="restaurants-list__results-wrapper">
        <div className="restaurants-list__results-container">
          {isLoaded && restaurants.map((restaurant, i) =>
            <QueryCard restaurant={restaurant} key={i} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsList;
