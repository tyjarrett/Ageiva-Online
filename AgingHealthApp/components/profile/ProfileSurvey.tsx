import { MD3Colors, ProgressBar, Text } from "react-native-paper";
import { SetState } from "../../types/General";
import { ProfileScreenName } from "../../types/Profile";
import { View } from "react-native";
import { commonStyles } from "../../style/CommonStyles";

type Props = {
  setCurrentScreen: SetState<ProfileScreenName>;
};

const ProfileSurvey = ({ setCurrentScreen }: Props) => {
  return (
    <View style={commonStyles.centerStack}>
      <Text>Hi</Text>
      <ProgressBar progress={0.5} color={MD3Colors.error50} />
    </View>
  );
};

export default ProfileSurvey;
