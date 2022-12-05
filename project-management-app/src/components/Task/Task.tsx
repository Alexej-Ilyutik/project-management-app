import React from 'react';
import Container from 'react-bootstrap/Container';

import './Task.scss';

export function Task() {
  return (
    <Container>
      <h2 className="main__title">Task</h2>
      <div className="board__task">
        <h3 className="board__task-title">First Task</h3>
      </div>
    </Container>
  );
}
