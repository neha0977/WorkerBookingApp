import { Image, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { STYLES } from "../utils/commonstyles/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMAGES, getImageFromURL } from "../resources/images";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // addData();
  }, []);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData && userData.type) {
            if (userData.type === "Provider") {
              navigation.navigate("HomeProvider");
            } else {
              navigation.navigate("HomeScreen");
            }
          } else {
            console.error("User type not defined for user");
          }
        } else {
          console.error("User document not found");
        }
      } else {
        // No user is logged in
        navigation.navigate("SignInScreen");
      }
    });

    return unsubscribe;
  }, []);

  const addData = async () => {
    const userid = await AsyncStorage.getItem("userid");
    const providerid = await AsyncStorage.getItem("providerid");
    console.log(userid, providerid);

    setTimeout(() => {
      if (userid != null) {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      } else if (providerid !== null) {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeProvider" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "UserTypeScreen" }],
        });
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={[STYLES.container, { alignItems: "center" }]}>
      <Image source={getImageFromURL(IMAGES.LOGO)} style={STYLES.AppLogo} />
    </SafeAreaView>
  );
};

export default SplashScreen;
