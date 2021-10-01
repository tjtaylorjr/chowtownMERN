import React, { useState } from "react";

const StarRating = () => {
  const [score, setScore] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {

        i += 1;

        return (
          <button
            type="button"
            key={i}
            className={i <= score ? "on" : "off"}
            onClick={() => setScore(i)}
          >
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
