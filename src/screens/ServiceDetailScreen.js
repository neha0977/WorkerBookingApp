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
  Button,
  StyleSheet,
  ToastAndroid,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonHeader from "../components/common/CommonHeader";
import { STYLES } from "../utils/commonstyles/Style";
import { COLOR } from "../utils/commonstyles/Color";
import auth from "@react-native-firebase/auth";
import { CONSTANTS } from "../utils/constants/StaticContent";
const { width } = Dimensions.get("window");

const ServiceDetailScreen = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [servicePackages, setServicePackages] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [showQuantityItemIds, setShowQuantityItemIds] = useState([]);

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
  useEffect(() => {
    const fetchQuantity = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection("services")
          .doc(servicePackages.id)
          .get();
        const data = documentSnapshot.data();
        if (data) {
          setQuantity(data.quantity || 0);
        }
      } catch (error) {
        console.error("Error fetching quantity: ", error);
      }
    };

    fetchQuantity();

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, [servicePackages.id]);

  const handleAddService = async (serviceItem) => {
    const userid = AsyncStorage.getItem("userid");
    const userID = auth().currentUser.uid;
    console.log("serviceId", serviceItem, userid, userID);
    try {
      await firestore()
        .collection("serviceBooking")
        .doc(userID)
        .set(
          { quantity: 1, serviceItem, userID, rating: "", review: "",bookingCount:"" },
          { merge: true }
        );

      // Update cartItems using functional form of setState
      setCartItems((prevCartItems) => [...prevCartItems, serviceItem]);

      // Calculate totalPrice using functional form of setState
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice + parseFloat(serviceItem.servicePrice)
      );

      ToastAndroid.show("Service added successfully!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error adding service: ", error);
    }
  };

  const handleIncreaseQuantity = async (serviceId) => {
    try {
      await firestore()
        .collection("services")
        .doc(serviceId)
        .update({ quantity: firestore.FieldValue.increment(1) });
      setQuantity(quantity + 1);
    } catch (error) {
      console.error("Error increasing quantity: ", error);
    }
  };

  const handleDecreaseQuantity = async (serviceId) => {
    if (quantity > 0) {
      try {
        await firestore()
          .collection("services")
          .doc(serviceId)
          .update({ quantity: firestore.FieldValue.increment(-1) });
        setQuantity(quantity - 1);
      } catch (error) {
        console.error("Error decreasing quantity: ", error);
      }
    }
  };
  const renderItem = ({ item }) => {
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
              {" "}
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
          <TouchableOpacity
            style={{
              padding: 2,
              borderRadius: 4,
              borderColor: COLOR.New_Primary,
              borderWidth: 1,
            }}
            onPress={() => {
              handleAddService(item);
            }}
          >
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
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceDetailScreen;
