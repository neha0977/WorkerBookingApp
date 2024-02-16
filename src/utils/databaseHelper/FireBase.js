// auth.js
import { Alert, ToastAndroid } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (input, navigation, type) => {
  console.log("input", input);
  let { email, password } = input;
  console.log(email, password);
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    try {
      const doc = await firestore().collection("users").doc(user.uid).get();

      if (doc.exists) {
        const userData = doc.data();
        const userType = userData.type;
        console.log(userType, "///");
        if (userType === "Provider") {
          navigation.navigate("HomeProvider");
        } else {
          navigation.navigate("HomeScreen");
        }
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error getting user profile:", error);
    }
  } catch (error) {
    // try {
    //   const userCredential = await auth().signInWithEmailAndPassword(
    //     email.trim(),
    //     password
    //   );

    //   const user = userCredential.user;
    //   console.log(user, "user");
    //   const userDataSnapshot = await firestore()
    //     .collection("users")
    //     .doc(user.uid)
    //     .get();

    //   console.log(userDataSnapshot, "userData");
    //   if (userDataSnapshot.exists) {
    //     // User data exists
    //     const userData = userDataSnapshot.data(); // prRename userDataSnapshot to avoid redeclaration
    //     const userType = userData.type;
    //     console.log("Data Stored", userData, "neh", userType);
    //     AsyncStorage.setItem("userid", user.uid);
    //     ToastAndroid.show("Login successfully!", ToastAndroid.SHORT);
    //     getUserData(user.uid, navigation); // Assuming this function is defined elsewhere
    //   } else {
    //     // No user data found
    //     ToastAndroid.show("No user data found", ToastAndroid.SHORT);
    //   }
    // }
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

export const signUp = async (input, loginType, navigation) => {
  console.log("input, loginType, navigation", input, loginType);

  let { fullname, email, phone, password } = input;

  try {
    const authResult = await auth().createUserWithEmailAndPassword(
      email.trim(),
      password
    );
    const user = authResult.user; // Fixed typo: userCredential.user should be authResult.user
    console.log("user", user);

    await user.updateProfile({
      displayName: fullname,
      userType: (loginType = "Provider" ? "Provider" : "User"),
    });

    const uid = authResult.user.uid;

    await firestore().collection("users").doc(uid).set({
      Name: fullname,
      MobileNumber: phone,
      emailAddress: email,
      Password: password,
      type: loginType,
      profileImg: "",
      userId: uid,
      Address: "",
    });

    ToastAndroid.show("Signed up successfully!", ToastAndroid.SHORT);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "SignInScreen" }],
      });
    }, 1000);
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      ToastAndroid.show(
        "That email address is already in use!",
        ToastAndroid.SHORT
      );
    } else if (err.code === "auth/invalid-email") {
      // Changed to else if
      ToastAndroid.show("That email address is invalid!", ToastAndroid.SHORT);
    } else {
      // Handle other errors
      console.error("Error signing up: ", err.message);
    }
  }
};

export const signOut = async (navigation) => {
  AsyncStorage.clear()
    .then(() => {
      auth()
        .signOut()
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "UserTypeScreen" }],
          });
        });
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

const userCollection = firestore().collection("users");
export const getUserData = async (userId, navigation) => {
  try {
    const snapshot = await userCollection.where("userId", "==", userId).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    data.filter((item) => {
      console.log("item,", item);
      if (item.type == "Provider") {
        AsyncStorage.setItem("providerid", userId);
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeProvider" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      }
    });
    //  console.log("snapshot", snapshot);
    //return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
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

export const getCategories = async () => {
  try {
    const snapshot = await firestore().collection("categories")
      .get();
      snapshot.forEach((doc) => {
        const data = doc._data;
        
        // if (data && Array.isArray(data)) {
// console.log(...data,"DDD")
          // dataListArray.push(...data);
        //   arrUserFilter = dataListArray.filter((x) => {
        //     return x.userId == Userid;
        //   });
        // }
        return data;
      });
      // console.log(snapshot)
    // return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Function to add an item to the cart
export const addItemToCart = async (userId, newItem) => {
  const userCartRef = firestore().collection('Carts').doc(userId);

  await firestore().runTransaction(async (transaction) => {
    const userCartDoc = await transaction.get(userCartRef);

    if (!userCartDoc.exists) {
      throw "Document does not exist!";
    }

    const cartData = userCartDoc.data();
    const updatedItems = [...cartData.items, newItem]; // Add new item to items array
    const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.price, 0); // Calculate new total price

    // Update cart document with new items array and total price
    transaction.update(userCartRef, { items: updatedItems, totalPrice: updatedTotalPrice });
  });
};

