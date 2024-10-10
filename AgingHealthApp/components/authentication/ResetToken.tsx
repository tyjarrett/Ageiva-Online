import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import React from "react";
import { resetPassToken } from "../../functions/apiCalls";
import { AxiosError } from "axios";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setPassToken: React.Dispatch<React.SetStateAction<string>>;
};

const ResetToken = ({ setPage, setPassToken }: Props) => {
  const [token, setToken] = useState("");
  const [errText, setErrText] = useState("");
  const [isError, setIsError] = useState(false);
  const [isloading, setLoading] = useState(false);

  const resetPressed = () => {
    resetPassToken(token)
      .then(({ data }) => {
        console.log("token verified");
        setPassToken(token);
        setPage("ResetPass");
      })
      .catch((err: AxiosError) => {
        // possible username conflict error
        console.log(err.message);
        setErrText("Incorrect Token");
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
        <Text>Enter the token sent to your email</Text>
        {isError ? <Text style={styles.error}>{errText}</Text> : <></>}
        <TextInput
          style={styles.container3}
          keyboardType="numeric"
          mode="outlined"
          label="Token"
          value={token}
          onChangeText={(token) => setToken(token)}
        ></TextInput>
        <Button
          mode="contained"
          loading={isloading}
          onPress={() => {
            if (!isloading) {
              resetPressed();
            }
            setLoading(true);
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
    width: 120,
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
  },
  error: {
    color: "rgb(255, 90, 80)",
    textAlign: "center",
    width: 250,
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
export default ResetToken;
