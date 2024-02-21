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
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
const BookingScreen = ({ navigation }) => {
  const [timeList, setTimeList] = useState([]);
  const [seletedTime, setSeletedTime] = useState();
  const [SuggestionNote, setSuggestionNote] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [itemList, setitemList] = useState([]);
  useEffect(() => {
    getBookedServices();
  }, []);
  useEffect(() => {
    getTime();
  }, []);
  const getBookedServices = async () => {
    const Userid = auth().currentUser.uid;
    try {
      const snapshot = await firestore()
        .collection("serviceBooking")
        .where("userID", "==", Userid)
        .get();

      if (!snapshot.empty) {
        const servicesList = [];
        snapshot.forEach((doc) => {
          servicesList.push({ id: doc.id, ...doc.data() });
        });
        setitemList(servicesList);
        console.log("servicesList", servicesList);
      } else {
        console.log("No matching documents.");
        setitemList([]);
      }
    } catch (error) {
      console.error("Error fetching services by category ID:", error);
    }
  };
  const onDateChange = (date) => {
    // Format a date
    const formattedDate = moment(date).format("DD-MM-YYYY");
    console.log(formattedDate);
    setSelectedStartDate(formattedDate);
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };
  const handleProced = async () => {
    const userName = auth().currentUser.displayName;
    const userId = auth().currentUser.uid;

    if (!seletedTime || !selectedStartDate) {
      ToastAndroid.show("Please select date and time", ToastAndroid.SHORT);
      return;
    }
    try {
      await firestore().collection("serviceBooking").doc(userId).update({
        userName,
        seletedTime,
        selectedStartDate,
        SuggestionNote,
      });
      ToastAndroid.show("Service added successfully!", ToastAndroid.SHORT);
      navigation.navigate("BookedSucesssfullyScreen", {
        status: "success",
      });
    } catch (error) {
      console.error("Error adding service: ", error);
      navigation.navigate("BookedSucesssfullyScreen", {
        status: "failed",
      });
    }

    // If you want to navigate after updating the booking:
    //  navigation.navigate("BookedService");
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <CommonHeader title={"Booking"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* address section */}
        <View style={{ margin: 10 }}>
          <View style={styles.addressView}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="map-marker"
                color={"black"}
                size={20}
              />
              <Text style={styles.serviceAtText}>Service at</Text>
            </View>
            <TouchableOpacity
              style={styles.changeBtnView}
              onPress={() => {
                Alert.alert("Chnaged");
                // navigation.navigate("AddressScreen");
              }}
            >
              <Text style={styles.chnageText}> CHANGE</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>
            J-38, 3rd floor, Noida sector 63, Uttar Pradesh, India{" "}
          </Text>
        </View>
        <View style={styles.Line} />
        {/* calender sectioon */}
        <View style={styles.calenderContainer}>
          <CalendarPicker
            onDateChange={onDateChange}
            width={300}
            startFromMonday={true}
            minDate={Date.now()}
            todayBackgroundColor={COLOR.New_button}
            todayTextStyle={{ color: COLOR.white }}
            selectedDayTextColor={COLOR.white}
            selectedDayColor={COLOR.New_button}
          />
        </View>
        <Text style={styles.heading}> Select Date</Text>
        <KeyboardAvoidingView>
          {/* date */}
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => {
                  setSeletedTime(item.time);
                }}
              >
                <Text
                  style={[
                    seletedTime == item.time
                      ? styles.selectedTime
                      : styles.unSelectedtime,
                  ]}
                >
                  {" "}
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
            <Text style={styles.confirmButton}>Confirm & Book</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;
const styles = StyleSheet.create({
  conatiner: { backgroundColor: COLOR.white, flex: 1 },
  addressView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceAtText: { fontWeight: "bold", color: COLOR.black, fontSize: 18 },
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
    color: COLOR.black,
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
    color: COLOR.black,
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
    color: COLOR.black,
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
    padding: 13,
    borderRadius: 10,
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
});
