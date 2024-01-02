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
} from "react-native";
import React from "react";
import { STYLES } from "../utils/commonstyles/Style";
import { IMAGES, getImageFromURL } from "../resources/images";
import { COLOR } from "../utils/commonstyles/Color";
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
    id: 3,
    name: "see all",
    image: "",
  },
  // {
  //   id: 4,
  //   name: "cleaning",
  //   image: getImageFromURL(IMAGES.CLEANING),
  // },
];
const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <FlatList
          style={{ marginTop: 10 }}
          data={catogeryList}
          numColumns={4}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: "center" }}>
                {/* {item.image !== undefined ? ( */}
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: "#F0F0F0",
                    backgroundColor: "white",
                    width: Platform.OS === "android" ? 78 : 90,
                    height: Platform.OS === "android" ? 78 : 90,
                    margin: 5,
                    padding: 10,
                  }}
                  //  onPress={onMorePressed_Brand}
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
                    <Text>{item.name}</Text>
                  )}
                  {item.image == "" ? (
                    ""
                  ) : (
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        marginTop: 2,
                      }}
                    >
                      {item.name}
                    </Text>
                  )}
                </TouchableOpacity>
                {/* ) : ( */}
                {/* <TouchableOpacity
                  style={{
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: "#F0F0F0",
                    backgroundColor: "white",
                    width: Platform.OS === "android" ? 78 : 90,
                    height: Platform.OS === "android" ? 78 : 90,
                    margin: 5,
                    padding: 5,
                  }}
                  // onPress={onMorePressed}
                >
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    {item.name}neha
                  </Text>
                </TouchableOpacity> */}
                {/* )} */}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
