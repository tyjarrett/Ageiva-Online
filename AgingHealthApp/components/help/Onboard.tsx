import { Image } from "expo-image";
import Onboarding from "react-native-onboarding-swiper";

type Props = {
  endOnboarding: () => void;
};

const Onboard = ({ endOnboarding }: Props) => {
  return (
    <Onboarding
      pages={[
        {
          title: "Enter Data",
          subtitle:
            "Answer questions on the profile page to build a health profile",
          backgroundColor: "#AAA",
          image: <Image source={require("../../assets/icon.png")} />,
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
      onDone={endOnboarding}
      onSkip={endOnboarding}
    />
  );
};

export default Onboard;
