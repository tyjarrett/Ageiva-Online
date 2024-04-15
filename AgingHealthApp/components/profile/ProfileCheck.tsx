import { useEffect, useState } from "react";
import { SetState } from "../../types/General";
import { ProfileScreenName, VariableId } from "../../types/Profile";
import { useAuth } from "../authentication/AuthProvider";
import { getHealthData } from "../../functions/apiCalls";
import { AxiosError } from "axios";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, DataTable } from "react-native-paper";
import { commonStyles } from "../../style/CommonStyles";
import {} from "../../types/apiResponses";
import { getVariable } from "../../utilities/helpers";

type Props = {
  setCurrentScreen: SetState<ProfileScreenName>;
  dateCheck: string;
};

const ProfileCheck = ({ setCurrentScreen, dateCheck }: Props) => {
  const auth = useAuth();

  const [dataRecord, setDataRecord] = useState(
    {} as Record<VariableId, number>
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    getHealthData(auth.authToken)
      .then(({ data: res }) => {
        for (const entry of res.health_data) {
          if (entry.date === dateCheck) {
            for (const ent of Object.entries(entry.data))
              if (ent[1] !== null)
                setDataRecord((prev) => ({
                  ...prev,
                  [ent[0]]: ent[1].toFixed(3),
                }));
          }
        }
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <View style={commonStyles.centerStack}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title sortDirection="descending">
                Health Variable
              </DataTable.Title>
              <DataTable.Title numeric>Entered Value</DataTable.Title>
            </DataTable.Header>
            <ScrollView style={styles.scroll}>
              {Object.entries(dataRecord).map((key) => (
                <DataTable.Row key={key[0]}>
                  <DataTable.Cell>
                    {getVariable(key[0])?.prettyName}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{key[1]}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </DataTable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({ scroll: { flexGrow: 1 } });

export default ProfileCheck;
