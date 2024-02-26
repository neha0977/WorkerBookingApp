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
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const AddressListScreen = ({ navigation, route }) => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    getAllAddress();
  }, [navigation]);

  const getAllAddress = async () => {
    const Userid = auth().currentUser.uid;
    try {
      const snapshot = await firestore()
        .collection("addresses")
        .where("userId", "==", Userid)
        .get();
      setAddresses(snapshot._docs);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
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
            console.log(item);
            return (
              <View style={styles.listItem}>
                <View style={styles.ListItemMain}>
                  <View style={styles.iconView}>
                    <MaterialCommunityIcons
                      name={
                        item.addressType == "home" ? "home" : "office-building"
                      }
                      style={styles.iconStyle}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.itemTexts}>
                      {item._data.fullAddress.houseNumber},{" "}
                      {item._data.fullAddress.buildingName},{" "}
                      {item._data.fullAddress.area},{" "}
                      {item._data.fullAddress.city}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.addAddressBtn}
        onPress={() => navigation.navigate("AddressScreen")}
      >
        <Text style={styles.addAddressText}>Add new address</Text>
      </TouchableOpacity>
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
    fontSize: 22,
  },
});
