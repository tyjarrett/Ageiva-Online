type AuthContextBaseType = {
  authToken: string | undefined;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  clearAuth: VoidFunction;
  clearIndicator: boolean;
};

export type AuthContextTokenNotRequired = {
  authToken: string | undefined;
  currentUser: User | undefined;
} & AuthContextBaseType;

export type AuthContextTokenRequired = {
  authToken: string;
  currentUser: User;
} & AuthContextBaseType;
