import React from 'react';
import { Link } from 'react-router-dom';

function YassonHaddish() {
  return (
    <div>
      <Link to="/">Home page</Link>
      <h2 className="names">Yasson Haddish</h2>
      <h4 className="introduce">
        Hello, I am SFSU CS student on my final year. I document for the
        website RecipeReel that is aiming to revolutionize the food search industry.
        I love playing basketball and go for a long walk. I also like to play video games 
        and make small demos on my free time. I enjoy eating good food and experience 
        new meal from different places, that is why I am passionate about this project. 
      </h4>
    </div>
  );
}

export default YassonHaddish;
