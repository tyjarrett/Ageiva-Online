import { Dialog, Portal, Text } from "react-native-paper";
import { SetState } from "../../types/General";
import { StyleSheet } from "react-native";

type Props = {
  open: boolean;
  setOpen: SetState<boolean>;
};

const ContactModal = ({ open, setOpen }: Props) => {
  return (
    <Portal>
      <Dialog
        visible={open}
        onDismiss={() => setOpen(false)}
        style={styles.container}
      >
        <Dialog.Content style={styles.content}>
          <Text
            variant="headlineMedium"
            style={{ ...styles.centerText, paddingBottom: 10 }}
          >
            Contact
          </Text>
          <Text>email@gmail.com</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignContent: "center",
    alignSelf: "center",
    width: "80%",
    justifyContent: "flex-start",
  },
  content: {
    alignContent: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  centerText: {
    textAlign: "center",
  },
});

export default ContactModal;
