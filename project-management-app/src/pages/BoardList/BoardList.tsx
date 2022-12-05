import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { useGetAllBoardsQuery } from 'services/kanbanApiBoards';
import { PrevBoard } from 'components/PrevBoard/PrevBoard';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Loading } from 'components/Loading/Loading';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

import './BoardList.scss';

export function BoardList() {
  const { isLoading, isError, data: boardsData } = useGetAllBoardsQuery();
  const { changeBoardID } = useActions();

  const { languageChoice } = useTypedSelector((state) => state.languageChoice);

  const clickHandlerBoard = (boardId: string) => {
    changeBoardID(boardId);
  };

  return (
    <Container>
      <h2 className="main__title">{languageChoice ? ' Boards List' : 'Список досок'}</h2>
      {isError ? (
        <ErrorMessage message="Something went wrong..." />
      ) : (
        <div className="board-list__container">
          {isLoading && <Loading />}
          {boardsData?.map((board) => (
            <Nav.Link
              onClick={() => clickHandlerBoard(board._id)}
              className="board-list__link"
              key={board._id}
              as={Link}
              to={`/board/${board._id}`}
            >
              <PrevBoard
                title={JSON.parse(board.title).title}
                description={JSON.parse(board.title).description}
                boardId={board._id}
              />
            </Nav.Link>
          ))}
        </div>
      )}
    </Container>
  );
}
