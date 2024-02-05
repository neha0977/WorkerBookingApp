import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonButton from "../components/common/CommonButton";
import CommonTextInput from "../components/common/CommonTextInput";
import { STYLES } from "../utils/commonstyles/Style";
import { CONSTANTS } from "../../src/utils/constants/StaticContent";
import auth from "@react-native-firebase/auth";
import { COLOR } from "../utils/commonstyles/Color";
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleforgotPassword = async (Email) => {
    console.log("forgotPassword", Email);
    if (!email) {
      ToastAndroid.show("Please enter your email address", ToastAndroid.SHORT);
      return;
    }
    await auth()
      .sendPasswordResetEmail(Email)
      .then(function (user) {
        console.log(user);
        ToastAndroid.show("Please check your email...", ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.navigate("SignInScreen");
        }, 3000);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  return (
    <SafeAreaView
      style={[STYLES.containerForgotpass, { paddingHorizontal: "7%" }]}
    >
      <TouchableOpacity
        style={STYLES.backbtnView}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/img/left.png")}
          style={STYLES.backicon}
        />
      </TouchableOpacity>

      <Text style={STYLES.forgorPassText}>
        {CONSTANTS.forget_password_main_text}
      </Text>
      <Text style={STYLES.forgotPassSubText}>
        {CONSTANTS.forget_password_sub_text}
      </Text>
      <View style={{ marginTop: 10 }}>
        <CommonTextInput
          placeholder={CONSTANTS.enter_email}
          value={email}
          label={"Email"}
          onChangeText={(txt) => setEmail(txt)}
        />
      </View>
                                                                                                                                                                                                                                          
      <View style={{ marginTop: "8%" }}>
        <TouchableOpacity
          onPress={() => handleforgotPassword(email)}
          activeOpacity={0.7}
          style={{
            height: 45,
            width: "100%",
            backgroundColor: COLOR.New_button,
            marginVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{ color: COLOR.white, fontWeight: "bold", fontSize: 15 }}
          >
            {CONSTANTS.forgot_button_text}
          </Text>
        </TouchableOpacity>
        {/* <CommonButton
          title={CONSTANTS.forgot_button_text}
          onPress={handleforgotPassword(email)}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
