import { Appbar, Button } from "react-native-paper";
import { useAuth } from "../authentication/AuthProvider";
import { StyleSheet } from "react-native";

type Props = {
  title: string;
  onBack?: (() => void) | null;
};

const AppHeader = ({ title, onBack = null }: Props) => {
  const auth = useAuth();
  const logout = () => {
    auth.clearAuth();
    // should do some loading here bc clearAuth is an async call
  };

  return (
    <Appbar.Header>
      {onBack && <Appbar.BackAction onPress={onBack} />}
      <Appbar.Content title={title} />
      <Button onPress={logout} style={styles.logout}>
        Logout
      </Button>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  logout: {
    position: "relative",
    top: "0%",
    right: "5%",
  },
});

export default AppHeader;
