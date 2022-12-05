import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { Main } from 'pages/Main/Main';
import { BoardList } from 'pages/BoardList/BoardList';
import { NewBoard } from 'components/NewBoard/NewBoard';
import { ErrorPage404 } from 'pages/404ErrorPage/404ErrorPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Router', () => {
  test('should render App', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Project Management App/i)).toBeInTheDocument();
  });
  test('should render error page if the path is wrong', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-route']}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board-list" element={<BoardList />} />
          <Route path="/board" element={<NewBoard />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/This page does not exist/i)).toBeInTheDocument();
  });
});
