import React from 'react';
import { useForm } from 'react-hook-form';

import { ErrorTextMessage } from 'components/ErrorTextMessage/ErrorTextMessage';
import { CreateEl, Task, Column, Board } from 'types/kanbanApiTypes';
import { useCreateTaskInColumnMutation } from 'services/kanbanApiTasks';
import { useCreateColumnInBoardMutation } from 'services/kanbanApiColumns';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useGetBoardByIdQuery, useUpdateBoardByIdMutation } from 'services/kanbanApiBoards';

import './ModalCreateEl.scss';

interface ICreateElForm {
  title: string;
  description?: string;
  boardId: string;
  cardId?: string;
  onHideModal: () => void;
  showDescription: boolean;
  isTask: boolean;
  isCard: boolean;
  isBoard?: boolean;
  arrLength?: number | undefined;
}

export function ModalCreateEl({
  title,
  description,
  onHideModal,
  boardId,
  cardId,
  showDescription,
  isTask,
  isCard,
  isBoard,
  arrLength,
}: ICreateElForm) {
  const [createTask] = useCreateTaskInColumnMutation<Task>();
  const [createCard] = useCreateColumnInBoardMutation<Column>();
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
  const [updateBoard] = useUpdateBoardByIdMutation<Board>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEl>();

  const currentBoard = useGetBoardByIdQuery(boardId);
  const currentBoardId = currentBoard.currentData?._id ? currentBoard.currentData._id : '';
  const currentBoardOwner = currentBoard.currentData?.owner ? currentBoard.currentData.owner : '';
  const currentBoardUsers = currentBoard.currentData?.users ? currentBoard.currentData.users : [''];

  const onSubmitHandler = (data: CreateEl) => {
    onHideModal();
    if (isTask) {
      createTask({
        boardId: boardId,
        columnId: cardId,
        title: data.title,
        order: arrLength,
        description: data.description,
        userId: '0',
        users: ['string'],
      });
    } else if (isCard) {
      createCard({
        boardId: boardId,
        title: data.title,
        order: arrLength,
      });
    } else if (isBoard) {
      updateBoard({
        boardId: currentBoardId,
        title: JSON.stringify({ title: data.title, description: data.description }),
        owner: currentBoardOwner,
        users: currentBoardUsers,
      });
    } else if (isBoard) {
      updateBoard({
        boardId: currentBoardId,
        title: JSON.stringify({ title: data.title, description: data.description }),
        owner: currentBoardOwner,
        users: currentBoardUsers,
      });
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-group">
        <label className="d-flex flex-column form__label">
          <span>{title}:</span>
          <input
            defaultValue={
              isBoard && currentBoard.currentData
                ? JSON.parse(currentBoard.currentData?.title).title
                : ''
            }
            className="form__input"
            type="text"
            autoFocus
            {...register('title', {
              required: {
                value: true,
                message: isBoard ? 'Board title required!' : 'Task title required!',
              },
              minLength: {
                value: 2,
                message: isBoard
                  ? 'Board title must contain more than 1 letter!'
                  : 'Task title must contain more than 1 letter!',
              },
              maxLength: {
                value: 15,
                message: isBoard
                  ? 'Board title must contain less than 15 letters!'
                  : 'Task title must contain less than 15 letters!',
              },
            })}
          />
        </label>
        <div className="form__error">
          {errors.title && <ErrorTextMessage error={errors.title.message} />}
        </div>
      </div>
      {showDescription && (
        <div className="form-group">
          <label className="d-flex flex-column form__label">
            <span>{description}:</span>
            <input
              defaultValue={
                isBoard && currentBoard.currentData
                  ? JSON.parse(currentBoard.currentData?.title).description
                  : ''
              }
              className="form__input"
              type="text"
              {...register('description', {
                required: {
                  value: isBoard ? false : true,
                  message: 'Task description required!',
                },
                minLength: {
                  value: 2,
                  message: 'Task description must contain more than 1 letter!',
                },
                maxLength: {
                  value: 50,
                  message: 'Task description must contain less than 50 letters!',
                },
              })}
            />
          </label>
          <div className="form__error">
            {errors.description && <ErrorTextMessage error={errors.description.message} />}
          </div>
        </div>
      )}
      <button
        type="submit"
        style={{ width: '10rem', margin: '2rem auto 1rem auto', display: 'block' }}
        className="btn btn-primary"
      >
        {languageChoice ? 'Submit' : 'Создать'}
      </button>
    </form>
  );
}
