import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppNavigator from "./src/routes/AppNavigator";
import configureStore from "./src/redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <AppNavigator />
    // <Provider store={configureStore}>
    //   <AppNavigator />
    // </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
