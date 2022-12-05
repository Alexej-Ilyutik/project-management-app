export interface SignUpRequest {
  name: string;
  login: string;
  password: string;
}

export interface SignUpResponse {
  name: string;
  login: string;
  _id: string;
}

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface userInterface {
  _id: string;
  name: string;
  login: string;
}

export interface updateUserRequestInterface {
  userId: string;
  name: string;
  login: string;
  password: string;
}

export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface CreateEl {
  title: string;
  description: string;
}

export interface RequestErrorInterface {
  data: { statusCode: string; message: string };
}
