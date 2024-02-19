import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { commonStyles } from "../../style/CommonStyles";
import { useAuth } from "../authentication/AuthProvider";
import { ProfileScreenName } from "../../types/Profile";
import { SetState } from "../../types/General";

type Props = {
  setCurrentScreen: SetState<ProfileScreenName>;
};

const ProfileView = ({ setCurrentScreen }: Props) => {
  const auth = useAuth();

  return (
    <>
      <View style={commonStyles.centerStack}>
        <View style={styles.picture}>
          <Text variant="displayMedium">Pic</Text>
          <Text>{auth.currentUser.username}</Text>
          <Button mode="contained" onPress={() => setCurrentScreen("Survey")}>
            Update Health Information
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  picture: {
    top: "25%",
    alignItems: "center",
    gap: 35,
  },
  logout: {
    position: "relative",
    top: 5,
    right: 5,
  },
});
export default ProfileView;
