import React, { useState, useEffect } from 'react';
import { getAllRestaurants, getCuisines, findRestaurants } from '../services/restaurantServices.js';
import QueryCard from './QueryCard';

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [zipcodeQuery, setZipcodeQuery] = useState("");
  const [cuisineQuery, setCuisineQuery] = useState("All Cuisines");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchRestaurants();
    fetchCuisines();
  }, []);

  useEffect(() => {
    if(restaurants.length > 0) {
      setIsLoaded(true);
    }
  }, [restaurants]);

  const fetchRestaurants = async() => {
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

  const search = async (query, by) => {
    const payload = await findRestaurants(query, by);
    if(payload) {
      console.log(payload);
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
    if(cuisineQuery === "All Cuisines") {
      updateList();
    } else {
      search(cuisineQuery, "cuisine");
    };
  };

  const updateList = () => {
    setIsLoaded(false);
    fetchRestaurants();
  };
  // for now programming easy fields for entering different searches but will later refactor to make it a more dynamic search field that can handle all queries at the same time.

  return (
    <div className="restaurants-list">
      <div className="restaurant-list__search-bar">

        <form className="search-form">
          <input
            type="text"
            className="search-form__input"
            placeholder="Search by name"
            value={nameQuery}
            onChange={onChangeNameQuery}
          />
          <div className="search-form__submit-button-container">
            <button
              className="search-form__submit-button"
              type="button"
              onClick={searchByName}
            >
              Search
            </button>
          </div>
        </form>
        <form className="search-form">
          <input
            type="text"
            className="search-form__input"
            placeholder="Search by zipcode"
            value={zipcodeQuery}
            onChange={onChangeZipcodeQuery}
          />
          <div className="search-form__submit-button-container">
            <button
              className="search-form__submit-button"
              type="button"
              onClick={searchByZip}
            >
              Search
            </button>
          </div>
        </form>
        <form className="search-form">
          <select onChange={onChangeCuisineQuery} className="search-form__select-box">
            {cuisines.map((cuisine, i) => {
              return (
                <option value={cuisine} key={i}>
                  {cuisine.substr(0, 30)}
                </option>
              )
            })}
          </select>
          <div className="search-form__submit-button-container">
            <button
              className="search-form__submit-button"
              type="button"
              onClick={searchByCuisine}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="restaurants-list__results-wrapper">
        <div className="restaurants-list__results-container">
          {isLoaded && restaurants.map((restaurant, i) =>
            //console.log(restaurant);
            //const {_id, name, address, cuisine} = restaurant;
            <QueryCard restaurant={restaurant} key={i} />
            // const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;

            // return (
            //   <div className="query-card" key={i}>
            //     <div className="query-card__wrapper">
            //       <div className="query-card__data-container">
            //         <h5 className="query-card__location-name">{restaurant.name}</h5>
            //         <p className="query-card__location-text">
            //           <strong>Cuisine: </strong>{restaurant.cuisine}<br />
            //           <strong>Address: </strong>{address}
            //         </p>
            //         <div className="query-card__link-container">
            //           <NavLink
            //             to={"/restaurants/" + restaurant._id}
            //             className="query-card__navigation-link"
            //           >
            //             Read Reviews
            //           </NavLink>
            //           <a
            //             target="_blank"
            //             rel="noreferrer"
            //             href={"http://www.google.com/maps/place/" + address}
            //             className="query-card__map-link"
            //           >
            //             View Map
            //           </a>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // );
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsList;
