import React from 'react';
import RestaurantsList from './RestaurantsList';

const Home = () => {
  return (
    <>
      <div className="home__header">
        <div className="home__header-image"/>
      </div>
      <section className="home__content-body">
        <RestaurantsList />
      </section>
    </>
  );
};

export default Home;
