export const getUserId = (): string => {
  return localStorage.getItem('userId') || '';
};
