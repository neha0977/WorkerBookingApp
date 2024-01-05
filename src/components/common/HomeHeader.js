import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { COLOR } from "../../utils/commonstyles/Color";
import { getImageFromURL, IMAGES } from "../../resources/images";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
const HomeHeader = ({ location }) => {
  const navigation = useNavigation();
  const handleLogout = () => {
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
    <View style={styles.header}>
      <Image
        source={getImageFromURL(IMAGES.LOGO)}
        resizeMode="contain"
        style={{ height: 45, width: 100, top: 2,}}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }} >
        <TouchableOpacity
          style={styles.notificationStyle}
          onPress={() => navigation.navigate("NotificationScreen")}  >
          <MaterialCommunityIcons name="bell" color={"black"} size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.notificationStyle}
          onPress={() => handleLogout()}
        >
          <MaterialCommunityIcons name="logout" color={"black"} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeHeader;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    // backgroundColor: '#EEE8F5',
    backgroundColor: COLOR.white,
    elevation: 1,
    borderColor: "grey",
  },
  notificationStyle: {
    width: 30,
    height: 30,
    backgroundColor: "#f0f0f0",
    borderColor: "#f0f0f0",
    borderWidth: 1,
    borderRadius: 40,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  profileStyle: {
    width: 30,
    height: 30,
    backgroundColor: "green",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 40,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: "black",
  },
  titleStyle: {
    color: "#e3e3e3",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 10,
  },
});


