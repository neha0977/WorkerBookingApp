import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import HomeHeader from "../../components/common/HomeHeader";
import { COLOR } from "../../utils/commonstyles/Color";
import firestore from "@react-native-firebase/firestore";
const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("serviceBooking")
      .onSnapshot((snapshot) => {
        const bookingData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("bookingData",bookingData)
        setBookings(bookingData);
      });

    return () => unsubscribe();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
    </SafeAreaView>
  );
};

export default ProviderDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.New_Primary },
});
