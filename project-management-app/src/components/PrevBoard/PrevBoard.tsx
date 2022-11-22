import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import './PrevBoard.scss';

// interface IPrevCardProps {
//   getCurrentCard: () => void;
// }

export function PrevBoard() {
  return (
    <Card bg="Light" text="dark" className="prevboard mb-4">
      <Card.Header className="d-flex justify-content-between">
        <div className="prevboard__header d-flex align-items-center">
          <FontAwesomeIcon className="prevboard__header-icon mr-1" icon={faEdit} />
          <div className="prevboard__header-description">Edit</div>
        </div>
        <div className="prevboard__header d-flex align-items-center">
          <FontAwesomeIcon className="prevboard__header-icon mr-1" icon={faTrash} />
          <div className="prevboard__header-description">Delete</div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title> Card Title </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the card
          content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
