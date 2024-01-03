import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { getImageFromURL, IMAGES } from "../resources/images";
import { COLOR } from "../utils/commonstyles/Color";
const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    // Perform any action related to search (e.g., filtering data)
    onSearch(searchText);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSearch} style={styles.input}>
          {/* You can use a search icon or any other indicator here */}
          <Image source={getImageFromURL(IMAGES.SEARCH)} style={styles.icon} />
          <TextInput
            placeholder="Search the entire shop or products.."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: COLOR.white,
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: "5%",
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "#f0f0f0",
    backgroundColor: "#f0f0f0",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  icon: {
    width: 18,
    height: 18,
    alignSelf: "center",
  },
});
