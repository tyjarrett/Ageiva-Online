import { Button, Text, TextInput } from "react-native-paper";
import { ProfileSurveyQuestion } from "../../types/Profile";
import { StyleSheet } from "react-native";
import { useState } from "react";
import MultipleChoice from "./MultipleChoice";

type Props = {
  question: ProfileSurveyQuestion;
};

const ProfileQuestion = ({ question }: Props) => {
  const [quantitative, setQuantitative] = useState(question.hasQuantitative);
  const [choice, setChoice] = useState("");

  const canSwitchMode = quantitative
    ? question.qualitativeOptions.length > 0
    : question.hasQuantitative;

  return (
    <>
      <Text style={styles.question}>
        {quantitative ? "Enter" : "Estimate"} {question.question}
        {question.unit && quantitative ? `(${question.unit})` : ""}:
      </Text>
      {quantitative ? (
        <TextInput style={styles.textInput} />
      ) : (
        <MultipleChoice
          choices={question.qualitativeOptions.map((choice, index) => ({
            text: choice,
            id: index.toString(),
          }))}
          choice={choice}
          setChoice={setChoice}
        />
      )}
      {canSwitchMode && (
        <Button
          mode="contained"
          style={styles.next}
          onPress={() => setQuantitative((prev) => !prev)}
        >
          Provide {quantitative ? "estimate" : "exact value"} instead
        </Button>
      )}

      <Button mode="contained" style={styles.next}>
        Next
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  question: {
    marginTop: 20,
  },
  textInput: {
    marginTop: 20,
  },
  next: {
    position: "relative",
    bottom: 0,
    right: 0,
    marginTop: 20,
  },
});

export default ProfileQuestion;
