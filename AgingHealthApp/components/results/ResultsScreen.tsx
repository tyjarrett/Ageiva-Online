import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
import { getHealthData, makePrediction } from "../../functions/apiCalls";
import { AxiosError } from "axios";
import { VariableId, isVariableId } from "../../types/Profile";
import { filter_data_object } from "../../functions/helpers";
import moment from "moment";
import { PRED_DT } from "../../utilities/constants";
import { GraphData, PredictionData, DateAndValue } from "../../types/Results";
import HealthDataChart from "./HealthDataChart";
import { Slider } from "@miblanchard/react-native-slider";

const ResultsScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("Results");
  const [filterVisible, setFilterVisible] = useState(false);
  const [numPredYears, setNumPredYears] = useState(20);
  const [search, setSearch] = useState("");
  const [survivalChecked, setSurvivalChecked] = useState(true);
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

  const [numRealDates, setNumRealDates] = useState(0);

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
        setNumRealDates(res.health_data.length);
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

      <ScrollView contentContainerStyle={styles.container}>
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
                    label="survival"
                    mode="android"
                    status={survivalChecked ? "checked" : "unchecked"}
                    onPress={() => {
                      setSurvivalChecked(!survivalChecked);
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
            <Text>Number of years to predict: {numPredYears}</Text>
            <View style={styles.slider}>
              <Slider
                minimumValue={1}
                maximumValue={dataRecord.survivalData.length * PRED_DT + 1}
                value={numPredYears}
                onSlidingComplete={(val) => setNumPredYears(Math.floor(val[0]))}
              />
            </View>
            {survivalChecked ? (
              <HealthDataChart
                key="survival"
                label="survival"
                data={dataRecord.survivalData}
                numPoints={numRealDates + numPredYears / PRED_DT}
              />
            ) : (
              <></>
            )}
            {Object.keys(checkArray).map((variableId) =>
              isVariableId(variableId) && checkArray[variableId] ? (
                <HealthDataChart
                  key={variableId}
                  label={variableId}
                  data={dataRecord.predictionData.map((dp) => ({
                    ...dp,
                    value: dp.data[variableId],
                  }))}
                  numPoints={numRealDates + numPredYears / PRED_DT}
                />
              ) : (
                <React.Fragment key={variableId} />
              )
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "center",
    width: "100%",
    paddingBottom: 10,
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
  slider: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    width: "80%",
  },
});

export default ResultsScreen;
