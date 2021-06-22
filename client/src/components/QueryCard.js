import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const QueryCard = (props) => {
  const { address, cuisine, name, _id } = props.restaurant;
  const { building, street, zipcode } = address;
  const formattedAddress = `${building} ${street}, ${zipcode}`;

  return (
    <>
      <div className="query-card">
        <div className="query-card__wrapper">
          <div className="query-card__image-container"></div>
          <div className="query-card__data-container">
            <div className="query-card__location-details">
              <h5 className="query-card__location-name">{name}</h5>
              <p className="query-card__location-text">
                <div>
                  {formattedAddress + ' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={"http://www.google.com/maps/place/" + formattedAddress}
                    className="query-card__map-link2"
                  >
                    <FaMapMarkerAlt />
              </a>
                </div>
                {cuisine}
              </p>
            </div>
            <div className="query-card__link-container">
              <NavLink
                to={"/restaurants/" + _id}
                className="query-card__navigation-link"
              >
                Read Reviews
              </NavLink>
              {/* <a
                target="_blank"
                rel="noreferrer"
                href={"http://www.google.com/maps/place/" + formattedAddress}
                className="query-card__map-link"
              >
                View Map
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryCard;
