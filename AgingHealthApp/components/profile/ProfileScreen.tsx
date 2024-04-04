import React, { useState } from "react";
import ProfileSurvey from "./ProfileSurvey";
import ProfileView from "./ProfileView";
import ProfileCheck from "./ProfileCheck";
import { ProfileScreenName } from "../../types/Profile";
import AppHeader from "../navigation/AppHeader";

const ProfileScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(
    "Profile" as ProfileScreenName
  );

  const [dateCheck, setDateCheck] = useState("");

  return (
    <>
      <AppHeader
        title={currentScreen}
        onBack={
          currentScreen === "Profile" ? null : () => setCurrentScreen("Profile")
        }
      />
      {currentScreen === "Profile" ? (
        <ProfileView
          setCurrentScreen={setCurrentScreen}
          setDateCheck={setDateCheck}
        />
      ) : currentScreen === "Survey" ? (
        <ProfileSurvey setCurrentScreen={setCurrentScreen} />
      ) : (
        <ProfileCheck
          setCurrentScreen={setCurrentScreen}
          dateCheck={dateCheck}
        />
      )}
    </>
  );
};

export default ProfileScreen;
