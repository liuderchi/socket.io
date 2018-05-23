import React from 'react';

const Welcome = ({ numUsers }) => {
  return (
    <small style={{ color: 'darkgrey'}}>
      {numUsers > 1
        ? `💬 Let's chat with ${numUsers} friends!`
        : `💬 Let's chat!`}
    </small>
  );
};

export default Welcome;
