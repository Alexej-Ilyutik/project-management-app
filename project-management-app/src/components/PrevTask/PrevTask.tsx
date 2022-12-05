import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { useDeleteTasksByIdMutation } from 'services/kanbanApiTasks';
// import { useTypedSelector } from 'hooks/useTypedSelector';

import './PrevTask.scss';

interface IPrevTaskProps {
  title: string;
  description: string;
  boardId: string;
  cardId: string;
  taskId: string;
}

export function PrevTask({ title, description, cardId, taskId, boardId }: IPrevTaskProps) {
  // const { boardID } = useTypedSelector((state) => state.boardID);
  const [deleteTask] = useDeleteTasksByIdMutation();

  const handleclick = async (event: React.MouseEvent) => {
    event.preventDefault();
    if ((event.target as Element).closest('.task__delete')) {
      deleteTask({ boardId: boardId, columnId: cardId, taskId: taskId });
    }
  };

  return (
    <div className="prevTask__container" onClick={handleclick}>
      <div className="prevTask__header d-flex justify-content-between mb-1">
        <div className="prevTask__title">{title}</div>
        <FontAwesomeIcon className="prevcard__header-icon task__delete" icon={faClose} />
      </div>
      <div className="prevTask__description">{description}</div>
    </div>
  );
}
