import React from "react";
import { View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../../style/CommonStyles";
import { useAuth } from "../authentication/AuthProvider";

const TestScreen = () => {
  const auth = useAuth();

  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={commonStyles.centerStack}>
        <Title>Test Page</Title>
        <Text>{auth.currentUser.username}</Text>
        <Button>Test</Button>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;
