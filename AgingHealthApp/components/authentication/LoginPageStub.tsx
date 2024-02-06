import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { commonStyles } from "../../style/CommonStyles";
import { Button, Text, TextInput } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
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
const LoginPageStub = ({ setCheckCreds, setPage }: Props) => {
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [isloading, setLoading] = useState(false);
  const [errText, setErrText] = useState("");

  const loginUsingCreds = () => {
    getToken(user, pass)
      .then(({ data: tkn }) => {
        SecureStore.setItemAsync("token", tkn.token).then(() => {
          setCheckCreds(true);
        });
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        setErrText("Incorrect Username or Password");
        setLoading(false);
        // probably incorrect creds, but need to do more error validation
      });

    // should set some loading in here for between the button press and the user being fetched
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.container2}
        mode="contained"
        onPress={() => setPage("FirstScreen")}
      >
        Back
      </Button>
      <Text variant="displayMedium">Logo</Text>
      <Text>Welcome Back</Text>
      <TextInput
        mode="outlined"
        label="Email"
        value={user}
        onChangeText={(user) => setUser(user)}
      ></TextInput>
      <TextInput
        style={styles.container3}
        mode="outlined"
        label="Password"
        value={pass}
        onChangeText={(pass) => setPass(pass)}
        secureTextEntry={true}
      ></TextInput>
      <TouchableOpacity>
        <Text style={styles.forgot} onPress={() => setPage("Reset")}>
          Forgot Your Password
        </Text>
      </TouchableOpacity>
      <Button
        mode="contained"
        loading={isloading}
        onPress={() => {
          setLoading(true);
          loginUsingCreds();
        }}
      >
        Login
      </Button>
      <Text>{errText}</Text>
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
    alightItems: "stretch",
  },
  forgot: {
    fontSize: 13,
    alignItems: "flex-end",
  },
});

export default LoginPageStub;
