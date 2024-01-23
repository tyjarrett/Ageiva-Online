import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../../style/CommonStyles";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { View } from "react-native";
import { getToken, getUserGivenToken } from "../../functions/apiCalls";
import { useState } from "react";
import { useAuthWithoutToken } from "./AuthProvider";

type Props = {
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
};

// temporary login page -- should be removed after actual login page is created
const LoginPageStub = ({ setIsAuthorized }: Props) => {
  const username = "lmartin8";
  const password = "password";
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
    getToken(username, password).then(({ data: tkn }) => {
      setApiRes(JSON.stringify(tkn));
      auth.setAuthToken(tkn.token);
      setIsAuthorized(true);
      // should set some loading in here for between the button press and the user being fetched
      // alternatively we could change the token endpoint to return the user
    });
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={{ backgroundColor: "#000", ...commonStyles.centerStack }}>
        <Title>Login Page</Title>
        <Text>{`Api res: ${apiRes}`}</Text>
        <Button onPress={getUserWithToken}>User with token</Button>
        <Button onPress={loginUsingCreds}>Login using creds</Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginPageStub;
