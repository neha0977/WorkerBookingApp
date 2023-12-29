import { Image, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { STYLES } from "../utils/commonstyles/Style";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "SignInScreen" }],
      });
    }, 3000);
  }, []);

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
