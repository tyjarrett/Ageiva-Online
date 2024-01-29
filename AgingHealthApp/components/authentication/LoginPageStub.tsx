import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { commonStyles } from "../../style/CommonStyles";
import { Button, Text, TextInput } from "react-native-paper";
import {   StyleSheet } from "react-native";
import {
  // createUser,
  getToken,
  // getUserGivenToken,
} from "../../functions/apiCalls";
import { useState } from "react";
// import { useAuthWithoutToken } from "./AuthProvider";
import * as SecureStore from "expo-secure-store";
import { AxiosError } from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/RootStack";

// type Props = {
//   setCheckCreds: React.Dispatch<React.SetStateAction<boolean>>;
// };

type NavigationProps = NativeStackScreenProps<RootStackParamList, "LoginPageStub">;

// temporary login page -- should be removed after actual login page is created
const LoginPageStub = (/*{ setCheckCreds }: Props,*/ { navigation } : NavigationProps) => {
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  
  // const username = "lmartin8";
  // const password = "password";
  // const createUsername = "lmartin10";
  // const createPassword = "password10";
  // const token = "4636c8339533f1342e182e76a853560fedb35a85";
  // const [, setApiRes] = useState("");
  // const auth = useAuthWithoutToken();

  // const getUserWithToken = () => {
  //   getUserGivenToken(token)
  //     .then(({ data: user }) => {
  //       setApiRes(JSON.stringify(user));
  //     })
  //     .catch((err) => console.error(err));
  // };

  const loginUsingCreds = () => {
    getToken(user, pass)
      .then(({ data: tkn }) => {
        SecureStore.setItemAsync("token", tkn.token).then(() => {
          navigation.navigate("NavigationMenu");
        });
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        // probably incorrect creds, but need to do more error validation
      });

    // should set some loading in here for between the button press and the user being fetched
  };

  // const createUserPressed = () => {
  //   createUser(createUsername, createPassword)
  //     .then(({ data }) => {
  //       auth.setAuthToken(data.token);
  //       // setCheckCreds(true);
  //       navigation.navigate("NavigationMenu");
  //     })
  //     .catch((err: AxiosError) => {
  //       // possible username conflict error
  //       console.log(err.message);
  //     });
  // };

  return (
    // <SafeAreaView style={commonStyles.safeAreaView}>
    //   <View style={{ backgroundColor: "#000", ...commonStyles.centerStack }}>
    //     <Title>Login Page</Title>
    //     <Text>{`Api res: ${apiRes}`}</Text>
    //     <Button onPress={getUserWithToken}>User with token</Button>
    //     <Button onPress={loginUsingCreds}>Login using creds</Button>
    //     <Button onPress={createUserPressed}>Create user</Button>
    //   </View>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <Button style={style2.container} mode="contained" onPress={() => navigation.navigate("FirstScreen")}>
              Back
      </Button>
      <Text variant="displayMedium">Logo</Text>
      <Text>Welcome Back</Text>
      <TextInput
        mode ="outlined"
        label="Username"
        value={user}
        onChangeText={user => setUser(user)}
      >    
      </TextInput>
      <TextInput
        mode ="outlined"
        label="Password"
        value={pass}
        onChangeText={pass => setPass(pass)}
        secureTextEntry = {true}
      >    
      </TextInput>
      <Button mode="contained" onPress={() => {
        console.log({user, pass});
        loginUsingCreds();
      }}>
              Login
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    gap: 30,
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
    justifyContent: "center",
  },
});

const style2 = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
    left: 10,
    backgroundColor: "rgb(29, 27, 30)",
  },
});

export default LoginPageStub;
