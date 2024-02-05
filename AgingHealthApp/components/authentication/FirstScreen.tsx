import React from "react";
import { SafeAreaView, StyleSheet} from "react-native";
import { Text, Button } from "react-native-paper";

type Props = {
  setCheckCreds: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

const FirstScreen = ( {setPage} : Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayMedium">Logo</Text>
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