import React from 'react';
import { underConstructionEmojis } from '~/app/js/helpers.jsx';

export default () => (
  <div className="under-construction">
    <p>
      {`Page under construction! More content coming soon ${underConstructionEmojis()}`}
    </p>
  </div>
);
