import { useJwt } from 'react-jwt';
import { globalStateActions } from 'store/action-creators/globalStateActions';
import { DecodedTokenInterface } from 'types/DecodedTokenInterface';
import { SignInRequest } from 'types/kanbanApiTypes';
import { useAuthSignInQuery } from '../services/kanbanApiAuth';

export function useAuthSignIn(
  { login, password }: SignInRequest,
  skip: boolean
): DecodedTokenInterface | null {
  const { data } = useAuthSignInQuery({ login, password }, { skip });
  console.log('action'); //!!!
  let token = '';
  if (data) token = data.token;

  localStorage.setItem('token', token);
  globalStateActions.setToken(token);

  const decodedData = useJwt<DecodedTokenInterface>(token);
  return decodedData.decodedToken;
}
