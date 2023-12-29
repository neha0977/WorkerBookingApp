// auth.js
import { Alert, ToastAndroid } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const signIn = async (input) => {
  console.log("input", input);
  let { email: email, password: password } = input;
  try {
    const authResult = await auth().signInWithEmailAndPassword(
      email.trim(),
      password
    );
    ToastAndroid.show("User login successfully!", ToastAndroid.SHORT);
    AsyncStorage.setItem("userid", response.user.uid);
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

export const signUp = async (input) => {
  console.log("input", input);
  let {
    fullname: fullname,
    email: email,
    phone: phone,
    password: password,
  } = input;
  console.log("input", fullname, email, phone, password);
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
      email,
      phone, // You can customize this based on your user data model
      fullname,
      password,
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
