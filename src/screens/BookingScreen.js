import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
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
  const initDate = "2024-01-01";
  const [selected, setSelected] = useState(initDate);
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: COLOR.Primary_Color,
        selectedTextColor: COLOR.Primary_Color,
      },
    }),
    [selected]
  );

  const timeListRender = ({ item, index }) => {
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
          initialDate={initDate}
          minDate="2024-01-01"
          maxDate="2024-02-30"
          disableAllTouchEventsForDisabledDays={true}
          markedDates={marked}
          onDayPress={(day) => {
            console.log("day", day);
            setSelected(day.dateString);
            // onDaySelect && onDaySelect(day);
          }}
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
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            selectedDayBackgroundColor: "red",
            selectedDayTextColor: "red",
            todayTextColor: COLOR.Primary_Color,
            dayTextColor: "#000000",
            textDayFontWeight: "500",
            textDayFontSize: 12,
            textDisabledColor: "#d9e",
            textSectionTitleColor: COLOR.Primary_Color,
            selectedDayTextColor: "black",
            todayTextColor: COLOR.white,
            todayBackgroundColor: COLOR.Primary_Color,
            selectedDotColor: "red",
            monthTextColor: "#000",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "bold",
            "stylesheet.calendar.header": {
              header: {
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                textDayHeaderFontSize: 20,
              },
              week: {
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                //Here I can change only the background week days
              },
            },
            // textDayFontSize: 14,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 14,
            // textDayColor: "#000000",
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

        <FlatList
          data={Times}
          keyExtractor={(item, index) => index}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => timeListRender(item, index)}
        />

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
