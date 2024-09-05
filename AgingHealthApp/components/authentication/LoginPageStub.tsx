import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { commonStyles } from "../../style/CommonStyles";
import { Button, Text, TextInput } from "react-native-paper";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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
  const [style, setStyle] = useState(false);

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
        setStyle(true);
        // probably incorrect creds, but need to do more error validation
      });

    // should set some loading in here for between the button press and the user being fetched
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/AH.png")}
        ></Image>
        <Text>Welcome Back</Text>
        <View style={styles.container3}>
          {style ? <Text style={styles.error}>{errText}</Text> : <></>}
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
        </View>
        <View style={styles.forgot}>
          <TouchableOpacity>
            <Text onPress={() => setPage("Reset")}>Forgot Your Password</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          loading={isloading}
          onPress={() => {
            if (!isloading) {
              loginUsingCreds();
            }
            setLoading(true);
          }}
        >
          Login
        </Button>
        <TouchableOpacity onPress={() => setPage("CreateUserScreen")}>
          <View style={styles.inLine}>
            <Text>Dont have an Account? </Text>
            <Text style={styles.bold}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 165,
    height: 140,
  },
  container: {
    display: "flex",
    alignContent: "center",
    flex: 1,
    flexWrap: "wrap",
    gap: 25,
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
    justifyContent: "center",
    paddingBottom: 75,
  },
  container3: {
    width: 250,
    gap: 25,
  },
  forgot: {
    fontSize: 20,
    marginTop: -15,
    width: 250,
    alignItems: "flex-end",
    alignContent: "flex-end",
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

export default LoginPageStub;
