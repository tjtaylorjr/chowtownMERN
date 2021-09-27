import React, { useState, useEffect } from 'react';
import { deleteReview, getRestaurantById } from '../services/restaurantServices.js';
import { NavLink } from 'react-router-dom';

const Restaurant = (props) => {
  const defaultState = {
    id: null,
    name: "",
    address: "",
    cuisine: "",
    reviews: []
  };

  const [restaurantProfile, setRestaurantProfile] = useState(defaultState);

  useEffect(() => {
    fetchRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const fetchRestaurant = async (id) => {
    const resInfo = await getRestaurantById(id);
    if(resInfo) {
      setRestaurantProfile(resInfo);
    };
  };

  const removeReview = async (reviewId, i) => {
    await deleteReview(reviewId, props.user.id);
    setRestaurantProfile((prevState) => {
      prevState.reviews.splice(i, 1)
      return({
        ...prevState
      });
    });
  };

  return (
    <div className="restaurant">
      {restaurantProfile ? (
        <div>
          <h5>{restaurantProfile.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurantProfile.cuisine}<br/>
            <strong>Address: </strong>{restaurantProfile.address.building} {restaurantProfile.address.street}, {restaurantProfile.address.zipcode}
          </p>
          <NavLink to={"/restaurant/" + props.match.params.id + "/review"}>
            Add Review
          </NavLink>
          <h4>Reviews</h4>
          <div>
            {restaurantProfile.reviews.length > 0 ? (
              restaurantProfile.reviews.map((review, i) => {
                return (
                  <div key={i}>
                    <div>
                      <div>
                        <img src={review.url}/>
                        <p>
                          {review.text}<br/>
                          <strong>User: </strong>{review.name}<br/>
                          <strong>Date: </strong>{review.date}<br/>
                        </p>
                        {props.user && props.user.id === review.user_id &&
                          <div>
                            <a href="#" onClick={() => removeReview(review._id, i)}>Delete</a>
                            <NavLink to={{
                              pathname: "/restaurant/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} >Edit</NavLink>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p>No Reviews</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>No Restaurant found</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
