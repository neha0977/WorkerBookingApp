import {  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonButton from "../components/common/CommonButton";
import CommonTextInput from "../components/common/CommonTextInput";
import {STYLES} from "../utils/commonstyles/Style";
import {CONSTANTS} from "../../src/utils/constants/StaticContent";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  return (
    <SafeAreaView style={[STYLES.containerForgotpass,{paddingHorizontal:'7%'}]}>
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
        onChangeText={(txt) => setEmail(txt)}
      />
    </View>

    <View style={{ marginTop: "8%" }}>
      <CommonButton
        title={CONSTANTS.forgot_button_text}
        onClick={() => {
          navigation.navigate("SignInScreen");
        }}
      />
    </View>
  </SafeAreaView>
  )
}

export default ForgotPassword
