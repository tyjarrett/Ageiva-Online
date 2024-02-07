import { Button, ProgressBar, Text } from "react-native-paper";
import { SetState } from "../../types/General";
import {
  ProfileScreenName,
  QuestionAndResponse,
  VariableId,
} from "../../types/Profile";
import { StyleSheet, View } from "react-native";
import { surveyQuestions } from "../../utilities/constants";
import { useState } from "react";
import ProfileQuestion from "./ProfileQuestion";

type Props = {
  setCurrentScreen: SetState<ProfileScreenName>;
};

const ProfileSurvey = ({ setCurrentScreen }: Props) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [currentChoice, setCurrentChoice] = useState("");
  const [quantitative, setQuantitative] = useState(
    surveyQuestions[currentQ] && surveyQuestions[currentQ].hasQuantitative
  );
  const [switchModeEnabled, setSwitchModeEnabled] = useState(
    surveyQuestions[currentQ] &&
      (quantitative
        ? surveyQuestions[currentQ].qualitativeOptions.length > 0
        : surveyQuestions[currentQ].hasQuantitative)
  );
  const [responses, setResponses] = useState(
    {} as Record<VariableId, QuestionAndResponse>
  );
  console.log(responses);

  const nextPressed = () => {
    const res = {
      variableId: surveyQuestions[currentQ].variableId,
      type: quantitative ? "quantitative" : "qualitative",
      response: currentChoice,
    };

    setResponses((prev) => ({ ...prev, [res.variableId]: res }));
    const newQ = currentQ + 1;
    setCurrentQ(newQ);
    setCurrentChoice("");
    if (newQ < surveyQuestions.length) {
      const newQuantitative = surveyQuestions[newQ].hasQuantitative;
      setQuantitative(newQuantitative);
      setSwitchModeEnabled(
        newQuantitative
          ? surveyQuestions[newQ].qualitativeOptions.length > 0
          : surveyQuestions[newQ].hasQuantitative
      );
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={currentQ / (surveyQuestions.length + 1)}
        style={{ ...styles.progress }}
      />
      {currentQ < surveyQuestions.length ? (
        <>
          <ProfileQuestion
            question={surveyQuestions[currentQ]}
            currentChoice={currentChoice}
            setCurrentChoice={setCurrentChoice}
            quantitative={quantitative}
          />
          {switchModeEnabled && (
            <Button
              mode="contained"
              style={styles.next}
              onPress={() => setQuantitative((prev) => !prev)}
            >
              Provide {quantitative ? "estimate" : "exact value"} instead
            </Button>
          )}

          <Button mode="contained" style={styles.next} onPress={nextPressed}>
            Next
          </Button>
        </>
      ) : (
        <Text>quiz done</Text>
      )}
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
  next: {
    position: "relative",
    bottom: 0,
    right: 0,
    marginTop: 20,
  },
});

export default ProfileSurvey;
