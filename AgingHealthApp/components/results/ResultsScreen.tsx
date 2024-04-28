import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { useAuth } from "../authentication/AuthProvider";
import {
  getHealthData,
  getQualToQuant,
  makePrediction,
} from "../../functions/apiCalls";
import { AxiosError } from "axios";
import { VariableId, isVariableId } from "../../types/Profile";
import { filter_data_object } from "../../functions/helpers";
import moment from "moment";
import { PRED_DT, surveyQuestions } from "../../utilities/constants";
import { GraphData, PredictionData, DateAndValue } from "../../types/Results";
import HealthDataChart from "./HealthDataChart";
import { QualToQuantResponse } from "../../types/apiResponses";
import AppHeader from "../navigation/AppHeader";
import VariableFilter from "./VariableFilter";
import DomainSelect from "./DomainSelect";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/Navigation";
import SurvivalDisplay from "./SurvivalDisplay";

const ResultsScreen = () => {
  const [currentScreen] = useState("Results");
  const [numPredYears, setNumPredYears] = useState(20);
  const [checkArray, setCheckArray] = useState(
    {} as Record<VariableId, boolean>
  );
  const [loading, setLoading] = useState(true);
  const [qualToQuant, setQualToQuant] = useState({} as QualToQuantResponse);
  const [noData, setNoData] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const auth = useAuth();
  useEffect(() => {
    const newCheckArray = {} as Record<VariableId, boolean>;
    surveyQuestions.forEach((v) => {
      if (isVariableId(v.variableId)) {
        newCheckArray[v.variableId] = false;
      }
    });
    setCheckArray(newCheckArray);
    navigation.addListener("focus", fetchData);
  }, []);

  const [dataRecord, setDataRecord] = useState({
    predictionData: [],
    survivalData: [],
  } as GraphData);

  const [numRealDates, setNumRealDates] = useState(0);

  async function fetchData() {
    getHealthData(auth.authToken)
      .then(({ data: res }) => {
        const newUserData = res.health_data.map((dataPoint) => {
          const newDataPoint = {
            date: new Date(dataPoint.date),
            data: {},
          } as PredictionData;
          for (const [key, entry] of Object.entries(dataPoint.data)) {
            if (key !== "age" && isVariableId(key) && entry !== null) {
              newDataPoint.data[key] = entry;
            }
          }
          return newDataPoint;
        });
        setNumRealDates(res.health_data.length);

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
            getQualToQuant(auth.authToken)
              .then(({ data: q2q }) => {
                setQualToQuant(q2q);
                setLoading(false);
              })
              .catch((err: AxiosError) => {
                console.log(err);
              });
          })
          .catch((err: AxiosError) => {
            console.log(err.message);
          });
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 404) {
          setNoData(true);
        } else {
          console.log(err.message);
        }
      });
  }

  return (
    <>
      <AppHeader title={currentScreen} />
      {noData ? (
        <View style={styles.noData}>
          <Text variant="displayMedium" style={styles.centerText}>
            Your profile is empty
          </Text>
          <Text variant="titleSmall">
            Enter some health data on the profile page so we can start making
            predictions.
          </Text>
          <Button
            onPress={() => navigation.navigate("Profile")}
            mode="contained"
          >
            Enter Data
          </Button>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {loading ? (
            <ActivityIndicator animating={true} />
          ) : (
            <>
              <VariableFilter
                dataRecord={dataRecord}
                checkArray={checkArray}
                setCheckArray={setCheckArray}
              />

              <DomainSelect
                selectedYear={numPredYears}
                setSelectedYear={setNumPredYears}
              />
              <SurvivalDisplay data={dataRecord.survivalData} />

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
                    qualToQuant={qualToQuant}
                  />
                ) : (
                  <React.Fragment key={variableId} />
                )
              )}
            </>
          )}
        </ScrollView>
      )}
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
  noData: {
    width: "80%",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: "80%",
    gap: 10,
  },
  centerText: {
    textAlign: "center",
  },
});

export default ResultsScreen;
