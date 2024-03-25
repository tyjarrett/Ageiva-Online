import { StyleSheet, View } from "react-native";
import { graphColors } from "../../style/GraphStyles";
import { Text } from "react-native-paper";

type CircleProps = {
  r: number;
  color: string;
};

const Circle = ({ r, color }: CircleProps) => {
  return (
    <View
      style={{
        ...styles.circle,
        width: r,
        height: r,
        backgroundColor: color,
      }}
    />
  );
};

type LabelAndColor = {
  label: string;
  color: string;
};

type Props = {
  labels: LabelAndColor[];
};

const Legend = ({ labels }: Props) => {
  return (
    <>
      <View style={styles.container}>
        {labels.map(({ label, color }) => (
          <View style={styles.row} key={label}>
            <Circle r={10} color={color} />
            <Text>{label}</Text>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  container: {
    flex: 1,
    borderColor: graphColors.axes,
    borderWidth: 0.3,
    borderStyle: "dashed",
  },
});

export default Legend;
