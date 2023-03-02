import React from 'react';
import { Link } from 'react-router-dom';

function YuelingLiu() {
  return (
    <div>
      <Link to="/">Home page</Link>
      <div className="info">
        <div className="name">
          <h1>Yueling Liu</h1>
        </div>
        <div className="infobox">
          <h2>About Me</h2>
          <div>
            <p>
              My name is Yueling, and I am the team lead for RecipeReel Web
              Application
            </p>
            <p>I like to hang out with friends, and cooking.</p>
            <p> and going to SFSU for computer science.</p>
          </div>
          <p>
            <b>Major</b> : Computer Science
          </p>
          <p>
            <b>Grade Level</b> : Senior
          </p>
          <p>
            <b>Company Position</b> : Team Lead
          </p>
        </div>
      </div>
    </div>
  );
}

export default YuelingLiu;
