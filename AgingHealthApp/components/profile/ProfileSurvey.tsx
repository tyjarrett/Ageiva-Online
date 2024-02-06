import { ProgressBar } from "react-native-paper";
import { SetState } from "../../types/General";
import { ProfileScreenName } from "../../types/Profile";
import { StyleSheet, View } from "react-native";
import { surveyQuestions } from "../../utilities/constants";
import { useState } from "react";
import ProfileQuestion from "./ProfileQuestion";

type Props = {
  setCurrentScreen: SetState<ProfileScreenName>;
};

const ProfileSurvey = ({ setCurrentScreen }: Props) => {
  const [currentQ, setCurrentQ] = useState(0);

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={currentQ / surveyQuestions.length}
        style={{ ...styles.progress }}
      />
      <ProfileQuestion question={surveyQuestions[currentQ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
  },
  progress: {
    height: 10,
    width: 200, // need to figure out how to make this responsive to window size
    marginTop: 20,
    borderRadius: 60,
    alignSelf: "center",
  },
});

export default ProfileSurvey;
