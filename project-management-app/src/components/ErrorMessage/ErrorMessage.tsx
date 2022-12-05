import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

interface IErrorMessage {
  message: string;
}

export function ErrorMessage({ message }: IErrorMessage) {
  return (
    <Card
      className="text-center"
      style={{
        maxWidth: '20rem',
        margin: '10rem auto',
        color: 'var(--header-dark-bg)',
        border: '.2rem solid var(--info)',
      }}
    >
      <Card.Header>
        <FontAwesomeIcon style={{ color: 'var(--warning)' }} icon={faTriangleExclamation} />
      </Card.Header>

      <Card.Body>
        <Card.Title className="text-center">{message}</Card.Title>
      </Card.Body>
    </Card>
  );
}
