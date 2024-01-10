import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import CommonHeader from "../components/common/CommonHeader";
import { STYLES } from "../utils/commonstyles/Style";
import { COLOR } from "../utils/commonstyles/Color";
import { InteractionManager } from "../../node_modules/react-native/types/index";
const { width, height } = Dimensions.get("window");

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
            Service minutes
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Category
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Sub Category
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Heading
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Service Cost
          </Text>
          <Text style={{ color: COLOR.Text_Color, fontSize: 11, marginTop: 5 }}>
            Total
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
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView styles={{ flex: 1 }}>
      <CommonHeader title="Appointment detail" />
      <ScrollView
        style={{
          paddingHorizontal: 15,
          paddingTop: 15,
          height: height,
          backgroundColor: COLOR.light_purple,
        }}>
        <View style={{ flexDirection: "column", marginHorizontal: "2%" }}>
          <Text
            style={{ color: COLOR.Text_Color, fontSize: 13, fontWeight: "500" }} >
            Service detail
          </Text>
          <FlatList
            data={servicePackages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          />

       <TouchableOpacity
            style={{
              padding: 2,
              borderRadius: 4,
              borderColor: COLOR.dark_red,
              borderWidth: 1,
              marginVertical:'5%' }}>
            <Text
              style={{
                color: COLOR.dark_red,
                fontSize: 10,
                alignSelf: "center",
                paddingHorizontal: 5,
                paddingVertical: 2,
                fontWeight: "500" }} >
              Cancel booking
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
     
    </SafeAreaView>
  );
};

export default BookedService;
