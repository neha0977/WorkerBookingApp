import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";

const AddressListScreen = ({ navigation, route }) => {
  const { addresses, onRemoveAddress } = route.params;

  const removeAddress = React.useCallback(
    (index) => {
      onRemoveAddress(index);
    },
    [onRemoveAddress]
  );
  console.log("addresses", addresses);
  return (
    <SafeAreaView style={{ backgroundColor: COLOR.white, flex: 1 }}>
      <CommonHeader title={"Address List"} />
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginBottom: 8,
              backgroundColor: "white",
              borderColor: "#e3e3e3",
              borderWidth: 0.5,
              elevation: 6,
              borderRadius: 5,
              margin: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View>
                <Text>{`City: ${item.city}`}</Text>
                <Text>{`Area: ${item.area}`}</Text>
                <Text>{`Pincode: ${item.pin}`}</Text>
                <Text>{`House Number: ${item.houseNumber}`}</Text>
                <Text>{`Building: ${item.buildingName}`}</Text>
              </View>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    padding: 2,
                    borderRadius: 4,
                    borderColor: COLOR.Primary_Color,
                    borderWidth: 1,
                    justifyContent: "center",
                  }}
                  onPress={() => removeAddress(index)}
                >
                  <Text
                    style={{
                      color: COLOR.Primary_Color,
                      fontSize: 10,
                      alignSelf: "center",
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    REMOVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AddressListScreen;

const styles = StyleSheet.create({});
