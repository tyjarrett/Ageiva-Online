import React from "react";
import NavigationMenu from "../navigation/NavigationMenu";
import {
  NavigationContainer,
  DarkTheme as NavigationTheme,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, adaptNavigationTheme } from "react-native-paper";
import LoginPageStub from "./LoginPageStub";
import { getUserGivenToken } from "../../functions/apiCalls";
import { useAuthWithoutToken } from "./AuthProvider";
import { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

const LoginOrApp = () => {
  const auth = useAuthWithoutToken();
  const [checkCreds, setCheckCreds] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loadingCreds, setLoadingCreds] = useState(true);
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: NavigationTheme,
  });

  useEffect(() => {
    console.log("check auth");
    setIsAuthorized(false);
    if (!checkCreds) {
      return;
    }
    async function fetchCreds() {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        auth.setAuthToken(token);
        console.log("getting user");
        getUserGivenToken(token)
          .then(({ data: user }) => {
            console.log("user got");
            auth.setCurrentUser(user);
            setIsAuthorized(true);
            setLoadingCreds(false);
          })
          .catch((err: AxiosError) => {
            // possibly invalid token, but should do more error validation
            console.log(err.message);
            setLoadingCreds(false);
          });
      } else {
        console.log("no creds");
        setLoadingCreds(false);
      }
      setLoadingCreds(false);
      // should eventually remove all of these console logs
    }
    fetchCreds();
    setCheckCreds(false);
  }, [checkCreds, auth.clearIndicator]);

  return (
    <>
      {loadingCreds ? (
        <Text>Loading</Text>
      ) : isAuthorized && auth.authToken ? (
        <NavigationContainer theme={DarkTheme}>
          <NavigationMenu />
        </NavigationContainer>
      ) : (
        <LoginPageStub setCheckCreds={setCheckCreds} />
      )}
    </>
  );
};

export default LoginOrApp;
