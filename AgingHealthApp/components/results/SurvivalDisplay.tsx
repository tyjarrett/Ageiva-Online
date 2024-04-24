import { Text } from "react-native-paper";
import { DateAndValue } from "../../types/Results";
import { PRED_DT } from "../../utilities/constants";
import { StyleSheet, View } from "react-native";

type Props = {
  data: DateAndValue[];
};

const SurvivalDisplay = ({ data }: Props) => {
  const numYears = 10;
  const survivalPoint = data[numYears / PRED_DT];
  let survivalResult = "";
  let color = "";
  if (survivalPoint.value > 0.9) {
    survivalResult = "Good";
    color = "green";
  } else if (survivalPoint.value > 0.1) {
    survivalResult = "Ok";
    color = "yellow";
  } else {
    survivalResult = "Poor";
    color = "red";
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Survival Score: </Text>
      <Text
        variant="headlineMedium"
        style={{ color, ...styles.survivalResult }}
      >
        {survivalResult}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  survivalResult: {
    fontWeight: "bold",
  },
});

export default SurvivalDisplay;
