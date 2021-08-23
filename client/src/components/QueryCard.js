import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const QueryCard = (props) => {
  const { location, categories, display_phone, distance, name, image_url } = props.restaurant;
  const convertedDistance = distance * .000621371
  const { display_address } = location;
  const formattedAddress = display_address.filter(i => i !== undefined).join(', ');


  const IDPLACEHOLDER = "IDPLACEHOLDER";

  const offerings = categories.map(object => {
      return object.title
     }).filter(i => i !== undefined).join(', ');

  return (
    <>
      <div className="query-card">
        <div className="query-card__wrapper">
          <div className="query-card__image-container">
            <img className="query-card__image" src={image_url}/>
          </div>
          <div className="query-card__data-container">
            <div className="query-card__location-details">
              <h5 className="query-card__location-name">{name}</h5>
              <div className="query-card__location-text">
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
                <div>
                  {`${convertedDistance.toFixed(1)} miles`}
                </div>
                <div>
                  {display_phone}
                </div>
                <div>
                  {categories.map(object => {
                      return object.title
                    }).filter(i => i !== undefined).join(', ')}
                </div>
              </div>
            </div>
            <div className="query-card__link-container">
              <NavLink
                to={"/restaurant/" + IDPLACEHOLDER}
                className="query-card__navigation-link"
              >
                Read Reviews
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryCard;
