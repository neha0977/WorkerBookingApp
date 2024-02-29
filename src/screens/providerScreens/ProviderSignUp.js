import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommonButton from "../../components/common/CommonButton";
import CommonTextInput from "../../components/common/CommonTextInput";
import Loader from "../../components/common/Loader";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { COLOR } from "../../utils/commonstyles/Color";
import { STYLES } from "../../utils/commonstyles/Style";
import DropDownPicker from "react-native-dropdown-picker";
import firestore from "@react-native-firebase/firestore";
import { signUp } from "../../utils/databaseHelper/FireBase";
const ProviderSignUp = ({ route }) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    fullAddress: "",
    designation: "",
    experience: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  //lsit of categories
  useFocusEffect(
    React.useCallback(() => {
      const fetchCategories = async () => {
        const snapshot = await firestore().collection("categories").get();
        const categories = snapshot.docs.map((doc) => {
          const docData = doc.data();
          const value = docData.CategoryName || doc.id;
          const valueId = doc.id;
          return {
            label: value,
            value: valueId,
          };
        });
        setItems(categories);
        console.log(items, "Category");
      };
      fetchCategories();
    }, [])
  );
  //validation with text input feilds
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(inputs.email)) {
      handleError("Please input a valid email", "email");
    }
    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }
    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(inputs.phone)) {
      handleError("Please input a valid phone number", "phone");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }
    if (!inputs.fullAddress) {
      handleError("Please input fullAddress", "fullAddress");
      isValid = false;
    }
    if (!inputs.designation) {
      handleError("Please input designation", "designation");
      isValid = false;
    }
    if (!inputs.experience) {
      handleError("Please input experience", "experience");
      isValid = false;
    }
    if (isValid) {
      registerProvider();
    }
  };
  const registerProvider = async () => {
    setLoading(true);
    const selectedLabel = items.find((item) => item.value === value)?.label;
    console.log(selectedLabel, "nnnn");
    const providerSignUpResult = await signUp(
      inputs,
      "Provider",
      value,
      selectedLabel
    );
    if (providerSignUpResult.success) {
      setTimeout(() => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "SignInScreen" }],
        });
      }, 500);
      setLoading(false);
      console.log(
        "Provider registration successful:",
        providerSignUpResult.user
      );
    } else {
      setLoading(false);
      console.error(
        "Provider registration failed:",
        providerSignUpResult.error
      );
    }

    // setLoading(true);
    // setTimeout(() => {
    //   try {
    //     setLoading(false);
    //     const selectedLabel = items.find((item) => item.value === value)?.label;

    //     const signUpResult = signUp(
    //       inputs,
    //       route.params.type,
    //       value,
    //       selectedLabel
    //     )
    //     console.log(signUpResult,"nehga")
    //     if (signUpResult.success) {
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: "SignInScreen" }, { type: "Provider" }],
    //       });

    //       console.log("Sign-up successful!");
    //     } else {
    //       console.error("Sign-up failed:", signUpResult.error);
    //     }
    //   } catch (error) {
    //     Alert.alert("Error", "Something went wrong");
    //   }
    // }, 3000);
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLOR.New_Primary, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={styles.ScrollStyle}>
        <Text style={styles.MainText}>Register</Text>
        <Text style={styles.subText}>Enter Your Details to Register</Text>
        <View style={styles.inputsConatiner}>
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "fullname")}
            onFocus={() => handleError(null, "fullname")}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            keyboardType={"email-address"}
          />
          <CommonTextInput
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
            maxLength={10}
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "fullAddress")}
            onFocus={() => handleError(null, "fullAddress")}
            iconName="map-marker-radius-outline"
            label="Address"
            placeholder="Enter your full address"
            error={errors.fullAddress}
          />

          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "designation")}
            onFocus={() => handleError(null, "designation")}
            iconName="office-building-outline"
            label="Designation"
            placeholder="Enter your designation"
            error={errors.designation}
          />
          <View style={{ marginVertical: 1, marginBottom: 15, zIndex: 1000 }}>
            <Text
              style={{
                fontSize: 14,
                color: COLOR.New_button,
                marginBottom: 10,
              }}
            >
              {" "}
              Category :{" "}
            </Text>
            <DropDownPicker
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                minHeight: 40,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "#dadae8",
                backgroundColor: COLOR.light,
              }}
              open={open}
              value={value}
              items={items}
              theme="LIGHT"
              mode="BADGE"
              textStyle={{
                fontSize: 14,
                color: COLOR.New_Primary,
                padding: 4,
              }}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={"Please select category"}
            />
          </View>

          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "experience")}
            onFocus={() => handleError(null, "experience")}
            iconName="office-building-outline"
            label="Experience"
            placeholder="Enter your total work experience"
            error={errors.experience}
          />

          <CommonButton title="Register" onPress={() => validate()} />
          <View style={styles.alreadyTextView}>
            <Text
              onPress={() => navigation.navigate("SignInScreen")}
              style={[STYLES.btbLogText, { fontWeight: "regular" }]}
            >
              {" "}
              Already have an account ?{" "}
            </Text>
            <Text
              onPress={() =>
                navigation.navigate("SignInScreen", { type: "Provider" })
              }
              style={[
                STYLES.btbLogText,
                { marginLeft: 5, color: COLOR.New_button, fontWeight: "500" },
              ]}
            >
              {" "}
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProviderSignUp;

const styles = StyleSheet.create({
  container: { backgroundColor: COLOR.New_Primary, flex: 1 },
  ScrollStyle: { paddingTop: 50, paddingHorizontal: 20 },
  MainText: { color: COLOR.New_button, fontSize: 40, fontWeight: "bold" },
  subText: { color: COLOR.grey, fontSize: 18, marginVertical: 10 },
  inputsConatiner: { marginVertical: 20 },
  alreadyTextView: { flexDirection: "row", justifyContent: "center" },
});
