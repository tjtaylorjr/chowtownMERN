import React, { useState, useEffect } from 'react';
import { deleteReview, getRestaurantById } from '../services/restaurantServices.js';
import { NavLink } from 'react-router-dom';

const Restaurant = (props) => {
  const defaultState = {
    _id: null,
    name: "",
    address: "",
    phone: "",
    rating: 0,
    cuisine: "",
    reviews: []
  };

  let isReviewed = false;


  const [restaurantProfile, setRestaurantProfile] = useState(defaultState);
  const [currentReview, setCurrentReview] = useState();

  useEffect(() => {
    fetchRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    let reviewList = restaurantProfile.reviews
    const findUserReview = reviewList.find(function(review) {
      if(review.user_id === props.user?._id) return review
    });

    setCurrentReview(findUserReview)
    // isReviewed = (() => {
    //    return reviewList.some(function(review) {
    //      return review.user_id === props.user._id;
    //    });
    // })();
    //console.log(isReviewed)
  }, [restaurantProfile])

  useEffect(() => {
    if (currentReview) {
      isReviewed = true;
    }
    console.log(currentReview)
    console.log(isReviewed)
  },[currentReview])

  const fetchRestaurant = async (id) => {
    const resInfo = await getRestaurantById(id);
    if(resInfo) {
      setRestaurantProfile(resInfo);
    };
  };

  const removeReview = async (reviewId) => {
    const i = restaurantProfile.reviews.findIndex((review) => review._id === reviewId);

    await deleteReview(reviewId, props.user._id);
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
        <div className="restaurant-container">
          <div className="restaurant__name">{restaurantProfile.name}</div>
          <p>
            <strong>Cuisine: </strong>{restaurantProfile.cuisine}<br/>
            {/* <strong>Address: </strong>{restaurantProfile.address.building} {restaurantProfile.address.street}, {restaurantProfile.address.zipcode} */}
            <strong>Address: </strong>{restaurantProfile.address}<br/>
            <strong>Phone: </strong>{restaurantProfile.phone}
          </p>
          {currentReview ?
            <>
              <h3>{`Your Review of ${restaurantProfile.name}`}</h3>
              <div className="user-review">
                <div>
                  <div>
                    <h4>{currentReview.title}</h4>
                    {currentReview.imageUrl && <img
                      className="review-image"
                      src={currentReview.imageUrl}
                    />}
                    <p>
                      <strong>User: </strong>{currentReview.name}
                      <br />
                      <strong>Date: </strong>{new Date(currentReview.date).toLocaleString()}
                      <br />
                      <strong><u>Review</u></strong>
                    </p>
                    <div className="review-text">{currentReview.text}</div>
                    <br />
                  </div>
                </div>
              </div>
              <div className="review__links-container">
                <a className="review__delete-link" href="#" onClick={() => removeReview(currentReview._id)}>Delete</a>
                <NavLink
                  className="review__edit-link"
                  to={{
                    pathname: "/restaurant/" + props.match.params.id + "/review",
                    state: {
                      currentReview: currentReview
                    }
                  }}>Edit</NavLink>
              </div>
            </>
          :
            <NavLink
              className="restaurant-review__add-link"
              to={"/restaurant/" + props.match.params.id + "/review"}>
              Add Review
            </NavLink>
          }
          {/* <NavLink
            className="restaurant-review__add-link"
            to={"/restaurant/" + props.match.params.id + "/review"}>
            Add Review
          </NavLink> */}
          {
            restaurantProfile.reviews.length > 1 ?
              currentReview ?
                <h3>What others are saying</h3>
              :
                <h3>What people are saying</h3>
            :
              <></>
          }
          <div>
            {restaurantProfile.reviews.length > 0 ? (
              restaurantProfile.reviews.map((review, i) => { if(review._id !== currentReview?._id) {

                return (
                  <div className="restaurant-review" key={i}>
                    <div>
                      <div>
                        <h4>{review.title}</h4>
                        {review.imageUrl && <img
                          className="review-image"
                          src={review.imageUrl}
                        />}
                        <p>
                          <strong>User: </strong>{review.name}
                          <br/>
                          <strong>Date: </strong>{new Date(review.date).toLocaleString()}
                          <br/>
                          <strong><u>Review</u></strong>
                        </p>
                        <div className="review-text">{review.text}</div>
                        <br/>

                        {/* {props.user && props.user._id === review.user_id &&
                          <div className="review__links-container">
                            <a className="review__delete-link" href="#" onClick={() => removeReview(review._id, i)}>Delete</a>
                          <NavLink
                            className="review__edit-link"
                            to={{pathname: "/restaurant/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }}>Edit</NavLink>
                          </div>
                        } */}
                      </div>
                    </div>
                  </div>
                )
              } else {
                return;
              }
              })
            ) : (
              <p>{`No Current Reviews.  Be the first to tell people about ${restaurantProfile.name}!`}</p>
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
