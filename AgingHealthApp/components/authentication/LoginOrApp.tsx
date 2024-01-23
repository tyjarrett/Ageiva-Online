import NavigationMenu from "../navigation/NavigationMenu";
import {
  NavigationContainer,
  DarkTheme as NavigationTheme,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { adaptNavigationTheme } from "react-native-paper";
import LoginPageStub from "./LoginPageStub";
import { getUserGivenToken } from "../../functions/apiCalls";
import { useAuth } from "./AuthProvider";

const LoginOrApp = () => {
  const auth = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: NavigationTheme,
  });

  useEffect(() => {
    if (isAuthorized) {
      getUserGivenToken(auth.authToken).then(({ data: user }) => {
        auth.setCurrentUser(user);
        setUserLoaded(true);
      });
    }
  }, [isAuthorized]);

  return (
    <>
      {isAuthorized && userLoaded ? (
        <NavigationContainer theme={DarkTheme}>
          <NavigationMenu />
        </NavigationContainer>
      ) : (
        <LoginPageStub setIsAuthorized={setIsAuthorized} />
      )}
    </>
  );
};

export default LoginOrApp;
