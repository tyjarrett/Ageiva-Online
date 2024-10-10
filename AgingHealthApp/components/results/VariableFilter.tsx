import {
  Button,
  Checkbox,
  Dialog,
  Portal,
  Searchbar,
} from "react-native-paper";
import { SetState } from "../../types/General";
import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { GraphData } from "../../types/Results";
import { VariableId, isVariableId } from "../../types/Profile";
import { getVariable } from "../../utilities/helpers";

type Props = {
  dataRecord: GraphData;
  checkArray: Record<VariableId, boolean>;
  setCheckArray: SetState<Record<VariableId, boolean>>;
  numCheck: number;
  setNumCheck: SetState<number>;
};

const VariableFilter = ({
  dataRecord,
  checkArray,
  setCheckArray,
  numCheck,
  setNumCheck,
}: Props) => {
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);

  const filterSearch = (term: string) => {
    return search === "" || term.toLowerCase().includes(search.toLowerCase());
  };

  const incrCheck = (id: string) => {
    setCheckArray((prev) => ({
      ...prev,
      [id]: isVariableId(id) && !prev[id],
    }));
    if (!checkArray[id as VariableId]) {
      setNumCheck(numCheck + 1);
    } else {
      setNumCheck(numCheck - 1);
    }
  };

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
          <Dialog.Content style={styles.dialog}>
            <Searchbar
              style={styles.search}
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
            />

            <ScrollView contentContainerStyle={styles.container}>
              {Object.keys(
                dataRecord.predictionData[dataRecord.predictionData.length - 1]
                  .data
              ).map((variableId) =>
                filterSearch(getVariable(variableId)?.prettyName || "") ? (
                  <Checkbox.Item
                    key={variableId}
                    style={styles.search}
                    label={getVariable(variableId)?.prettyName || variableId}
                    mode="android"
                    status={
                      isVariableId(variableId) && checkArray[variableId]
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => incrCheck(variableId)}
                  />
                ) : (
                  <React.Fragment key={variableId}></React.Fragment>
                )
              )}
            </ScrollView>
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
  container: {
    flexGrow: 1,
  },
  dialog: {
    height: 500,
  },
});

export default VariableFilter;
