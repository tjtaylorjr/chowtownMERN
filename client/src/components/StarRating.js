import React, { useState } from "react";
import { BsStar } from 'react-icons/bs';
const StarRating = () => {
  return (
    <div>
      {[...Array(5)].map((star) => {
        return (
          <BsStar />
        );
      })}
    </div>
  );
};

export default StarRating;
