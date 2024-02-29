import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonTextInput from "../components/common/CommonTextInput";
import CommonButton from "../components/common/CommonButton";
import { COLOR } from "../utils/commonstyles/Color";
import Loader from "../components/common/Loader";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../utils/databaseHelper/FireBase";
import { CONSTANTS } from "../utils/constants/StaticContent";
import { STYLES } from "../utils/commonstyles/Style";

const SignInScreen = ({ route }) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [TYPE, setTYPE] = useState("");
  useEffect(() => {
    const TYPE = route.params.type;
    console.log("TYPE", TYPE);
    setTYPE(route.params.type);
  }, []);

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
        signIn(inputs, navigation);
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
      <Image
        source={require("../assets/AppLogo/logo.png")}
        style={[STYLES.AppLogo, { alignSelf: "center" }]}
      />
      <View style={STYLES.logView}>
        <Text style={[STYLES.logText, { alignSelf: "center" }]}>
          {CONSTANTS.welcome_back}
        </Text>
        <Text style={[STYLES.enterDataText, { alignSelf: "center" }]}>
          {CONSTANTS.enter_data}
        </Text>
        <View style={STYLES.inputView}>
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder={CONSTANTS.place_email}
            error={errors.email}
            keyboardType={"email-address"}
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
          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            style={[
              STYLES.btbLogText,
              { color: COLOR.New_button, fontWeight: "500", fontSize: 12 },
            ]}
          >
            Forgot Password ?
          </Text>
          <CommonButton title={CONSTANTS.log_in} onPress={validate} />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={[STYLES.btbLogText, { fontWeight: "regular" }]}>
              Don't have account?
            </Text>
            <Text
              onPress={() => {
                console.log("route.params.type", route.params.type);
                if (route.params.type === "User") {
                  navigation.navigate("SignUpScreen");
                } else if (route.params.type === "Provider") {
                  navigation.navigate("ProviderSignUp");
                }
              }}
              style={[
                STYLES.btbLogText,
                {
                  marginLeft: 5,
                  color: COLOR.New_button,
                  fontWeight: "500",
                },
              ]}
            >
              Register
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
