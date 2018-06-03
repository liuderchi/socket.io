import React from 'react';

const Welcome = ({ numUsers, ...otherProps }) => (
  <small {...otherProps}>
    {numUsers > 1
      ? `💬 Let's chat with ${numUsers - 1} friends!`
      : `💬 Let's chat!`}
  </small>
);

export default Welcome;
