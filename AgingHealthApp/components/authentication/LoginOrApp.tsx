import NavigationMenu from "../navigation/NavigationMenu";
import {
  NavigationContainer,
  DarkTheme as NavigationTheme,
} from "@react-navigation/native";
import { useState } from "react";
import { adaptNavigationTheme } from "react-native-paper";
import LoginPageStub from "./LoginPageStub";

const LoginOrApp = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: NavigationTheme,
  });

  return (
    <>
      {isAuthorized ? (
        <NavigationContainer theme={DarkTheme}>
          <NavigationMenu />
        </NavigationContainer>
      ) : (
        <LoginPageStub />
      )}
    </>
  );
};

export default LoginOrApp;
