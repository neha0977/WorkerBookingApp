import { SafeAreaView, Text, View, Image } from "react-native";
import CommonButton from "../components/common/CommonButton";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { STYLES } from "../utils/commonstyles/Style";
import { CONSTANTS } from "../utils/constants/StaticContent";

const UserTypeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={STYLES.mainContainerType}>
      <View style={STYLES.logoView}>
        <Image
          source={require("../assets/AppLogo/logo.png")}
          style={STYLES.LogoStyle}
        />
        <Text style={STYLES.mainText}>{CONSTANTS.Main_text}</Text>
        <CommonButton
          title="Service provider"
          onPress={() =>
            navigation.navigate("SignUpScreen", { type: "Provider" })
          }
        />
        <CommonButton
          title="Service user"
          onPress={() => navigation.navigate("SignUpScreen", { type: "User" })}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserTypeScreen;
