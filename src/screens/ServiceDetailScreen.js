import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import CommonHeader from "../components/common/CommonHeader";
import { STYLES } from "../utils/commonstyles/Style";
import { COLOR } from "../utils/commonstyles/Color";
const { width } = Dimensions.get("window");

const ServiceDetailScreen = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [servicePackages, setServicePackages] = useState([]);
  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const categoryId = route.params.id;
      const snapshot = await firestore()
        .collection("ServicesList")
        .where("serviceCategory.CategoryId", "==", categoryId)
        .get();

      if (!snapshot.empty) {
        const servicesList = [];
        snapshot.forEach((doc) => {
          servicesList.push({ id: doc.id, ...doc.data() });
        });
        setServicePackages(servicesList);
      } else {
        console.log("No matching documents.");
        setServicePackages([]);
      }
    } catch (error) {
      console.error("Error fetching services by category ID:", error);
    }
  };

  const handleAddService = (serviceItem) => {
    const existingServiceIndex = cartItems.findIndex(
      (item) => item.id === serviceItem.id
    );
    if (existingServiceIndex !== -1) {
      // If the service exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingServiceIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // If the service is not in the cart, add it with quantity 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...serviceItem, quantity: 1 },
      ]);
    }
    // Update total price
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + parseFloat(serviceItem.servicePrice)
    );
    ToastAndroid.show("Service added successfully!", ToastAndroid.SHORT);
  };

  const handleRemoveService = (serviceItem) => {
    // Check if the service exists in the cart
    const existingServiceIndex = cartItems.findIndex(
      (item) => item.id === serviceItem.id
    );

    if (existingServiceIndex !== -1) {
      // If the service exists, decrease its quantity
      const updatedCartItems = [...cartItems];
      if (updatedCartItems[existingServiceIndex].quantity === 1) {
        // If quantity is 1, remove the service from cart
        updatedCartItems.splice(existingServiceIndex, 1);
      } else {
        // If quantity is greater than 1, decrease the quantity
        updatedCartItems[existingServiceIndex].quantity -= 1;
      }
      setCartItems(updatedCartItems);
      // Update total price
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - parseFloat(serviceItem.servicePrice)
      );

      ToastAndroid.show("Service removed successfully!", ToastAndroid.SHORT);
    }
  };

  const renderItem = ({ item }) => {
    console.log(item,"itwm")
    const existingServiceIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    console.log("existingServiceIndex",existingServiceIndex)
    return (
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
              }}
            >
              {item.serviceCategory.CategoryName}
            </Text>

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
                0
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

          }}
        >
          {/* {cartItems.some((cartItem) => cartItem.id === item.id) ? (
          <View>
            <Button title="-" onPress={() => decreaseQuantity(item.id)} />
            <Text>
              {cartItems.find((cartItem) => cartItem.id === item.id).quantity}
            </Text>
            <Button title="+" onPress={() => increaseQuantity(item.id)} />
          </View>
        ) : (
          <Button title="add to cart" onPress={() => addToCart(item.id)} />
        )} */}
          {/* { */}
          {cartItems.find((ci) => ci.id === item.id) ? (
            <QuantityAdjuster
              item={item}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
          ) : (
            <TouchableOpacity onPress={() => handleAddService(item)}>
              <Text>ADD</Text>
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Detail" />
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: "5%",
            marginTop: 8,
          }}
        >
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
              0{" "}
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
                style={{
                  fontSize: 10,
                  color: COLOR.White,
                  padding: 5,
                  fontWeight: "500",
                }}
              >
                {" "}
                0 bookings{" "}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: COLOR.New_Primary,
              marginHorizontal: 3,
              marginTop: "5%",
              letterSpacing: 0.3,
            }}
          >
            {route.params.description}
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
            Services{" "}
          </Text>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={servicePackages}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No services found</Text>
              )}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent:
                  servicePackages.length > 0 ? "flex-start" : "center",
              }}
            />
          </View>
        </View>
      </ScrollView>
      {servicePackages.length > 0 && totalPrice > 0 && (
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
            ${totalPrice}
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
              if (totalPrice !== 0) {
                const uniqueCartItems = Array.from(
                  new Set(cartItems.map((item) => item.id))
                ).map((id) => cartItems.find((item) => item.id === id));
                navigation.navigate("ServiceCartScreen", {
                  cartItems: uniqueCartItems || [],
                  totalPrice: totalPrice,
                });
              } else {
                ToastAndroid.show(
                  "Please add services first",
                  ToastAndroid.SHORT
                );
              }
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  serviceDetails: {
    flex: 1,
    marginLeft: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceCategory: {
    fontSize: 14,
    marginTop: 5,
  },
  servicePrice: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    borderWidth:0.5,
    borderColor:COLOR.black,
    borderRadius:5,
    paddingHorizontal:5

  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight:"500",
    color:COLOR.black
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceDetailScreen;
