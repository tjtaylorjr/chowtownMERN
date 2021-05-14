import React from 'react';
import { NavLink } from 'react-router-dom';

const BusinessCard = (restaurant) => {
  console.log(restaurant);
  //const { restaurant } = props.restaurant;
  const {address, cuisine, name, _id} = restaurant;
  console.log(_id, name, address, cuisine);

  const formattedAddress = `${address.building} ${address.street}, ${address.zipcode}`;

  return (
    <>
      <div className="restaurant-card">
        <div className="restaurant-card__wrapper">
          <div className="restaurant-card__data-container">
            <h5 className="restaurant-card__location-name">{name}</h5>
            <p className="restaurant-card__location-text">
              <strong>Cuisine: </strong>{cuisine}<br />
              <strong>Address: </strong>{formattedAddress}
            </p>
            <div className="restaurant-card__link-container">
              <NavLink
                to={"/restaurants/" + _id}
                className="restaurant-card__navigation-link"
              >
                Read Reviews
              </NavLink>
              <a
                target="_blank"
                rel="noreferrer"
                href={"http://www.google.com/maps/place/" + formattedAddress}
                className="restaurant-card__map-link"
              >
                View Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessCard;
