import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Loading } from 'components/Loading/Loading';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import Container from 'react-bootstrap/esm/Container';
import { useAuthSignUpMutation } from 'services/kanbanApiAuth';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { RequestErrorInterface, SignUpRequest } from 'types/kanbanApiTypes';

export function SignUp() {
  const [signUpRequest, signUpResponse] = useAuthSignUpMutation();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequest>();

  const onSubmitHandler: SubmitHandler<SignUpRequest> = (data) => {
    signUpRequest({ name: data.name, login: data.login, password: data.password });
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/sign-in');
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  useEffect(() => {
    setIsErrorModalOpen(signUpResponse.isError);
    setIsSuccessModalOpen(signUpResponse.isSuccess);
  }, [signUpResponse]);

  return (
    <Container>
      <h2 className="main__title">{languageChoice ? 'Sign Up' : 'Регистрация'}</h2>
      <ModalWindow show={isSuccessModalOpen} onHide={handleCloseSuccessModal} title={'Success'}>
        <p>{languageChoice ? 'New User created!' : 'Новый пользователь создан!'}</p>
      </ModalWindow>
      <ModalWindow show={isErrorModalOpen} onHide={handleCloseErrorModal} title={'Error'}>
        <p>
          {signUpResponse.error && (signUpResponse.error as RequestErrorInterface).data.message}
        </p>
      </ModalWindow>
      {signUpResponse.isLoading ? (
        <Loading />
      ) : (
        <form
          className="sign-up-form"
          style={{ maxWidth: '25rem', margin: '0 auto' }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="form-group">
            <label htmlFor="sign-up-form__name-input">{languageChoice ? 'Name' : 'Имя'}</label>
            <input
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
              type="text"
              placeholder={'Name...'}
              className="form-control"
              id="sign-up-form__name-input"
              aria-describedby="emailHelp"
            />
            {/* <small id="emailHelp" className="form-text text-muted">
          We&apos;ll never share your email with anyone else.
        </small> */}
          </div>
          <div style={{ height: '2rem', color: 'red' }}>
            {errors?.name && <p>{errors?.name?.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="sign-up-form__login-input">{languageChoice ? 'Login' : 'Логин'}</label>
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
              id="sign-up-form__login-input"
            />
          </div>
          <div style={{ height: '2rem', color: 'red' }}>
            {errors?.login && <p>{errors?.login?.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="sign-up-form__password-input">
              {languageChoice ? 'Password' : 'Пароль'}
            </label>
            <input
              // {...register('password', { required: true })}
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
              id="sign-up-form__password-input"
            />
          </div>
          <div style={{ height: '2rem', color: 'red' }}>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="sign-up-form__check1" />
            <label className="form-check-label" htmlFor="sign-up-form__check1">
              {languageChoice ? "I'm not a robot!" : 'Я не робот'}
            </label>
          </div>
          <button
            type="submit"
            style={{ width: '15rem', margin: '2.5rem auto', display: 'block' }}
            className="btn btn-primary"
          >
            {languageChoice ? 'Submit' : 'Зарегистрироваться'}
          </button>
        </form>
      )}
    </Container>
  );
}
