import { Appbar, IconButton, Menu } from "react-native-paper";
import { useAuth } from "../authentication/AuthProvider";
import { StyleSheet } from "react-native";
import { useState } from "react";

type Props = {
  title: string;
  startOnboarding: () => void;
  onBack?: (() => void) | null;
};

const AppHeader = ({ title, startOnboarding, onBack = null }: Props) => {
  const auth = useAuth();

  const [helpMenuVisible, setHelpMenuVisible] = useState(false);

  const logout = () => {
    auth.clearAuth();
    // should do some loading here bc clearAuth is an async call
  };

  return (
    <Appbar.Header>
      {onBack && <Appbar.BackAction onPress={onBack} />}
      <Appbar.Content title={title} />
      <Menu
        visible={helpMenuVisible}
        onDismiss={() => setHelpMenuVisible(false)}
        anchor={
          <IconButton
            icon="help-circle-outline"
            onPress={() => setHelpMenuVisible(true)}
          />
        }
        anchorPosition="bottom"
      >
        <Menu.Item
          title="App Walkthrough"
          leadingIcon="help"
          onPress={startOnboarding}
        />
        <Menu.Item
          title="Contact Support"
          leadingIcon="chat-question-outline"
        />
      </Menu>
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
