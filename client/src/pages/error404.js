import React from 'react';

function Error404({ location }) {
  return (
    <h1>
      {`B-limey guvnor, it sure seems '${
        location.pathname
      }' is missing!`}
    </h1>
  );
}
export default Error404;
