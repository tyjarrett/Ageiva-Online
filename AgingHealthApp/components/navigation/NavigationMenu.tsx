import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProfileScreen from "../profile/ProfileScreen";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import ResultsScreen from "../results/ResultsScreen";
const NavigationMenu = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="bar-graph" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationMenu;
