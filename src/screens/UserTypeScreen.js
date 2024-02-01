import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import CommonButton from "../components/common/CommonButton";
import { COLOR } from "../utils/commonstyles/Color";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const UserTypeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1,justifyContent:'center',backgroundColor:COLOR.New_Primary }}>
      
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          paddingHorizontal:15
        }}
      >

      <Image
        source={require("../assets/AppLogo/logo.png")}
        style={{ alignSelf: "center",height: 200,
    width: '100%',
    borderRadius:80,
    borderWidth:1,
    overflow:'hidden',
    resizeMode:'contain'
    }}
      />
        <Text
          style={{
            color: COLOR.grey,
            fontSize: 18,
            fontWeight: "500",
            marginVertical:'4%'
          }}
        >
          Registration as ?{" "}
        </Text>
        <CommonButton
          title="Service provider"
          onPress={() =>
            navigation.navigate("SignUpScreen", { type: "provider" })
          }
        />
        <CommonButton
          title="Service user"
          onPress={() => navigation.navigate("SignUpScreen", { type: "user" })}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserTypeScreen;

const styles = StyleSheet.create({});
