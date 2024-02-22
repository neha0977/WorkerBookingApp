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
import BookingScreen from "../screens/BookingScreen";
import ServiceCartScreen from "../screens/ServiceCartScreen";
import BookingHistory from "../screens/BookingHistory";
import BookedService from "../screens/BookedService";

import AddressScreen from "../screens/AddressScreen";
import AddressListScreen from "../screens/AddressListScreen";
import UserTypeScreen from "../screens/UserTypeScreen";
import HomeProvider from "../screens/providerScreens/HomeProvider";
import BookedSucesssfullyScreen from "../screens/BookedSucesssfullyScreen";
import providerSignUp from "../screens/providerScreens/ProviderSignUp";
import ProviderSignUp from "../screens/providerScreens/ProviderSignUp";
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
          options={{ headerShown: false }}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
           <Stack.Screen
          options={{ headerShows: false }}
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          name="UserTypeScreen"
          component={UserTypeScreen}
          options={{ headerShows: false }}
        />
     
        <Stack.Screen
          options={{ headerShows: false }}
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="HomeScreen"
          component={BottomNavigator}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="AllCategories"
          component={AllCategories}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="PopularServices"
          component={PopularServices}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="SearchScreen"
          component={SearchScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="ServiceDetailScreen"
          component={ServiceDetailScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="BookingScreen"
          component={BookingScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="ServiceCartScreen"
          component={ServiceCartScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="BookingHistory"
          component={BookingHistory}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="BookedService"
          component={BookedService}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="AddressScreen"
          component={AddressScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="AddressListScreen"
          component={AddressListScreen}
        />
        <Stack.Screen
          options={{ headerShows: false }}
          name="HomeProvider"
          component={HomeProvider}
        />
          <Stack.Screen
          options={{ headerShows: false }}
          name="BookedSucesssfullyScreen"
          component={BookedSucesssfullyScreen}
        />
          <Stack.Screen
          options={{ headerShows: false }}
          name="ProviderSignUp"
          component={ProviderSignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

