import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {COLOR} from "../utils/commonstyles/Color"
import HomeScreen from "../screens/HomeScreen";
const Tab = createMaterialBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor={COLOR.New_button}
      inactiveColor={COLOR.grey}
      barStyle={{ backgroundColor: COLOR.Header_color }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home"  color={COLOR.New_button} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="card-search-outline"
              color={COLOR.New_button}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={COLOR.New_button} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
