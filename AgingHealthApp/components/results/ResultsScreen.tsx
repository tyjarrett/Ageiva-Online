import React, { useEffect, useState } from "react";
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
import { getHealthData } from "../../functions/apiCalls";
import { AxiosError } from "axios";

const screenWidth = Dimensions.get("window").width;

const ResultsScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("Results");
  const [visable, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [testChecked, setTestChecked] = useState(true);
  const [checkArray, setCheckArray] = useState({} as Record<string, boolean>);
  let newCheckArray = {} as Record<string, boolean>;

  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const [dataRecord, setDataRecord] = useState({} as Record<string, string>);
  const newDataRecord = {} as Record<string, string>;

  const logout = () => {
    auth.clearAuth();
    // should do some loading here bc clearAuth is an async call
  };

  async function fetchData() {
    getHealthData(auth.authToken)
      .then(({ data: res }) => {
        console.log(res.health_data[0]);
        for (const [key, entry] of Object.entries(res.health_data[0])) {
          if (
            entry !== null &&
            key !== "age" &&
            key !== "background" &&
            key !== "date" &&
            key !== "id" &&
            key !== "user"
          ) {
            console.log(key);
            newDataRecord[key] = entry;
            newCheckArray[key + "Check"] = false;
          }
        }
        setDataRecord(newDataRecord);
        setCheckArray(newCheckArray);
      })
      .catch((err: AxiosError) => {
        // possibly invalid token, but should do more error validation
        console.log(err.message);
        // setLoadingCreds(false);
      });
  }

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
              {Object.keys(dataRecord).map((data) => (
                <Checkbox.Item
                  key={data}
                  style={styles.search}
                  label={data}
                  mode="android"
                  status={checkArray[data + "Check"] ? "checked" : "unchecked"}
                  onPress={() => {
                    newCheckArray = { ...checkArray };
                    newCheckArray[data + "Check"] =
                      !newCheckArray[data + "Check"];
                    setCheckArray(newCheckArray);
                  }}
                />
              ))}
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
        {Object.keys(checkArray).map((data) =>
          checkArray[data] ? <Text key={data}>{data}</Text> : <></>
        )}
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
    // gap: 100,
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
