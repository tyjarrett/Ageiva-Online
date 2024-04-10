import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNav } from "../navigation/NavigationProvider";
import { onboardSlides } from "../../utilities/onboard";

const Onboard = () => {
  const nav = useNav();

  return (
    <Onboarding
      imageContainerStyles={{ paddingBottom: 0 }}
      pages={onboardSlides.map(({ title, text, image }) => ({
        title: title,
        subtitle: text,
        backgroundColor: "#737373",
        image: <Image source={image} style={styles.image} />,
      }))}
      onDone={nav.stopOnboarding}
      onSkip={nav.stopOnboarding}
    />
  );
};

const styles = StyleSheet.create({ image: { width: "50%", height: 500 } });

export default Onboard;
