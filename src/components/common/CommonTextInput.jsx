import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLOR } from "../../utils/commonstyles/Color";
const CommonTextInput = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLOR.red
              : isFocused
              ? COLOR.Primary_Color
              : COLOR.light,
            alignItems: "center",
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          style={{ color: COLOR.Primary_Color, fontSize: 22, marginRight: 10 }}
        />
        {/* <Icon
          name={iconName}
          style={{ color: COLOR.darkBlue, fontSize: 22, marginRight: 10 }}
        /> */}
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: COLOR.darkBlue, flex: 1 }}
          {...props}
        />
        {password && (
          <MaterialCommunityIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ color: COLOR.Primary_Color, fontSize: 22 }}
          />
          // <Icon
          //   onPress={() => setHidePassword(!hidePassword)}
          //   name={hidePassword ? "eye-outline" : "eye-off-outline"}
          //   style={{ color: COLOR.darkBlue, fontSize: 22 }}
          // />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: COLOR.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 1,
    fontSize: 14,
    color: COLOR.black,
  },
  inputContainer: {
    height: 45,
    backgroundColor: COLOR.light,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius:7
  },
});

export default CommonTextInput;
