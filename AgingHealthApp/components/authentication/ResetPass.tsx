import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import React from "react";
import { resetPass } from "../../functions/apiCalls";
import { AxiosError } from "axios";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  passtoken: string;
};

const ResetPass = ({ setPage, passtoken }: Props) => {
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [errText, setErrText] = useState("");
  const [isError, setIsError] = useState(false);
  const [isloading, setLoading] = useState(false);

  const resetPressed = () => {
    // setPage("LoginPageStub");
    resetPass(passtoken, newPass, confPass)
      .then(({ data }) => {
        console.log("pass changed");
        setPage("LoginPageStub");
      })
      .catch((err: AxiosError) => {
        // possible username conflict error
        console.log(err.message);
        setErrText("Password not strong enough");
        setIsError(true);
        setLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Button
          style={styles.container2}
          mode="contained"
          onPress={() => setPage("LoginPageStub")}
        >
          Back
        </Button>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/AH.png")}
        ></Image>
        <Text>Enter your new password</Text>
        {isError ? (
          <View style={styles.error}>
            <Text style={styles.error}>{errText}</Text>
          </View>
        ) : (
          <></>
        )}
        <TextInput
          style={styles.container3}
          mode="outlined"
          label="New Password"
          value={newPass}
          onChangeText={(newPass) => setNewPass(newPass)}
        ></TextInput>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
          <TextInput
            style={styles.container3}
            mode="outlined"
            label="Confirm Password"
            value={confPass}
            onChangeText={(confPass) => setConfPass(confPass)}
          ></TextInput>
        </KeyboardAvoidingView>
        <Button
          mode="contained"
          loading={isloading}
          onPress={() => {
            if (!isloading && newPass === confPass) {
              resetPressed();
              setLoading(true);
            } else if (newPass !== confPass) {
              setLoading(false);
              setErrText("Passwords do not match");
              setIsError(true);
            } else {
              setLoading(true);
            }
          }}
        >
          Enter
        </Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 165,
    height: 140,
  },
  error: {
    color: "rgb(255, 90, 80)",
    textAlign: "center",
    width: 250,
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
  },
  container2: {
    position: "absolute",
    top: "10%",
    left: 10,
  },
  container3: {
    width: 250,
    gap: 25,
  },
});
export default ResetPass;
