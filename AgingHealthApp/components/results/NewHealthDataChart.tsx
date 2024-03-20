import { graphColors } from "../../style/GraphStyles";
import { DateAndValue } from "../../types/Results";
import { LineGraph } from "react-native-graph";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";

type Props = {
  label: string;
  data: DateAndValue[];
  numPoints: number;
};

const NewHealthDataChart = ({ label, data, numPoints }: Props) => {
  const dataPoints = data.slice(0, numPoints).map((datum) => ({
    date: datum.date,
    value: datum.value,
  }));
  const [enablePanGesture, setEnablePanGesture] = useState(true);
  const [isAnimated, setIsAnimated] = useState(true);
  return (
    <>
      <GestureHandlerRootView style={styles.gestureHandler}>
        <Text>{label}</Text>
        <LineGraph
          points={dataPoints}
          animated={isAnimated}
          color={graphColors.var}
          style={{ width: "80%", height: 200 }}
          enablePanGesture={enablePanGesture}
        />
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});

export default NewHealthDataChart;
