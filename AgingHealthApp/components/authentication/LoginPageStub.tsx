import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../../style/CommonStyles";
import { Button, Text, Title } from "react-native-paper";
import { View } from "react-native";
import {
  createUser,
  getToken,
  getUserGivenToken,
} from "../../functions/apiCalls";
import { useState } from "react";
import { useAuthWithoutToken } from "./AuthProvider";
import * as SecureStore from "expo-secure-store";
import { AxiosError } from "axios";

type Props = {
  setCheckCreds: React.Dispatch<React.SetStateAction<boolean>>;
};

// temporary login page -- should be removed after actual login page is created
const LoginPageStub = ({ setCheckCreds }: Props) => {
  const username = "lmartin8";
  const password = "password";
  const createUsername = "lmartin10";
  const createPassword = "password10";
  const token = "4636c8339533f1342e182e76a853560fedb35a85";
  const [apiRes, setApiRes] = useState("");
  const auth = useAuthWithoutToken();

  const getUserWithToken = () => {
    getUserGivenToken(token)
      .then(({ data: user }) => {
        setApiRes(JSON.stringify(user));
      })
      .catch((err) => console.error(err));
  };

  const loginUsingCreds = () => {
    getToken(username, password)
      .then(({ data: tkn }) => {
        SecureStore.setItemAsync("token", tkn.token).then((res) => {
          setCheckCreds(true);
        });
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        // probably incorrect creds, but need to do more error validation
      });

    // should set some loading in here for between the button press and the user being fetched
  };

  const createUserPressed = () => {
    createUser(createUsername, createPassword)
      .then(({ data }) => {
        auth.setAuthToken(data.token);
        setCheckCreds(true);
      })
      .catch((err: AxiosError) => {
        // possible username conflict error
        console.log(err.message);
      });
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={{ backgroundColor: "#000", ...commonStyles.centerStack }}>
        <Title>Login Page</Title>
        <Text>{`Api res: ${apiRes}`}</Text>
        <Button onPress={getUserWithToken}>User with token</Button>
        <Button onPress={loginUsingCreds}>Login using creds</Button>
        <Button onPress={createUserPressed}>Create user</Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginPageStub;
