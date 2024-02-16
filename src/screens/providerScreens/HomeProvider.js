import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { COLOR } from "../../utils/commonstyles/Color";
import { signOut } from "../../utils/databaseHelper/FireBase";
const HomeProvider = ({navigation}) => {
  const [timeList, setTimeList] = useState([]);
  const [seletedTime, setSeletedTime] = useState();
  const [note, setNote] = useState("");
  useEffect(() => {
    getTime();
  }, []);

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
  const signOutUser = () => {
    Alert.alert(
      "Logout",
      "are you sure you want to logout?",
      [
        {
          text: "cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "yes",
          onPress: () => {
            signOut(navigation);
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView>
      <CommonHeader title={"Provider Home"} />
      <KeyboardAvoidingView>
        <View>
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
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
        </View>
        {/* note section */}
        <View style={{ paddingTop: 20 }}>
          <Text> Any Suggestion Note</Text>
          <TextInput
            placeholder="Note"
            style={styles.noteTextArea}
            multiline={true}
            numberOfLines={4}
            onChange={(note) => setNote(note)}
          />
        </View>
        {/* confirmaton button */}
        <TouchableOpacity style={{ marginTop: 15 }}>
          <Text style={styles.confirmButton}>Confirm & Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => signOutUser()}
          >
            <Text
              style={{
                color: COLOR.New_Primary,
                fontSize: 14,
               // marginLeft: SIZES.base,
                fontWeight: 500,
              }}
            >
              Log Out
            </Text>
       
          </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeProvider;

const styles = StyleSheet.create({
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLOR.New_button,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: COLOR.white,
    backgroundColor: COLOR.New_button,
  },
  unSelectedtime: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLOR.New_button,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: COLOR.black,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    borderColor: COLOR.Primary_Color,
  },
  confirmButton: {
    textAlign: "center",
    fontSize: 17,
    backgroundColor: COLOR.Primary_Color,
    color: COLOR.white,
    padding: 13,
    borderRadius: 99,
    elevation: 2,
  },
});
