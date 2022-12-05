import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faListSquares,
  faGlobe,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

import './Navigation.scss';

interface NavigationProps {
  isTokenExpired: boolean;
}

export function Navigation({ isTokenExpired }: NavigationProps) {
  const [navBarTheme, setnavBarTheme] = useState('header__navbar');
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
  const { setToken, changeLanguage } = useActions();

  const changeNavBarTheme = () => {
    window.scrollY >= 80
      ? setnavBarTheme('header__navbar navbar-scroll')
      : setnavBarTheme('header__navbar');
  };

  window.addEventListener('scroll', changeNavBarTheme);

  const changeLanguageFunc = () => {
    changeLanguage(!languageChoice);
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className={navBarTheme}>
      <Container>
        <Navbar.Brand className="font-weight-bold navbar__logo" href="/">
          {languageChoice ? 'Project Management App' : 'Приложение для управления проектами'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="navbar__item">
          {!isTokenExpired && (
            <Nav className="me-auto navbar__link-container">
              <Nav.Link className="navbar__link" as={Link} to="/new-board">
                <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
                {languageChoice ? 'New Board' : 'Новая Доска'}
              </Nav.Link>
              <Nav.Link className="navbar__link" as={Link} to="/board-list">
                <FontAwesomeIcon className="mr-1" icon={faListSquares} size="xs" />
                {languageChoice ? 'Boards' : 'Доски'}
              </Nav.Link>
              <Nav.Link className="navbar__link" as={Link} to="/profile">
                <FontAwesomeIcon className="mr-1" icon={faUser} size="xs" />
                {languageChoice ? 'Edit Profile' : 'Редактировать профиль'}
              </Nav.Link>
            </Nav>
          )}
          <Nav className="navbar__btn-container">
            <button type="button" className="navbar__btn" onClick={changeLanguageFunc}>
              <FontAwesomeIcon className="mr-1" icon={faGlobe} size="xs" />
              {languageChoice ? 'En' : 'Ru'}
            </button>
            {!isTokenExpired ? (
              <button
                type="button"
                className="navbar__btn"
                onClick={() => {
                  setToken('');
                  localStorage.removeItem('token');
                }}
              >
                <FontAwesomeIcon
                  className="element__star mr-1"
                  icon={faRightFromBracket}
                  size="xs"
                />
                {languageChoice ? 'Sign Out' : 'Выход'}
              </button>
            ) : (
              <>
                <Nav className="me-auto navbar__link-container">
                  <Nav.Link className="navbar__link" as={Link} to="/sign-up">
                    <FontAwesomeIcon className="mr-1" icon={faRightFromBracket} size="xs" />
                    {languageChoice ? 'Sign up' : 'Зарегистрироваться'}
                  </Nav.Link>
                  <Nav.Link className="navbar__link" as={Link} to="/sign-in">
                    <FontAwesomeIcon className="mr-1" icon={faRightFromBracket} size="xs" />
                    {languageChoice ? ' Sign In' : 'Войти'}
                  </Nav.Link>
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
