import { Task } from 'types/kanbanApiTypes';

export const sortByField = (field: keyof Task) => {
  return (a: Task, b: Task) => (a[field] > b[field] ? 1 : -1);
};
