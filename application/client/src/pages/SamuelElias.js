import React from 'react';
import { Link } from 'react-router-dom';
function SamuelElias() {
  return (
    <div>
      <Link to="/">Home page</Link>
      <h2 className="names"> Samuel Elias</h2>
      <h4 className="introduce">{/* write here */}</h4>
    </div>
  );
}

export default SamuelElias;
