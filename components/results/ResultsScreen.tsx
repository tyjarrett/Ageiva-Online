import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const ResultsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>results</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ResultsScreen;
