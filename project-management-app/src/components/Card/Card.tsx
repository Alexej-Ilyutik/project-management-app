import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { Task } from 'types/kanbanApiTypes';
import { PrevTask } from 'components/PrevTask/PrevTask';
import { useGetTasksInColumnQuery } from 'services/kanbanApiTasks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { ModalCreateEl } from 'components/ModalCreateEl/ModalCreateEl';

import './Card.scss';

interface ICardProps {
  title: string;
  cardId: string;
}

export function Card({ title, cardId }: ICardProps) {
  const { boardID } = useTypedSelector((state) => state.boardID);
  const [isNewTaskModalOpen, setisNewTaskModalOpen] = useState(false);

  const { data: tasksData } = useGetTasksInColumnQuery({
    boardId: boardID,
    columnId: cardId,
  });

  const handleCloseNewTaskModal = () => {
    setisNewTaskModalOpen(!isNewTaskModalOpen);
  };

  // console.log(tasksData);

  const [taskArray, setTaskArray] = useState(tasksData);
  const getNewTask = (task: Task): void => {
    setTaskArray((current) => [...(current as []), task]);
  };
  // useEffect(() => {
  //   // setTaskArray((current) => [...current, { Carl }]);
  // }, [taskArray]);
  // console.log(taskArray);

  return (
    <div className="board__card">
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          {title} <span className="board__card-count">2</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faTrash} />
      </div>
      <div className="board__card-container">
        {taskArray?.map((task) => (
          <Nav.Link className="board__card-link" key={task._id} as={Link} to="/task">
            <PrevTask title={task.title} description={task.description} />
          </Nav.Link>
        ))}
      </div>
      <div
        className="board__card-footer"
        onClick={() => {
          setisNewTaskModalOpen(true);
        }}
      >
        <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
        Add Task
      </div>
      <ModalWindow show={isNewTaskModalOpen} onHide={handleCloseNewTaskModal} title="New Task">
        <ModalCreateEl
          title="Name of Task"
          description="Add description"
          onHideModal={handleCloseNewTaskModal}
          boardId={boardID}
          cardId={cardId}
          getTask={getNewTask}
        />
      </ModalWindow>
    </div>
  );
}
