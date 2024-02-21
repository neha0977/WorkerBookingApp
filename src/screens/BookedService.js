import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
const BookedService = () => {
  const [servicePackages, setServicePackages] = useState([
    {
      id: "1",
      name: " Men's grooming @ 380 coloring",
      catlegory: "Hair coloring :- Above shoulder",
      minCat: "Grooming",
      duration: "1 hr 5 mins",
      subCat: "Men's grooming",
      heading: "Top selling",
      service_price: "$390",
      total: "$400",
    },
    {
      id: "2",
      name: " Men's grooming @ 380 coloring",
      catlegory: "Hair coloring :- Above shoulder",
      minCat: "Grooming",
      duration: "1 hr 5 mins",
      subCat: "Men's grooming",
      heading: "Top selling",
      service_price: "$390",
      total: "$400",
    },
    {
      id: "3",
      name: " Men's grooming @ 380 coloring",
      catlegory: "Hair coloring :- Above shoulder",
      minCat: "Grooming",
      duration: "1 hr 5 mins",
      subCat: "Men's grooming",
      heading: "Top selling",
      service_price: "$390",
      total: "$400",
    },
  ]);
  const [itemList, setitemList] = useState([]);
  useEffect(() => {
    getBookedServices();
  }, []);
  const getBookedServices = async () => {
    const Userid = auth().currentUser.uid;
    try {
      const snapshot = await firestore()
        .collection("serviceBooking")
        .where("userID", "==", Userid)
        .get();

      if (!snapshot.empty) {
        const servicesList = [];
        snapshot.forEach((doc) => {
          servicesList.push({ id: doc.id, ...doc.data() });
        });
        setitemList(servicesList);
        console.log("servicesList", servicesList);
      } else {
        console.log("No matching documents.");
        setitemList([]);
      }
    } catch (error) {
      console.error("Error fetching services by category ID:", error);
    }
  };
  const renderItem = ({ item }) => {
    console.log(item, "item");
    return (
      <View>
        <Text style={styles.serviveText}>{item.serviceItem.serviceName}</Text>
        <Text style={styles.DetailText}>{item.serviceItem.serviceDetails}</Text>
        <View style={styles.gapstyle}>
          <View>
            <Text style={styles.leftTextStyle}>Service time</Text>
            <Text style={styles.leftTextStyle}>Category</Text>
            <Text style={styles.leftTextStyle}>Service Cost</Text>
            <Text style={styles.leftTextStyle}>Total</Text>
          </View>

          <View>
            <Text
              style={{
                color: COLOR.Text_Color,
                fontSize: 11,
                fontWeight: "400",
                marginTop: 5,
              }}
            >
              :
            </Text>
            <Text
              style={{
                color: COLOR.Text_Color,
                fontSize: 11,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              :
            </Text>
            <Text
              style={{
                color: COLOR.Text_Color,
                fontSize: 11,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              :
            </Text>

            <Text
              style={{
                color: COLOR.Text_Color,
                fontSize: 11,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              :
            </Text>
          </View>

          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: COLOR.Text_Color,
                fontSize: 11,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              {item.serviceItem.serviceDuration}
            </Text>
            <Text
              style={{
                color: COLOR.Text_Color,
                fontSize: 11,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              {item.serviceItem.serviceCategory.CategoryName}
            </Text>

            <Text
              style={{
                color: COLOR.Text_Color,
                fontSize: 11,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              {item.serviceItem.servicePrice}
            </Text>
            <Text
              style={{
                color: COLOR.Text_Color,
                fontSize: 11,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              {item.serviceItem.servicePrice}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Appointment detail" />
      <ScrollView style={styles.scrollstyle}>
        <Text style={styles.headingText}>Service detail</Text>

        <FlatList
          data={itemList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />

        {/* <TouchableOpacity
          style={{
            borderRadius: 4,
            borderColor: COLOR.dark_red,
            borderWidth: 1,
            marginVertical: 5,
            marginBottom: "5%",
            padding: 10,
            marginTop: "5%",
          }}
        >
          <Text
            style={{
              color: COLOR.dark_red,
              fontSize: 12,
              alignSelf: "center",
              paddingHorizontal: 5,
              paddingVertical: 2,
              fontWeight: "500",
            }}
          >
            Cancel booking
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookedService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollstyle: { paddingTop: 5, paddingHorizontal: 15 },
  headingText: {
    color: COLOR.Text_Color,
    fontSize: 18,
    fontWeight: "500",
    paddingTop: 15,
    textAlign: "center",
  },
  serviveText: {
    color: COLOR.Text_Color,
    fontSize: 15,
    marginTop: 10,
    fontWeight: "500",
  },
  DetailText: {
    color: COLOR.grey,
    fontSize: 12,
    marginTop: 5,
    letterSpacing: 0.5,
  },
  gapstyle: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: "4%",
  },
  leftTextStyle: { color: COLOR.Text_Color, fontSize: 11, marginTop: 5 },
});
