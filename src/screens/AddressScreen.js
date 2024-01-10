import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CommonHeader from "../components/common/CommonHeader";
import CommonTextInput from "../components/common/CommonTextInput";
import { COLOR } from "../utils/commonstyles/Color";
import { CONSTANTS } from "../utils/constants/StaticContent";
import CommonButton from "../components/common/CommonButton";
const AddressScreen = () => {
  const [errors, setErrors] = React.useState({});
  const [fullAddress, setFullAddress] = useState({
    area: "",
    city: "",
    buildingName: "",
    houseNumber: "",
    pin: "",
  });
  const [newAddress, setNewAddress] = useState("");
  const [addresses, setAddresses] = useState([
    { street: "123 Main St", city: "City1" },
    { street: "456 Second St", city: "City2" },
  ]);

  const addAddress = () => {
    console.log("HIII")
    if (fullAddress.area.trim() !== "" && fullAddress.city.trim() !== "") {
      setAddresses([...addresses, fullAddress]);
      // setFullAddress({ area: '', city: '' });
      console.log("HIII2")
    }
  };

  const removeAddress = (index) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };

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
      login();
    }
  };

  //login user function
  const login = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        signIn(inputs, navigation);
      } catch (error) {
        Alert.alert("Error", CONSTANTS.something_wrong);
      }
    }, 3000);
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
    <SafeAreaView style={{ backgroundColor: COLOR.white, flex: 1 }}>
      <CommonHeader title={"Address"} />

      <ScrollView style={{ margin: 20 }}>
        <Text
          style={{
            color: COLOR.black,
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Address Book
        </Text>
        <Text style={{ color: COLOR.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your new address
        </Text>
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
        <CommonButton title={"save"} onPress={() => addAddress()} />
        <FlatList
          data={addAddress}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text>{item}</Text>
              <Button title="Remove" onPress={() => removeAddress(index)} />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
