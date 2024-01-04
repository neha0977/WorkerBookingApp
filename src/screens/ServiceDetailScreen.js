import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { STYLES } from "../utils/commonstyles/Style";
import { COLOR } from "../utils/commonstyles/Color";
import { CONSTANTS } from "../utils/constants/StaticContent";
import { IMAGES, getImageFromURL } from "../resources/images";

const ServiceDetailScreen = () => {
  const servicePackages = [
    { id: "1", name: "Basic Package",catlegory:"Men's haircut", price: "$10" },
    { id: "2", name: "Standard Package", catlegory:"Men's Beard Shave",price: "$20" },
    { id: "3", name: "Premium Package",catlegory:"Men's face care", price: "$30" },
    { id: "4", name: "Standard Package",catlegory:"Men's hair color", price: "$10" },
    { id: "5", name: "Premium Package",catlegory:"Men's spa", price: "$60" },
    // Add more service packages as needed
  ];
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        padding: 10,
        marginVertical: 8,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 1 }}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Image
              source={require("../assets/img/men.jpg")}
              style={{  height: 70,
              width: 70,borderRadius:8,alignSelf:'center'}}/>
      <View style={{flexDirection:'column',marginLeft:10,alignSelf:'center'}}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color:COLOR.Text_Color
        }} >{item.name} </Text>
        <Text
        style={{
          fontSize: 11,
          fontWeight: "300",
       
          color:COLOR.Text_Color
        }} >{item.catlegory} </Text>
          <View style={{  marginTop:10, flexDirection: "row"}}>
            <Image
              source={require("../assets/img/star.png")}
              style={{ alignSelf: "center", height: 12, width: 12}} />
            <Text
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: COLOR.black,
               
                marginHorizontal: 3,
              }}> 4.5</Text>
              </View>
      </View>
            </View>
          
     
      <View style={{flexDirection:'column',marginLeft:10,justifyContent:'space-between'}}>
      <TouchableOpacity style={{padding:2,borderRadius:4,borderColor:COLOR.Primary_Color,borderWidth:1}}>
        <Text style={{color:COLOR.Primary_Color,fontSize:12,alignSelf:'center',paddingHorizontal:5,fontWeight:'500'}}>ADD</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity style={{height:25,width:25,backgroundColor:COLOR.Primary_Color,borderRadius:40,justifyContent:'center'}}> 
        <Image source={require("../assets/img/plus.png")}
              style={{ alignSelf: "center", height: 11, width: 11,tintColor:'white'}} />
      </TouchableOpacity>

      <Text style={{marginHorizontal:10,alignSelf:'center',fontSize:13,fontWeight:'500',color:COLOR.Text_Color}}>1</Text>

      <TouchableOpacity style={{height:25,width:25,backgroundColor:COLOR.Primary_Color,borderRadius:40,justifyContent:'center'}}> 
        <Image source={require("../assets/img/minus.png")}
              style={{ alignSelf: "center", height: 11, width: 11,tintColor:'white'}} />
      </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          color:COLOR.black,alignSelf:'center'
        }} >{item.price} </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={STYLES.containerForgotpass}>
      <CommonHeader title="Detail" />
      <ScrollView>
        <View style={{ flexDirection: "column", marginHorizontal: "5%" }}>
          <View
            style={{
              height: 220,
              width: "100%",
              backgroundColor: COLOR.blue,
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/img/men.jpg")}
              style={[
                STYLES.AppLogo,
                { alignSelf: "center", resizeMode: "fit" },
              ]}
            />
          </View>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: "500",
              color: COLOR.black,
            }}
          >
            Men's Grooming
          </Text>
          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Image
              source={require("../assets/img/star.png")}
              style={{ alignSelf: "center", height: 15, width: 15 }} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: COLOR.black,
                marginHorizontal: 3,
              }}> 4.5</Text>
            <View
              style={{
                justifyContent: "center",
                right: 0,
                position: "absolute",
                backgroundColor: "white",
                borderRadius: 15,
                height: 25,
                elevation: 3,
              }}
            >
              <Text
                style={{ fontSize: 10, color: COLOR.Primary_Color, padding: 5 }}
              >
                2K bookings
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: COLOR.black,
              marginHorizontal: 3,
              marginTop: "5%",
            }}
          >
            {CONSTANTS.dummy_txt}
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: COLOR.black,
              marginHorizontal: 3,
              marginTop: "5%",
            }}>
            Packages
          </Text>
          <View style={{ marginTop: 10 }}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceDetailScreen;
