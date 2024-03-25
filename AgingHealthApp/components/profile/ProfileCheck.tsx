import { useEffect, useState } from "react";
import { SetState } from "../../types/General";
import { ProfileScreenName, VariableId } from "../../types/Profile";
import { useAuth } from "../authentication/AuthProvider";
import { getHealthData } from "../../functions/apiCalls";
import { AxiosError } from "axios";
import { View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import { commonStyles } from "../../style/CommonStyles";
import { HealthDataPoint } from "../../types/apiResponses";

type Props = {
  setCurrentScreen: SetState<ProfileScreenName>;
  dateCheck: string;
};

const ProfileCheck = ({ setCurrentScreen, dateCheck }: Props) => {
  const auth = useAuth();

  const [dataRecord, setDataRecord] = useState(
    {} as Record<VariableId, number>
  );

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
      })
      .catch((err: AxiosError) => {
        // possibly invalid token, but should do more error validation
        console.log(err.message);
        // setLoadingCreds(false);
      });
  }

  return (
    <>
      <View style={commonStyles.centerStack}>
        {dataRecord["gait_speed"] !== null ? <></> : <></>}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="descending">
              Health Variable
            </DataTable.Title>
            <DataTable.Title numeric>Entered Value</DataTable.Title>
          </DataTable.Header>
          {Object.entries(dataRecord).map((key) => (
            <DataTable.Row key={key[0]}>
              <DataTable.Cell>{key[0]}</DataTable.Cell>
              <DataTable.Cell numeric>{key[1]}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </>
  );
};

export default ProfileCheck;
