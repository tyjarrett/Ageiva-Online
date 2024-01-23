import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../../style/CommonStyles";
import { TextInput, Title } from "react-native-paper";
import { View } from "react-native";

// temporary login page -- should be removed after actual login page is created
const LoginPageStub = () => {
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={commonStyles.center}>
        <Title>Login Page</Title>
      </View>
    </SafeAreaView>
  );
};

export default LoginPageStub;
