import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { COLOR } from "../../utils/commonstyles/Color";
const CommonTextInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  type,
  title,
  label,
  ...props
}) => {
  return (
    <View style={{ margin: 10 }}>
      <TextInput
        {...props}
        label={label}
        testID="input"
        mode="outlined"
        theme={{
          colors: {
            placeholder: "grey",
            background: "#f5f6f5",
            text: "grey",
            primary: COLOR.Green,
          },
        }}
        style={styles.input}
        value={value}
      />
    </View>
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
});
