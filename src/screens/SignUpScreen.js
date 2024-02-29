import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import CommonButton from "../components/common/CommonButton";
import CommonTextInput from "../components/common/CommonTextInput";
import Loader from "../components/common/Loader";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../utils/commonstyles/Color";
import { signUp } from "../utils/databaseHelper/FireBase";
import { STYLES } from "../utils/commonstyles/Style";
const SignUpScreen = ({ route }) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    fullAddress: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(inputs.email)) {
      handleError("Please input a valid email", "email");
    }
    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }
    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(inputs.phone)) {
      handleError("Please input a valid phone number", "phone");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };
  const register = async () => {
    setLoading(true);
    const userSignUpResult = await signUp(inputs, "User");
    if (userSignUpResult.success) {
      setTimeout(() => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "SignInScreen" }],
        });
      }, 500);

      console.log("User registration successful:", userSignUpResult.user);
    } else {
      console.error("User registration failed:", userSignUpResult.error);
    }

    // setLoading(true);
    // setTimeout(() => {
    //   try {
    //     setLoading(false);
    //     const signUpResult = signUp(inputs, route.params.type, navigation);
    //     if (signUpResult.success) {
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: "SignInScreen" }, { type: "User" }],
    //       });
    //       console.log("Sign-up successful!");
    //       // Perform actions like navigation, displaying messages, etc.
    //     } else {
    //       // Sign-up failed, handle the error
    //       console.error("Sign-up failed:", signUpResult.error);
    //       // Perform actions like displaying error messages, retrying sign-up, etc.
    //     }
    //   } catch (error) {
    //     Alert.alert("Error", "Something went wrong");
    //   }
    // }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={styles.ScrollStyle}>
        <Text style={styles.MainText}>Register</Text>
        <Text style={styles.subText}>Enter Your Details to Register</Text>
        <View style={styles.inputsConatiner}>
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "fullname")}
            onFocus={() => handleError(null, "fullname")}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            keyboardType={"email-address"}
          />
          <CommonTextInput
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
            maxLength={10}
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "fullAddress")}
            onFocus={() => handleError(null, "fullAddress")}
            iconName="map-marker-radius-outline"
            label="Address"
            placeholder="Enter your full address"
            error={errors.fullAddress}
          />
          <CommonButton title="Register" onPress={validate} />
          <View style={styles.alreadyTextView}>
            <Text
              onPress={() => navigation.navigate("SignInScreen")}
              style={[STYLES.btbLogText, { fontWeight: "regular" }]}
            >
              {" "}
              Already have an account ?{" "}
            </Text>
            <Text
              onPress={() =>
                navigation.navigate("SignInScreen", { type: "User" })
              }
              style={[
                STYLES.btbLogText,
                { marginLeft: 5, color: COLOR.New_button, fontWeight: "500" },
              ]}
            >
              {" "}
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  container: { backgroundColor: COLOR.New_Primary, flex: 1 },
  ScrollStyle: { paddingTop: 50, paddingHorizontal: 20 },
  MainText: { color: COLOR.New_button, fontSize: 40, fontWeight: "bold" },
  subText: { color: COLOR.grey, fontSize: 18, marginVertical: 10 },
  inputsConatiner: { marginVertical: 20 },
  alreadyTextView: { flexDirection: "row", justifyContent: "center" },
});
