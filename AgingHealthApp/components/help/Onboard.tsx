import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNav } from "../navigation/NavigationProvider";

const Onboard = () => {
  const nav = useNav();

  return (
    <Onboarding
      imageContainerStyles={{ paddingBottom: 0 }}
      pages={[
        {
          title: "Enter Data",
          subtitle:
            "Answer questions on the profile page to build a health profile",
          backgroundColor: "#AAA",
          image: (
            <Image
              source={require("../../assets/survey.png")}
              style={styles.image}
            />
          ),
        },
        {
          title: "View Results",
          subtitle:
            "Go to the results page to view predictions of how your health variables will change over time",
          backgroundColor: "#AAA",
          image: <Image source={require("../../assets/icon.png")} />,
        },
        {
          title: "Analyze Results",
          subtitle:
            "Filter which variables you'd like to see, and press and hold on the graphs to see more detailed information",
          backgroundColor: "#AAA",
          image: <Image source={require("../../assets/icon.png")} />,
        },
        {
          title: "Update Data",
          subtitle:
            "Revisit the profile page every quarter to answer the questions again and keep your predictions as accurate as possible",
          backgroundColor: "#AAA",
          image: <Image source={require("../../assets/icon.png")} />,
        },
      ]}
      onDone={nav.stopOnboarding}
      onSkip={nav.stopOnboarding}
    />
  );
};

const styles = StyleSheet.create({ image: { width: "50%", height: 400 } });

export default Onboard;
