import { DateAndValue } from "../../types/Results";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { surveyQuestions } from "../../utilities/constants";
import { StyleSheet, View } from "react-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { graphColors } from "../../style/GraphStyles";
import inter from "../../assets/Inter-Medium.ttf";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { Text } from "react-native-paper";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import Legend from "./Legend";

type Props = {
  label: string;
  data: DateAndValue[];
  numPoints: number;
};

const HealthDataChart = ({ label, data, numPoints }: Props) => {
  const [tooltip, setToolTip] = useState({ x: -1, y: -1 });
  const variableQuery = surveyQuestions.filter((v) => v.variableId === label);
  const variable = variableQuery.length > 0 ? variableQuery[0] : null;

  const dataPoints = data.slice(0, numPoints).map((datum) => ({
    date: datum.date.valueOf(),
    value: datum.value,
    mean: variable?.mean || -1,
  }));
  const font = useFont(inter, 12);
  const { isActive: chartPressActive, state: chartPressState } =
    useChartPressState({
      x: dataPoints[0].date,
      y: {
        value: dataPoints[0].value,
        mean: variable?.mean || -1,
      },
    });

  const formatDate = (dateValue: number) => {
    const date = new Date(dateValue);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const toQualitative = (value: number) => {
    if (!variable) {
      return "";
    }

    const z = (value - variable.mean) / variable.stdev;
  };

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [chartPressActive]);

  useAnimatedReaction(
    () => {
      return {
        x: chartPressState.x.value.value,
        y: chartPressState.y.value.value.value,
      };
    },
    ({ x, y }) => {
      runOnJS(setToolTip)({ x, y });
    },

    [chartPressState.x, chartPressState.y]
  );

  return (
    <>
      <View style={styles.container}>
        {chartPressActive ? (
          <Text>
            {formatDate(tooltip.x)} : {tooltip.y.toFixed(2)}
          </Text>
        ) : (
          <></>
        )}
        <Text style={styles.chartTitle}>{label}</Text>
        <View style={styles.chartContainer}>
          <CartesianChart
            data={dataPoints}
            xKey="date"
            yKeys={["value", "mean"]}
            axisOptions={{
              font,
              formatXLabel: formatDate,
              lineColor: graphColors.axes,
              labelColor: graphColors.axes,
              tickCount: {
                x: 4,
                y: 5,
              },
            }}
            chartPressState={chartPressState}
          >
            {({ points }) => (
              <>
                <Line
                  points={points.value}
                  color={graphColors.var}
                  strokeWidth={3}
                />
                {variable && (
                  <Line
                    points={points.mean}
                    color={graphColors.mean}
                    strokeWidth={3}
                  />
                )}

                {chartPressActive ? (
                  <>
                    <Circle
                      cx={chartPressState.x.position}
                      cy={chartPressState.y.value.position}
                      r={8}
                      color={graphColors.var}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </CartesianChart>
        </View>

        <Legend
          labels={[
            { label, color: graphColors.var },
            ...(variable
              ? [{ label: "Population Mean", color: graphColors.mean }]
              : []),
          ]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
  },
  chartContainer: {
    height: 200,
  },
  chartTitle: {
    alignSelf: "center",
    fontSize: 24,
  },
});

export default HealthDataChart;
