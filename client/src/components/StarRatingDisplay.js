import React, {useEffect, useRef} from 'react';

const StarRatingDisplay = (props) => {
  const starRef = useRef(null);
  const {rating} = props;

  useEffect(() => {
    const starPercentage = (rating / 5) * 100;
    const roundedStarPercentage = `${(Math.round(starPercentage / 10) * 10)}%`;
    starRef.current.style.width = roundedStarPercentage;
  }, [props.rating])

  return (
    <div className="star-rating-display">
      <div className="star-rating-display__fill" ref={starRef}></div>
    </div>
  )
}

export default StarRatingDisplay;
