import { View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../../style/CommonStyles";
import { useAuth } from "../authentication/AuthProvider";
import { useState } from "react";
import { getUserGivenToken } from "../../functions/apiCalls";

const TestScreen = () => {
  const auth = useAuth();
  const [testText, setTestText] = useState("Test text");
  const testFunc = () => {
    getUserGivenToken("4636c8339533f1342e182e76a853560fedb35a85")
      .then((res) => {
        console.log("hi");
        setTestText(res.data.username);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={commonStyles.center}>
        <Title>Test Page</Title>
        <Text>{testText}</Text>
        <Button onPress={() => testFunc()}>Test</Button>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;
