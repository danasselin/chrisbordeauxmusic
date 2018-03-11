import React from 'react';
import bio from '~/app/site_data/bio.json';

export default () => (
  <div className="card shaded padded contact">
    <h3>About</h3>
    <p>{ bio.data }</p>
  </div>
);
