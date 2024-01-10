import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CommonHeader from "../components/common/CommonHeader";
import { STYLES } from "../utils/commonstyles/Style";
import { COLOR } from "../utils/commonstyles/Color";
const { width, height } = Dimensions.get("window");

const BookingHistory = () => {
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
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "column" }}>
      <Text
        style={{
          color: COLOR.Text_Color,
          fontSize: 13,
          marginTop: 15,
          fontWeight: "700",
        }}
      >
        Men's grooming @ 380 coloring
      </Text>
      <Text
        style={{ color: COLOR.Text_Color, fontSize: 13, fontWeight: "400" }}
      >
        Hair coloring :- Above shoulder
      </Text>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 15,
          marginHorizontal: "5%",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Booking date
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Booked On
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Booking ID
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Booking Time
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Payment Mode
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Booking Status
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Service Type
          </Text>

          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text
              style={{
                color: COLOR.Primary_Color,
                fontSize: 11,
                fontWeight: "500",
              }}
            >
              Book Again
            </Text>
          </TouchableOpacity>
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
            {item.duration}
          </Text>
          <Text
            style={{
              color: COLOR.Text_Color,
              fontSize: 11,
              fontWeight: "500",
              marginTop: 5,
            }}
          >
            {item.minCat}
          </Text>
          <Text
            style={{
              color: COLOR.Text_Color,
              fontSize: 11,
              fontWeight: "500",
              marginTop: 5,
            }}
          >
            {item.subCat}
          </Text>
          <Text
            style={{
              color: COLOR.Text_Color,
              fontSize: 11,
              fontWeight: "500",
              marginTop: 5,
            }}
          >
            {item.heading}
          </Text>
          <Text
            style={{
              color: COLOR.Text_Color,
              fontSize: 11,
              fontWeight: "500",
              marginTop: 5,
            }}
          >
            {item.service_price}
          </Text>
          <Text
            style={{
              color: COLOR.Text_Color,
              fontSize: 11,
              fontWeight: "500",
              marginTop: 5,
            }}
          >
            {item.total}
          </Text>
          <Text
            style={{
              color: COLOR.Text_Color,
              fontSize: 11,
              fontWeight: "500",
              marginTop: 5,
            }}
          >
            {item.total}
          </Text>

          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text
              style={{ color: COLOR.dark_red, fontSize: 11, fontWeight: "500" }}
            >
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView styles={{ flex: 1 }}>
      <CommonHeader title="Booking history" />
      <ScrollView style={{ marginHorizontal: "5%", }} showsVerticalScrollIndicator={false}>
        <FlatList
          data={servicePackages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingHistory;
