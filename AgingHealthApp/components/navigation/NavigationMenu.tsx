import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProfileScreen from "../profile/ProfileScreen";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import ResultsScreen from "../results/ResultsScreen";
import Onboard from "../help/Onboard";
const NavigationMenu = () => {
  const Tab = createMaterialBottomTabNavigator();
  const [onboarding, setOnboarding] = useState(false);

  const startOnboarding = () => {
    setOnboarding(true);
  };

  const endOnboarding = () => {
    setOnboarding(false);
  };

  return onboarding ? (
    <Onboard endOnboarding={endOnboarding} />
  ) : (
    <Tab.Navigator>
      <Tab.Screen
        name="Results"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="bar-graph" size={24} color={color} />
          ),
        }}
      >
        {() => <ResultsScreen startOnboarding={startOnboarding} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      >
        {() => <ProfileScreen startOnboarding={startOnboarding} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default NavigationMenu;
