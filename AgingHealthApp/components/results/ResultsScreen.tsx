import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Appbar, Text } from "react-native-paper";
import { useAuth } from "../authentication/AuthProvider";

const ResultsScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("Results");

  const auth = useAuth();

  const logout = () => {
    auth.clearAuth();
    // should do some loading here bc clearAuth is an async call
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={currentScreen} />
        <Button onPress={logout} style={styles.logout}>
          Logout
        </Button>
      </Appbar.Header>
      <View style={styles.container}>
        <Text>results</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    position: "relative",
    top: "0%",
    right: "5%",
  },
});

export default ResultsScreen;
