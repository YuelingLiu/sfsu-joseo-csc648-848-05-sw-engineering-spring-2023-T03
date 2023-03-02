import React from 'react';
import { Link } from 'react-router-dom';

function YuelingLiu() {
  return (
    <div>
      <Link to="/">Home page</Link>
      <h2 className="names">Yueling Liu</h2>
      <h4 className="introduce">
        Hello! I am a senior majoring in Computer Science and the lead of
        RecipeReel, a web application that promotes amazing recipes. I enjoy
        social events, outdoor activities such as swimming and skiing, and
        spending time with my puppy on nice walks. In my free time, I like to do
        Yoga and Pilates. As a food enthusiast, I hope to inspire others to
        explore new culinary experiences through RecipeReel.
      </h4>
    </div>
  );
}

export default YuelingLiu;
