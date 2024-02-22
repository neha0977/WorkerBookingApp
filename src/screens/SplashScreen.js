import { Image, SafeAreaView, Alert } from "react-native";
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
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user.providerData,"neha")
        try {
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
    navigation.navigate("UserTypeScreen");
  };

  return (
    <SafeAreaView style={[STYLES.container, { alignItems: "center" }]}>
      <Image source={getImageFromURL(IMAGES.LOGO)} style={STYLES.AppLogo} />
    </SafeAreaView>
  );
};

export default SplashScreen;
