import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { NewBoardFormModal } from 'components/NewBoard/NewBoard';

export function NewBoardButton() {
  return (
    <button
      style={{
        background: 'none',
        border: 'none',
      }}
      className="navbar__link"
      // onClick={() => NewBoardFormModal()}
    >
      <FontAwesomeIcon className="element__star mr-1" icon={faPlus} size="xs" />
      New Board
    </button>
  );
}
