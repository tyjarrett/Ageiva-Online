import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProfileScreen from "../profile/ProfileScreen";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import TestScreen from "../test/TestScreen";
const NavigationMenu = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Results"
        component={TestScreen}
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
