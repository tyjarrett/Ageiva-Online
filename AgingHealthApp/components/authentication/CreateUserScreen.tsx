import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { AxiosError } from "axios";
import {
  createUser,
  requestPassToken,
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
  const [pass2, setPass2] = useState("");
  const [user, setUser] = useState("");
  const [isloading, setLoading] = useState(false);
  const [style, setStyle] = useState(false);
  const [errText, setErrText] = useState("");

  //   const getUserWithToken = () => {
  //     getUserGivenToken(token)
  //       .then(({ data: user }) => {
  //         setApiRes(JSON.stringify(user));
  //       })
  //       .catch((err) => console.error(err));
  //   };

  const createUserPressed = () => {
    if (pass.length !== 0 || user.length !== 0) {
      if (pass === pass2) {
        createUser(user, pass)
          .then(({ data }) => {
            auth.setAuthToken(data.token);
            console.log("user created");
            setPage("LoginPageStub");
          })
          .catch((err: AxiosError) => {
            // possible username conflict error
            console.log(err.message);
            setLoading(false);
          });
      } else {
        setStyle(true);
        setLoading(false);
        setErrText("Passwords do not Match");
      }
    } else {
      setStyle(true);
      setLoading(false);
      setErrText("Please Complete All Fields");
    }
  };

  const apiTest = () => {
    requestPassToken("bobdylan@gmail.com")
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err: AxiosError) => {
        // possible username conflict error
        console.log(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayMedium">Logo</Text>
      <Text>Welcome</Text>
      <Button onPress={apiTest}>Test</Button>
      <View style={styles.container3}>
        {style ? <Text style={styles.error}>{errText}</Text> : <></>}
        <TextInput
          mode="outlined"
          label="Email"
          value={user}
          onChangeText={(user) => setUser(user)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={pass}
          onChangeText={(pass) => setPass(pass)}
          secureTextEntry={true}
        />
        <TextInput
          mode="outlined"
          label="Confirm Password"
          value={pass2}
          onChangeText={(pass2) => setPass2(pass2)}
          secureTextEntry={true}
        />
      </View>
      <Button
        mode="contained"
        loading={isloading}
        onPress={() => {
          setLoading(true);
          createUserPressed();
        }}
      >
        Create Account
      </Button>
      <TouchableOpacity onPress={() => setPage("LoginPageStub")}>
        <View style={styles.inLine}>
          <Text>Have an Account? </Text>
          <Text style={styles.bold}>Sign In</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    flex: 1,
    flexWrap: "wrap",
    gap: 25,
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
    justifyContent: "center",
    marginTop: -20,
  },
  container3: {
    width: 250,
    gap: 25,
  },
  error: {
    color: "rgb(255, 90, 80)",
    marginBottom: -20,
    width: 250,
  },
  inLine: {
    flexDirection: "row",
  },
  bold: {
    fontWeight: "bold",
    color: "rgb(220, 184, 255)",
  },
});

export default CreateUserScreen;
