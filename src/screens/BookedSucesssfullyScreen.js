import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import { COLOR } from "../utils/commonstyles/Color";
const BookedSucesssfullyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      {active && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
      <Image
        source={
          route.params.status == "success"
            ? require("../assets/img/check.png")
            : require("../assets/img/failed.png")
        }
        style={styles.iconStyle}
      />
      <Text style={styles.mainText}>
        {route.params.status == "success"
          ? "Your Service Booked Sucessfully !"
          : "Service Booked Failed"}
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      >
        <Text style={styles.textHome}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookedSucesssfullyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  iconStyle: { width: 80, height: 80 },
  mainText: {
    marginTop: 20,
    fontSize: 18,
    color: COLOR.black,
    fontWeight: "500",
  },
  btn: {
    width: 200,
    height: 50,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR.New_button,
  },
  textHome: {
    color: COLOR.black,
    fontWeight: "500",
    fontSize: 15,
  },
});
