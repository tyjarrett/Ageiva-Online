import { DateAndValue } from "../../types/Results";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLegend,
} from "victory-native";
import { VictoryThemeDefinition } from "victory-core";
import { surveyQuestions } from "../../utilities/constants";

type Props = {
  label: string;
  data: DateAndValue[];
  numPoints: number;
};

const varColor = "#005AB5";
const meanColor = "#DC3220";
const graphColor = "#FFFFFF";

const graphTheme: VictoryThemeDefinition = {
  ...VictoryTheme.grayscale,
  axis: {
    style: {
      axis: { stroke: graphColor, strokeWidth: 0.5 },
      ticks: { stroke: graphColor },
      tickLabels: { fill: graphColor },
      axisLabel: { fill: graphColor },
    },
  },
  legend: {
    ...VictoryTheme.grayscale.legend,
    style: {
      ...VictoryTheme.grayscale.legend?.style,
      labels: {
        fill: graphColor,
        fontFamily: "sans-serif",
        fontSize: 12,
        letterSpacing: "normal",
        padding: 10,
        stroke: "transparent",
      },
    },
  },
};
console.log(VictoryTheme.grayscale.legend?.style?.labels);

const HealthDataChart = ({ label, data, numPoints }: Props) => {
  const dataPoints = data.slice(0, numPoints).map((datum) => ({
    x: datum.date,
    y: datum.value,
  }));
  const variableQuery = surveyQuestions.filter((v) => v.variableId === label);
  const variableMean = variableQuery.length > 0 ? variableQuery[0].mean : null;
  const meanLine = variableMean
    ? [
        { x: dataPoints[0].x, y: variableMean },
        { x: dataPoints[dataPoints.length - 1].x, y: variableMean },
      ]
    : [];

  return (
    <VictoryChart theme={graphTheme}>
      <VictoryLegend
        data={[{ name: label }].concat(
          variableMean ? [{ name: "Population Mean" }] : []
        )}
        colorScale={[varColor, meanColor]}
        x={200}
        y={40}
      />
      <VictoryLine
        data={dataPoints}
        style={{
          data: { stroke: varColor, strokeWidth: 2 },
        }}
      />
      <VictoryLine
        data={meanLine}
        style={{
          data: { stroke: meanColor, strokeWidth: 2, strokeDasharray: 5 },
        }}
      />
      <VictoryAxis
        scale="time"
        label={label}
        orientation="bottom"
        style={{ axisLabel: { padding: 30, fontSize: 20 } }}
        tickFormat={(x) => new Date(x).getFullYear()}
      />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  );
};

export default HealthDataChart;
