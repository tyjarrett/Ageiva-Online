import { DateAndValue } from "../../types/Results";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLegend,
  VictoryScatter,
} from "victory-native";
import { surveyQuestions } from "../../utilities/constants";
import { graphColors, graphTheme } from "../../style/GraphStyles";

type Props = {
  label: string;
  data: DateAndValue[];
  numPoints: number;
};

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
    <VictoryChart
      theme={graphTheme}
      // events={[{ childName: "cursor", target: "data", eventHandlers: {} }]}
    >
      <VictoryLegend
        data={[{ name: label }].concat(
          variableMean ? [{ name: "Population Mean" }] : []
        )}
        colorScale={[graphColors.var, graphColors.mean]}
        x={200}
        y={40}
      />
      <VictoryLine
        data={dataPoints}
        style={{
          data: { stroke: graphColors.var },
        }}
      />
      <VictoryLine
        data={meanLine}
        style={{
          data: {
            stroke: graphColors.mean,
            strokeDasharray: 5,
          },
        }}
      />
      <VictoryScatter data={[dataPoints[5]]} size={5} />
      <VictoryAxis
        scale="time"
        label={label}
        orientation="bottom"
        tickFormat={(x) => new Date(x).getFullYear()}
      />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  );
};

export default HealthDataChart;
