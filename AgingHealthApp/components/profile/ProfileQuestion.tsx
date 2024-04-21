import { Text, TextInput } from "react-native-paper";
import { ProfileSurveyQuestion } from "../../types/Profile";
import { StyleSheet } from "react-native";
import MultipleChoice from "./MultipleChoice";
import { SetState } from "../../types/General";

type Props = {
  question: ProfileSurveyQuestion;
  currentChoice: string;
  setCurrentChoice: SetState<string>;
  quantitative: boolean;
};

const ProfileQuestion = ({
  question,
  currentChoice,
  setCurrentChoice,
  quantitative,
}: Props) => {
  return (
    <>
      <Text style={styles.question}>
        {question.question}
        {question.unit && quantitative ? ` (${question.unit})` : ""}:
      </Text>
      {quantitative ? (
        <TextInput
          style={styles.textInput}
          value={currentChoice}
          onChangeText={(text) => setCurrentChoice(text)}
        />
      ) : (
        <MultipleChoice
          choices={question.qualitativeOptions.map((choice, index) => ({
            text: choice,
            id: index.toString(),
          }))}
          choice={currentChoice}
          setChoice={setCurrentChoice}
        />
      )}
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
