import React from 'react';

const myInformation = () => {
  console.log('hey itis mu');
};
export default function Button() {
  return (
    <div className="button" onClick={myInformation}>
      this is a button
    </div>
  );
}
