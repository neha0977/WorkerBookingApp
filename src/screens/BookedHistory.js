import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import CommonHeader from "../components/common/CommonHeader";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { COLOR } from "../utils/commonstyles/Color";
import moment from "moment";

const renderBookingItem = ({ item }) => {
  const Userid = auth().currentUser.displayName;
  return (
    <View style={styles.listItem}>
      <View style={styles.ListItemMain}>
        <View style={styles.iconView}>
          <Text style={styles.dateText}>{item.service.selectedStartDate}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.itemTexttime}>{item.service.seletedTime}</Text>
          <Text style={styles.itemTextuserName}>{Userid}</Text>
          <Text style={styles.itemTextCatName}>{item.category.name}</Text>
        </View>
      </View>
    </View>
  );
};

const FirstRoute = ({ bookings }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View>
      <FlatList
        data={bookings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBookingItem}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No Booking found</Text>
        )}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: bookings.length > 0 ? "flex-start" : "center",
        }}
      />
    </View>
  </SafeAreaView>
);

const SecondRoute = ({ bookings }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View>
      <FlatList
        data={bookings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBookingItem}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No Booking found</Text>
        )}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: bookings.length > 0 ? "flex-start" : "center",
        }}
      />
    </View>
  </SafeAreaView>
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#2196f3" }} />
);

const renderScene = ({ route, bookings }) => {
  const today = moment().startOf("day");
  console.log("today", today);
  switch (route.key) {
    case "Upcoming":
      const upcomingBookings = bookings.filter((item) => {
        console.log("item", item);
        const bookingDate = moment(
          item.service.selectedStartDate,
          "DD-MM-YYYY"
        ).startOf("day");
        console.log("bookingDate", bookingDate);
        return bookingDate.isSameOrAfter(today);
      });
      return <FirstRoute bookings={upcomingBookings} />;
    case "Past":
      // Filter past bookings (previous dates)
      const pastBookings = bookings.filter((item) => {
        const bookingDate = moment(
          item.service.selectedStartDate,
          "DD-MM-YYYY"
        ).startOf("day");
        return bookingDate.isBefore(today);
      });
      return <SecondRoute bookings={pastBookings} />;
    case "Cancelled":
      // Filter cancelled bookings
      const cancelledBookings = bookings.filter(
        (item) => item.service.status === "Cancelled"
      );
      return <ThirdRoute bookings={cancelledBookings} />;
    default:
      return null;
  }
};

const BookedHistory = () => {
  const layout = useWindowDimensions();
  const [bookings, setBookings] = useState([]);
  //   useEffect(() => {
  //     const Userid = auth().currentUser.uid;
  //     const unsubscribe = firestore()
  //       .collection("serviceBooking")
  //       .where("userId", "==", Userid)
  //       .onSnapshot((snapshot) => {
  //         const bookingData = snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         console.log("bookingData", bookingData);
  //         setBookings(bookingData[0].serviceItems);
  //       });

  //     return () => unsubscribe();
  //   }, []);
  useEffect(() => {
    const Userid = auth().currentUser.uid;
    const unsubscribe = firestore()
      .collection("serviceBooking")
      .where("userId", "==", Userid)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          const bookingData = snapshot.docs[0].data().serviceItems;
          console.log("bookingData", bookingData);
          setBookings(bookingData);
        } else {
          // Handle case when there are no documents in the collection
          console.log("No bookings found.");
          setBookings([]); // Set bookings to an empty array
        }
      });

    return () => unsubscribe();
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Upcoming", title: "Upcoming" },
    { key: "Past", title: "Past" },
    { key: "Cancelled", title: "Cancelled" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader title={"Bookings"} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={(props) => renderScene({ ...props, bookings })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

export default BookedHistory;
const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    margin: 10,
    backgroundColor: COLOR.white,
    borderColor: "#e3e3e3",
    elevation: 5,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  ListItemMain: {
    flexDirection: "row",
    width: "100%",
  },
  iconView: {
    borderRadius: 99,
    backgroundColor: "#c7d6c4",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: "#316115",
  },
  textView: {
    width: "80%",
    maxWidth: "90%",
    marginHorizontal: 15,
  },
  itemTexttime: {
    marginTop: 15,
    color: COLOR.black,
    fontSize: 18,
    fontWeight: "500",
  },
  itemTextuserName: {
    color: COLOR.black,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTextCatName: {
    color: COLOR.New_button,
    fontSize: 15,
  },
  iconStyle: {
    color: COLOR.New_Primary,
    fontSize: 22,
  },
  dateText: {
    color: "#316115",
    fontWeight: "400",
    fontSize: 15,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
