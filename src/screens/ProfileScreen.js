import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image
} from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
import auth from "@react-native-firebase/auth";
import { IMAGES, getImageFromURL } from "../resources/images";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      <View style={{flexDirection:'column'}}>

      <View style={{height:180,backgroundColor:COLOR.Primary_Color,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
      <Image
        style={{ width: 80, height: 80, resizeMode: "contain",borderRadius:10}}
        source={getImageFromURL(IMAGES.LOGO)}
      />
      <View style={{alignContent:'center',alignItems:'center',marginTop:15}}>
        <Text style={{color:COLOR.white,fontSize:15}}>NEHA</Text>
        <Text style={{color:COLOR.white,fontSize:12,marginTop:5}}>{user}</Text>
      </View>
      </View>

      <TouchableOpacity style={{marginTop:'5%',marginHorizontal:15}} onPress={() => navigation.navigate("BookingHistory")}>
          <Text style={{color:COLOR.black,fontSize:14}}>Booking history</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:'2%',marginHorizontal:15}} onPress={() => navigation.navigate("BookedService")}>
          <Text style={{color:COLOR.black,fontSize:14}}>Booked Service</Text>
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
      </View>
    
     
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
