import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonHeader from "../components/common/CommonHeader";
import firestore from "@react-native-firebase/firestore";
import { STYLES } from "../utils/commonstyles/Style";
import { COLOR } from "../utils/commonstyles/Color";
import { CONSTANTS } from "../utils/constants/StaticContent";
const { width } = Dimensions.get("window");

const ServiceDetailScreen = ({ navigation,route }) => {
  // const servicePackages = [
  //   {
  //     id: "1",
  //     name: "Basic Package",
  //     catlegory: "Men's haircut",
  //     price: "$10",
  //   },
  //   {
  //     id: "2",
  //     name: "Standard Package",
  //     catlegory: "Men's Beard Shave",
  //     price: "$20",
  //   },
  //   {
  //     id: "3",
  //     name: "Premium Package",
  //     catlegory: "Men's face care",
  //     price: "$30",
  //   },
  //   {
  //     id: "4",
  //     name: "Standard Package",
  //     catlegory: "Men's hair color",
  //     price: "$10",
  //   },
  //   { id: "5", name: "Premium Package", catlegory: "Men's spa", price: "$60" },
  //   // Add more service packages as needed
  // ];
  const [itemQuantities, setItemQuantities] = useState({});
  const [showQuantityItemIds, setShowQuantityItemIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [setItem, setSetItem] = useState([]);
  const [servicePackages, setServicePackages] = useState([]);
  useEffect(() => {
    getServices();
  }, [1]);


  const getServices = async () => {
    try {
      // Assuming route.params.id contains the CategoryId you want to filter by
      const categoryId = route.params.id;
  
      // Query the collection where serviceCategory.CategoryId matches the categoryId
      const snapshot = await firestore().collection("ServicesList")
                        .where("serviceCategory.CategoryId", "==", categoryId)
                        .get();
  
      if (!snapshot.empty) {
        // Initialize an array to hold the services
        const servicesList = [];
        
        // Iterate over each document in the snapshot
        snapshot.forEach(doc => {
          // Add the service data to the servicesList array, including the document ID
          servicesList.push({ id: doc.id, ...doc.data() });
        });
  
        // Log the filtered services list or set it to your state
        console.log(servicesList, "Filtered SERVICES");
        setServicePackages(servicesList);
        // setCatList(servicesList); // Uncomment this line if you want to set the services list to a state
      } else {
        console.log("No matching documents.");
      }
    } catch (error) {
      console.error("Error fetching services by category ID:", error);
      throw error;
    }
  };
  // {id:item._data.categoryId, description: item._data.CategoryDescription , catName:item._data.CategoryName}

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 8,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 1,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          src={item.serviceImage}
          style={{
            height: 70,
            width: 70,
            borderRadius: 8,
            alignSelf: "center",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: COLOR.Text_Color,
            }}
          >
            {item.serviceName}
          </Text>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "300",
              color: COLOR.Text_Color,
            }} > {item.serviceCategory.CategoryName} </Text>

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <Image
              source={require("../assets/img/star.png")}
              style={{ alignSelf: "center", height: 12, width: 12 }}
            />
            <Text
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: COLOR.black,
                marginHorizontal: 3,
              }}
            >
              {" "}
              4.5{" "}
            </Text>
          </View>

          <TouchableOpacity>
            <Text
              style={{
                fontSize: 9,
                fontWeight: "600",
                marginTop: 8,
                color: COLOR.New_Primary,
              }}
            >
              VIEW DETAILS {" >"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          marginLeft: 10,
          justifyContent: "space-between",
        }}>

        {/* //Add button */}
        {!showQuantityItemIds.includes(item.id) && (
          <TouchableOpacity
            style={{
              padding: 2,
              borderRadius: 4,
              borderColor: COLOR.New_Primary,
              borderWidth: 1,
            }}
            onPress={() => {
              const newQuantities = { ...itemQuantities };
              newQuantities[item.id] = (newQuantities[item.id] || 0) + 1;
              setItemQuantities(newQuantities);

              // Preserve existing item IDs in showQuantityItemIds
              setShowQuantityItemIds((prevIds) => [...prevIds, item.id]);

              calculateTotalPrice();
            }} >
            <Text
              style={{
                color: COLOR.New_Primary,
                fontSize: 12,
                alignSelf: "center",
                paddingHorizontal: 5,
                fontWeight: "500",
              }}
            >
              {" "}
              ADD
            </Text>
          </TouchableOpacity>
        )}

        {/* //Quantity button */}
        {itemQuantities[item.id] > 0 && (
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 4,
              borderColor: COLOR.Primary_Color,
              borderWidth: 1,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, 1)}
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/img/plus.png")}
                style={{
                  alignSelf: "center",
                  height: 9,
                  width: 9,
                  tintColor: COLOR.Primary_Color,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                marginHorizontal: 10,
                alignSelf: "center",
                fontSize: 13,
                fontWeight: "500",
                color: COLOR.Primary_Color,
              }}
            >
              {itemQuantities[item.id]}{" "}
            </Text>

            <TouchableOpacity
              onPress={() => updateQuantity(item.id, -1)}
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/img/minus.png")}
                style={{
                  alignSelf: "center",
                  height: 9,
                  width: 9,
                  tintColor: COLOR.Primary_Color,
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        {itemQuantities[item.id] <= 0 && (
          <TouchableOpacity
            style={{
              padding: 2,
              borderRadius: 4,
              borderColor: COLOR.Primary_Color,
              borderWidth: 1,
            }}
            onPress={() => {
              // console.warn("item", item);
              // const arr = [];
              // let newArr = arr.push(item);
              // setItem(newArr);
              const newQuantities = { ...itemQuantities };
              newQuantities[item.id] = (newQuantities[item.id] || 0) + 1;
              setItemQuantities(newQuantities);

              // Preserve existing item IDs in showQuantityItemIds
              setShowQuantityItemIds((prevIds) => [...prevIds, item.id]);
              calculateTotalPrice();
            }} >
            <Text
              style={{
                color: COLOR.Primary_Color,
                fontSize: 12,
                alignSelf: "center",
                paddingHorizontal: 5,
                fontWeight: "500",
              }}
            >
              {" "}
              ADD
            </Text>
          </TouchableOpacity>
        )}

        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: COLOR.New_Primary,
            alignSelf: "center",
          }}
        >
          {item.servicePrice}
        </Text>
      </View>

    </View>
  );

  const updateQuantity = (itemId, change) => {
    const newQuantities = { ...itemQuantities };
    newQuantities[itemId] = Math.max(0, newQuantities[itemId] + change);
    setItemQuantities(newQuantities);
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    let total = 0;
    servicePackages.forEach((item) => {
      total += (itemQuantities[item.id] || 0) * parseInt(item.servicePrice.slice(1));
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [itemQuantities]);

  return (
    <SafeAreaView style={STYLES.containerForgotpass}>
      <CommonHeader title="Detail" />
      <ScrollView>
        <View style={{ flexDirection: "column", marginHorizontal: "5%" }}>
          <View
            style={{
              height: 220,
              width: "100%",
              backgroundColor: COLOR.grey,
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/img/men.jpg")}
              style={[
                STYLES.AppLogo,
                { alignSelf: "center", resizeMode: "contain" },
              ]}
            />
          </View>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: "500",
              color: COLOR.New_button,
            }}
          >
         {route.params.catName}
          </Text>
          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Image
              source={require("../assets/img/star.png")}
              style={{ alignSelf: "center", height: 15, width: 15 }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: COLOR.grey,
                marginHorizontal: 3,
              }}
            >
              {" "}
              4.5{" "}
            </Text>
            <View
              style={{
                justifyContent: "center",
                right: 0,
                position: "absolute",
                backgroundColor: COLOR.New_button,
                borderRadius: 15,
                height: 25,
                elevation: 3,
              }}
            >
              <Text
                style={{ fontSize: 10, color: COLOR.White, padding: 5,fontWeight:'500' }}
              >   2K bookings{" "}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: COLOR.grey,
              marginHorizontal: 3,
              marginTop: "5%",
            }}
          >
          {route.params.description}
            {/* {CONSTANTS.dummy_txt} */}
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: COLOR.New_button,
              marginHorizontal: 3,
              marginTop: "5%",
            }}
          >
            {" "}
            Packages
          </Text>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={servicePackages}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* //Service cart view */}
      <View
        style={{
          width: width,
          height: 50,
          flexDirection: "row",
          backgroundColor: COLOR.New_button,
          padding: 10,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 5,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: COLOR.white,
            fontSize: 12,
            fontWeight: "500",
            alignSelf: "center",
            paddingLeft: 20,
          }}
        >
          {/* Calculate total price based on selected package and quantity */}$
          {totalPrice}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: COLOR.light_purple,
            paddingHorizontal: 5,
            paddingVertical: 4,
            borderRadius: 5,
            height: 26,
            alignSelf: "center",
          }}
          onPress={() => {
            if (totalPrice !== 0)
              navigation.navigate("ServiceCartScreen", {
                totalPrice: totalPrice,
                showQuantityItemIds: showQuantityItemIds,
                itemQuantities: itemQuantities,
              });
            else
              ToastAndroid.show(
                "Please add services first",
                ToastAndroid.SHORT
              );
          }}
        >
          <Text
            style={{
              color: COLOR.New_button,
              fontSize: 12,
              paddingHorizontal: 5,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            View cart
          </Text>
        </TouchableOpacity>
     
      </View>
    </SafeAreaView>
  );
};

export default ServiceDetailScreen;
