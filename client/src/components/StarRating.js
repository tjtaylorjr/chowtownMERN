import React, { useState } from "react";

const StarRating = () => {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(0);

  const assignScore = (event) => {
    const rating = event.target.value;
    if(rating === score && score !== 0 ) {
      setScore(score - 1);
    } else {
      setScore(rating)
    }
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {

        i += 1;

        return (
          <button
            type="button"
            key={i}
            value={i}
            className={i <= (hover || score) ? "on" : "off"}
            onClick={assignScore}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(score)}
          >
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
