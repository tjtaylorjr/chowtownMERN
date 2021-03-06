import React, { useEffect, useRef, useState } from 'react';
import { updateReview, addReview } from '../services/restaurantServices';
import { NavLink } from 'react-router-dom';
import StarRatingSelection from './StarRatingSelection';
//import S3 from 'react-aws-s3';

const Review = (props) => {
  let defaultReviewState = "";
  let defaultReviewTitleState = "";
  let defaultImageNameState = "";
  let defaultImageState = "";
  let defaultRating = 0;
  let editing = false;
  const fileInput = useRef(null);

  if (props.location.state && props.location.state.currentReview) {
    defaultReviewState = props.location.state.currentReview.text
    defaultReviewTitleState = props.location.state.currentReview.title
    defaultImageNameState = props.location.state.currentReview.imageName
    defaultImageState = props.location.state.currentReview.imageUrl
    defaultRating = props.location.state.currentReview.rating
    editing = true;
  }

  const [review, setReview] = useState(defaultReviewState);
  const [reviewTitle, setReviewTitle] = useState(defaultReviewTitleState);
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState(defaultImageState);
  const [submitted, setSubmitted] = useState(false);
  const [AWSUploadUrl, setAWSUploadUrl] = useState("");
  const [rating, setRating] = useState(defaultRating);

  // useEffect(() => {
  //   if(editing) {
  //     setImagePreview(defaultImageState)
  //   }
  // },[editing])

  useEffect(() => {
    if(!image || image.length === 0) {
      setImagePreview(undefined);
      return;
    };

    const previewUrl = URL.createObjectURL(image[0]);
    setImagePreview(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  },[image])

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const handleTitleChange = (event) => {
    setReviewTitle(event.target.value);
  };

  const handleFileChange = async (event) => {
    console.log(event.target.files[0]);
    if (!event.target.files || event.target.files.length === 0) {
      setImage([])
    }

    setImage(event.target.files);
    //console.log(image[0]);
    const res = await fetch(`/api/v1/restaurants/review`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    });
    const {s3Url} = await res.json();
    console.log(s3Url);
    setAWSUploadUrl(s3Url);
  };

  const saveReview = async () => {
    let data = {
      title: reviewTitle,
      text: review,
      name: props.user.name,
      user_id: props.user._id,
      restaurant_id: props.match.params.id,
      AWSUploadUrl,
      imageName: image[0]?.name,
      imageFile: image[0],
      imageUrl: AWSUploadUrl.split('?')[0],
      rating: parseInt(rating)
    }

    console.log(data);

    if (editing) {
      data.review_id = props.location.state.currentReview._id;
      data.originalImageUrl = defaultImageState;
      data.originalImageName = defaultImageNameState;
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
              <NavLink to={"/restaurant/" + props.match.params.id}>
                Back
              </NavLink>
            </div>
          ) : (
            <div>
              <div>
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <br/>
                <input
                  type="text"
                  id="review-title"
                  className="review__title-field"
                  required
                  value={reviewTitle}
                  onChange={handleTitleChange}
                  name="review-title"

                  placeholder="Enter title or description"
                />
                <br/>
                <textarea
                  type="text"
                  id="text"
                  className="review__text-field"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                  rows="10"
                  // cols="50"
                  placeholder="Add review text here"
                />
              </div>
              <StarRatingSelection rating={rating} setRating={setRating}/>
              {editing ? (
                  <div>
                    <label htmlFor="description">Current Photo</label>
                    <br/>
                    {imagePreview ? (<img className="review__image-preview" src={imagePreview} />) : (<img className="review__image-preview" src={defaultImageState} />)}
                    <br/>
                    {imagePreview ? image[0]?.name : defaultImageNameState}
                    {/* {defaultImageNameState} */}
                    <br/>
                    <br/>
                    <div className="review__photo-upload-button">
                      <label>
                        <input
                          id="imageFile"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <span>Change Photo</span>
                      </label>
                    </div>
                    <br/>
                    <br/>
                  </div>
              ) : (
                <div className="review__photo-upload-button">
                  <br/>
                  {image && <img className="review__image-preview" src={imagePreview} />}
                  <br/>
                  {image && image[0]?.name}
                  <br/>
                  <br/>
                  <label>
                    <input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    />
                    <span>Add Photo</span>
                  </label>
                  <br/>
                  <br/>
                </div>
              )}
              <br/>
              <button
                className="review__submit-button"
                onClick={saveReview}
              >
                Submit
              </button>
              <NavLink
                className="review__cancel-button"
                to={"/restaurant/" + props.match.params.id}>
                  Cancel
              </NavLink>
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
