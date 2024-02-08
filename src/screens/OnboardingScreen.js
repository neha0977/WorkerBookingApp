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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getImageFromURL, IMAGES } from "../resources/images";
const { width, height } = Dimensions.get("window");
const SIZES = {
  base: 10,
  width,
  height,
};
const data = [
  {
    _id: "1",
    title: "Let's get started",
    description: "Most beginner producers learn make creating by simple beats.",
    img: getImageFromURL(IMAGES.LOGO),
  },
  {
    _id: "2",
    title: "Ensure trust and safety",
    description:
      "In our daily lives, we often rush tasks trying to get them finish.",
    img: getImageFromURL(IMAGES.LOGO),
  },
  {
    _id: "3",
    title: "Share a bit about yourself and your services",
    description:
      "You are not alone. You have unique ability to go to another world.",
    img: getImageFromURL(IMAGES.LOGO),
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
                fontSize: 15,
                color: COLOR.New_button,
                opacity: currentPage == data.length - 1 ? 0 : 1,
              }}  > Skip  </Text>
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
                    width: 20,
                    height: 3,
                    borderRadius: 5,
                    backgroundColor:
                      index == currentPage
                        ? COLOR.New_button
                        : COLOR.New_button + "20",
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
                width: 38,
                height: 38,
                borderRadius: 30,
                backgroundColor: COLOR.New_button,
              }}
              activeOpacity={0.1}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 25, color: COLOR.white }}
              />
              {/* <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 18, color: COLOR.white, opacity: 0.3 }}
              /> */}
            </TouchableOpacity>
          ) : (
            // Get Started Button
            <TouchableOpacity
              style={{
                paddingHorizontal: SIZES.base * 2,
                height: 45,
                borderRadius: 30,
                backgroundColor: COLOR.New_button,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("SignInScreen")}
            >
              <Text
                style={{
                  color: COLOR.white,
                  fontSize: 12,
                  marginLeft: SIZES.base,
                  fontWeight: 500,
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
                style={{ fontSize: 25, color: COLOR.white, marginLeft: 2 }}
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
            style={{
              fontSize: 23,
              textAlign: "center",
              fontWeight: "500",
              color: COLOR.New_button,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              opacity: 0.4,
              textAlign: "center",
              marginTop: 15,
              lineHeight: 28,
              fontWeight: 500,
              color: COLOR.Background_Color,
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
        backgroundColor: COLOR.New_Primary,
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
