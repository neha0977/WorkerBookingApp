import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Dimensions
} from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
import auth from "@react-native-firebase/auth";
import { IMAGES, getImageFromURL } from "../resources/images";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
            AsyncStorage.clear().then(() => {
              auth()
                .signOut()
                .then(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "SignInScreen" }],
                  });
                });
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
      <CommonHeader title={"Profile"} />
      <TouchableOpacity onPress={() => navigation.navigate("BookingHistory")}>
          <Text>Booking history</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("BookedService")}>
          <Text>Booked Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:'2%',marginHorizontal:15}}>
          <Text style={{color:COLOR.black,fontSize:14}}>Privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:'2%',marginHorizontal:15}}>
          <Text style={{color:COLOR.black,fontSize:14}}>AboutUs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:'2%',marginHorizontal:15}} onPress={() => signOutUser()}>
          <Text style={{color:COLOR.black,fontSize:14}}>Sign Out</Text>
          </TouchableOpacity>
      <View style={{ alignItems: "center", justifyContent: "center",flex:1 }}>
        <Text>welcome:  {user}</Text>
        <TouchableOpacity onPress={() => signOutUser}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    
     
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
