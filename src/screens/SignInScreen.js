import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import CommonTextInput from "../components/common/CommonTextInput";
import { STYLES } from "../utils/commonstyles/Style";
import CommonButton from "../components/common/CommonButton";
const SignInScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={STYLES.container}>
      <CommonTextInput label={"Email"} onChangeText={(name) => setName(name)} />
      <CommonTextInput
        label={"Password"}
        onChangeText={(password) => setPassword(password)}
      />
      <CommonButton title={"Sign In"} />
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
