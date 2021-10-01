import React, { useState, useEffect } from 'react';
import { findRestaurants } from '../services/restaurantServices.js';
import { getGeoApi } from '../services/userServices.js';
import QueryCard from './QueryCard';
import BusinessCard from './BusinessCard';

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [sortedRestaurants, setSortedRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isDistanceChecked, setIsDistanceChecked] = useState(true);
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [location, setLocation] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // const geoApi = process.env.REACT_APP_GEO_API;
  // const geoApi = (async () => {
  //   try {
  //     const api = await getGeoApi();
  //     if(!api.ok) {
  //       throw api;
  //     }
  //     return api;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // })();
  // console.log(geoApi);
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

  const search = async (event) => {
    event.preventDefault()
    const geoApi = await getGeoApi();
    const geoInfo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location},us&limit=1&appid=${geoApi}`);
    if (!geoInfo.ok) {
      throw geoInfo
    }
    const result = await geoInfo.json();
    const {lat, lon} = result[0];
    const payload = await findRestaurants(searchInput, lat, lon);
    if (payload) {
      console.log(payload);
      setRestaurants(payload);
    };
  };

  const clear = () => {
    setSearchInput("");
    setLocation("");
  };

  const distanceSort = () => {
    setIsLoaded(false);
    setIsDistanceChecked(true);
    setIsNameChecked(false);
  };

  const nameSort = () => {
    setIsLoaded(false);
    setIsNameChecked(true);
    setIsDistanceChecked(false);
  }

  useEffect(() => {
    if(isNameChecked && !isDistanceChecked) {
      setSortedRestaurants(restaurants.sort((a, b) => (a.name > b.name ? 1 : -1)));
      setIsLoaded(true);
    } else if (isDistanceChecked && !isNameChecked) {
      setSortedRestaurants(restaurants.sort((a, b) => (a.distance > b.distance ? 1 : -1)));
      setIsLoaded(true);
    }

  },[restaurants, isDistanceChecked, isNameChecked]);

  return (
    <div className="restaurants-list">
      <div className="restaurant-list__search-bar">
        <form
          className="search-form"
          onSubmit={search}>
          <input
            type="text"
            className="search-form__input"
            placeholder="Search by Name or Cuisine"
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
              type="submit"
            >
              Search
            </button>
          </div>
          <div className="search-form__clear-button-container">
            <button
              className="search-form__clear-button"
              type="button"
              onClick={clear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <div>
        Sort by:
        <input type="radio" id="radio-distance" value="Distance" name="Distance" checked={isDistanceChecked} onClick={distanceSort}/> Distance
        <input type="radio" id="radio-name" value="Name" checked={isNameChecked} name="Name" onClick={nameSort}/> Name
      </div>
      <div className="restaurants-list__results-wrapper">
        <div className="restaurants-list__results-container">
          {isLoaded && sortedRestaurants.map((restaurant, i) =>
            <QueryCard restaurant={restaurant} key={i} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsList;
