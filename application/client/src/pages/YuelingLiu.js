import React from 'react';
import { Link } from 'react-router-dom';

function YuelingLiu() {
  return (
    <div>
      <Link to="/">Home page</Link>
      <h2 className="names">Yueling Liu</h2>
      <h4 className="introduce">
        Hello! I am a senior majoring in Computer Science and the lead of
        RecipeReal, I hope this website promotes amazing recipes. I enjoy social
        events, outdoor activities, cooking, wine testing, and practicing yoga
        and Pilates. As a food enthusiast, I hope to inspire others to explore
        new culinary experiences through RecipeReal.
      </h4>
    </div>
  );
}

export default YuelingLiu;
