import React, { useRef, useState } from 'react';
import { updateReview, addReview } from '../services/restaurantServices';
import { NavLink } from 'react-router-dom';
//import S3 from 'react-aws-s3';

const Review = (props) => {
  let defaultReviewState = "";
  let defaultImageState = "";
  let editing = false;
  const fileInput = useRef(null);

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    defaultReviewState = props.location.state.currentReview.text
    defaultImageState = props.location.state.currentReview.image
  }

  const [review, setReview] = useState(defaultReviewState);
  const [image, setImage] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const handleFileChange = async (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files);
    console.log(image);
    const res = await fetch(`/api/v1/restaurants/review`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    });
    const url = await res.json();
    console.log(url);
  };

  const saveReview = async () => {
    let imageFile = "";
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
              {editing ? (
                  <div>
                    <label htmlFor="description" Edit Photo />
                    {defaultImageState}
                    <button>Edit</button>
                  </div>
              ) : (
                <div>
                  <label htmlFor="description"Add Photo />
                  <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  />
                </div>
              )}
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

export default Review;
