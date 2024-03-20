import { Button, Dialog, Portal, ProgressBar, Text } from "react-native-paper";
import { SetState } from "../../types/General";
import {
  PResponse,
  ProfileScreenName,
  QuestionAndResponse,
  VariableId,
} from "../../types/Profile";
import { StyleSheet, View } from "react-native";
import { surveyQuestions } from "../../utilities/constants";
import { useEffect, useState } from "react";
import ProfileQuestion from "./ProfileQuestion";
import { createDataPoint, getHealthData } from "../../functions/apiCalls";
import { useAuth } from "../authentication/AuthProvider";
import { AxiosError } from "axios";

type Props = {
  setCurrentScreen: SetState<ProfileScreenName>;
};

const testRecord = {} as Record<VariableId, QuestionAndResponse>;
const ProfileSurvey = ({ setCurrentScreen }: Props) => {
  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

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
  const [required, setRequired] = useState(false);
  const [range, setRange] = useState([0.000326598886798, 1.70742148]);

  async function fetchData() {
    getHealthData(auth.authToken)
      .then(({ data: res }) => {
        console.log(res.health_data[0]);
        for (const [key, entry] of Object.entries(res.health_data[0])) {
          if (
            key !== "background" &&
            key !== "date" &&
            key !== "id" &&
            key !== "user"
          ) {
            const resp = {} as QuestionAndResponse;
            resp.variableId = key as VariableId;
            resp.type = "quantitative";
            if (entry != null) {
              resp.response = entry.toString();
            } else {
              resp.response = "";
            }
            testRecord[key as VariableId] = resp;
          }
        }
        console.log(testRecord);
      })
      .catch((err: AxiosError) => {
        // possibly invalid token, but should do more error validation
        console.log(err.message);
        // setLoadingCreds(false);
      });
  }

  const postRecord = () => {
    const pushRecord = {} as Record<VariableId, PResponse>;
    for (const [key, entry] of Object.entries(testRecord)) {
      if (entry.response !== "") {
        if (entry.type == "qualitative") {
          let i = 0;
          for (const index in surveyQuestions) {
            if (surveyQuestions[index].variableId == key) {
              i = parseInt(index);
              break;
            }
          }
          pushRecord[entry.variableId] = {
            type: "quantitative",
            response: (
              parseInt(entry.response) * surveyQuestions[i].stdev +
              surveyQuestions[i].mean
            ).toString(),
          };
        } else {
          pushRecord[entry.variableId] = {
            type: entry.type,
            response: entry.response,
          };
        }
      }
    }
    console.log(pushRecord);
    createDataPoint(pushRecord, auth.authToken)
      .then(() => {
        console.log("sent");
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
      });
  };

  const checkResponses = () => {
    let check = false;
    for (const [key, entry] of Object.entries(testRecord)) {
      if (entry.response === "") {
        console.log(entry);
        check = true;
        break;
      }
    }
    if (check) {
      setVisible(true);
    } else {
      postRecord();
      setCurrentScreen("Profile");
    }
  };

  const nextPressed = () => {
    if (required) {
      errorCheck =
        /^\d+\.\d+$/.test(currentChoice) || /^\d+$/.test(currentChoice);
    } else {
      errorCheck =
        /^\d+\.\d+$/.test(currentChoice) ||
        /^\d+$/.test(currentChoice) ||
        currentChoice === "";
    }
    if (!errorCheck) {
      setErrorText("Please enter only numbers");
    }
    const res = {
      variableId: surveyQuestions[currentQ].variableId,
      type: quantitative ? "quantitative" : "qualitative",
      response: currentChoice,
    } as QuestionAndResponse;
    if (
      (parseFloat(res.response) > range[1] ||
        parseFloat(res.response) < range[0]) &&
      res.type === "quantitative"
    ) {
      setErrorText("Enter numbers inside the range");
      errorCheck = false;
    }
    if (errorCheck) {
      setErrorText("");
      testRecord[res.variableId] = res;
      console.log(testRecord[res.variableId]);
      const newQ = currentQ + 1;
      setCurrentQ(newQ);
      if (newQ < Object.keys(surveyQuestions).length) {
        setRequired(surveyQuestions[newQ].required);
        setCurrentChoice(
          testRecord[surveyQuestions[newQ].variableId]
            ? testRecord[surveyQuestions[newQ].variableId].response
            : ""
        );
        const newQuantitative = surveyQuestions[newQ].hasQuantitative;
        setQuantitative(
          surveyQuestions[newQ].variableId in testRecord
            ? newQuantitative
              ? testRecord[surveyQuestions[newQ].variableId].type ==
                "quantitative"
              : newQuantitative
            : newQuantitative
        );
        setSwitchModeEnabled(
          newQuantitative
            ? surveyQuestions[newQ].qualitativeOptions.length > 0
            : surveyQuestions[newQ].hasQuantitative
        );
        setRange([
          surveyQuestions[newQ].mean - surveyQuestions[newQ].stdev * 3,
          surveyQuestions[newQ].mean + surveyQuestions[newQ].stdev * 3,
        ]);
      }
    }
  };

  const ignorePress = () => {
    postRecord();
    setCurrentScreen("Profile");
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
      testRecord[surveyQuestions[newQ].variableId].type == "quantitative";
    setQuantitative(newQuestionType);
    setCurrentChoice(testRecord[surveyQuestions[newQ].variableId].response);
    setRequired(surveyQuestions[newQ].required);
    setErrorText("");
    setRange([
      surveyQuestions[newQ].mean - surveyQuestions[newQ].stdev * 3,
      surveyQuestions[newQ].mean + surveyQuestions[newQ].stdev * 3,
    ]);
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={currentQ / (Object.keys(surveyQuestions).length + 20)}
        style={{ ...styles.progress }}
      />
      {currentQ < Object.keys(surveyQuestions).length ? (
        <>
          {required ? <Text>* this field is required</Text> : <></>}
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
            <Button onPress={ignorePress}>Ignore</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
