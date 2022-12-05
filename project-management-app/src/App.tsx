import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';

import { Navigation } from './components/Navigation/Navigation';
import { Main } from 'pages/Main/Main';
import { BoardList } from 'pages/BoardList/BoardList';
import { Board } from 'pages/Board/Board';
import { Profile } from 'pages/Profile/Profile';
import { Task } from 'components/Task/Task';
import { ErrorPage404 } from 'pages/404ErrorPage/404ErrorPage';
import { Footer } from 'components/Footer/Footer';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { checkIsTokenExpired } from 'services/checkIsTokenExpired';
import { SignIn } from 'pages/SignIn/SignIn';
import { SignUp } from 'pages/SignUp/SignUp';

import './App.scss';
import { NewBoard } from 'components/NewBoard/NewBoard';
import { useGetUserByIdQuery } from 'services/kanbanApiUsers';
import { decodeToken } from 'react-jwt';
import { DecodedTokenInterface } from 'types/DecodedTokenInterface';

export function App() {
  const { token } = useTypedSelector((state) => state.globalState);
  const navigate = useNavigate();

  const isTokenExpired = useMemo(() => checkIsTokenExpired(token), [token]);

  const { data } = useGetUserByIdQuery((decodeToken(token) as DecodedTokenInterface)?.id || '', {
    skip: !token,
  });

  useEffect(() => {
    localStorage.setItem('login', data?.login || '');
  }, [data]);

  useEffect(() => {
    if (isTokenExpired) navigate('/');
  }, [isTokenExpired]);

  return (
    <>
      <header className="header">
        <Navigation isTokenExpired={isTokenExpired} />
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/new-board" element={<NewBoard />} />
          <Route path="/board-list" element={<BoardList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/task" element={<Task />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
