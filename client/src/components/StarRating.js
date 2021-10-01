import React, { useState } from "react";
import { BsStar } from 'react-icons/bs';

const StarRating = () => {
  const [score, setScore] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, i) => {

        i += 1;

        return (
          <button
            type="button"
            key={i}
            className={i <= score ? "on" : "off"}
            onClick={() => setScore(i)}
          >
            <BsStar />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
