import { StyleSheet, Text, View, SafeAreaView, ScrollView,FlatList } from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { STYLES } from "../utils/commonstyles/Style";

const BookingHistory = () => {
  return (
    <SafeAreaView>
      <CommonHeader title="Appointment history" />

      <ScrollView>
        <View style={STYLES.containerForgotpass}>
            <Text style={STYLES.forgotPassSubText}>Name</Text>
           
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({});
