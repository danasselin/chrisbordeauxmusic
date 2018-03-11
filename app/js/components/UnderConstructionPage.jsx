import React from 'react';

const emoji = require('node-emoji');

export default () => (
  <div className="under-construction">
    <h4>Page under construction! More content coming soon</h4>
    {[1, 2, 3].map(() => emoji.get('thinking_face'))}
  </div>
);
