import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import ForgotPassword from "../screens/ForgotPassword";
import { COLOR } from "../utils/commonstyles/Color";
import AllCategories from "../screens/AllCategories";
import PopularServices from "../screens/PopularServices";
import SearchScreen from "../screens/SearchScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";

import ProfileScreen from "../screens/ProfileScreen";
import BottomNavigator from "./BottomNavigator";
import NotificationScreen from "../screens/NotificationScreen";
const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShows: false }}
        />

        <Stack.Screen
          options={{ headerShows: false }}
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="SignUpScreen"
          component={SignUpScreen}
          option={{
            title: "HomeScreen",
          }}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="HomeScreen"
          component={BottomNavigator}
          option={{
            title: "HomeScreen",
          }}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="AllCategories"
          component={AllCategories}
          option={{
            title: "HomeScreen",
          }}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="PopularServices"
          component={PopularServices}
          option={{
            title: "HomeScreen",
          }}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="SearchScreen"
          component={SearchScreen}
          option={{
            title: "HomeScreen",
          }}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="ServiceDetailScreen"
          component={ServiceDetailScreen}
          option={{
            title: "ServiceDetailScreen",
          }}
        />
         <Stack.Screen
          options={{ headerShows: false }}
          name="ForgotPassword"
          component={ForgotPassword}
          option={{
            title: "HomeScreen",
          }}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="ProfileScreen"
          component={ProfileScreen}
          option={{
            title: "HomeScreen",
          }}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="NotificationScreen"
          component={NotificationScreen}
          option={{
            title: "HomeScreen",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
