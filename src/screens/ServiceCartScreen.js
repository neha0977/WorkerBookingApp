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
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
const { width } = Dimensions.get("window");
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
const ServiceCartScreen = ({ route, navigation }) => {
  const [itemList, setitemList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getBookedServices();
  }, []);
  useEffect(() => {
    calculateTotalPrice();
  }, [itemList]);
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    itemList.forEach((item) => {
      totalPrice += parseFloat(item.serviceItem.servicePrice);
    });
    setTotalPrice(totalPrice);
  };
  const getBookedServices = async () => {
    const Userid = auth().currentUser.uid;
    try {
      const categoryId = route.params.id;
      const snapshot = await firestore()
        .collection("serviceBooking")
        .where("userID", "==", Userid)
        .get();

      if (!snapshot.empty) {
        const servicesList = [];
        snapshot.forEach((doc) => {
          servicesList.push({ id: doc.id, ...doc.data() });
        });
        setitemList(servicesList);
        console.log("servicesList", servicesList);
      } else {
        console.log("No matching documents.");
        setitemList([]);
      }
    } catch (error) {
      console.error("Error fetching services by category ID:", error);
    }
  };
  const removeFromServiceCart = async (itemId) => {
    try {
      const docRef = firestore().collection("serviceBooking").doc(itemId);
      await docRef.delete();
      console.log("Service successfully deleted!");
      getBookedServices();
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };
  const renderItem = ({ item }) => {
    console.log("item", item);
    return (
      <View style={styles.listContainer}>
        <View style={styles.listItemView}>
          <View style={styles.renderView}>
            <Image
              src={item.serviceItem.serviceImage}
              style={styles.imageStyle}
            />
            <View style={styles.nameView}>
              <Text style={styles.itemName}>
                {item.serviceItem.serviceName}
              </Text>
              <Text style={styles.itemDetails}>
                {item.serviceItem.serviceDetails}
              </Text>
              <Text style={styles.itemCategory}>
                {item.serviceItem.serviceCategory.CategoryName}
              </Text>
              <View style={{ marginTop: 2, flexDirection: "row" }}>
                <Text style={styles.itemPrice}>
                  {item.serviceItem.servicePrice}
                </Text>
                <Text style={styles.lineStyle}>|</Text>
                <Text style={styles.itemTime}>
                  {item.serviceItem.serviceDuration}
                </Text>
              </View>
              <Text style={styles.serviceCharge}>Service Charge: 10</Text>
            </View>
          </View>
          {/* //Remove button */}
          <TouchableOpacity
            style={styles.removeBtnView}
            onPress={() => removeFromServiceCart(item.id)}
          >
            <Text style={styles.removeText}>REMOVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleRemoveItem = (itemId) => {
    setServicePackages((prevPackages) =>
      prevPackages.filter((item) => item.id !== itemId)
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Service cart" />
      <ScrollView>
        <FlatList
          data={itemList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.emptyText}>Cart Is Empty</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Text
                  style={[
                    styles.serviceCharge,
                    { textAlign: "center", fontSize: 16 },
                  ]}
                >
                  Continue...
                </Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        />
      </ScrollView>

      {/* //Service cart view */}
      {totalPrice > 0 && (
        <View style={styles.bottomPiceView}>
          <Text style={styles.priceText}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.slotBtnView}
            onPress={() => {
              navigation.navigate("BookingScreen");
            }}
          >
            <Text style={styles.slotBtnTxt}>Select Slot</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ServiceCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  listContainer: {
    backgroundColor: COLOR.white,
    elevation: 2,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLOR.grey,
    margin: 8,
  },
  listItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
  },
  renderView: { flexDirection: "row", width: "70%" },
  nameView: {
    flexDirection: "column",
    marginLeft: 10,
    alignSelf: "center",
  },
  itemName: {
    fontSize: 12,
    fontWeight: "500",
    color: COLOR.black,
  },
  itemCategory: {
    fontSize: 11,
    fontWeight: "400",
    color: COLOR.black,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 10,
    fontWeight: "500",
    color: COLOR.black,
  },
  lineStyle: {
    fontSize: 10,
    color: COLOR.black,
    marginHorizontal: 3,
  },
  itemTime: {
    fontSize: 10,
    fontWeight: "500",
    color: COLOR.black,
  },
  imageStyle: {
    height: 70,
    width: 70,
    borderRadius: 8,
    alignSelf: "center",
  },
  itemDetails: {
    fontSize: 10,
    maxWidth: "300",
    textAlign: "left",
    marginTop: 2,
  },
  serviceCharge: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
    color: COLOR.New_button,
  },
  removeBtnView: {
    borderRadius: 4,
    borderColor: COLOR.dark_red,
    borderWidth: 0.3,
    height: 25,
  },
  removeText: {
    color: COLOR.dark_red,
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
    padding: 5,
  },
  bottomPiceView: {
    width: width,
    height: 50,
    flexDirection: "row",
    backgroundColor: COLOR.New_button,
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
    justifyContent: "space-between",
  },
  priceText: {
    color: COLOR.white,
    fontSize: 10,
    fontWeight: "500",
    alignSelf: "center",
    paddingLeft: 20,
  },
  slotBtnView: {
    backgroundColor: COLOR.light_purple,
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 5,
    height: 26,
    alignSelf: "center",
  },
  slotBtnTxt: {
    color: COLOR.black,
    fontSize: 12,
    paddingHorizontal: 5,
    fontWeight: "500",
    alignSelf: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
