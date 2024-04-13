import { Appbar, IconButton, Menu } from "react-native-paper";
import { useState } from "react";
import { useNav } from "./NavigationProvider";
import ContactModal from "../help/ContactModal";

type Props = {
  title: string;
  onBack?: (() => void) | null;
};

const AppHeader = ({ title, onBack = null }: Props) => {
  const nav = useNav();

  const [contactOpen, setContactOpen] = useState(false);
  const [helpMenuVisible, setHelpMenuVisible] = useState(false);

  return (
    <>
      <ContactModal open={contactOpen} setOpen={setContactOpen} />
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
            onPress={nav.startOnboarding}
          />
          <Menu.Item
            title="Contact Support"
            leadingIcon="chat-question-outline"
            onPress={() => {
              setHelpMenuVisible(false);
              setContactOpen(true);
            }}
          />
        </Menu>
      </Appbar.Header>
    </>
  );
};

export default AppHeader;
