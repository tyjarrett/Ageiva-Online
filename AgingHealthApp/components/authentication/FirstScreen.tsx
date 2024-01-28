import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import LoginPageStub from "./LoginPageStub";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../types/RootStack";

type Props = NativeStackScreenProps<RootStackParamList, 'FirstScreen'>;

const FirstScreen = ({ route, navigation } : Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text variant="displayMedium">Logo</Text>
            <Text>our app discription</Text>
            <Button mode="contained" onPress={() => navigation.navigate('LoginPageStub')}>
              Login
            </Button>
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              Sign Up
            </Button>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexWrap: "wrap",
      gap: 30,
      alignItems: "center",
      backgroundColor: "rgb(29, 27, 30)",
      justifyContent: "center",
    },
  });

export default FirstScreen;