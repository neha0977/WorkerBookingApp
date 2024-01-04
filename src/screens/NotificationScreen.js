import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";

const NotificationScreen = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLOR.white}}>
      <CommonHeader title={"Notification"} />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
