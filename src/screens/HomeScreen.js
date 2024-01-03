// import React, { useState, useEffect } from "react";
// import { View, Text, Button, FlatList } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   getAppointmentsByUser,
//   bookAppointment,
//   cancelAppointment,
// } from "../utils/databaseHelper/FireBase";

// const HomeScreen = () => {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     fetchAppointments();
//   }, []); // Removed unnecessary dependency

//   const fetchAppointments = async () => {
//     try {
//       const userid = await AsyncStorage.getItem("userid");
//       console.log(userid);
//       const userAppointments = await getAppointmentsByUser(userid);
//       setAppointments(userAppointments);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   const handleBookAppointment = async () => {
//     try {
//       const userid = await AsyncStorage.getItem("userid");
//       // Replace 'providerId' and 'selectedDate' with actual values
//       await bookAppointment(userid, "providerId", "selectedDate");
//       fetchAppointments(); // Refresh the list of appointments
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//     }
//   };

//   const handleCancelAppointment = async (appointmentId) => {
//     try {
//       await cancelAppointment(appointmentId);
//       fetchAppointments(); // Refresh the list of appointments
//     } catch (error) {
//       console.error("Error canceling appointment:", error);
//     }
//   };

//   return (
//     <View>
//       <Text>Appointments:</Text>
//       <FlatList
//         data={appointments}
//         keyExtractor={(item) => String(item.id)}
//         renderItem={({ item }) => (
//           <View>
//             <Text>{item.date}</Text>
//             <Text>Status: {item.status}</Text>
//             <Button
//               title="Cancel"
//               onPress={() => handleCancelAppointment(item.id)}
//             />
//           </View>
//         )}
//       />
//       <Button title="Book Appointment" onPress={handleBookAppointment} />
//       <Button title="Refresh Appointments" onPress={fetchAppointments} />
//     </View>
//   );
// };

// export default HomeScreen;

import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { STYLES } from "../utils/commonstyles/Style";
import { IMAGES, getImageFromURL } from "../resources/images";
import { COLOR } from "../utils/commonstyles/Color";
import CommonHeader from "../components/common/CommonHeader";
import HomeHeader from "../components/common/HomeHeader";
const catogeryList = [
  {
    id: 0,
    name: "Cleaning",
    image: getImageFromURL(IMAGES.CLEANING),
  },
  {
    id: 1,
    name: "Reparing",
    image: getImageFromURL(IMAGES.REPAIRING),
  },
  {
    id: 2,
    name: "Painting",
    image: getImageFromURL(IMAGES.PAINTING),
  },
  {
    id: 3,
    name: "Saloon",
    image: getImageFromURL(IMAGES.SALOON),
  },
  {
    id: 4,
    name: "Plumbing",
    image: getImageFromURL(IMAGES.PLUMBING),
  },
  {
    id: 5,
    name: "see all",
    image: "",
  },
];

const popularServices = [
  {
    id: 0,
    title: "Wall Painting",
    subTitle: "Painter",
    image: getImageFromURL(IMAGES.PAINTER),
  },
  {
    id: 1,
    title: "Salon For Men",
    subTitle: "Barber",
    image: getImageFromURL(IMAGES.BARBAR),
  },
];
const HomeScreen = ({ navigation }) => {
  // get random color function useed in brand bg
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <HomeHeader />

      {/* Category View */}
      <Text
        style={{
          fontSize: 17,
          color: COLOR.black,
          fontWeight: "500",
          marginStart: 10,
          marginTop: 10,
        }}
      >
        {" "}
        Categories
      </Text>

      <View style={{ alignItems: "center" }}>
        <FlatList
          data={catogeryList}
          numColumns={4}
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
                onPress={() => {
                  if (item.image !== "") {
                    Alert.alert("INFO PAGE");
                  } else {
                    navigation.navigate("AllCategories");
                  }
                }}
              >
                {item.image !== "" ? (
                  <Image
                    source={item.image}
                    resizeMode={"contain"}
                    style={{
                      width: "70%",
                      height: "70%",
                    }}
                  />
                ) : (
                  <Text style={{ textAlign: "center", color: COLOR.black }}>
                    {item.name}
                  </Text>
                )}
                {item.image == "" ? (
                  ""
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      marginTop: 4,
                      color: COLOR.black,
                    }}
                  >
                    {item.name}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/* Popular services */}
      <View
        style={{
          marginTop: "3%",
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: COLOR.black,
                fontWeight: "500",
              }}
            >
              {" "}
              Popular Services
            </Text>
            <TouchableOpacity
              style={{ padding: 5, flexDirection: "row" }}
              onPress={() => navigation.navigate("PopularServices")}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "red",
                  marginRight: 5,
                  alignSelf: "center",
                }}
              >
                {" "}
                See all{" "}
              </Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#f0f0f0",
                  borderColor: "#f0f0f0",
                  borderWidth: 1,
                  borderRadius: 40,
                  marginRight: 16,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={getImageFromURL(IMAGES.FORWORD_ICON)}
                  style={{ width: 10, height: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={popularServices}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      margin: 5,
                      backgroundColor: "#f0f0f0",
                      borderRadius: 8,
                      backgroundColor: "#fff",
                      shadowColor: "black",
                      shadowOpacity: 0.3,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 10,
                      elevation: 3,
                      backgroundColor: "white",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: getRandomColor(),
                        width: 175,
                        height: 60,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 5,
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={item.image}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                        color: COLOR.black,
                        fontWeight: "500",
                        marginLeft: 5,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLOR.black,
                        margin: 5,
                        marginBottom: 5,
                      }}
                    >
                      {item.subTitle}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
