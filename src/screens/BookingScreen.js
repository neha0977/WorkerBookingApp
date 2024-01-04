import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
import { Calendar } from "react-native-calendars";
import CommonButton from "../components/common/CommonButton";
const Times = [
  {
    id: 0,
    title: "AM",
    time: "06:00",
  },
  {
    id: 1,
    title: "AM",
    time: "08:00",
  },
  {
    id: 3,
    title: "AM",
    time: "10:00",
  },
  {
    id: 4,
    title: "PM",
    time: "12:00",
  },
  {
    id: 5,
    title: "PM",
    time: "14:00",
  },
  {
    id: 6,
    title: "PM",
    time: "14:00",
  },
  {
    id: 7,
    title: "PM",
    time: "16:00",
  },
  {
    id: 8,
    title: "PM",
    time: "18:00",
  },
  {
    id: 9,
    title: "PM",
    time: "19:00",
  },
  {
    id: 10,
    title: "PM",
    time: "20:00",
  },
  {
    id: 11,
    title: "PM",
    time: "21:00",
  },
];

const BookingScreen = () => {
  const timeListRender = ({ item, index }) => {
    //console.log(item, index);
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLOR.white,
          borderRadius: 5,
          elevation: 3,
          marginHorizontal: 15,
          padding: 12,
          marginVertical: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: COLOR.black,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {" "}
          {item.time}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: COLOR.black,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {" "}
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLOR.white, flex: 1 }}>
      <CommonHeader title={"Booking"} />
      <ScrollView>
        <Calendar
          initialDate="2024-01-01"
          minDate="2024-01-01"
          maxDate="2024-02-30"
          disableAllTouchEventsForDisabledDays={true}
          onDayPress={(day) => console.log("onDayPress", day)}
          onDayLongPress={(day) => console.log("onDayLongPress", day)}
          onMonthChange={(date) => console.log("onMonthChange", date)}
          onPressArrowLeft={(goToPreviousMonth) => {
            console.log("onPressArrowLeft");
            goToPreviousMonth();
          }}
          onPressArrowRight={(goToNextMonth) => {
            console.log("onPressArrowRight");
            goToNextMonth();
          }}
          style={{
            borderRadius: 5,
            margin: 10,
            elevation: 5,
            borderWidth: 1,
            borderColor: COLOR.white,
          }}
          theme={{
            "stylesheet.calendar.header": {
              dayTextAtIndex0: {
                color: "red",
              },
              dayTextAtIndex6: {
                color: "green",
              },
            },
            calendarBackground: "#222",
            dayTextColor: "#fff",
            textDisabledColor: "#444",
            monthTextColor: "#888",
          }}
        />
        <Text
          style={{
            fontSize: 15,
            color: COLOR.black,
            fontWeight: "500",
            margin: 10,
          }}
        >
          {" "}
          Select Date
        </Text>
        <View style={{}}>
          <FlatList
            data={Times}
            keyExtractor={(item, index) => index}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            renderItem={(item, index) => timeListRender(item, index)}
          />
        </View>
        <View
          style={{
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <CommonButton title={"Save"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
