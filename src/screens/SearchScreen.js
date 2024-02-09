import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOR } from "../utils/commonstyles/Color";
import CommonHeader from "../components/common/CommonHeader";
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from "../components/common/Loader";
import firestore from "@react-native-firebase/firestore";
const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [service, setService] = useState([]);
  useEffect(() => {
    getServices();
  }, []);
  const getServices = async () => {
    setisLoading(true);
    const querySanp = await firestore().collection("ServicesList").get();
    setisLoading(false);
    const services = querySanp.docs.map((docSnap) => docSnap.data());
    setService(services);
    setFilteredDataSource(services);
    setMasterDataSource(services);
    setisLoading(false);
  };
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.serviceName
          ? item.serviceName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchText(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchText(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.mycard}>
          {/* <Image
                    source={item.image !== null ? { uri: item.image } : require('../Images/user.png')}
                    style={styles.img} /> */}
          <View>
            <Text style={styles.text}>{item.serviceName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <CommonHeader title={"Search"} />

      <View style={styles.searchContainer}>
        <Icon name="search" size={15} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => searchFilterFunction(text)}
        />
      </View>
      {filteredDataSource.length > 0 ? (
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}> Not Found </Text>
        </View>
      )}
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 0.5,
    height: 40,
    width: "90%",
    marginTop: "2%",
    borderColor: COLOR.grey,
  },
  searchIcon: {
    marginTop: 10,
    marginStart: 10,
  },
  input: {
    fontSize: 16,
    marginStart: 10,
    padding: 3,
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
  mycard: {
    flexDirection: "row",
    padding: 4,
    backgroundColor: "white",
    borderBottomColor: "grey",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 5,
  },
});
