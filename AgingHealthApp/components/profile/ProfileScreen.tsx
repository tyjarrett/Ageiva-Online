import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import { commonStyles } from "../../style/CommonStyles";
import { useAuth } from "../authentication/AuthProvider";

const ProfileScreen = () => {
  const auth = useAuth();

  const logout = () => {
    auth.clearAuth();
    // should do some loading here bc clearAuth is an async call
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={commonStyles.centerStack}>
        <Title>profile</Title>
        <Text>{auth.currentUser.username}</Text>
        <Button onPress={logout}>Logout</Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
