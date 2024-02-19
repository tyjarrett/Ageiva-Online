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
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

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

  const readData = {
    labels: [2024, 2034, 2045, 2055, 2065],
    datasets: [
      {
        data: [120, 110, 130, 100, 95],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
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
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={screenWidth * 0.85}
          height={256}
          verticalLabelRotation={30}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
        />
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
