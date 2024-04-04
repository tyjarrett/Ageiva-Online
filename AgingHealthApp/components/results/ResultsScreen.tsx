import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
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
import { PRED_DT } from "../../utilities/constants";
import { GraphData, PredictionData, DateAndValue } from "../../types/Results";
import HealthDataChart from "./HealthDataChart";
import { QualToQuantResponse } from "../../types/apiResponses";
import AppHeader from "../navigation/AppHeader";
import VariableFilter from "./VariableFilter";
import DomainSelect from "./DomainSelect";

type Props = {
  startOnboarding: () => void;
};

const ResultsScreen = ({ startOnboarding }: Props) => {
  const [currentScreen, setCurrentScreen] = useState("Results");
  const [numPredYears, setNumPredYears] = useState(20);
  const [survivalChecked, setSurvivalChecked] = useState(true);
  const [checkArray, setCheckArray] = useState(
    {} as Record<VariableId, boolean>
  );
  const [loading, setLoading] = useState(true);
  const [qualToQuant, setQualToQuant] = useState({} as QualToQuantResponse);

  const auth = useAuth();
  useEffect(() => {
    fetchData();
  }, []);

  const [dataRecord, setDataRecord] = useState({
    predictionData: [],
    survivalData: [],
  } as GraphData);

  const [numRealDates, setNumRealDates] = useState(0);

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
        console.log(err.message);
      });
  }

  return (
    <>
      <AppHeader title={currentScreen} startOnboarding={startOnboarding} />

      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <VariableFilter
              dataRecord={dataRecord}
              checkArray={checkArray}
              setCheckArray={setCheckArray}
              survivalChecked={survivalChecked}
              setSurvivalChecked={setSurvivalChecked}
            />

            <DomainSelect
              selectedYear={numPredYears}
              setSelectedYear={setNumPredYears}
            />
            {survivalChecked ? (
              <HealthDataChart
                key="survival"
                label="survival"
                data={dataRecord.survivalData}
                numPoints={numRealDates + numPredYears / PRED_DT}
                qualToQuant={qualToQuant}
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
                  qualToQuant={qualToQuant}
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
});

export default ResultsScreen;
