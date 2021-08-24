import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { getRestaurantByApiId, addRestaurant } from '../services/restaurantServices.js';

const QueryCard = (props) => {
  const [DB_ID, setDB_ID] = useState("000000000000");
  const { location, categories, display_phone, distance, id, name, image_url, rating } = props.restaurant;
  const starRef = useRef(null);
  const convertedDistance = distance * .000621371
  const { display_address } = location;
  const formattedAddress = display_address.filter(i => i !== undefined).join(', ');

  const api_id = id;


  const offerings = categories.map(object => {
      return object.title
     }).filter(i => i !== undefined).join(', ');


  useEffect(() => {
    const starPercentage = (rating / 5) * 100;
    const roundedStarPercentage = `${(Math.round(starPercentage / 10) * 10)}%`;
    starRef.current.style.width = roundedStarPercentage;
  },[props.restaurant])

  const checkRecord = async () => {
    try {
      const payload = await getRestaurantByApiId(api_id);
      if (payload.message === "Please Create Record") {
        const data = {
          api_id,
          address: formattedAddress,
          cuisine: offerings,
          rating,
          name
        }

        const res = await addRestaurant(data);
        if(res.status === "success") {
          const newPayload = await getRestaurantByApiId(api_id);
          console.log(newPayload);
          setDB_ID(newPayload._id);
        };

      } else {
        console.log(payload)
        setDB_ID(payload._id);
      }
    } catch (err) {
      console.error(`Unable to check records: ${err}`);
    }
  };

  console.log(DB_ID);

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
              <div className="rating-stars">
                <div className="rating-stars__fill" ref={starRef}></div>
              </div>
              <NavLink
                onClick={checkRecord}
                to={"/restaurant/" + DB_ID}
                className="query-card__navigation-link"
              >
                Reviews
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryCard;
