import React from 'react';
import { NavLink } from 'react-router-dom';

const QueryCard = (restaurant) => {
  console.log(restaurant);
  //const { restaurant } = props.restaurant;
  const { address, cuisine, name, _id } = restaurant;
  console.log(_id, name, address, cuisine);

  const formattedAddress = `${address.building} ${address.street}, ${address.zipcode}`;

  return (
    <>
      <div className="query-card">
        <div className="query-card__wrapper">
          <div className="query-card__data-container">
            <h5 className="query-card__location-name">{name}</h5>
            <p className="query-card__location-text">
              <strong>Cuisine: </strong>{cuisine}<br />
              <strong>Address: </strong>{formattedAddress}
            </p>
            <div className="query-card__link-container">
              <NavLink
                to={"/restaurants/" + _id}
                className="query-card__navigation-link"
              >
                Read Reviews
              </NavLink>
              <a
                target="_blank"
                rel="noreferrer"
                href={"http://www.google.com/maps/place/" + formattedAddress}
                className="query-card__map-link"
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

export default QueryCard;
