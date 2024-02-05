import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { AxiosError } from "axios";
import {
  createUser,
  // createUser,
  // getUserGivenToken,
} from "../../functions/apiCalls";
import { useAuthWithoutToken } from "./AuthProvider";

type Props = {
  setCheckCreds: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

const CreateUserScreen = ({ setPage }: Props) => {
  const auth = useAuthWithoutToken();
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");

  //   const getUserWithToken = () => {
  //     getUserGivenToken(token)
  //       .then(({ data: user }) => {
  //         setApiRes(JSON.stringify(user));
  //       })
  //       .catch((err) => console.error(err));
  //   };

  const createUserPressed = () => {
    createUser(user, pass)
      .then(({ data }) => {
        auth.setAuthToken(data.token);
        console.log("user created");
        // setCheckCreds(true);
        // navigation.navigate("NavigationMenu");
      })
      .catch((err: AxiosError) => {
        // possible username conflict error
        console.log(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={style2.container}
        mode="contained"
        onPress={() => setPage("FirstScreen")}
      >
        Back
      </Button>
      <Text variant="displayMedium">Logo</Text>
      <Text>Welcome</Text>
      <TextInput
        mode="outlined"
        label="Email"
        value={user}
        onChangeText={(user) => setUser(user)}
      ></TextInput>
      <TextInput
        mode="outlined"
        label="Password"
        value={pass}
        onChangeText={(pass) => setPass(pass)}
        secureTextEntry={true}
      ></TextInput>
      <Button
        mode="contained"
        onPress={() => {
          createUserPressed();
          // loginUsingCreds();
        }}
      >
        Create User
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignContent: "center",
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

export default CreateUserScreen;
