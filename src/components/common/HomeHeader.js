import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { COLOR } from "../../utils/commonstyles/Color";
import { getImageFromURL, IMAGES } from "../../resources/images";
import React from "react";

const HomeHeader = ({ location, navigation }) => {
  return (
    <View style={styles.header}>
      <Image
        source={getImageFromURL(IMAGES.HOME_LOGO)}
        resizeMode="contain"
        style={{ height: 50, width: 100 }}
      />

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.notificationStyle}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <Image source={getImageFromURL(IMAGES.SEARCH)} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.notificationStyle}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Image
            source={getImageFromURL(IMAGES.NOTIFICATION)}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
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

export default HomeHeader;
