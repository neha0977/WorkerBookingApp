import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { COLOR } from "../../utils/commonstyles/Color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import auth from "@react-native-firebase/auth";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
const HomeProvider = ({ navigation, route }) => {
  // const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([
    moment().format("DD-MM-YYYY") // Format today's date and add it to the initial array
  ]);
  const [timeList, setTimeList] = useState([]);
  const [seletedTime, setSeletedTime] = useState();
  const [SuggestionNote, setSuggestionNote] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("Pending");
  const [bookingId, setBookingId] = useState(null);
  const [userAdd, setuserAdd] = useState("");
  const isfocuced = useIsFocused();

  useEffect(() => {
    getTime();
    getusers();
  }, [isfocuced]);
  const getusers = async () => {
    const Userid = auth().currentUser.uid;
    try {
      const snapshot = await firestore()
        .collection("users")
        .where("userId", "==", Userid)
        .get();
      const data = snapshot._docs;
      data.map((data) => {
        console.log(data._data, "adddress data");
        setuserAdd(data._data);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };
  // const onDateChange = (date) => {
  //   const formattedDate = moment(date).format("DD-MM-YYYY");
  //   console.log(formattedDate);
  //   setSelectedStartDate(formattedDate);
  // };

  const onDateChange = (date) => {
    const formattedDate = moment.utc(date).format("DD-MM-YYYY");

    // Check if the selected date is already in the selectedDates array
    const index = selectedDates.indexOf(formattedDate);
    if (index > -1) {
      // If the date is already selected, remove it from the array
      setSelectedDates(selectedDates.filter(d => d !== formattedDate));
      console.log(selectedDates,"IFF CONDITION")
    } else {
      // If the date is not selected, add it to the array
      setSelectedDates([...selectedDates, formattedDate]);
      console.log(selectedDates,"ELSE CONDITION")
    }
  };

  const getTime = () => {
    const currentTime = moment(); // Get current time
    const timeSlots = [];

    for (let i = 8; i <= 22; i++) {
      const time = moment().hour(i).minute(0);
      // Check if the time is before the current time
      const isPastTime = time.isBefore(currentTime);
      timeSlots.push({
        time: time.format("hh:mm A"),
        disabled: isPastTime, // Add a 'disabled' property
      });
    }

    setTimeList(timeSlots);
  };

  const handleProced = async () => {
    const userName = auth().currentUser.displayName;
    const userId = auth().currentUser.uid;
    const data = route.params.cartItems;
    // const separatedData = data.map((item) => ({
    //   category: {
    //     id: item.serviceCategory.CategoryId,
    //     name: item.serviceCategory.CategoryName,
    //   },
    //   service: {
    //     id: item.id,
    //     name: item.serviceName,
    //     description: item.serviceDetails,
    //     price: item.servicePrice,
    //     quantity: item.quantity,
    //     totalAmount: route.params.totalPrice,
    //     status: "Pending",
    //     seletedTime: seletedTime,
    //     selectedStartDate: selectedStartDate,
    //     SuggestionNote: SuggestionNote || "",
    //   },
    // }));
    console.log(seletedTime,"FFFGHH")

    if (!seletedTime ) {
      ToastAndroid.show("Please select date and time", ToastAndroid.SHORT);
      return;
    }

    // try {
    //   const bookingSnapshot = await firestore()
    //     .collection("serviceBooking")
    //     .doc(userId)
    //     .get();

    //   if (bookingSnapshot.exists) {
    //     await firestore()
    //       .collection("serviceBooking")
    //       .doc(userId)
    //       .update({
    //         userName,
    //         userId,
    //         address: userAdd ? userAdd[0] : route.params.selectedAddress,
    //         serviceItems: firestore.FieldValue.arrayUnion(...separatedData),
    //         timestamp: firestore.FieldValue.serverTimestamp(),
    //       });

    //     ToastAndroid.show("Service updated successfully!", ToastAndroid.SHORT);
    //   } else {
    //     await firestore()
    //       .collection("serviceBooking")
    //       .doc(userId)
    //       .set({
    //         userName,
    //         userId,
    //         address: userAdd ? userAdd[0] : route.params.selectedAddress,
    //         serviceItems: separatedData,
    //         timestamp: firestore.FieldValue.serverTimestamp(),
    //       });

    //     ToastAndroid.show("Service added successfully!", ToastAndroid.SHORT);
    //   }

    //   navigation.navigate("BookedSucesssfullyScreen", {
    //     status: "success",
    //   });
    // } catch (error) {
    //   console.error("Error adding/updating service: ", error);
    //   navigation.navigate("BookedSucesssfullyScreen", {
    //     status: "failed",
    //   });
    // }
  };
  //cancel booking
  const cancelBooking = async () => {
    try {
      await firestore()
        .collection("serviceBooking")
        .doc(bookingId)
        .update({ status: "Cancelled" });
      setBookingStatus("Cancelled");
    } catch (error) {
      console.log(error);
    }
  };
  //complete bokking
  const completeBooking = async () => {
    try {
      await firestore()
        .collection("serviceBooking")
        .doc(bookingId)
        .update({ status: "Cancelled" });
      setBookingStatus("Cancelled");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.conatiner}>
      <CommonHeader title={"Choose time & date slot"} />
      <ScrollView showsVerticalScrollIndicator={false}>
       
        {/* calender sectioon */}
        <Text style={styles.heading}> Select date</Text>
        <View style={styles.calenderContainer}>
          <CalendarPicker
            onDateChange={onDateChange}
            width={300}
            startFromMonday={true}
            minDate={Date.now()}
            todayBackgroundColor={COLOR.New_button}
            todayTextStyle={{ color: COLOR.white }}
            selectedDayTextColor={COLOR.white}
            selectedDayColor={COLOR.New_Primary}
          />
        </View>
        <Text style={styles.heading}> Select time</Text>
        <KeyboardAvoidingView>
          {/* date */}
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              // <TouchableOpacity
              //   style={{ marginRight: 5 }}
              //   onPress={() => {
              //     setSeletedTime(item.time);
              //   }}
              // >
              //   <Text
              //     style={[
              //       seletedTime == item.time
              //         ? styles.selectedTime
              //         : styles.unSelectedtime,
              //     ]}
              //   >
              //     {" "}
              //     {item.time}
              //   </Text>
              // </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  item.disabled && styles.disabledTimeButton, 
                ]}
                onPress={() => {
                  if (!item.disabled) {
                    setSeletedTime(item.time);
                  }
                }}
              >
                <Text
                  style={[
                    styles.timeButtonText,
                    item.disabled && styles.disabledTimeText,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* note section */}
          <View style={{ paddingTop: 5 }}>
            <Text style={styles.heading}> Any Suggestion Note</Text>
            <TextInput
              placeholder="Note"
              style={styles.noteTextArea}
              multiline={true}
              numberOfLines={4}
              onChangeText={(note) => setSuggestionNote(note)}
            />
          </View>
          {/* confirmaton button */}
          <TouchableOpacity
            style={{ marginTop: 15, marginBottom: 20 }}
            onPress={() => handleProced()}
          >
            <Text style={styles.confirmButton}>Confirm</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeProvider;
const styles = StyleSheet.create({
  conatiner: { backgroundColor: COLOR.New_Primary, flex: 1 },
  addressView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceAtText: { fontWeight: "bold", color: COLOR.New_button, fontSize: 18 },
  changeBtnView: {
    padding: 2,
    borderRadius: 4,
    borderColor: COLOR.New_button,
    borderWidth: 1,
  },
  chnageText: {
    color: COLOR.New_button,
    fontSize: 10,
    alignSelf: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontWeight: "500",
  },
  addressText: {
    maxWidth: "50%",
    color: COLOR.New_button,
    marginTop: 5,
    lineHeight: 25,
    marginStart: 5,
  },
  Line: {
    borderColor: "#e3e3e3",
    borderWidth: 0.5,
  },
  heading: {
    fontSize: 15,
    color: COLOR.New_button,
    fontWeight: "500",
    margin: 10,
  },
  selectedTime: {
    padding: 5,
    borderWidth: 1,
    borderColor: COLOR.New_button,
    borderRadius: 99,
    paddingHorizontal: 15,
    color: COLOR.white,
    backgroundColor: COLOR.New_button,
    marginStart: 10,
  },
  unSelectedtime: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: COLOR.New_button,
    borderRadius: 99,
    paddingHorizontal: 15,
    color: COLOR.New_button,
    marginStart: 15,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    borderColor: COLOR.New_button,
    marginHorizontal: 15,
  },
  confirmButton: {
    textAlign: "center",
    fontSize: 17,
    backgroundColor: COLOR.New_button,
    color: COLOR.white,
    padding: 11,
    borderRadius: 9,
    elevation: 2,
    marginHorizontal: 20,
  },
  calenderContainer: {
    backgroundColor: "#f3e3bc",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 25,
    marginTop: 8,
  },
  timeButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: COLOR.New_button,
    borderRadius: 99,
    paddingHorizontal: 15,
    marginStart: 10,
  },
  timeButtonText: {
    color: COLOR.black,
  },
  disabledTimeButton: {
    backgroundColor: "#ccc", // Gray background for disabled time slots
  },
  disabledTimeText: {
    color: "#999", // Gray text color for disabled time slots
  },
});

