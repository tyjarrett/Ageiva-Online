import NavigationMenu from "../navigation/NavigationMenu";
import {
  NavigationContainer,
  DarkTheme as NavigationTheme,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, adaptNavigationTheme } from "react-native-paper";
import LoginPageStub from "./LoginPageStub";
import { getToken, getUserGivenToken } from "../../functions/apiCalls";
import { useAuthWithoutToken } from "./AuthProvider";
import { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

const LoginOrApp = () => {
  const auth = useAuthWithoutToken();
  const [credsEntered, setCredsEntered] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loadingCreds, setLoadingCreds] = useState(true);
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: NavigationTheme,
  });

  useEffect(() => {
    async function fetchCreds() {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        auth.setAuthToken(token);
        getUserGivenToken(token)
          .then(({ data: user }) => {
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
  }, [credsEntered]);

  return (
    <>
      {loadingCreds ? (
        <Text>Loading</Text>
      ) : isAuthorized ? (
        <NavigationContainer theme={DarkTheme}>
          <NavigationMenu />
        </NavigationContainer>
      ) : (
        <LoginPageStub setCredsEntered={setCredsEntered} />
      )}
    </>
  );
};

export default LoginOrApp;
