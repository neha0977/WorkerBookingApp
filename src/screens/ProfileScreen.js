import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getImageFromURL, IMAGES } from "../resources/images";
import { signOut } from "../utils/databaseHelper/FireBase";
const { width, height } = Dimensions.get("window");
const SIZES = {
  base: 10,
  width,
  height,
};
const ProfileScreen = () => {

  const user = auth()._user.email;
  
  const navigation = useNavigation();
  const signOutUser = () => {
    Alert.alert(
      "Logout",
      "are you sure you want to logout?",
      [
        {
          text: "cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "yes",
          onPress: () => {
            signOut(navigation);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
      <CommonHeader title={"Profile"} />
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            height: 180,
            backgroundColor: COLOR.New_Primary,
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
            }}
            resizeMode="contain"
            source={getImageFromURL(IMAGES.LOGO)}
            //source={getImageFromURL(IMAGES.LOGO)}
          />
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text
              style={{ color: COLOR.New_button, fontSize: 15, marginTop: 5 }} >
              {user}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
        
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
             marginTop:10
            }}
            onPress={() => navigation.navigate("BookingHistory")}
          >
            <Text
              style={{
                color: COLOR.New_Primary,
                fontSize: 14,
                marginLeft: SIZES.base,
                fontWeight: 500,
              }}  >
             Booking history
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{ fontSize: 20, color: COLOR.black, marginLeft: 2 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}   onPress={() => navigation.navigate("BookedService")} >
            <Text
              style={{
                color: COLOR.New_Primary,
                fontSize: 14,
                marginLeft: SIZES.base,
                fontWeight: 500,
              }} >  Ongoing services </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{ fontSize: 20, color: COLOR.black, marginLeft: 2 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => navigation.navigate("BookedService")}
          >
            <Text
              style={{
                color: COLOR.New_Primary,
                fontSize: 14,
                marginLeft: SIZES.base,
                fontWeight: 500,
              }}
            >
              Privacy policy
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{ fontSize: 20, color: COLOR.black, marginLeft: 2 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => navigation.navigate("BookedService")}
          >
            <Text
              style={{
                color: COLOR.New_Primary,
                fontSize: 14,
                marginLeft: SIZES.base,
                fontWeight: 500,
                marginVertical: 10,
              }}
            >
              About us
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{ fontSize: 20, color: COLOR.black, marginLeft: 2 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => signOutUser()}
          >
            <Text
              style={{
                color: COLOR.New_Primary,
                fontSize: 14,
                marginLeft: SIZES.base,
                fontWeight: 500,
              }}
            >
              Log out
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{ fontSize: 20, color: COLOR.black, marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
