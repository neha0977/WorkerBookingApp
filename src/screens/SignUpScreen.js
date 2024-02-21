import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import CommonButton from "../components/common/CommonButton";
import CommonTextInput from "../components/common/CommonTextInput";
import Loader from "../components/common/Loader";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../utils/commonstyles/Color";
import { signUp } from "../utils/databaseHelper/FireBase";
import { STYLES } from "../utils/commonstyles/Style";
import DropDownPicker from "react-native-dropdown-picker";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
const SignUpScreen = ({ route }) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    type: route.params.type,
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  // const [items, setItems] = useState([
  //   { label: "Male", value: "Male" },
  //   { label: "Female", value: "Female" },
  //   { label: "Other", value: "Other" },
  // ]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchCategories = async () => {
        const snapshot = await firestore().collection("categories").get();
        const categories = snapshot.docs.map(doc => {
          // Use the document ID as a fallback for the value property
          const docData = doc.data();
          const value = docData.CategoryName || doc.id; // Assuming 'value' is your intended unique key
          const valueId = doc.id;
        
          return {
            label:  value,
            value:valueId ,
          };
        });
        setItems(categories);
        console.log(items,"Category")
      };
    
      fetchCategories();
    }, [])
  );

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
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        signUp(inputs, route.params.type, navigation);
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  const AddProviders = async () => {
    // setIsLoading(true);
    let data = {
      FirstName: firstName,
      LastName: lastName,
      Contact: mobileNumber,
      Address: address,
      Experience: experience,
    };
    try {
      const docRef = await addDoc(collection(db, "ServicePrividers"), data);
      const docId = docRef.id;
      await setDoc(doc(docRef.parent, docId), { id: docId, ...data });
      setIsLoading(false);
      FetchProviders();
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding document:", error);
    }
  };

  useEffect(() => {
    console.log(route.params.type);
  }, []);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLOR.New_Primary, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text
          style={{ color: COLOR.New_button, fontSize: 40, fontWeight: "bold" }}
        >
          Register
        </Text>
        <Text style={{ color: COLOR.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
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
          />
          <CommonTextInput
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
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
            iconName="account-outline"
            label="Address"
            placeholder="Enter your full address"
            error={errors.fullAddress}
          />

          {route.params.type === "Provider" ? (
            <>
              <CommonTextInput
                onChangeText={(text) => handleOnchange(text, "designation")}
                onFocus={() => handleError(null, "designation")}
                iconName="office-building-outline"
                label="Designation"
                placeholder="Enter your designation"
                // error={errors.phone}
              />
              <View style = {{ marginVertical: 1,marginBottom:15, zIndex: 1000 }}>
                <Text
                  style = {{
                    fontSize: 14,
                    color: COLOR.New_button,
                    marginBottom: 10,
                  }}> Category : </Text>
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
                // error={errors.phone}
              />
            </>
          ) : null}

          <CommonButton title="Register" onPress={validate} />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              onPress={() => navigation.navigate("SignInScreen")}
              style={[STYLES.btbLogText, { fontWeight: "regular" }]} > Already have an account ?  </Text>
            <Text
              onPress={() => navigation.navigate("SignInScreen")}
              style={[ STYLES.btbLogText, { marginLeft: 5, color: COLOR.New_button, fontWeight: "500" } ]} >  Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
