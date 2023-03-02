import React from 'react';
import { Link } from 'react-router-dom';
function PriyaPradeep() {
  return (
    <div>
      <Link to="/">Home page</Link>
      <h2 h2 className="names">
        Priya Pradeep
      </h2>
      <h4 className="introduce">
        Hello, my name Priya Pradeep. I am senior at San Francisco State
        University and working towards a bachelors degree in Computer Science.
        One thing I love about computer science is that there is so much to
        learn and discover. You can choose from a huge variety of careers,
        including creating useful apps, scientific study, development,
        transportation, banking, and communications. Everyone can discover their
        place in this dynamic field while also having fun doing it. I love
        playing volleyball and I like to hit the gym to stay fit. During my free
        time I like to paint and read books. I also love to travel and explore
        different food and culture.
      </h4>
    </div>
  );
}

export default PriyaPradeep;
