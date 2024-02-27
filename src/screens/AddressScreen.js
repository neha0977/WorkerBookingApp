import {
  SafeAreaView,
  StyleSheet,
  Text,
  Keyboard,
  ScrollView,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import CommonHeader from "../components/common/CommonHeader";
import CommonTextInput from "../components/common/CommonTextInput";
import { COLOR } from "../utils/commonstyles/Color";
import { CONSTANTS } from "../utils/constants/StaticContent";
import CommonButton from "../components/common/CommonButton";
import Loader from "../components/common/Loader";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const AddressScreen = ({ navigation }) => {
  const [errors, setErrors] = React.useState({});
  const [fullAddress, setFullAddress] = useState({
    area: "",
    city: "",
    buildingName: "",
    houseNumber: "",
    pin: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [addressType, setAddressType] = useState(null);

  const removeAddress = React.useCallback(
    (index) => {
      const newAddresses = [...addresses];
      newAddresses.splice(index, 1);
      setAddresses(newAddresses);
    },
    [addresses]
  );
  //validate user input function
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!fullAddress.area) {
      handleError(CONSTANTS.enter_email, "area");
      isValid = false;
    }
    if (!fullAddress.city) {
      handleError(CONSTANTS.enter_password, "city");
      isValid = false;
    }
    if (!fullAddress.buildingName) {
      handleError(CONSTANTS.enter_password, "buildingName");
      isValid = false;
    }
    if (!fullAddress.houseNumber) {
      handleError(CONSTANTS.enter_password, "houseNumber");
      isValid = false;
    }
    if (!fullAddress.pin) {
      handleError(CONSTANTS.enter_password, "pin");
      isValid = false;
    }

    if (isValid) {
      handleProced();
    }
  };

  //login user function
  const saveAddress = async () => {
    setLoading(true);
    const userName = auth().currentUser.displayName;
    const userId = auth().currentUser.uid;

    try {
      await firestore().collection("addresses").doc(userId).set({
        userName,
        userId,
        fullAddress,
        addressType: addressType,
      });
      setLoading(false);
      ToastAndroid.show("Address Save successfully!", ToastAndroid.SHORT);
      navigation.goBack();
      setFullAddress({
        city: "",
        area: "",
        pincode: "",
        houseNumber: "",
        building: "",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleProced = async () => {
    const userName = auth().currentUser.displayName;
    const userId = auth().currentUser.uid;

    if (!addressType) {
      ToastAndroid.show("Please select address type", ToastAndroid.SHORT);
      return;
    }

    try {
      const addressData = {
        ...fullAddress,
        addressType: addressType,
      };

      const addressSnapshot = await firestore()
        .collection("addresses")
        .doc(userId)
        .get();

      if (addressSnapshot.exists) {
        await firestore()
          .collection("addresses")
          .doc(userId)
          .update({
            userName,
            userId,
            addresses: firestore.FieldValue.arrayUnion(addressData),
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
        ToastAndroid.show("Address updated successfully!", ToastAndroid.SHORT);
      } else {
        await firestore()
          .collection("addresses")
          .doc(userId)
          .set({
            userName,
            userId,
            addresses: [addressData],
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
        ToastAndroid.show("Address added successfully!", ToastAndroid.SHORT);
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error adding/updating address: ", error);
    }
  };

  // handle validation function
  const handleOnchange = (text, input) => {
    setFullAddress((prevState) => ({ ...prevState, [input]: text }));
  };

  // handle erroe in text inputs
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title={"Address"} />

      <ScrollView
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainText}>Address Book</Text>
        <Text style={styles.subText}>Enter Your new address</Text>
        <CommonTextInput
          onChangeText={(text) => handleOnchange(text, "area")}
          onFocus={() => handleError(null, "email")}
          iconName="email-outline"
          label="Area"
          placeholder="Enter area"
          error={errors.area}
        />

        <CommonTextInput
          onChangeText={(text) => handleOnchange(text, "city")}
          onFocus={() => handleError(null, "city")}
          iconName="email-outline"
          label="City"
          placeholder="Enter city name"
          error={errors.city}
        />

        <CommonTextInput
          onChangeText={(text) => handleOnchange(text, "buildingName")}
          onFocus={() => handleError(null, "buildingName")}
          iconName="email-outline"
          label="Building Name"
          placeholder="Enter building name"
          error={errors.buildingName}
        />

        <CommonTextInput
          onChangeText={(text) => handleOnchange(text, "houseNumber")}
          onFocus={() => handleError(null, "houseNumber")}
          iconName="email-outline"
          label="houseNumber"
          placeholder="Enter house number "
          error={errors.houseNumber}
        />

        <CommonTextInput
          onChangeText={(text) => handleOnchange(text, "pin")}
          onFocus={() => handleError(null, "pin")}
          iconName="email-outline"
          label="Pin"
          placeholder="Enter pin "
          error={errors.pin}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            onPress={() => setAddressType("home")}
            style={{ flexDirection: "row" }}
          >
            <MaterialCommunityIcons
              name={
                addressType === "home"
                  ? "checkbox-blank-circle"
                  : "checkbox-blank-circle-outline"
              }
              style={{
                color: COLOR.New_Primary,
                fontSize: 22,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                marginRight: 20,
                color: addressType === "home" ? "blue" : "black",
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAddressType("office")}
            style={{ flexDirection: "row" }}
          >
            <MaterialCommunityIcons
              name={
                addressType === "office"
                  ? "checkbox-blank-circle"
                  : "checkbox-blank-circle-outline"
              }
              style={{
                color: COLOR.New_Primary,
                fontSize: 22,
                marginRight: 10,
              }}
            />
            <Text
              style={{ color: addressType === "office" ? "blue" : "black" }}
            >
              Office
            </Text>
          </TouchableOpacity>
        </View>
        {/* common button */}
        <CommonButton title={"Save"} onPress={() => validate()} />
      </ScrollView>
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: COLOR.white, flex: 1 },
  scrollStyle: { margin: 20 },
  mainText: {
    color: COLOR.black,
    fontSize: 40,
    fontWeight: "bold",
  },
  subText: { color: COLOR.grey, fontSize: 18, marginVertical: 10 },
});
