import { Button, Dialog, Portal, ProgressBar, Text } from "react-native-paper";
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

const responseRecord: Record<VariableId, QuestionAndResponse> = {
  "gait speed": {
    variableId: "gait speed",
    type: "quantitative",
    response: "",
  },
  "grip dom": {
    variableId: "grip dom",
    type: "quantitative",
    response: "",
  },
  "grip ndom": {
    variableId: "grip ndom",
    type: "quantitative",
    response: "",
  },
  "FI ADL": {
    variableId: "FI ADL",
    type: "quantitative",
    response: "",
  },
  "FI IADL": {
    variableId: "FI IADL",
    type: "quantitative",
    response: "",
  },
  chair: {
    variableId: "chair",
    type: "quantitative",
    response: "",
  },
  "leg raise": {
    variableId: "leg raise",
    type: "quantitative",
    response: "",
  },
  "full tandem": {
    variableId: "full tandem",
    type: "quantitative",
    response: "",
  },
  srh: {
    variableId: "srh",
    type: "quantitative",
    response: "",
  },
  eye: {
    variableId: "eye",
    type: "quantitative",
    response: "",
  },
  hear: {
    variableId: "hear",
    type: "quantitative",
    response: "",
  },
  func: {
    variableId: "func",
    type: "quantitative",
    response: "",
  },
  dias: {
    variableId: "dias",
    type: "quantitative",
    response: "",
  },
  sys: {
    variableId: "sys",
    type: "quantitative",
    response: "",
  },
  pulse: {
    variableId: "pulse",
    type: "quantitative",
    response: "",
  },
  trig: {
    variableId: "trig",
    type: "quantitative",
    response: "",
  },
  crp: {
    variableId: "crp",
    type: "quantitative",
    response: "",
  },
  hdl: {
    variableId: "hdl",
    type: "quantitative",
    response: "",
  },
  ldl: {
    variableId: "ldl",
    type: "quantitative",
    response: "",
  },
  glucose: {
    variableId: "glucose",
    type: "quantitative",
    response: "",
  },
};

const ProfileSurvey = ({ setCurrentScreen }: Props) => {
  const [visible, setVisible] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  let errorCheck = true;
  const [errorText, setErrorText] = useState("");
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

  const checkResponses = () => {
    let check = false;
    for (const [key, entry] of Object.entries(responseRecord)) {
      if (entry.response === "") {
        console.log(entry);
        check = true;
        break;
      }
    }
    if (check) {
      setVisible(true);
    } else {
      console.log(responseRecord);
      setCurrentScreen("Profile");
    }
  };

  const nextPressed = () => {
    if (!errorCheck) {
      setErrorText("Please enter only numbers");
    }
    if (errorCheck) {
      setErrorText("");
      const res = {
        variableId: surveyQuestions[currentQ].variableId,
        type: quantitative ? "quantitative" : "qualitative",
        response: currentChoice,
      };
      responseRecord[res.variableId].response = currentChoice;
      responseRecord[res.variableId].type = quantitative
        ? "quantitative"
        : "qualitative";
      responseRecord[res.variableId].variableId =
        surveyQuestions[currentQ].variableId;
      console.log(responseRecord[res.variableId]);
      const newQ = currentQ + 1;
      setCurrentQ(newQ);
      if (newQ < Object.keys(responseRecord).length) {
        setCurrentChoice(
          responseRecord[surveyQuestions[newQ].variableId].response
        );
        const newQuantitative = surveyQuestions[newQ].hasQuantitative;
        setQuantitative(
          newQuantitative
            ? responseRecord[surveyQuestions[newQ].variableId].type ==
                "quantitative"
            : newQuantitative
        );
        setSwitchModeEnabled(
          newQuantitative
            ? surveyQuestions[newQ].qualitativeOptions.length > 0
            : surveyQuestions[newQ].hasQuantitative
        );
      }
    }
  };

  const backPressed = () => {
    const newQ = currentQ - 1;
    setCurrentQ(newQ);
    const newQuantitative = surveyQuestions[newQ].hasQuantitative;
    setSwitchModeEnabled(
      newQuantitative
        ? surveyQuestions[newQ].qualitativeOptions.length > 0
        : surveyQuestions[newQ].hasQuantitative
    );
    const newQuestionType =
      responseRecord[surveyQuestions[newQ].variableId].type == "quantitative";
    setQuantitative(newQuestionType);
    setCurrentChoice(responseRecord[surveyQuestions[newQ].variableId].response);
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={currentQ / (Object.keys(responseRecord).length + 12)}
        style={{ ...styles.progress }}
      />
      {currentQ < Object.keys(responseRecord).length ? (
        <>
          {errorText != "" ? (
            <Text style={styles.error}>{errorText}</Text>
          ) : (
            <></>
          )}
          <ProfileQuestion
            question={surveyQuestions[currentQ]}
            currentChoice={currentChoice}
            setCurrentChoice={setCurrentChoice}
            quantitative={quantitative}
          />
          {switchModeEnabled && (
            <Button
              mode="contained"
              onPress={() => {
                setQuantitative((prev) => !prev);
                setCurrentChoice("");
              }}
            >
              Provide {quantitative ? "estimate" : "exact value"} instead
            </Button>
          )}

          <Button
            mode="contained"
            onPress={() => {
              errorCheck =
                /^[0-9]+$/.test(currentChoice) || currentChoice === "";
              nextPressed();
            }}
          >
            Next
          </Button>
        </>
      ) : (
        <View style={styles.complete}>
          <Text variant="displayMedium">Quiz Complete</Text>
          <Button mode="contained" onPress={checkResponses}>
            Save and Complete
          </Button>
        </View>
      )}
      {currentQ != 0 ? (
        <Button mode="contained" onPress={backPressed}>
          Back
        </Button>
      ) : (
        <></>
      )}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setCurrentScreen("Profile")}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title style={styles.title}>Missing Information</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Some fields are incomplete and will lead to a diminished mortality
              reading.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                backPressed();
                setVisible(false);
              }}
            >
              Back
            </Button>
            <Button
              onPress={() => {
                setCurrentScreen("Profile");
                console.log(responseRecord);
              }}
            >
              Ignore
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
    gap: 20,
  },
  progress: {
    height: 10,
    width: 200, // need to figure out how to make this responsive to window size
    marginTop: 20,
    borderRadius: 60,
    alignSelf: "center",
  },
  complete: {
    paddingTop: "25%",
    width: "100%",
    gap: 30,
    alignItems: "center",
  },
  error: {
    color: "rgb(255, 90, 80)",
    marginBottom: -20,
    width: 250,
  },
  title: {
    textAlign: "center",
  },
});

export default ProfileSurvey;
