import React, { useState, useEffect } from 'react';
import { placeholder } from '../services/restaurant.js';
import { NavLink } from 'react-router-dom';

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [zipcodeQuery, setZipcodeQuery] = useState("");
  const [cuisineQuery, setCuisineQuery] = useState("");
  const [cuisines, setCuisines] = useState([]);

  return (
    <div className="restaurants-list">
      This is a list of restaurants.
    </div>
  );
};

export default RestaurantsList;
