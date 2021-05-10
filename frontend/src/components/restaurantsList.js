import React, { useState, useEffect } from 'react';
import { getAllRestaurants, getCuisines, findRestaurants } from '../services/restaurant.js';
import { NavLink } from 'react-router-dom';

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [zipcodeQuery, setZipcodeQuery] = useState("");
  const [cuisineQuery, setCuisineQuery] = useState("All Cuisines");

  useEffect(() => {
    fetchRestaurants();
    fetchCuisines();
  }, []);

  const fetchRestaurants = async () => {
    const allRestaurants = await getAllRestaurants();
    //console.log(allRestaurants);
    if(allRestaurants) {
      setRestaurants(allRestaurants);
    };
  };

  const fetchCuisines = async () => {
    const restaurantCuisines = await getCuisines();
    //console.log(restaurantCuisines);
    if (restaurantCuisines) {
      setCuisines(["All Cuisines"].concat(restaurantCuisines));
    };
  };

  const onChangeNameQuery = event => {
    const input = event.target.value;
    setNameQuery(input);
  };

  const onChangeZipcodeQuery = event => {
    const input = event.target.value;
    setZipcodeQuery(input);
  };

  const onChangeCuisineQuery = event => {
    const input = event.target.value;
    setCuisineQuery(input);
  };

  const updateList = () => {
    fetchRestaurants();
  };

  const search = async (query, by) => {
    const payload = await findRestaurants();
    if(payload) {
      //console.log(payload);
      setRestaurants(payload);
    };
  };

  const searchByName = () => {
    search(nameQuery, "name");
  };

  const searchByZip = () => {
    search(zipcodeQuery, "zipcode");
  };

  const searchByCuisine = () => {
    search(cuisineQuery, "cuisine");
  };

  return (
    <div className="restaurants-list">
      This is a list of restaurants.
    </div>
  );
};

export default RestaurantsList;
