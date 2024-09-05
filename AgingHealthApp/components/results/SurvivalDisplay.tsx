import { Dialog, IconButton, Portal, Text } from "react-native-paper";
import { DateAndValue } from "../../types/Results";
import { PRED_DT } from "../../utilities/constants";
import { StyleSheet, View } from "react-native";
import { useState } from "react";

type Props = {
  data: DateAndValue[];
};

const SurvivalDisplay = ({ data }: Props) => {
  const [helpVisible, setHelpVisible] = useState(false);
  const numYears = 10;
  const survivalPoint = data[numYears / PRED_DT];
  let survivalResult = "Ok" as "Good" | "Ok" | "Poor";
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

  const survivalMeanings = {
    Good: "you are more than 90% likely to live within the next 10 years",
    Ok: "your probability of living within the next 10 years are between 10% and 90%",
    Poor: "you are less than 10% likely to live within the next 10 years",
  };

  return (
    <>
      <Portal>
        <Dialog visible={helpVisible} onDismiss={() => setHelpVisible(false)}>
          <Dialog.Icon icon="help-rhombus" />
          <Dialog.Title style={styles.title}>
            10-Year Survival Score
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              This is a prediction of your survival rate in the next 10 years. A
              rating of {survivalResult} means that{" "}
              {survivalMeanings[survivalResult]}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <Text variant="headlineSmall">10-Year Survival Score: </Text>
        <Text
          variant="headlineMedium"
          style={{ color, ...styles.survivalResult }}
        >
          {survivalResult}
        </Text>
        <IconButton icon="help-rhombus" onPress={() => setHelpVisible(true)} />
      </View>
    </>
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
  title: {
    textAlign: "center",
  },
});

export default SurvivalDisplay;
