import {
  NavigationContainer,
  DarkTheme as NavigationTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import NavigationMenu from "./components/navigation/NavigationMenu";

const Stack = createNativeStackNavigator();

export default function App() {
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: NavigationTheme,
  });

  const Tab = createMaterialBottomTabNavigator();

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={DarkTheme}>
        <NavigationMenu />
      </NavigationContainer>
    </PaperProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
