export interface User {
  userRole: string;
  name: string;
  emailAddress: string;
  _id: string;
}

export interface UserState {
  user: User | null;
  setSession: (user: User) => void;
  removeSession: () => void;
  getUser: () => User | null;
}
