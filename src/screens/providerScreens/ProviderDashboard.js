import { StyleSheet, Text, View ,SafeAreaView,ScrollView,FlatList,Modal,TouchableOpacity,Image,Dimensions} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import ProviderHeader from '../../components/common/ProviderHeader';
import { IMAGES, getImageFromURL } from "../../resources/images";
import { COLOR } from "../../utils/commonstyles/Color";
import firestore from "@react-native-firebase/firestore";
import defaultImage from "../../assets/AppLogo/logo.png";
const { width } = Dimensions.get("window");

const ProviderDashboard = () => {
  const flatListRef = useRef(null);
  const [catlist, setCatList] = useState([]);

  useEffect(() => {
    // FechCategory();
    getCategories();
    // getServices();
  }, [1]);

  const getCategories = async () => {
    try {
      const snapshot = await firestore().collection("categories").get();
      setCatList(snapshot._docs);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.New_Primary }}>
       <ProviderHeader />
       <ScrollView>
        {/* <View style={{ flexDirection: "column" }}>
          <>
            <FlatList
              ref={flatListRef}
              data={imageList}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.floor(
                  event.nativeEvent.contentOffset.x / width
                );
                setCurrentIndex(newIndex);
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              {imageList.map((_, index) => renderDot(index))}
            </View>
          </>
        </View> */}
        <Text
          style={{
            fontSize: 17,
            color: COLOR.New_button,
            fontWeight: "500",
            marginStart: 10,
            marginTop: '5%',
          }}>Requests   </Text>

        <View style={{ alignItems: "center" }}>
          <FlatList
            data={catlist}
            numColumns={1}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#F0F0F0",
                    backgroundColor: "white",
                    width: Platform.OS === "android" ? 75 : 90,
                    height: Platform.OS === "android" ? 75 : 90,
                    margin: 13,
                    padding: 10,
                    justifyContent: "center",
                    elevation: 5,
                  }}
                  // onPress={() => {
                  //   showBottomSheet();
                  // }}
                >
                  <Image
                    source={
                      item._data.CategoryImage
                        ? { uri: item._data.CategoryImage }
                        : defaultImage
                    }
                    resizeMode="contain"
                    style={{
                      width: "70%",
                      height: "70%",
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: COLOR.New_Primary,
                      fontSize: 11,
                    }}
                  >
                    {item._data.CategoryName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
     
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProviderDashboard

const styles = StyleSheet.create({})