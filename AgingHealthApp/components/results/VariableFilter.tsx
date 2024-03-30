import {
  Button,
  Checkbox,
  Dialog,
  Portal,
  Searchbar,
} from "react-native-paper";
import { SetState } from "../../types/General";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { GraphData } from "../../types/Results";
import { VariableId, isVariableId } from "../../types/Profile";

type Props = {
  dataRecord: GraphData;
  checkArray: Record<VariableId, boolean>;
  setCheckArray: SetState<Record<VariableId, boolean>>;
  survivalChecked: boolean;
  setSurvivalChecked: SetState<boolean>;
};

const VariableFilter = ({
  dataRecord,
  checkArray,
  setCheckArray,
  survivalChecked,
  setSurvivalChecked,
}: Props) => {
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  return (
    <>
      <Button
        mode="contained"
        style={styles.filter}
        onPress={() => {
          setFilterVisible(true);
        }}
      >
        Filter
      </Button>
      <Portal>
        <Dialog
          visible={filterVisible}
          onDismiss={() => {
            setFilterVisible(false);
          }}
        >
          <Dialog.Content>
            <Searchbar
              style={styles.search}
              placeholder="Filter "
              value={search}
              onChangeText={setSearch}
            />
            <Checkbox.Item
              style={styles.search}
              label="survival"
              mode="android"
              status={survivalChecked ? "checked" : "unchecked"}
              onPress={() => {
                setSurvivalChecked(!survivalChecked);
              }}
            />
            {Object.keys(
              dataRecord.predictionData[dataRecord.predictionData.length - 1]
                .data
            ).map((variableId) => (
              <Checkbox.Item
                key={variableId}
                style={styles.search}
                label={variableId}
                mode="android"
                status={
                  isVariableId(variableId) && checkArray[variableId]
                    ? "checked"
                    : "unchecked"
                }
                onPress={() =>
                  setCheckArray((prev) => ({
                    ...prev,
                    [variableId]: isVariableId(variableId) && !prev[variableId],
                  }))
                }
              />
            ))}
            <Button
              mode="contained"
              onPress={() => {
                setFilterVisible(false);
              }}
            >
              Close
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  search: {
    width: 250,
  },
  filter: {
    width: 250,
    marginTop: "20%",
  },
});

export default VariableFilter;
