import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { getImageFromURL, IMAGES } from "../resources/images";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
const popularServices = [
  {
    id: 0,
    title: "Wall Painting",
    subTitle: "Painter",
    image: getImageFromURL(IMAGES.PAINTER),
  },
  {
    id: 1,
    title: "Ironing",
    subTitle: "Iron Men",
    image: getImageFromURL(IMAGES.IRON_MEN),
  },
  {
    id: 2,
    title: "Reparing",
    subTitle: "Machanic",
    image: getImageFromURL(IMAGES.MACHANIC),
  },
  {
    id: 3,
    title: "Salon For Men",
    subTitle: "Barber",
    image: getImageFromURL(IMAGES.BARBAR),
  },
  {
    id: 4,
    title: "Beauty",
    subTitle: "Beauty Salon",
    image: getImageFromURL(IMAGES.BEAUTY),
  },
  {
    id: 5,
    title: "Washing",
    subTitle: "Washer",
    image: getImageFromURL(IMAGES.WASHER),
  },

];
const PopularServices = () => {
  // get random color function useed in brand bg
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLOR.white, flex: 1 }}>
      <CommonHeader title={"Popular Service"} />
      <View>
        <FlatList
          data={popularServices}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  margin: 10,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 10,
                  elevation: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: getRandomColor(),
                    width: 175,
                    height: 60,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={{
                      height: 60,
                      width: 60,
                    }}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 15,
                    color: COLOR.black,
                    fontWeight: "500",
                    marginLeft: 5,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.black,
                    marginVertical: 5,
                    textAlign: "left",
                  }}
                >
                  {item.subTitle}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PopularServices;
