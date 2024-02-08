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
import CommonHeader from "../components/common/CommonHeader";
import { Searchbar } from "react-native-paper";
const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const handleSearch = () => {
    // Perform any action related to search (e.g., filtering data)
    onSearch(searchText);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.New_Primary }}>
      <CommonHeader title={"Search"} />
      <View
        style={{
          width: "90%",
          alignItems: "center",
          flex: 1,
          alignSelf: "center",
          marginTop: "5%"  }} >
        <Searchbar
        style={{borderRadius:11,backgroundColor:COLOR.light_purple,borderColor:COLOR.Primary_Color,borderWidth:1}}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
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
