import {
  View,
  Text,
  SafeAreaView,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { getImageFromURL, IMAGES } from "../resources/images";
import { COLOR } from "../utils/commonstyles/Color";
const catogeryList = [
  {
    id: 0,
    name: "Cleaning",
    image: getImageFromURL(IMAGES.CLEANING),
  },
  {
    id: 1,
    name: "Reparing",
    image: getImageFromURL(IMAGES.REPAIRING),
  },
  {
    id: 2,
    name: "Cooking",
    image: getImageFromURL(IMAGES.COOKING),
  },
  {
    id: 3,
    name: "Painting",
    image: getImageFromURL(IMAGES.PAINTING),
  },
  {
    id: 4,
    name: "Saloon",
    image: getImageFromURL(IMAGES.SALOON),
  },
  {
    id: 5,
    name: "Washing",
    image: getImageFromURL(IMAGES.WASHING_CLOTHES),
  },
  {
    id: 6,
    name: "Beauty",
    image: getImageFromURL(IMAGES.BEAUTY),
  },
  {
    id: 7,
    name: "Ironing",
    image: getImageFromURL(IMAGES.IRON),
  },
  {
    id: 8,
    name: "Cooking",
    image: getImageFromURL(IMAGES.COOKING),
  },
  {
    id: 9,
    name: "Vehical Wash",
    image: getImageFromURL(IMAGES.VEHICAL_WASH),
  },
  {
    id: 10,
    name: "Plumbing",
    image: getImageFromURL(IMAGES.PLUMBING),
  },
  {
    id: 11,
    name: "Trashing",
    image: getImageFromURL(IMAGES.TRASHING),
  },
];
const AllCategories = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonHeader title={"Categories"} />

      <View style={{ alignItems: "center" }}>
        <FlatList
          data={catogeryList}
          numColumns={3}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#F0F0F0",
                  backgroundColor: "white",
                  width: Platform.OS === "android" ? 120 : 90,
                  height: Platform.OS === "android" ? 120 : 90,
                  margin: 5,
                  padding: 15,
                  justifyContent: "center",
                  elevation: 5,
                }}
                onPress={() => {
                  if (item.image !== "") {
                    Alert.alert("INFO PAGE");
                  } else {
                    navigation.navigate("AllCategories");
                  }
                }}
              >
                {item.image !== "" ? (
                  <Image
                    source={item.image}
                    resizeMode={"contain"}
                    style={{
                      width: "95%",
                      height: "95%",
                    }}
                  />
                ) : (
                  <Text style={{ textAlign: "center" }}>{item.name}</Text>
                )}
                {item.image == "" ? (
                  ""
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      marginTop: 4,
                    }}
                  >
                    {item.name}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllCategories;
