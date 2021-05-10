import React, { useState, useEffect } from 'react';
import { getAllRestaurants } from '../services/restaurant.js';
import { NavLink } from 'react-router-dom';

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [zipcodeQuery, setZipcodeQuery] = useState("");
  const [cuisineQuery, setCuisineQuery] = useState("");

  useEffect(() => {
    fetchRestaurants();
    fetchCuisines();
  }, []);

  const fetchRestaurants = () => {

  }

  return (
    <div className="restaurants-list">
      This is a list of restaurants.
    </div>
  );
};

export default RestaurantsList;
