import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './Loading.scss';

export function Loading() {
  return (
    <div className="load__container d-flex align-center" data-testid="load-container">
      <Spinner animation="border" variant="warning" />
      <div className="load__text pl-2">Loading...</div>
    </div>
  );
}
