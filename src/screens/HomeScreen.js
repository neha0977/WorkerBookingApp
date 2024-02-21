import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { STYLES } from "../utils/commonstyles/Style";
import { IMAGES, getImageFromURL } from "../resources/images";
import { COLOR } from "../utils/commonstyles/Color";
import CommonHeader from "../components/common/CommonHeader";
import HomeHeader from "../components/common/HomeHeader";
import { getCategories } from "../utils/databaseHelper/FireBase";
import firestore from "@react-native-firebase/firestore";

import defaultImage from "../assets/AppLogo/logo.png";
const { width } = Dimensions.get("window");

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
    name: "Painting",
    image: getImageFromURL(IMAGES.PAINTING),
  },
  {
    id: 3,
    name: "Saloon",
    image: getImageFromURL(IMAGES.SALOON),
  },
  {
    id: 4,
    name: "Plumbing",
    image: getImageFromURL(IMAGES.PLUMBING),
  },
  {
    id: 5,
    name: "see all",
    image: "",
  },
];

const HomeScreen = ({ navigation }) => {
  const imageList = [
    require("../assets/img/men.jpg"),
    require("../assets/img/beauty_500KB.jpg"),
    require("../assets/img/service_500KB.jpg"),
    // Add more images as needed
  ];
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [catlist, setCatList] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = (currentIndex + 1) % imageList.length;
      setCurrentIndex(newIndex);
      flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, imageList.length]);

  

  useEffect(() => {
    // FechCategory();
    getCategories();
    getServices();
  }, [1]);

  const getCategories = async () => {
    try {
      const snapshot = await firestore().collection("categories").get();
      setCatList(snapshot._docs);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const getServices = async () => {
    try {
      const snapshot = await firestore().collection("ServicesList").get();
      setPopularServices(snapshot._docs);
      // console.log(popularServices, "NEW");
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const showBottomSheet = () => {
    // setSelectedItem(item);
    // if (item) {
    //   setserviceName(item.serviceName);
    //   setserviceCat(item.serviceCat);
    //   setservicePrice(item.servicePrice);
    //   setserviceDuration(item.serviceDuration);
    //   setServiceDetails(item.serviceDetails);
    // } else {
    //   setserviceName("");
    //   setserviceCat("");
    //   setservicePrice("");
    //   setserviceDuration("");
    //   setServiceDetails("");
    // }
    setIsBottomSheetVisible(true);
  };

  const hideBottomSheet = () => {
    setIsBottomSheetVisible(false);
    // setSelectedItem(null);
    // setserviceName("");
    // setserviceCat("");
    // setservicePrice("");
    // setserviceDuration("");
    // setServiceDetails("");
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderItem = ({ item, index }) => (
    <Image source={item} style={{ width, height: 200 }} resizeMode="cover" />
  );

  const renderDot = (index) => (
    <View
      key={index}
      style={{
        width: 8,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: index === currentIndex ? COLOR.New_button : "#D3D3D3",
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.New_Primary }}>
      <HomeHeader />
      <ScrollView>
        <View style={{ flexDirection: "column" }}>
          <>
            <FlatList
              ref={flatListRef}
              data={imageList}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.floor(
                  event.nativeEvent.contentOffset.x / width
                );
                setCurrentIndex(newIndex);
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              {imageList.map((_, index) => renderDot(index))}
            </View>
          </>
        </View>

        <Text
          style={{
            fontSize: 17,
            color: COLOR.New_button,
            fontWeight: "500",
            marginStart: 10,
            marginTop: 10,
          }}
        >
          {" "}
          Categories
        </Text>

        <View style={{ alignItems: "center" }}>
          <FlatList
            data={catlist}
            numColumns={4}
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
                    width: Platform.OS === "android" ? 75 : 90,
                    height: Platform.OS === "android" ? 75 : 90,
                    margin: 13,
                    padding: 10,
                    justifyContent: "center",
                    elevation: 5,
                  }}
                  onPress={() => {
                    showBottomSheet();
                  }}
                >
                  <Image
                    source={
                      item._data.CategoryImage
                        ? { uri: item._data.CategoryImage }
                        : defaultImage
                    }
                    resizeMode="contain"
                    style={{
                      width: "70%",
                      height: "70%",
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: COLOR.New_Primary,
                      fontSize: 11,
                    }}
                  >
                    {item._data.CategoryName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* Popular services */}
        <View
          style={{
            marginTop: "3%",
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: COLOR.New_button,
                  fontWeight: "500",
                }}
              >
                Popular Services
              </Text>
              <TouchableOpacity
                style={{ padding: 5, flexDirection: "row" }}
                onPress={() => navigation.navigate("PopularServices")}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.New_button,
                    marginRight: 5,
                    alignSelf: "center",
                  }}
                >
                  See all
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: COLOR.New_button,
                    borderColor: COLOR.New_button,
                    borderWidth: 1,
                    borderRadius: 40,
                    marginRight: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={getImageFromURL(IMAGES.FORWORD_ICON)}
                    style={{ width: 10, height: 10 }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <FlatList
                data={popularServices}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        margin: 5,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 8,
                        backgroundColor: "#fff",
                        shadowColor: "black",
                        shadowOpacity: 0.3,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                        elevation: 3,
                        backgroundColor: "white",
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
                          source={
                            item._data.serviceImage
                              ? { uri: item._data.serviceImage }
                              : defaultImage
                          }
                          // src={item._data.serviceImage}
                          style={{
                            height: 80,
                            width: 50,
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
                        {item._data.serviceName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: COLOR.black,
                          margin: 5,
                          marginBottom: 5,
                        }}
                      >
                        {item._data.serviceCategory.CategoryName}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          // onPress={() => navigation.navigate("ServiceDetailScreen")}
          onPress={() => navigation.navigate("BookingHistory")}
        >
          <Text>details</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* For Categories  */}
      <Modal
        visible={isBottomSheetVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setIsBottomSheetVisible(!isBottomSheetVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end", // Ensures the modal content sticks to the bottom
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          {/* Close Button - Positioned just above the modal view */}
          <TouchableOpacity onPress={() => setIsBottomSheetVisible(false)}>
            <Image
              source={require("../assets/img/close.png")}
              resizeMode={"contain"}
              style={{
                width: 30,
                height: 30,
                alignSelf: "center",
                tintColor: "white",
                alignItems: "center",
              }}
            />
          </TouchableOpacity>

          {/* Modal View */}
          <View
            style={{
              backgroundColor: COLOR.THEME,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 35,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: "100%", // Full width
            }}
          >
            {/* Content View */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: COLOR.New_button,
                  fontWeight: "500",
                  fontSize: 17,
                  textTransform: "capitalize",
                }}
              >
                All categories
              </Text>

              <View style={{ alignItems: "center" }}>
                <FlatList
                  data={catlist}
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
                          width: Platform.OS === "android" ? 75 : 85,
                          height: Platform.OS === "android" ? 70 : 80,
                          margin: 13,
                          padding: 8,
                          justifyContent: "center",
                          elevation: 5,
                        }}
                        onPress={() => {
                          navigation.navigate("ServiceDetailScreen", {
                            id: item._data.categoryId,
                            description: item._data.CategoryDescription,
                            catName: item._data.CategoryName,
                          });
                          hideBottomSheet();
                        }}>
                          <Image
                            source={
                              item._data.CategoryImage
                                ? { uri: item._data.CategoryImage }
                                : defaultImage
                            }
                            resizeMode={"contain"}
                            style={{
                              width: "70%",
                              height: "70%",
                            }}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              color: COLOR.New_Primary,
                              fontSize: 11,
                            }}>
                            {item._data.CategoryName}
                          </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
