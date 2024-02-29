import { Image, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { STYLES } from "../utils/commonstyles/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMAGES, getImageFromURL } from "../resources/images";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Loader from "../components/common/Loader";
const SplashScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user, "neha");
        try {
          const userDoc = await firestore()
            .collection("users")
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData && userData.type) {
              if (userData.type === "Provider") {
                setLoading(false);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "ProviderDashboard" }],
                });
                //navigation.navigate("ProviderDashboard");
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "HomeScreen" }],
                });
                //navigation.navigate("HomeScreen");
              }
            } else {
              // User type not defined
              navigateToUserTypeScreen();
            }
          } else {
            // User document not found
            navigateToUserTypeScreen();
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          // Handle error fetching user document
          Alert.alert("Error", "An error occurred while fetching user data.");
        }
      } else {
        // No user is logged in
        navigateToUserTypeScreen();
      }
    });

    return unsubscribe;
  }, []);

  const navigateToUserTypeScreen = () => {
    //.navigate("UserTypeScreen");
    navigation.reset({
      index: 0,
      routes: [{ name: "UserTypeScreen" }],
    });
  };

  return (
    <SafeAreaView style={[STYLES.container, { alignItems: "center" }]}>
      <Image source={getImageFromURL(IMAGES.LOGO)} style={STYLES.AppLogo} />
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default SplashScreen;
