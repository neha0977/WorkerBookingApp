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
} from "react-native";
import React from "react";
import { STYLES } from "../utils/commonstyles/Style";
import { IMAGES, getImageFromURL } from "../resources/images";
import { COLOR } from "../utils/commonstyles/Color";
import CommonHeader from "../components/common/CommonHeader";
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
  { id: 0, title: "Wall Painting", subTitle: "Painter", image: "" },
  { id: 1, title: "Salon For Men", subTitle: "Barber", image: "" },
];
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonHeader title={"Home"} />
      {/* Category View */}
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
                  margin: 10,
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
                  <Text style={{ textAlign: "center" }}>{item.name}</Text>
                )}
                {item.image == "" ? (
                  ""
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      marginTop: 4,
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
      {/* <View style={{ alignItems: "center" }}>
        <FlatList
          data={popularServices}
          numColumns={2}
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
                  width: Platform.OS === "android" ? 120 : 90,
                  height: Platform.OS === "android" ? 120 : 90,
                  margin: 5,
                  padding: 15,
                  justifyContent: "center",
                  elevation: 5,
                }}
                onPress={() => {
                  Alert.alert("INFO PAGE");
                }}
              >
                <ImageBackground
                  resizeMode={"cover"}
                  source={item.image}
                 // style={styles.image}
                >
                  <TouchableOpacity
                    style={styles.remove}
                    onPress={() => removeFromWishlist(item.id)}
                  >
                    <Image
                      source={getImageFromURL(IMAGES.LIKE)}
                      style={{ height: 15, width: 15, tintColor: "#FF7F7F" }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
                <Image
                  source={item.image}
                  resizeMode={"contain"}
                  style={{
                    width: "95%",
                    height: "95%",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
