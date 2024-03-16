import { DateAndValue } from "../../types/Results";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { StyleSheet } from "react-native";

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

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine data={dataPoints} />
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
