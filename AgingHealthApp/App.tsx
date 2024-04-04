import React from "react";
import {
  MD3DarkTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import LoginOrApp from "./components/authentication/LoginOrApp";
import AuthProvider from "./components/authentication/AuthProvider";
import {
  NavigationContainer,
  DarkTheme as NavigationTheme,
} from "@react-navigation/native";

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
          <LoginOrApp />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
