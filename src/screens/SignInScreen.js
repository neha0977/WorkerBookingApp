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
const SignInScreen = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };
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
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  //   const login = () => {
  //     setLoading(true);
  //     setTimeout(async () => {
  //       setLoading(false);
  //       let userData = await AsyncStorage.getItem("userData");
  //       if (userData) {
  //         userData = JSON.parse(userData);
  //         if (
  //           inputs.email == userData.email &&
  //           inputs.password == userData.password
  //         ) {
  //           navigation.navigate("HomeScreen");
  //           AsyncStorage.setItem(
  //             "userData",
  //             JSON.stringify({ ...userData, loggedIn: true })
  //           );
  //         } else {
  //           ToastAndroid.show("Error", "Invalid Details", ToastAndroid.SHORT);
  //         }
  //       } else {
  //         ToastAndroid.show("Error", "User does not exist", ToastAndroid.SHORT);
  //       }
  //     }, 3000);
  //   };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLOR.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLOR.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: COLOR.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <CommonButton title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("SignUpScreen")}
            style={{
              color: COLOR.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
