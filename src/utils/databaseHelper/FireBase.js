// auth.js
import { Alert, ToastAndroid } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (input, navigation) => {
  console.log("input", input);
  let { email: email, password: password } = input;

  try {
    const authResult = await auth().signInWithEmailAndPassword(
      email.trim(),
      password
    );
    console.log(authResult, authResult.user.uid);
    AsyncStorage.setItem("userid", authResult.user.uid);
    console.log("DAta Stored");
    ToastAndroid.show("Login successfully!", ToastAndroid.SHORT);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }, 2000);
  } catch (error) {
    if (error.code === "auth/invalid-email")
      ToastAndroid.show("That email address is invalid!", ToastAndroid.SHORT);
    else if (error.code === "auth/user-not-found")
      ToastAndroid.show("No User Found", ToastAndroid.SHORT);
    else {
      ToastAndroid.show(
        "Please check your email id or password",
        ToastAndroid.SHORT
      );
    }
  }
};

export const signUp = async (input, loginType) => {
  let {
    fullname: fullname,
    email: email,
    phone: phone,
    password: password,
  } = input;

  try {
    // Create a new user in Firebase Authentication
    const authResult = await auth().createUserWithEmailAndPassword(
      email.trim(),
      password
    );
    // Get the UID of the newly created user
    const uid = authResult.user.uid;
    // Create a new document in Firestore for the user
    await firestore().collection("users").doc(uid).set({
      Name: fullname,
      MobileNumber: phone,
      emailAddress: email,
      Password: password,
      type: loginType,
      profileImg: "",
      userId:uid,
      Address:'',
    });
    ToastAndroid.show("Signed up successfully!", ToastAndroid.SHORT);
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      ToastAndroid.show(
        "That email address is already in use!",
        ToastAndroid.SHORT
      );
    }
    if (err.code === "auth/invalid-email") {
      ToastAndroid.show("That email address is invalid!", ToastAndroid.SHORT);
    }
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

const appointmentCollection = firestore().collection("appointments");
export const bookAppointment = async (userId, providerId, date) => {
  try {
    await appointmentCollection.add({
      userId,
      providerId,
      date,
      status: "pending",
    });
    console.log("Appointment booked successfully");
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    await appointmentCollection.doc(appointmentId).delete();
    console.log("Appointment canceled successfully");
  } catch (error) {
    console.error("Error canceling appointment:", error);
    throw error;
  }
};

export const getAppointmentsByUser = async (userId) => {
  try {
    const snapshot = await appointmentCollection
      .where("userId", "==", userId)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

const categoryCollection = firestore().collection("categories");
export const getCategories = async () => {
  try {
    const snapshot = await categoryCollection
      // .where("userId", "==", userId)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
