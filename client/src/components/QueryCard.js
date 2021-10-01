import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import StarRatingDisplay from './StarRatingDisplay';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { getRestaurantId, addRestaurant } from '../services/restaurantServices.js';

const QueryCard = (props) => {
  const { location, categories, display_phone, distance, id, name, image_url, rating } = props.restaurant;
  const starRef = useRef(null);
  const history = useHistory();
  const convertedDistance = distance * .000621371
  const { display_address } = location;
  const formattedAddress = display_address.filter(i => i !== undefined).join(', ');

  const api_id = id;


  const offerings = categories.map(object => {
      return object.title
     }).filter(i => i !== undefined).join(', ');

  const checkRecord = async () => {
    let DB_ID;
    try {
      const payload = await getRestaurantId(api_id);
      if (payload.message === "Please Create Record") {
        const data = {
          api_id,
          address: formattedAddress,
          phone: display_phone,
          cuisine: offerings,
          rating,
          name
        }

        const res = await addRestaurant(data);
        if(res.status === "success") {
          const newPayload = await getRestaurantId(api_id);
          DB_ID = newPayload._id;
        };

      } else {
        DB_ID = payload._id;
      }

      history.push(`/restaurant/${DB_ID}`);
    } catch (err) {
      console.error(`Unable to check records: ${err}`);
    }
  };

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
                  {`(${convertedDistance.toFixed(1)} miles)`}
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
                  {display_phone}
                </div>
                <div className="query-card__categories-text">
                  {categories.map(object => {
                      return object.title
                    }).filter(i => i !== undefined).join(', ')}
                </div>
              </div>
            </div>
            <div className="query-card__link-container">
              {/* <StarRatingDisplay rating={rating}/> */}
              <button
                type="button"
                onClick={checkRecord}
                className="query-card__review-button"
              >
                See Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryCard;
