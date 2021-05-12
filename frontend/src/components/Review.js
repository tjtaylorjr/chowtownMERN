import React, { useState } from 'react';
import { updateReview, addReview } from '../services/restaurantServices';
import { NavLink } from 'react-router-dom';

const ReviewForm = (props) => {
  let defaultReviewState = ""
  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    defaultReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(defaultReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = async () => {
    let data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    }

    if (editing) {
      data.review_id = props.location.state.currentReview._id;
      await updateReview(data);
      setSubmitted(true);
    } else {
      await addReview(data);
      setSubmitted(true);
    }

  }

  return (
    <div>
      {props.user ? (
        <div>
          {submitted ? (
            <div>
              <h4>Review Submitted.</h4>
              <NavLink to={"/restaurants/" + props.match.params.id}>
                Back
              </NavLink>
            </div>
          ) : (
            <div>
              <div>
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview}>
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          You must be logged in to submit reviews.
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
