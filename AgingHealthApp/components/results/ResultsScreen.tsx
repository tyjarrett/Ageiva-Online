import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Appbar,
  Text,
  Searchbar,
  Checkbox,
  Portal,
  Dialog,
} from "react-native-paper";
import { useAuth } from "../authentication/AuthProvider";

const ResultsScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("Results");
  const [visable, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [testChecked, setTestChecked] = useState(true);
  const [fooChecked, setFooChecked] = useState(false);
  const [barChecked, setBarChecked] = useState(false);

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
        <Portal>
          <Dialog
            visible={visable}
            onDismiss={() => {
              setVisible(false);
            }}
          >
            <Dialog.Content>
              <Searchbar
                style={styles.search}
                placeholder="Filter "
                value={search}
                onChangeText={setSearch}
              />
              <Checkbox.Item
                style={styles.search}
                label="test"
                mode="android"
                status={testChecked ? "checked" : "unchecked"}
                onPress={() => {
                  setTestChecked(!testChecked);
                }}
              />
              <Checkbox.Item
                style={styles.search}
                label="foo"
                mode="android"
                status={fooChecked ? "checked" : "unchecked"}
                onPress={() => {
                  setFooChecked(!fooChecked);
                }}
              />
              <Checkbox.Item
                style={styles.search}
                label="bar"
                mode="android"
                status={barChecked ? "checked" : "unchecked"}
                onPress={() => {
                  setBarChecked(!barChecked);
                }}
              />
              <Button
                mode="contained"
                onPress={() => {
                  setVisible(false);
                }}
              >
                Close
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
        <Button
          mode="contained"
          style={styles.filter}
          onPress={() => {
            setVisible(true);
          }}
        >
          Filter
        </Button>
        {testChecked ? <Text>test</Text> : <></>}
        {fooChecked ? <Text>foo</Text> : <></>}
        {barChecked ? <Text>bar</Text> : <></>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "center",
    width: "100%",
    gap: 100,
  },
  logout: {
    position: "relative",
    top: "0%",
    right: "5%",
  },
  search: {
    width: 250,
  },
  modal: {
    marginTop: "50%",
  },
  filter: {
    width: 250,
    marginTop: "20%",
  },
});

export default ResultsScreen;
