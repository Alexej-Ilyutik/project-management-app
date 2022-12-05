import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Loading } from 'components/Loading/Loading';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { useActions } from 'hooks/useActions';
import Container from 'react-bootstrap/esm/Container';
import { useAuthSignInQuery } from 'services/kanbanApiAuth';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { SignInRequest, RequestErrorInterface } from 'types/kanbanApiTypes';

export function SignIn() {
  const [signInData, setSignInData] = useState({ login: '', password: '' });
  const { setToken } = useActions();
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>();
  const { data, isLoading, error, isSuccess, isError } = useAuthSignInQuery(
    { login: signInData.login, password: signInData.password },
    { skip: Boolean(!signInData.login && !signInData.password) }
  );
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsErrorModalOpen(isError);
    setIsSuccessModalOpen(isSuccess);
  }, [isError, isSuccess]);

  const onSubmitHandler: SubmitHandler<SignInRequest> = (data) => {
    setSignInData({ login: data.login, password: data.password });
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/');
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      setToken(data.token);
    }
  }, [data]);

  return (
    <Container>
      <h2 className="main__title">{languageChoice ? 'Sign In' : 'Вход'}</h2>
      <ModalWindow show={isSuccessModalOpen} onHide={handleCloseSuccessModal} title={'Success'}>
        <p>{languageChoice ? 'Successfully sign in!' : 'Вход выполнен успешно!'}</p>
      </ModalWindow>
      <ModalWindow show={isErrorModalOpen} onHide={handleCloseErrorModal} title={'Error'}>
        <p>{error && (error as RequestErrorInterface).data.message}</p>
      </ModalWindow>
      {isLoading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <form
          className="sign-in-form"
          style={{ maxWidth: '25rem', margin: '0 auto' }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="form-group">
            <label htmlFor="sign-in-form__login-input">{languageChoice ? 'Login' : 'Логин'}</label>
            <input
              {...register('login', {
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
              type="text"
              placeholder={'Login...'}
              className="form-control"
              id="sign-in-form__login-input"
            />
          </div>
          <div style={{ height: '2rem', color: 'red' }}>
            {errors?.login && <p>{errors?.login?.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="sign-in-form__password-input">
              {languageChoice ? 'Password' : 'Пароль'}
            </label>
            <input
              {...register('password', {
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
              type="password"
              className="form-control"
              id="sign-in-form__password-input"
            />
          </div>
          <div style={{ height: '2rem', color: 'red' }}>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
          <button
            type="submit"
            style={{ width: '10rem', margin: '2.5rem auto', display: 'block' }}
            className="btn btn-primary"
          >
            {languageChoice ? 'Submit' : 'Войти'}
          </button>
        </form>
      )}
    </Container>
  );
}
