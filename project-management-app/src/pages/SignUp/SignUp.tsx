import { Loading } from 'components/Loading/Loading';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthSignUpMutation } from 'services/kanbanApiAuth';
import { RequestErrorInterface, SignUpRequest } from 'types/kanbanApiTypes';

export function SignUp() {
  const [signUpRequest, signUpResponse] = useAuthSignUpMutation();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  console.log(signUpResponse);

  const { register, handleSubmit } = useForm<SignUpRequest>();

  const onSubmitHandler: SubmitHandler<SignUpRequest> = (data) => {
    signUpRequest({ name: data.name, login: data.login, password: data.password });
  };

  const handleCloseSuccessErrorModal = () => {
    setIsSuccessModalOpen(false);
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
      <h2 className="main__title">Sign Up</h2>
      <ModalWindow
        show={isSuccessModalOpen}
        onHide={handleCloseSuccessErrorModal}
        title={'Success'}
      >
        <p>New User created</p>
      </ModalWindow>
      <ModalWindow show={isErrorModalOpen} onHide={handleCloseErrorModal} title={'Error'}>
        <p>
          {signUpResponse.error && (signUpResponse.error as RequestErrorInterface).data.message}
        </p>
      </ModalWindow>
      {signUpResponse.isLoading ? (
        <Loading />
      ) : (
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmitHandler)}>
          {/* <h1 className="sign-up-form__h1 h1"> Sign Up</h1> */}
          <div className="form-group">
            <label htmlFor="sign-up-form__name-input">Name</label>
            <input
              {...register('name', { required: true })}
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
          <div className="form-group">
            <label htmlFor="sign-up-form__login-input">Login</label>
            <input
              {...register('login', { required: true })}
              type="text"
              placeholder={'Login...'}
              className="form-control"
              id="sign-up-form__login-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sign-up-form__password-input">Password</label>
            <input
              {...register('password', { required: true })}
              type="password"
              className="form-control"
              id="sign-up-form__password-input"
            />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="sign-up-form__check1" />
            <label className="form-check-label" htmlFor="sign-up-form__check1">
              I&apos;m not a robot!
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </Container>
  );
}
