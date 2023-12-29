import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
} from "react-native";
import { COLOR } from "../utils/commonstyles/Color";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get("window");
const SIZES = {
  base: 10,
  width,
  height,
};
const data = [
  {
    _id: "1",
    title: "Play The Beat",
    description: "Most beginner producers learn make creating by simple beats.",
    img: require("../assets/AppLogo/logo.png"),
  },
  {
    _id: "2",
    title: "Live The Life",
    description:
      "In our daily lives, we often rush tasks trying to get them finish.",
    img: require("../assets/AppLogo/logo.png"),
  },
  {
    _id: "3",
    title: "Capture The Moment",
    description:
      "You are not alone. You have unique ability to go to another world.",
    img: require("../assets/AppLogo/logo.png"),
  },
];
const OnboardingScreen = ({ navigation }) => {
  const flatlistRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems);
  });
  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);

  const handleNext = () => {
    if (currentPage == data.length - 1) return;

    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  const handleBack = () => {
    if (currentPage == 0) return;
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };

  const handleSkipToEnd = () => {
    flatlistRef.current.scrollToIndex({
      animate: true,
      index: data.length - 1,
    });
  };

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.base * 2,
          }}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: SIZES.base,
            }}
          >
            {/* Back icon */}
            {/* Hide back button on 1st screen */}
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 25,
                color: COLOR.black,
                opacity: currentPage == 0 ? 0 : 1,
              }}
            />
          </TouchableOpacity>

          {/* Skip button */}
          {/* Hide Skip button on last screen */}
          <TouchableOpacity onPress={handleSkipToEnd}>
            <Text
              style={{
                fontSize: 18,
                color: COLOR.black,
                opacity: currentPage == data.length - 1 ? 0 : 1,
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: SIZES.base * 2,
            paddingVertical: SIZES.base * 2,
          }}
        >
          {/* Pagination */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {
              // No. of dots
              [...Array(data.length)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      index == currentPage
                        ? COLOR.Primary_Color
                        : COLOR.Primary_Color + "20",
                    marginRight: 8,
                  }}
                />
              ))
            }
          </View>

          {/* Next or GetStarted button */}
          {/* Show or Hide Next button & GetStarted button by screen */}
          {currentPage != data.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: COLOR.Primary_Color,
              }}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 18, color: COLOR.white, opacity: 0.3 }}
              />
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 25, color: COLOR.white, marginLeft: -15 }}
              />
            </TouchableOpacity>
          ) : (
            // Get Started Button
            <TouchableOpacity
              style={{
                paddingHorizontal: SIZES.base * 2,
                height: 60,
                borderRadius: 30,
                backgroundColor: COLOR.Primary_Color,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("SignInScreen")}
            >
              <Text
                style={{
                  color: COLOR.white,
                  fontSize: 18,
                  marginLeft: SIZES.base,
                }}
              >
                Get Started
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{
                  fontSize: 18,
                  color: COLOR.white,
                  opacity: 0.3,
                  marginLeft: SIZES.base,
                }}
              />
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 25, color: COLOR.white, marginLeft: -15 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderFlatlistItem = ({ item }) => {
    return (
      <View
        style={{
          width: SIZES.width,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginVertical: SIZES.base * 2,
          }}
        >
          <ImageBackground
            source={item.img}
            style={{ width: 335, height: 335, resizeMode: "contains" }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.base * 4,
            marginVertical: SIZES.base * 4,
          }}
        >
          <Text
            style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              opacity: 0.4,
              textAlign: "center",
              marginTop: 15,
              lineHeight: 28,
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.Background_Color,
        justifyContent: "center",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLOR.Background_Color}
      />

      {/* TOP SECTION - Back & Skip button */}
      {renderTopSection()}

      {/* FLATLIST with pages */}
      <FlatList
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatlistItem}
        ref={flatlistRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        initialNumToRender={1}
        extraData={SIZES.width}
      />

      {/* BOTTOM SECTION - pagination & next or GetStarted button */}
      {renderBottomSection()}
    </View>
  );
};

export default OnboardingScreen;
