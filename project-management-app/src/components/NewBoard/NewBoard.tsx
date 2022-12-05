import React from 'react';
import Container from 'react-bootstrap/Container';
import './NewBoard.scss';
import { useForm } from 'react-hook-form';
import { useCreateBoardMutation } from 'services/kanbanApiBoards';
import { useTypedSelector } from 'hooks/useTypedSelector';

export type FormValues = {
  name: string;
  description: string;
};

// export function NewBoardFormModal() {
//   const [isNewBoardModalOpen, setNewBoardModalOpen] = useState(false);
//   const handleShowNewBoardModal = () => setNewBoardModalOpen(true);
//   const handleCloseNewBoardModal = () => setNewBoardModalOpen(false);

//   return (
//     <>
//       <button
//         style={{
//           background: 'none',
//           border: 'none',
//         }}
//         className="navbar__link"
//         onClick={handleShowNewBoardModal}
//       >
//         <FontAwesomeIcon className="element__star mr-1" icon={faPlus} size="xs" />
//         New Board
//       </button>
//       <ModalWindow
//         show={isNewBoardModalOpen}
//         onHide={handleCloseNewBoardModal}
//         title={getToken() ? 'Create board' : 'Something went wrong'}
//       >
//         {getToken() ? <NewBoardForm /> : <div>Login please</div>}
//       </ModalWindow>
//     </>
//   );
// }

function NewBoardForm() {
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
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
    //handleCloseNewBoardModal();
  };

  return (
    <form
      className="sign-in-form"
      style={{ maxWidth: '25rem', margin: '0 auto' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group">
        <label htmlFor="new-board-form__name">
          {languageChoice ? 'Name of board' : 'Название доски'}
        </label>
        <input
          type="text"
          placeholder="Board name"
          className="form-control"
          id="new-board-form__name"
          {...register('name', {
            required: 'This field is required',
            maxLength: {
              value: 15,
              message: 'Max length is 15',
            },
            minLength: {
              value: 2,
              message: 'Min length is 2',
            },
          })}
        />
      </div>
      <div style={{ height: '2rem', color: 'red' }}>
        {errors?.name && <p>{errors?.name?.message}</p>}
      </div>
      <label htmlFor="new-board-form__description">
        {languageChoice ? 'Description' : 'Описание доски'}
      </label>
      <input
        type="text"
        placeholder="Description"
        className="form-control"
        id="new-board-form__description"
        {...register('description', { required: false, maxLength: 66 })}
      />
      <button
        type="submit"
        disabled={!isValid}
        style={{ width: '10rem', margin: '2.5rem auto', display: 'block' }}
        className="btn btn-primary"
      >
        {languageChoice ? 'Submit' : 'Создать доску'}
      </button>
    </form>
  );
}

export function NewBoard() {
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
  return (
    <Container>
      <h2 className="main__title">{languageChoice ? 'New Board' : 'Новая доска'}</h2>
      <NewBoardForm />
    </Container>
  );
}
