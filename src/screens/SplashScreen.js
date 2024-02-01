import { Image, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { STYLES } from "../utils/commonstyles/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    addData();
  }, [1]);

  const addData = async () => {
    const userid = await AsyncStorage.getItem("userid");
    console.log(userid);

    setTimeout(() => {
      if (userid != null) {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "SignInScreen" }],
        });
      }
    }, 2000);
  };  

  return (
    <SafeAreaView style={[STYLES.container, { alignItems: "center" }]}>
      <Image
        source={require("../assets/AppLogo/logo.png")}
        style={STYLES.AppLogo}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
