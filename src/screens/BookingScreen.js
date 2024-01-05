import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useMemo } from "react";
import CommonHeader from "../components/common/CommonHeader";
import { COLOR } from "../utils/commonstyles/Color";
import { Calendar } from "react-native-calendars";
import CommonButton from "../components/common/CommonButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const BookingScreen = () => {
  const initDate = "2024-01-01";
  const [selected, setSelected] = useState("");
  const [timeSelect, setTimeSelect] = useState("");
  const [Index, setIndex] = useState(-1);
  const [Times, setTimes] = useState([
    {
      id: 0,
      title: "AM",
      time: "06:00 AM",
    },
    {
      id: 1,
      title: "AM",
      time: "08:00 AM",
    },
    {
      id: 3,
      title: "AM",
      time: "10:00 AM",
    },
    {
      id: 4,
      title: "PM",
      time: "12:00 PM",
    },
    {
      id: 5,
      title: "PM",
      time: "14:00 PM",
    },
    {
      id: 7,
      title: "PM",
      time: "16:00 PM",
    },
    {
      id: 8,
      title: "PM",
      time: "18:00 PM",
    },
    {
      id: 9,
      title: "PM",
      time: "19:00 PM",
    },
    {
      id: 10,
      title: "PM",
      time: "20:00 PM",
    },
    {
      id: 11,
      title: "PM",
      time: "21:00 PM",
    },
  ]);
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: COLOR.fade_purple,
        selectedTextColor: COLOR.Primary_Color,
      },
    }),
    [selected]
  );
  const handleProced = () => {
    if (!selected) {
      ToastAndroid.show("Please select date", ToastAndroid.SHORT);
    }
  };
  const timeListRender = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: COLOR.white,
          borderRadius: 5,
          elevation: 3,
          marginHorizontal: 10,
          padding: 12,
          marginVertical: 10,
          alignItems: "center",
          borderColor: Index != item.index ? COLOR.Primary_Color : "pink",
        }}
        onPress={() => {
          setTimeSelect(item.time);
          setIndex(item.index);
          const myArr = [...availableSlots];
          myArr[index].isSelected = !item.isSelected;
          setAvailableSlots(myArr);
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: COLOR.black,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {" "}
          {item.time}
        </Text>
        {/* <Text
          style={{
            fontSize: 12,
            color: COLOR.black,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {" "}
          {item.title}
        </Text> */}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLOR.white, flex: 1 }}>
      <CommonHeader title={"Booking"} />
      <ScrollView>
        <View style={{ margin: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="map-marker"
              color={"black"}
              size={20}
            />
            <Text
              style={{ fontWeight: "bold", color: COLOR.black, fontSize: 18 }}
            >
              Service at
            </Text>
          </View>
          <Text
            style={{
              maxWidth: "50%",
              color: COLOR.black,
              marginTop: 5,
              lineHeight: 25,
              marginStart: 5,
            }}
          >
            J-38, 3rd floor, Noida sector 63, Uttar Pradesh, India{" "}
          </Text>
        </View>
        <View
          style={{
            borderColor: "#e3e3e3",
            borderWidth: 0.5,
            padding: 0,
            backgroundColor: "#e3e3e3",
          }}
        />
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
            //todayTextColor: COLOR.white,
            // todayBackgroundColor: COLOR.Primary_Color,
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
          <TouchableOpacity
            onPress={() => handleProced()}
            activeOpacity={0.7}
            style={{
              height: 45,
              width: "100%",
              backgroundColor: COLOR.Primary_Color,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text
              style={{ color: COLOR.white, fontWeight: "bold", fontSize: 15 }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;
