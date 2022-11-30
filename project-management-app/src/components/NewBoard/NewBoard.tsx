import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './NewBoard.scss';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCreateBoardMutation } from 'services/kanbanApiBoards';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { getToken } from 'services/getToken';

export type FormValues = {
  name: string;
  description: string;
};

export function NewBoardFormModal() {
  const [isNewBoardModalOpen, setNewBoardModalOpen] = useState(false);
  const handleShowNewBoardModal = () => setNewBoardModalOpen(true);
  const handleCloseNewBoardModal = () => setNewBoardModalOpen(false);

  return (
    <>
      <button
        style={{
          background: 'none',
          border: 'none',
        }}
        className="navbar__link"
        onClick={handleShowNewBoardModal}
      >
        <FontAwesomeIcon className="element__star mr-1" icon={faPlus} size="xs" />
        New Board
      </button>
      <ModalWindow
        show={isNewBoardModalOpen}
        onHide={handleCloseNewBoardModal}
        title={getToken() ? 'Create board' : 'Something went wrong'}
      >
        {getToken() ? <NewBoardForm /> : <div>Login please</div>}
      </ModalWindow>
    </>
  );

  function NewBoardForm() {
    const [createBoard] = useCreateBoardMutation();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm<FormValues>({ mode: 'onBlur' });
    const onSubmit = async (data: FormValues) => {
      createBoard({
        title: JSON.stringify({ title: data.name, description: data.description }),
        owner: '123qwerty',
        users: ['123qwerty'],
      });
      reset();
      handleCloseNewBoardModal();
    };

    //console.log(errors);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Board name"
          {...register('name', {
            required: 'This field is required',
            maxLength: 66,
            minLength: {
              value: 2,
              message: 'Min length is 2',
            },
          })}
        />
        <div style={{ height: '2rem', color: 'red' }}>
          {errors?.name && <p>{errors?.name?.message}</p>}
        </div>
        <input
          type="text"
          placeholder="Description"
          {...register('description', { required: false, maxLength: 66 })}
        />
        <input type="submit" disabled={!isValid} />
      </form>
    );
  }
}

export function NewBoard() {
  return (
    <Container>
      <h2 className="main__title">New Board</h2>
    </Container>
  );
}
