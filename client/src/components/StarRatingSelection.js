import React, { useState } from "react";

const StarRatingSelection = ({rating, setRating}) => {
  const [hover, setHover] = useState(0);

  const assignScore = (event) => {
    const starRating = event.target.value;
    if(starRating === rating && rating !== 0 ) {
      setRating(rating - 1);
    } else {
      setRating(starRating);
    }
  }

  return (
    <div className="star-rating-selection">
      {[...Array(5)].map((star, i) => {

        i += 1;

        return (
          <button
            type="button"
            key={i}
            value={i}
            className={i <= (hover || rating) ? "on" : "off"}
            onClick={assignScore}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(rating)}
          >
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingSelection;
