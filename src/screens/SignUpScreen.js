import React,{useEffect} from "react";
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
const SignUpScreen = ({route}) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

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
        signUp(inputs);
        setTimeout(() => {
          navigation.navigate("SignInScreen");
        }, 2000);
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  useEffect(() => {
   console.log(route.params.type)
  }, [])

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
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }} >
        <Text style={{ color: COLOR.New_button, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLOR.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <CommonTextInput
            onChangeText={(text) => handleOnchange(text, "fullname")}
            onFocus={() => handleError(null, "fullname")}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
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
          <CommonButton title="Register" onPress={validate} />
          <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Text
            onPress={() => navigation.navigate("SignInScreen")}
            style={[STYLES.btbLogText,{fontWeight:'regular'}]} >
            Already have an account ?
          </Text> 
          <Text
            onPress={() => navigation.navigate("SignInScreen")}
            style={[STYLES.btbLogText,{marginLeft:5,color:COLOR.New_button,fontWeight:'500'}]}>
            Login
          </Text>
          </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
