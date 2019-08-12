export interface IProject {
  id: string;
  name: string;
  priority: number;
  completed: boolean;
  userId: string;
}

export interface IUser {
  id: string;
  username: string;
  name: string;
  password: string;
}

export interface IAuth {
  token: string;
  user: IUser;
}

export const users: IUser[] = [
  { id: 'user1', username: 'admin', name: 'Administrator', password: 'admin' },
  { id: 'user2', username: 'user', name: 'IUser', password: 'user' },
];

export const projects: IProject[] = [
  {
    id: 'project1',
    name: 'First project',
    priority: 4,
    userId: 'user1',
    completed: true,
  },
  {
    id: 'project2',
    name: 'Second project',
    priority: 1,
    userId: 'user2',
    completed: true,
  },
  {
    id: 'project3',
    name: 'Just an idea',
    priority: 2,
    userId: 'user1',
    completed: false,
  },
  {
    id: 'project4',
    name: 'Amazing project',
    priority: 1,
    userId: 'user1',
    completed: false,
  },
  {
    id: 'project5',
    name: 'Great idea',
    priority: 2,
    userId: 'user2',
    completed: false,
  },
];
