import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import React from "react";
import { resetRequest } from "../../functions/apiCalls";
import { AxiosError } from "axios";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

const ResetScreen = ({ setPage }: Props) => {
  const [email, setEmail] = useState("");
  const [errText, setErrText] = useState("");
  const [isError, setIsError] = useState(false);
  const [isloading, setLoading] = useState(false);

  const resetRequestPressed = () => {
    resetRequest(email)
      .then(({ data }) => {
        console.log("reset requested");
        setPage("ResetRequest");
      })
      .catch((err: AxiosError) => {
        // possible username conflict error
        console.log(err.message);
        setErrText("That email is not in our records");
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
        <Text>Enter Email for Password Verification Form</Text>
        {isError ? (
          <View>
            <Text style={styles.error}>{errText}</Text>
            <Text style={styles.error}>Please Enter a New Email</Text>
          </View>
        ) : (
          <></>
        )}
        <TextInput
          style={styles.container3}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        ></TextInput>
        <Button
          mode="contained"
          loading={isloading}
          onPress={() => {
            if (!isloading) {
              resetRequestPressed();
            }
            setLoading(true);
          }}
        >
          Send
        </Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 120,
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
export default ResetScreen;
