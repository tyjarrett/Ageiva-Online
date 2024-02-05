import React from "react";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import {
  AuthContextTokenNotRequired,
  AuthContextTokenRequired,
} from "../../types/Authentication";

const AuthContext = createContext<AuthContextTokenNotRequired | undefined>(
  undefined
);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined as User | undefined);
  const [clearIndicator, setClearIndicator] = useState(false);

  const clearAuth = useCallback(() => {
    async function clear() {
      await SecureStore.deleteItemAsync("token");
      setAuthToken("");
      setCurrentUser(undefined);
      setClearIndicator((prev) => !prev);
    }

    clear();
  }, [setAuthToken, setCurrentUser, setClearIndicator]);

  const authContextValue = {
    authToken,
    setAuthToken,
    currentUser,
    setCurrentUser,
    clearAuth,
    clearIndicator,
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
