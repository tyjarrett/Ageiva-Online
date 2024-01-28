import { MD3DarkTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import LoginOrApp from "./components/authentication/LoginOrApp";
import FirstScreen from "./components/authentication/FirstScreen";
import LoginPageStub from "./components/authentication/LoginPageStub";
import AuthProvider from "./components/authentication/AuthProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/RootStack";
import { NavigationContainer, DarkTheme as NavigationTheme,
} from "@react-navigation/native";
import NavigationMenu from "./components/navigation/NavigationMenu";



const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme, // or MD3DarkTheme
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer theme={NavigationTheme}>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="LoginOrApp" component={LoginOrApp}/>
            <Stack.Screen options={{headerShown: false}} name="FirstScreen" component={FirstScreen}/>
            <Stack.Screen options={{headerShown: false}} name="LoginPageStub" component={LoginPageStub} />
            <Stack.Screen options={{headerShown: false}} name="NavigationMenu" component={NavigationMenu}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
