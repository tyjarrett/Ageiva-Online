import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import ProfileSurvey from "./ProfileSurvey";
import ProfileView from "./ProfileView";
import { ProfileScreenName } from "../../types/Profile";

const ProfileScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(
    "Profile" as ProfileScreenName
  );

  return (
    <>
      <Appbar.Header>
        {currentScreen !== "Profile" && (
          <Appbar.BackAction
            onPress={() => {
              setCurrentScreen("Profile");
            }}
          />
        )}
        <Appbar.Content title={currentScreen} />
      </Appbar.Header>
      {currentScreen === "Profile" ? (
        <ProfileView setCurrentScreen={setCurrentScreen} />
      ) : (
        <ProfileSurvey setCurrentScreen={setCurrentScreen} />
      )}
    </>
  );
};

export default ProfileScreen;
