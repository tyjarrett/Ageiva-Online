import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import React from "react";

type Props = {
    setPage: React.Dispatch<React.SetStateAction<string>>;
  };

const ResetScreen = ( {setPage} : Props) => {
  const [email, setEmail] = useState("");
  
  return (
    <SafeAreaView style={styles.container}>
      <Button style={styles.container2} mode="contained" onPress={() => setPage("FirstScreen")}>
              Back
      </Button>
      <Text variant="displayMedium">Logo</Text>
      <Text>Enter Email for Password Verification Form</Text>
      <TextInput 
        mode ="outlined"
        label="Password"
        value={email}
        onChangeText={email => setEmail(email)}
      >    
      </TextInput>
      <Button mode="contained" onPress={() => setPage("LoginPageStub")}>
                  Send
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    gap: 30,
    alignContent: "center",
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
});
export default ResetScreen;