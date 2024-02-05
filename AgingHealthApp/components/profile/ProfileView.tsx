import { View } from "react-native";
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

  const logout = () => {
    auth.clearAuth();
    // should do some loading here bc clearAuth is an async call
  };

  return (
    <>
      <View style={commonStyles.centerStack}>
        <Text>{auth.currentUser.username}</Text>
        <Button onPress={() => setCurrentScreen("Survey")}>
          Enter information
        </Button>
        <Button onPress={logout}>Logout</Button>
      </View>
    </>
  );
};

export default ProfileView;
