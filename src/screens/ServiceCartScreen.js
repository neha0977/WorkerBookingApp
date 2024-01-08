import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    ToastAndroid,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import CommonHeader from "../components/common/CommonHeader";
  import { STYLES } from "../utils/commonstyles/Style";
  import { COLOR } from "../utils/commonstyles/Color";
  import { CONSTANTS } from "../utils/constants/StaticContent";
  import { IMAGES, getImageFromURL } from "../resources/images";
  const { width } = Dimensions.get("window");
  

const ServiceCartScreen = ({route}) => {
      const [itemQuantities, setItemQuantities] = useState({});
      const [showQuantityItemIds, setShowQuantityItemIds] = useState([]);
      const [totalPrice, setTotalPrice] = useState(0);
      const [servicePackages, setServicePackages] = useState([
        {
          id: "1",
          name: "Basic Package",
          catlegory: "Men's haircut",
          price: "$10",
        },
        {
          id: "2",
          name: "Standard Package",
          catlegory: "Men's Beard Shave",
          price: "$20",
        },
      ]);

      const renderItem = ({ item }) => (
          <View style={{flexDirection:'column'}}>
            <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            marginVertical: 8,
          }} >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                flexDirection: "column",
                marginLeft: 10,
                alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: COLOR.Text_Color}} >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "300",
                  color: COLOR.Text_Color,
                }}  >
                {item.catlegory}
              </Text>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: COLOR.black,
                    marginHorizontal: 3,
                  }}>
                  {item.price}
                </Text>

                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: COLOR.black,
                    marginHorizontal: 3,
                  }}>
                  |
                </Text>

                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: COLOR.black,
                    marginHorizontal: 3,
                  }}>
                 1 hr 30 mins
                </Text>
              </View>
    
              
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "600",
                    marginTop: 8,
                    color: COLOR.Primary_Color}}>
                  Service Charge: 10
                </Text>
              </TouchableOpacity>
            </View>
          </View>
    
          <View
            style={{
              flexDirection: "column",
              marginLeft: 10,
              justifyContent: "space-between"}} >
            {/* //Remove button */}
              <TouchableOpacity
                style={{
                  padding: 2,
                  borderRadius: 4,
                  borderColor: COLOR.dark_red,
                  borderWidth: 1,
                }}
                onPress={() => handleRemoveItem(item.id)}>
                <Text
                  style={{
                    color: COLOR.dark_red,
                    fontSize: 10,
                    alignSelf: "center",
                    paddingHorizontal: 5,
                    paddingVertical:2,
                    fontWeight: "500",
                  }}> REMOVE</Text>
              </TouchableOpacity>
          </View>
        </View>

        <View style={{backgroundColor:COLOR.grey,height:1,width:width}} />
          </View>
      );
     
      const handleRemoveItem = (itemId) => {
        // Filter out the item with the specified id and update the state
        setServicePackages((prevPackages) =>
          prevPackages.filter((item) => item.id !== itemId)
        );
      };
      return (
        <SafeAreaView style={STYLES.containerForgotpass}>
          <CommonHeader title="Service cart" />
          <ScrollView>
            <View style={{ flexDirection: "column", marginHorizontal: "5%" }}>
                <FlatList
                  data={servicePackages}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                />
            </View>
          </ScrollView>
    
          {/* //Service cart view */}
          <View
            style={{
              width: width,
              height: 50,
              flexDirection: "row",
              backgroundColor: COLOR.Primary_Color,
              padding: 10,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              elevation: 5,
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                color: COLOR.white,
                fontSize: 12,
                fontWeight: "500",
                alignSelf: "center",
                paddingLeft: 20,
              }}>
              {/* Calculate total price based on selected package and quantity */}$
              {route.params.totalPrice}
            </Text>
    
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.light_purple,
                paddingHorizontal: 5,
                paddingVertical: 4,
                borderRadius: 5,
                height: 26,
                alignSelf: "center",
              }}
              onPress={() => {
                if (totalPrice !== 0) navigation.navigate("BookingScreen");
                else
                  ToastAndroid.show(
                    "Please add services first",
                    ToastAndroid.SHORT
                  );
              }}>
              <Text
                style={{
                  color: COLOR.Primary_Color,
                  fontSize: 12,
                  paddingHorizontal:5,
                  fontWeight: "500",
                  alignSelf: "center"}} >
               Select Slot 
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
}

export default ServiceCartScreen
