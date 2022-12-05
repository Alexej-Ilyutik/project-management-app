import { isExpired } from 'react-jwt';

export function checkIsTokenExpired(token: string) {
  return isExpired(token);
}
