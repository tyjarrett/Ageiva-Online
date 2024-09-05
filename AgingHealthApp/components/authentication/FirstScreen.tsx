import React from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";

type Props = {
  setCheckCreds: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

const FirstScreen = ({ setPage }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/AH.png")}
      ></Image>
      <Text>our app discription</Text>
      <Button mode="contained" onPress={() => setPage("LoginPageStub")}>
        Login
      </Button>
      <Button mode="contained" onPress={() => setPage("CreateUserScreen")}>
        Sign Up
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 120,
    height: 140,
  },
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    gap: 30,
    alignItems: "center",
    backgroundColor: "rgb(29, 27, 30)",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default FirstScreen;
