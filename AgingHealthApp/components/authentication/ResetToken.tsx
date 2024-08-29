import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import React from "react";
import { resetRequest } from "../../functions/apiCalls";
import { AxiosError } from "axios";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

const ResetToken = ({ setPage }: Props) => {
  const [token, setToken] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");

  const resetPressed = () => {
    setPage("LoginPageStub");
    // resetRequest(token)
    //   .then(({ data }) => {
    //     console.log(data);
    //     console.log("reset requested");
    //   })
    //   .catch((err: AxiosError) => {
    //     // possible username conflict error
    //     console.log(err.message);
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.container2}
        mode="contained"
        onPress={() => setPage("LoginPageStub")}
      >
        Back
      </Button>
      <Text variant="displayMedium">Logo</Text>
      <Text>Enter the token sent to your email and new password</Text>
      <TextInput
        style={styles.container3}
        mode="outlined"
        label="Token"
        value={token}
        onChangeText={(token) => setToken(token)}
      ></TextInput>
      <TextInput
        style={styles.container3}
        mode="outlined"
        label="New Password"
        value={newPass}
        onChangeText={(newPass) => setNewPass(newPass)}
      ></TextInput>
      <TextInput
        style={styles.container3}
        mode="outlined"
        label="Confirm Password"
        value={confPass}
        onChangeText={(confPass) => setConfPass(confPass)}
      ></TextInput>
      <Button
        mode="contained"
        onPress={() => {
          resetPressed();
        }}
      >
        Reset
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
export default ResetToken;
