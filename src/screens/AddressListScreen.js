import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
import firestore from "@react-native-firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
const AddressListScreen = ({ navigation, route }) => {
  const [addresses, setAddresses] = useState([]);
  const [seletedAddress, setSeletedAddress] = useState();
  useEffect(() => {
    const userId = auth().currentUser.uid;
    const unsubscribe = firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((snapshot) => {
        setAddresses(snapshot._data.fullAddress);
        console.log("addresssnapshotesData", snapshot._data.fullAddress);
      });

    return () => unsubscribe();
  }, []);

  const handleAddNewAddress = () => {
    navigation.navigate("AddressScreen");
  };
  const handleContinue = () => {
    if (seletedAddress) {
      navigation.navigate("BookingScreen", {
        selectedAddress: seletedAddress,
      });
    } else {
      // Show an error message or handle the case where no address is selected
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title={"Address List"} />
      <View>
        <FlatList
          data={addresses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            console.log(item, "item");
            return (
              <TouchableOpacity
                style={
                  seletedAddress === item ? styles.listSelItem : styles.listItem
                }
                onPress={() => {
                  setSeletedAddress(item);
                }}
              >
                <View style={styles.ListItemMain}>
                  <View
                    style={
                      seletedAddress === item
                        ? styles.iconSelView
                        : styles.iconView
                    }
                  >
                    <MaterialCommunityIcons
                      name={
                        item.addressType == "home" ? "home" : "office-building"
                      }
                      style={
                        seletedAddress === item
                          ? styles.iconSelStyle
                          : styles.iconStyle
                      }
                    />
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.itemTexts}>
                      {item.houseNumber}, {item.buildingName}, {item.area},{" "}
                      {item.city}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.addAddressBtn}
        onPress={() => handleAddNewAddress()}
      >
        <Text style={styles.addAddressText}>Add new address</Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleContinue()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddressListScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: COLOR.white, flex: 1 },
  addAddressBtn: {
    padding: 2,
    borderRadius: 4,
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: COLOR.black,
    borderWidth: 0.6,
    marginHorizontal: 10,
    padding: 5,
    marginTop: 15,
  },
  addAddressText: {
    color: COLOR.black,
    fontSize: 12,
    alignSelf: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontWeight: "500",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    margin: 10,
    backgroundColor: COLOR.white,
    borderColor: "#e3e3e3",
    elevation: 5,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  listSelItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    margin: 10,
    backgroundColor: COLOR.white,
    borderColor: "#e3e3e3",
    elevation: 5,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
    borderColor: COLOR.New_button,
    borderWidth: 1,
  },
  ListItemMain: {
    flexDirection: "row",
    width: "100%",
  },
  iconView: {
    borderRadius: 99,
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },
  iconSelView: {
    borderRadius: 99,
    backgroundColor: COLOR.New_button,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },
  textView: {
    width: "80%",
    flexDirection: "row",
    maxWidth: "90%",
  },
  itemTexts: {
    marginTop: 15,
    marginStart: 10,
    color: COLOR.black,
  },
  iconStyle: {
    color: COLOR.New_Primary,
    fontSize: 25,
  },
  iconSelStyle: {
    color: COLOR.white,
    fontSize: 25,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: COLOR.New_button,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  text: {
    margin: 20,
    color: "black",
  },
});
