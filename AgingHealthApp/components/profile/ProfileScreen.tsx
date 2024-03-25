import React, { useState } from "react";
import { Appbar, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import ProfileSurvey from "./ProfileSurvey";
import ProfileView from "./ProfileView";
import ProfileCheck from "./ProfileCheck";
import { ProfileScreenName } from "../../types/Profile";
import { useAuth } from "../authentication/AuthProvider";

const ProfileScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(
    "Profile" as ProfileScreenName
  );

  const [dateCheck, setDateCheck] = useState("");

  const auth = useAuth();

  const logout = () => {
    auth.clearAuth();
    // should do some loading here bc clearAuth is an async call
  };

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
        {currentScreen === "Profile" ? (
          <Button onPress={logout} style={styles.logout}>
            Logout
          </Button>
        ) : (
          <></>
        )}
      </Appbar.Header>
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

const styles = StyleSheet.create({
  logout: {
    position: "relative",
    top: "0%",
    right: "5%",
  },
});
export default ProfileScreen;
