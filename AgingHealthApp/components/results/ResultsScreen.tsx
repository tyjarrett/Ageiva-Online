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
  ActivityIndicator,
} from "react-native-paper";
import { useAuth } from "../authentication/AuthProvider";
import { Dimensions } from "react-native";
import { getHealthData, makePrediction } from "../../functions/apiCalls";
import { AxiosError } from "axios";
import { VariableId, isVariableId } from "../../types/Profile";
import { filter_data_object } from "../../functions/helpers";
import moment from "moment";
import { PRED_DT } from "../../utilities/constants";
import { GraphData, PredictionData, DateAndValue } from "../../types/Results";
import HealthDataChart from "./HealthDataChart";

const screenWidth = Dimensions.get("window").width;

const ResultsScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("Results");
  const [filterVisible, setFilterVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [testChecked, setTestChecked] = useState(true);
  const [checkArray, setCheckArray] = useState(
    {} as Record<VariableId, boolean>
  );
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const [dataRecord, setDataRecord] = useState({
    predictionData: [],
    survivalData: [],
  } as GraphData);

  const logout = () => {
    auth.clearAuth();
    // should do some loading here bc clearAuth is an async call
  };

  async function fetchData() {
    getHealthData(auth.authToken)
      .then(({ data: res }) => {
        const newCheckArray = {} as Record<VariableId, boolean>;
        const newUserData = res.health_data.map((dataPoint) => {
          const newDataPoint = {
            date: new Date(dataPoint.date),
            data: {},
          } as PredictionData;
          for (const [key, entry] of Object.entries(dataPoint.data)) {
            if (key !== "age" && isVariableId(key) && entry !== null) {
              newDataPoint.data[key] = entry;
              newCheckArray[key] = false;
            }
          }
          return newDataPoint;
        });
        setCheckArray(newCheckArray);

        makePrediction(auth.authToken)
          .then(({ data: res }) => {
            let last_date = moment(newUserData[newUserData.length - 1].date);
            const survivalData = [] as DateAndValue[];
            const healthPred = res.health.slice(1).map((dp, i) => {
              const filteredData = filter_data_object(dp, (k) =>
                Object.keys(newUserData[newUserData.length - 1].data).includes(
                  k
                )
              );
              last_date = last_date.add(PRED_DT * 12, "months");
              const formattedDate = last_date.toDate();

              survivalData.push({
                date: formattedDate,
                value: res.survival[i + 1],
              });

              return { date: formattedDate, data: filteredData };
            });

            setDataRecord({
              predictionData: newUserData.concat(healthPred),
              survivalData,
            });
            setLoading(false);
          })
          .catch((err: AxiosError) => {
            console.log(err.message);
          });
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={currentScreen} />
        <Button onPress={logout} style={styles.logout}>
          Logout
        </Button>
      </Appbar.Header>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <Portal>
              <Dialog
                visible={filterVisible}
                onDismiss={() => {
                  setFilterVisible(false);
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
                  {Object.keys(
                    dataRecord.predictionData[
                      dataRecord.predictionData.length - 1
                    ].data
                  ).map((variableId) => (
                    <Checkbox.Item
                      key={variableId}
                      style={styles.search}
                      label={variableId}
                      mode="android"
                      status={
                        isVariableId(variableId) && checkArray[variableId]
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setCheckArray((prev) => ({
                          ...prev,
                          [variableId]:
                            isVariableId(variableId) && !prev[variableId],
                        }))
                      }
                    />
                  ))}
                  <Button
                    mode="contained"
                    onPress={() => {
                      setFilterVisible(false);
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
                setFilterVisible(true);
              }}
            >
              Filter
            </Button>
            {testChecked ? <Text>test</Text> : <></>}
            {Object.keys(checkArray).map((variableId) =>
              isVariableId(variableId) && checkArray[variableId] ? (
                <HealthDataChart
                  key={variableId}
                  label={variableId}
                  data={dataRecord.predictionData.map((dp) => ({
                    ...dp,
                    value: dp.data[variableId],
                  }))}
                />
              ) : (
                <React.Fragment key={variableId} />
              )
            )}
          </>
        )}
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
