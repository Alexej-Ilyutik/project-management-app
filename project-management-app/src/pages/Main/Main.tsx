import React from 'react';
import Container from 'react-bootstrap/Container';
import { MDBIcon } from 'mdb-react-ui-kit';

import kanban from '../../assets/kanban.png';
import alexej from '../../assets/Alexej.jpg';
import anton from '../../assets/Anton.jpg';
import vadim from '../../assets/Vadzim.jpg';
import { useTypedSelector } from 'hooks/useTypedSelector';

import './Main.scss';

export function Main() {
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
  return (
    <Container>
      <h2 className="main__title">{languageChoice ? 'Main Page' : 'Главная Страница'}</h2>
      <section className="card p-4 mb-5">
        <div className="row">
          <div className="col-md-7 mb-3">
            <img src={kanban} className="card-img" alt="kanban" />
          </div>
          <div className="col-md-5" style={{ color: 'var(--header-dark-bg)' }}>
            <h2 className="card-title main-title mb-4 mt-5">
              {languageChoice
                ? 'Kanban board for teams to organize their work'
                : 'Канбан-доска для командной работы'}
            </h2>
            <h5 className="card-text">
              {languageChoice
                ? 'It is a project management software that allows you to centrally manage tasks and their timely completion. Trackers are widely used in project management, because they allow you to easily monitor all work processes and control the work of the team'
                : 'Это программа для управления проектами, которая позволяет централизованно руководить задачами и их своевременным выполнением. Трекеры широко используются в проектном менеджменте, потому что позволяют без труда следить за всеми рабочими процессами и контролировать работу команды'}
            </h5>
            <h5 className="card-text">
              {languageChoice
                ? 'Collaborate manage projects and reach new productivity peaks. Accomplish it all with RS Project Management App'
                : 'Управляйте проектами и командами, достигайте новых вершин продуктивности с помощью RS Project Management App'}
            </h5>
            <a
              className="description-link"
              href="https://docs.google.com/document/d/1-ADjPq036Ig0fKdvszD0LtrTa2JHT1FMh2emjRW3hB4/edit?usp=sharing"
            >
              {languageChoice ? 'Project description' : 'Описание проекта'}
            </a>
          </div>
        </div>
      </section>
      <section className="team-boxed">
        <div className="intro">
          <h2 className="main__title">{languageChoice ? 'Our team' : 'Наша команда'}</h2>
        </div>
        <div className="row people">
          <div className="col-md-6 col-lg-4 item">
            <div className="box">
              <img className="rounded border border-light" src={alexej} alt="ava" />
              <a
                href="https://alexej-ilyutik.github.io/rsschool-cv/"
                target="_blank"
                rel="noreferrer"
              >
                <h4 className="name">{languageChoice ? 'Alexej Ilyutik' : 'Алексей Ильютик'}</h4>
              </a>
              <p className="title">Frontend {languageChoice ? 'developer' : 'разработчик'}</p>
              <div className="social">
                <a
                  href="https://www.linkedin.com/in/alexej-ilyutik/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MDBIcon fab icon="linkedin-in" />
                </a>
                <a href="https://github.com/Alexej-Ilyutik" target="_blank" rel="noreferrer">
                  <MDBIcon fab icon="github" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <div className="box">
              <img className="rounded border border-light" src={anton} alt="ava" />
              <a
                href="https://github.com/NewAnton/rsschool-cv/blob/main/cv.md"
                target="_blank"
                rel="noreferrer"
              >
                <h4 className="name">{languageChoice ? 'Anton Korobov' : 'Антон Коробов'}</h4>
              </a>
              <p className="title">Frontend {languageChoice ? 'developer' : 'разработчик'}</p>
              <div className="social">
                <a
                  href="http://www.linkedin.com/in/%D0%B0%D0%BD%D1%82%D0%BE%D0%BD-%D0%BA%D0%BE%D1%80%D0%BE%D0%B1%D0%BE%D0%B2-a2a619221"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MDBIcon fab icon="linkedin-in" />
                </a>
                <a href="https://github.com/NewAnton" target="_blank" rel="noreferrer">
                  <MDBIcon fab icon="github" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <div className="box">
              <img className="rounded border border-light" src={vadim} alt="ava" />
              <a href="https://ej252.github.io/rsschool-cv/" target="_blank" rel="noreferrer">
                <h4 className="name">{languageChoice ? 'Vadzim Embala' : 'Вадим Ембала'}</h4>
              </a>
              <p className="title">Frontend {languageChoice ? 'developer' : 'разработчик'}</p>
              <div className="social">
                <a
                  href="https://www.linkedin.com/in/vadzim-embala-65021b200/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MDBIcon fab icon="linkedin-in" />
                </a>
                <a href="https://github.com/EJ252" target="_blank" rel="noreferrer">
                  <MDBIcon fab icon="github" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
