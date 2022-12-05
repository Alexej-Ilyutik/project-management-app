import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import { PrevTask } from 'components/PrevTask/PrevTask';
import { useGetTasksInColumnQuery, useUpdateSetOfTasksMutation } from 'services/kanbanApiTasks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Task } from 'types/kanbanApiTypes';
import { sortByField } from 'services/sortArrayByFieldOfObj';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { ModalCreateEl } from 'components/ModalCreateEl/ModalCreateEl';

import './Card.scss';

import { Droppable, Draggable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDeleteColumnByIdMutation } from 'services/kanbanApiColumns';

interface ICardProps {
  title: string;
  cardId: string;
  boardId: string;
}

export function Card({ title, cardId, boardId }: ICardProps) {
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
  const { data: tasksData } = useGetTasksInColumnQuery({
    boardId: boardId,
    columnId: cardId,
  });
  const [arrayOfTask, setArrayOfTask] = useState<Task[]>([]);
  const [updatedArrayOfTask, setUpdatedArrayOfTask] = useState<
    { _id: string; order: number; columnId: string }[]
  >([]);
  const [changeOrderRequest, newArrayOfTask] = useUpdateSetOfTasksMutation();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [deleteCard] = useDeleteColumnByIdMutation();

  useEffect(() => {
    if (tasksData !== undefined) {
      if (tasksData?.length > 0) {
        setArrayOfTask([...tasksData].sort(sortByField('order')));
      } else {
        setArrayOfTask(tasksData);
      }
    }
  }, [tasksData]);

  useEffect(() => {
    if (updatedArrayOfTask.length) changeOrderRequest(updatedArrayOfTask);
  }, [updatedArrayOfTask]);

  useEffect(() => {
    if (newArrayOfTask.isSuccess) {
      setArrayOfTask([...newArrayOfTask.data].sort(sortByField('order')));
    }
  }, [newArrayOfTask]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    setArrayOfTask(() => {
      const newArrayOfTask = arrayOfTask.map((task) => {
        return { ...task };
      });
      newArrayOfTask[source.index].order = destination.index + 1;
      newArrayOfTask[destination.index].order = source.index + 1;
      return newArrayOfTask.sort(sortByField('order'));
    });

    setUpdatedArrayOfTask(() => {
      const newArrayOfTask = arrayOfTask.map((task) => {
        return { _id: task._id, order: task.order, columnId: task.columnId };
      });
      newArrayOfTask[source.index].order = destination.index + 1;
      newArrayOfTask[destination.index].order = source.index + 1;
      return newArrayOfTask;
    });
  };

  const handleCloseNewTaskModal = () => {
    setIsNewTaskModalOpen(!isNewTaskModalOpen);
  };

  const handleDeleteCardButton = (event: React.MouseEvent) => {
    if ((event.target as Element).closest('.card__delete')) {
      deleteCard({ boardId: boardId, columnId: cardId });
    }
  };

  return (
    <div className="board__card" onClick={handleDeleteCardButton}>
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          {title} <span className="board__card-count">({arrayOfTask?.length} Tasks)</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon card__delete mr-1" icon={faTrash} />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={cardId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="board__card-container"
            >
              {arrayOfTask.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PrevTask
                        title={task.title}
                        description={task.description}
                        cardId={cardId}
                        taskId={task._id}
                        boardId={boardId}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div
        className="board__card-footer"
        onClick={() => {
          setIsNewTaskModalOpen(true);
        }}
      >
        <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
        {languageChoice ? 'Add Task' : 'Добавить Задачу'}
      </div>
      <ModalWindow
        show={isNewTaskModalOpen}
        onHide={handleCloseNewTaskModal}
        title={languageChoice ? 'New Task' : 'Новая Задача'}
      >
        <ModalCreateEl
          title={languageChoice ? 'Name of Task' : 'Название Задачи'}
          description={languageChoice ? 'Add description' : 'Добавьте описание'}
          onHideModal={handleCloseNewTaskModal}
          boardId={boardId}
          cardId={cardId}
          showDescription={true}
          isTask={true}
          isCard={false}
          arrLength={arrayOfTask.length}
        />
      </ModalWindow>
    </div>
  );
}
