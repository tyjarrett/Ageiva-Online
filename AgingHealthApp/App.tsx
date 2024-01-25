import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import LoginOrApp from "./components/authentication/LoginOrApp";
import AuthProvider from "./components/authentication/AuthProvider";

export default function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <AuthProvider>
        <LoginOrApp />
      </AuthProvider>
    </PaperProvider>
  );
}
