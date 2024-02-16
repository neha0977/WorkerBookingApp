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
  Button,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonHeader from "../components/common/CommonHeader";
import firestore from "@react-native-firebase/firestore";
import { STYLES } from "../utils/commonstyles/Style";
import { COLOR } from "../utils/commonstyles/Color";
import auth from "@react-native-firebase/auth";
import { CONSTANTS } from "../utils/constants/StaticContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");
import {
  addToCart,
  removeFromCart,
  getCartItems,
} from "../utils/databaseHelper/FireBase";
const ServiceDetailScreen = ({ navigation, route }) => {
  const [itemQuantities, setItemQuantities] = useState({});
  const [showQuantityItemIds, setShowQuantityItemIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [servicePackages, setServicePackages] = useState([]);
  const [products, setProducts] = useState([]);

  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
    getServices();
  }, []);
  // Check if item is already in the cart

  const fetchCartItems = async () => {
    const userId = await AsyncStorage.getItem("userid");
    try {
      const snapshot = await firestore()
        .collection("carts")
        .doc(userId)
        .collection("items")
        .get();
      const cartItemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("cartItem",cartItemsData)
      setCartItems(cartItemsData);
    } catch (error) {
      console.error("Error fetching cart items: ", error);
    }
  };

  const addToCart = async (itemId) => {
    const userId = await AsyncStorage.getItem("userid");
    try {
      await firestore()
        .collection("carts")
        .doc(userId)
        .collection("items")
        .doc(itemId)
        .set({ quantity: 1 });
      // Update local state with new cart items
      fetchCartItems();
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
  };

  const increaseQuantity = async (itemId) => {
    const userId = await AsyncStorage.getItem("userid");
    try {
      const itemRef = firestore()
        .collection("carts")
        .doc(userId)
        .collection("items")
        .doc(itemId);
      await itemRef.update({
        quantity: firestore.FieldValue.increment(1), // Corrected increment usage
      });
      // Update local state with updated cart items
      fetchCartItems();
    } catch (error) {
      console.error("Error increasing quantity: ", error);
    }
  };
  
  const decreaseQuantity = async (itemId) => {
    const userId = await AsyncStorage.getItem("userid");
    try {
      const itemRef = firestore()
        .collection("carts")
        .doc(userId)
        .collection("items")
        .doc(itemId);
      const item = await itemRef.get();
      const currentQuantity = item.data().quantity;
      if (currentQuantity > 1) {
        await itemRef.update({
          quantity: firestore.FieldValue.increment(-1), // Corrected increment usage
        });
      } else {
        await itemRef.delete();
      }
      // Update local state with updated cart items
      fetchCartItems();
    } catch (error) {
      console.error("Error decreasing quantity: ", error);
    }
  };
  
  const getServices = async () => {
    try {
      // Assuming route.params.id contains the CategoryId you want to filter by
      const categoryId = route.params.id;

      // Query the collection where serviceCategory.CategoryId matches the categoryId
      const snapshot = await firestore()
        .collection("ServicesList")
        .where("serviceCategory.CategoryId", "==", categoryId)
        .get();

      if (!snapshot.empty) {
        // Initialize an array to hold the services
        const servicesList = [];
        // Iterate over each document in the snapshot
        snapshot.forEach((doc) => {
          // Add the service data to the servicesList array, including the document ID
          servicesList.push({ id: doc.id, ...doc.data() });
        });
        // Log the filtered services list or set it to your state
        console.log(servicesList, "Filtered SERVICES");
        setServicePackages(servicesList);
      } else {
        console.log("No matching documents.");
        setServicePackages([]);
      }
    } catch (error) {
      console.error("Error fetching services by category ID:", error);
      throw error;
    }
  };

  const renderItem = ({ item }) => {
    console.log(item, item.id);
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
          {/* //Add button */}
          {/* {!showQuantityItemIds.includes(item.id) && (
          <TouchableOpacity
            style={{
              padding: 2,
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
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
            }}
          >
            <Text
              style={{
                color: COLOR.New_Primary,
                fontSize: 12,
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 5,
                fontWeight: "500",
              }}
            >
              {" "}
              ADD
            </Text>
          </TouchableOpacity>
        )} */}

          {/* //Quantity button */}
          {/* {itemQuantities[item.id] > 0 && (
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 4,
              justifyContent: "center",
              borderColor: COLOR.New_button,
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
                  alignItems: "center",
                  height: 9,
                  width: 9,
                  tintColor: COLOR.New_button,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                marginHorizontal: 10,
                alignSelf: "center",
                fontSize: 13,
                alignItems: "center",
                fontWeight: "500",
                color: COLOR.New_button,
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
                  alignItems: "center",
                  alignSelf: "center",
                  height: 9,
                  width: 9,
                  tintColor: COLOR.New_button,
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
              borderColor: COLOR.New_Primary,
              borderWidth: 1,
            }}
            onPress={() => {
              // console.log(item.id,"sdhgshjdg")

              const newQuantities = { ...itemQuantities };
              newQuantities[item.id] = (newQuantities[item.id] || 0) + 1;
              setItemQuantities(newQuantities);

              // Preserve existing item IDs in showQuantityItemIds
              setShowQuantityItemIds((prevIds) => [...prevIds, item.id]);
              calculateTotalPrice();
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
        )} */}
          {/* {item.inCart ? (
          <View style={styles.quantityContainer}>
            <Button
              title="-"
              onPress={() => decreaseQuantity(item.id, item.quantity)}
            />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Button
              title="+"
              onPress={() => increaseQuantity(item.id, item.quantity)}
            />
          </View>
        ) : (
          <Button title="Add to Cart" onPress={() => addToCart(item.id)} />
        )} */}
          {cartItems.some((cartItem) => cartItem.id === item.id) ? (
            <View>
              <Button title="-" onPress={() => decreaseQuantity(item.id)} />
              <Text>
                {cartItems.find((cartItem) => cartItem.id === item.id).quantity}
              </Text>
              <Button title="+" onPress={() => increaseQuantity(item.id)} />
            </View>
          ) : (
            <Button title="add to cart" onPress={() => addToCart(item.id)} />
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
  const updateQuantity = (itemId, change) => {
    const newQuantities = { ...itemQuantities };
    newQuantities[itemId] = Math.max(0, newQuantities[itemId] + change);
    setItemQuantities(newQuantities);
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    let total = 0;
    servicePackages.forEach((item) => {
      total +=
        (itemQuantities[item.id] || 0) * parseInt(item.servicePrice.slice(1));
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
            Services{" "}
          </Text>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={servicePackages}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={{
                      color: COLOR.white,
                      fontSize: 19,
                      fontWeight: "800",
                      marginTop: "15%",
                    }}
                  >
                    Data not found
                  </Text>
                </View>
              }
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent:
                  servicePackages.length > 0 ? "flex-start" : "center",
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* //Service cart view */}
      {servicePackages.length > 0 && (
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
            {/* Calculate total price based on selected package and quantity */}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productList: {
    flexGrow: 1,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    flex: 1,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default ServiceDetailScreen;
