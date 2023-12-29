import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import CommonTextInput from "../components/common/CommonTextInput";
import CommonButton from "../components/common/CommonButton";
import { COLOR } from "../utils/commonstyles/Color";
import Loader from "../components/common/Loader";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../utils/databaseHelper/FireBase";
import { CONSTANTS } from "../utils/constants/StaticContent";
import { STYLES } from "../utils/commonstyles/Style";

const SignInScreen = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  //validate user input function
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError(CONSTANTS.enter_email, "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError(CONSTANTS.enter_password, "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  //login user function
  const login = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        signIn(inputs);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
        }, 2000);
      } catch (error) {
        Alert.alert("Error", CONSTANTS.something_wrong);
      }
    }, 3000);
  };

  // handle validation function
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  // handle erroe in text inputs
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={STYLES.mainContainer}>
      <Loader visible={loading} />
      <View style={STYLES.logView}>
        <Text style={STYLES.logText}>{CONSTANTS.log_in}</Text>
        <Text style={STYLES.enterDataText}>{CONSTANTS.enter_data}</Text>
        <View style={STYLES.inputView}>
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder={CONSTANTS.place_email}
            error={errors.email}
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder={CONSTANTS.place_password}
            error={errors.password}
            password
          />
          <CommonButton title={CONSTANTS.log_in} onPress={validate} />
          <Text
            onPress={() => navigation.navigate("SignUpScreen")}
            style={STYLES.btbLogText}
          >
            Don't have account? Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
