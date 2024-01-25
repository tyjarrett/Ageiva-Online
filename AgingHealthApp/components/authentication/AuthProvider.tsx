import { PropsWithChildren, createContext, useContext, useState } from "react";
import { testUser } from "../test/TestConstants";

const AuthContext = createContext<AuthContextTokenNotRequired | undefined>(
  undefined
);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined as User | undefined);
  const authContextValue = {
    authToken,
    setAuthToken,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthWithoutToken() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuthWithoutToken must be used within AuthContext");
  }
  return auth;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within AuthContext");
  }
  if (!auth.authToken) {
    throw new Error(
      "useAuth was used but authToken is not set. Maybe you meant to use useAuthWithoutToken?"
    );
  }
  if (!auth.currentUser) {
    throw new Error(
      "useAuth was used but currentUser is not set. Maybe you meant to use useAuthWithoutToken?"
    );
  }
  return auth as AuthContextTokenRequired;
}

export default AuthProvider;
