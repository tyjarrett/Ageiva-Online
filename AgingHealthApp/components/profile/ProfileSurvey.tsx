import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  ProgressBar,
  Text,
} from "react-native-paper";
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

const testRecord = {} as Record<VariableId, QuestionAndResponse>;

type Props = {
  setCurrentScreen: SetState<ProfileScreenName>;
};

const ProfileSurvey = ({ setCurrentScreen }: Props) => {
  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
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
  const [range, setRange] = useState([0, 1.7]);

  async function fetchData() {
    getHealthData(auth.authToken)
      .then(({ data: res }) => {
        if (res.health_data[0].age) {
          const resp = {} as QuestionAndResponse;
          resp.variableId = "age" as VariableId;
          resp.type = "quantitative";
          resp.response = res.health_data[0].age.toString();
          testRecord["age"] = resp;
        }
        for (const [key, entry] of Object.entries(res.health_data[0].data)) {
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
        console.log(testRecord);
        firstQuestion();
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

  const firstQuestion = () => {
    setRequired(surveyQuestions[currentQ].required);
    setCurrentChoice(
      testRecord[surveyQuestions[currentQ].variableId]
        ? testRecord[surveyQuestions[currentQ].variableId].response
        : ""
    );
    const newQuantitative = surveyQuestions[currentQ].hasQuantitative;
    setQuantitative(
      surveyQuestions[currentQ].variableId in testRecord
        ? newQuantitative
          ? testRecord[surveyQuestions[currentQ].variableId].type ==
            "quantitative"
          : newQuantitative
        : newQuantitative
    );
    setSwitchModeEnabled(
      newQuantitative
        ? surveyQuestions[currentQ].qualitativeOptions.length > 0
        : surveyQuestions[currentQ].hasQuantitative
    );
    setRange([
      surveyQuestions[currentQ].mean - surveyQuestions[currentQ].stdev * 3,
      surveyQuestions[currentQ].mean + surveyQuestions[currentQ].stdev * 3,
    ]);
    setLoading(false);
  };

  const nextPressed = () => {
    console.log(testRecord[surveyQuestions[currentQ].variableId as VariableId]);
    if (required && currentChoice === "") {
      errorCheck = false;
      setErrorText("Please enter a number");
    } else {
      errorCheck =
        /^\d+\.\d+$/.test(currentChoice) ||
        /^\d+$/.test(currentChoice) ||
        currentChoice === "";
      if (!errorCheck) {
        setErrorText("Please enter only numbers");
      }
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
      const errortext =
        "Enter numbers inside the range (" +
        (
          surveyQuestions[currentQ].mean -
          surveyQuestions[currentQ].stdev * 3
        ).toFixed(3) +
        " to " +
        (
          surveyQuestions[currentQ].mean +
          surveyQuestions[currentQ].stdev * 3
        ).toFixed(3) +
        ")";
      setErrorText(errortext);
      errorCheck = false;
    }
    if (errorCheck) {
      setErrorText("");
      testRecord[res.variableId] = res;
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
      Math.max(surveyQuestions[newQ].mean - surveyQuestions[newQ].stdev * 3, 0),
      surveyQuestions[newQ].mean + surveyQuestions[newQ].stdev * 3,
    ]);
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={currentQ / (Object.keys(surveyQuestions).length + 20)}
        style={{ ...styles.progress }}
      />
      <View style={{ flexDirection: "row" }}>
        {currentQ != 0 ? (
          <Button mode="contained" onPress={backPressed} icon="arrow-left">
            Back
          </Button>
        ) : (
          <></>
        )}
        {currentQ < Object.keys(surveyQuestions).length ? (
          <Button
            mode="contained"
            style={{ marginLeft: "auto", marginRight: 0 }}
            onPress={() => {
              nextPressed();
            }}
            icon="arrow-right"
          >
            Next
          </Button>
        ) : (
          <></>
        )}
      </View>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : currentQ < Object.keys(surveyQuestions).length ? (
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
        </>
      ) : (
        <View style={styles.complete}>
          <Text variant="displayMedium">Quiz Complete</Text>
        </View>
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
      <Button mode="contained" onPress={checkResponses}>
        Save and Complete
      </Button>
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
