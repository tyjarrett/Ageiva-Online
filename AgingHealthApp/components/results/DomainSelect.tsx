import { Button } from "react-native-paper";
import { graphDomains } from "../../utilities/constants";
import { StyleSheet, View } from "react-native";
import { SetState } from "../../types/General";

type Props = {
  selectedYear: number;
  setSelectedYear: SetState<number>;
};

const DomainSelect = ({ selectedYear, setSelectedYear }: Props) => {
  return (
    <>
      <View style={styles.container}>
        {graphDomains.map((d) => (
          <Button
            key={d}
            mode={selectedYear === d ? "contained" : "outlined"}
            style={styles.button}
            onPress={() => setSelectedYear(d)}
          >
            {d} yrs
          </Button>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 20 },
  button: { borderRadius: 0 },
});

export default DomainSelect;
