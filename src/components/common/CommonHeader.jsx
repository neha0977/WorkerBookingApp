import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { IMAGES, getImageFromURL } from "../../resources/images";
import { COLOR } from "../../utils/commonstyles/Color";

const CommonHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor:COLOR.white,}}>
      <View
        style={{
          flexDirection: "row",
          height:50
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={getImageFromURL(IMAGES.BACK_ICON)}
            style={{ width: 15, height: 15 }}
            resizeMode={"center"}
          />
        </TouchableOpacity>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: COLOR.white,
    justifyContent: "center",
  },
  title: {
    fontSize: 13,
    color: COLOR.black,
    fontWeight: "500",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 10,
  },
});
export default CommonHeader;
