import { Button } from "react-native-paper";
import AppHeader from "../navigation/AppHeader";

type Props = {
  startOnboarding: () => void;
};

const HelpScreen = ({ startOnboarding }: Props) => {
  return (
    <>
      <AppHeader title="Help" />
      <Button onPress={startOnboarding}>Help</Button>
    </>
  );
};

export default HelpScreen;
