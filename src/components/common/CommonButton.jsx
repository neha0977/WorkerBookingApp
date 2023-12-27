import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLOR } from "../../utils/commonstyles/Color";

const CommonButton = ({ title, onClick }) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        onClick();
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 15,
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  btn: {
    width: "95%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: COLOR.Green,
    borderRadius: 4,
    marginTop: "10%",
  },
});
