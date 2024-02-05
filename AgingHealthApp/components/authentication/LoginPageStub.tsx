import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { commonStyles } from "../../style/CommonStyles";
import { Button, Text, TextInput } from "react-native-paper";
import {   StyleSheet, TouchableOpacity } from "react-native";
import {
  // createUser,
  getToken,
  // getUserGivenToken,
} from "../../functions/apiCalls";
import { useState } from "react";
// import { useAuthWithoutToken } from "./AuthProvider";
import * as SecureStore from "expo-secure-store";
import { AxiosError } from "axios";


// temporary login page -- should be removed after actual login page is created
type Props = {
  setCheckCreds: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
};
// temporary login page -- should be removed after actual login page is created
const LoginPageStub = ( {setCheckCreds, setPage} : Props) => {
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
          setCheckCreds(true);
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
    <SafeAreaView style={styles.container}>
      <Button style={styles.container2} mode="contained" onPress={() => setPage("FirstScreen")}>
              Back
      </Button>
      <Text variant="displayMedium">Logo</Text>
      <Text>Welcome Back</Text>
      <TextInput
        mode ="outlined"
        label="Email"
        value={user}
        onChangeText={user => setUser(user)}
      >    
      </TextInput>
      <TextInput
        style={styles.container3}
        mode ="outlined"
        label="Password"
        value={pass}
        onChangeText={pass => setPass(pass)}
        secureTextEntry = {true}
      >    
      </TextInput>
      <TouchableOpacity>
        <Text style={styles.forgot} onPress={() => setPage("Reset")}>Forgot Your Password</Text>
      </TouchableOpacity>
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
    display: "flex",
    alignContent: "center",
    flex: 1,
    flexWrap: "wrap",
    gap: 30,
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
    justifyContent: "center",
  },
  container2: {
    position: "absolute",
    top: 30,
    left: 10,
    backgroundColor: "rgb(29, 27, 30)",
  },
  container3: {
    alignContent: "stretch",
    alightItems: "stretch"
  },
  forgot: {
    fontSize: 13,
    alignItems: "flex-end",
  }
});

export default LoginPageStub;
