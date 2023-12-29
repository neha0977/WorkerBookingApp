import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { COLOR } from "../utils/commonstyles/Color";

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
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShows: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
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
          component={HomeScreen}
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
