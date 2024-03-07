import { LineChart } from "react-native-chart-kit";
import { DateAndValue } from "../../types/Results";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

type Props = {
  label: string;
  data: DateAndValue[];
};

const HealthDataChart = ({ label, data }: Props) => {
  const dataPoints = data.map((datum) => ({
    x: datum.date,
    y: datum.value,
  }));
  const labels = data.map((datum) => datum.date.toDateString());
  const DATA = {
    labels,
    datasets: [{ data: dataPoints }],
    label,
  };

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine data={dataPoints} />
    </VictoryChart>
  );
};

export default HealthDataChart;
