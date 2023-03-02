import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div className="names">
      <h1>Software Engineering Class SFSU</h1>
      <h1>Spring 2023 </h1>
      <h1>Section 5</h1>
      <h1>Team 3</h1>
      <br />
      <Link to="/YuelingLiu">
        <h2>Yueling Liu </h2>
      </Link>
      <Link to="/DuncanHerington">
        <h2> Duncan Herington </h2>
      </Link>
      <Link to="/MarcelAzouri">
        <h2>Marcel Azouri</h2>
      </Link>
      <Link to="/PriyaPradeep">
        <h2>Priya Pradeep </h2>
      </Link>
      <Link to="/NathanLeHowland">
        <h2>Nathan Le Howland </h2>
      </Link>
      <Link to="/SamuelElias">
        <h2>Samuel Elias </h2>
      </Link>
      <Link to="/YassonHaddish">
        <h2>Yasson Haddish</h2>
      </Link>
    </div>
  );
}

export default Home;
