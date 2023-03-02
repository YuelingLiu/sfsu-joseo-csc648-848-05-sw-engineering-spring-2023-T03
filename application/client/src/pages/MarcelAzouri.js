import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function MarcelAzouri() {
  return (
    <div>
      <Link to="/">Home page</Link>
      <h2 className="names">Marcel Azouri</h2>
      <h4 className="introduce">
        My name is Marcel Azouri, I began my computer science journey at Diablo
        Valley City College (DVC) in 2018, and in fall of 2021, I transfered to
        San Francsico State University (SFSU) to get my Computer Science B.S.
        degree, along with a minor in mathematics. I learned C++ and Assembly
        Language at DVC, and learned HTMP, CSS, JavaScript, C, and Java at SFSU.
        I am bilingual, with English as my primary language, and French as my
        secondary language. My reason for supportting the idea our team chose is
        because as a kid, I spent many hours watching cooking shows with my
        father, and even now, I spend many hours of my free time watching
        cooking videos on YouTube.
      </h4>
    </div>
  );
}

export default MarcelAzouri;
