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
    const snapshot = await firestore().collection("categories").get();
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
  const userCartRef = firestore().collection("Carts").doc(userId);

  await firestore().runTransaction(async (transaction) => {
    const userCartDoc = await transaction.get(userCartRef);

    if (!userCartDoc.exists) {
      throw "Document does not exist!";
    }

    const cartData = userCartDoc.data();
    const updatedItems = [...cartData.items, newItem]; // Add new item to items array
    const updatedTotalPrice = updatedItems.reduce(
      (total, item) => total + item.price,
      0
    ); // Calculate new total price

    // Update cart document with new items array and total price
    transaction.update(userCartRef, {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    });
  });
};

// Function to add item to cart
// const addItemToCart = async (userId, item) => {
//   try {
//     await firebase.firestore().collection('carts').doc(userId).collection('items').add(item);
//     console.log('Item added to cart successfully!');
//   } catch (error) {
//     console.error('Error adding item to cart:', error);
//   }
// };

// Function to remove item from cart
const removeItemFromCart = async (userId, itemId) => {
  try {
    await firebase
      .firestore()
      .collection("carts")
      .doc(userId)
      .collection("items")
      .doc(itemId)
      .delete();
    console.log("Item removed from cart successfully!");
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

const getCartItems = async () => {
  const userId = await AsyncStorage.getItem("userid");
  try {
    const cartItemsRef = firestore()
      .collection("carts")
      .doc(userId)
      .collection("items");
    const snapshot = await cartItemsRef.get();
    const cartItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cartItems;
  } catch (error) {
    console.log("Error getting cart items:", error.message);
    return []; // Return an empty array in case of an error
  }
};

const removeFromCart = async (itemId) => {
  const userId = await AsyncStorage.getItem("userid");
  try {
    // Reference the document for the item in the user's cart
    const cartItemRef = firestore()
      .collection("carts")
      .doc(userId)
      .collection("items")
      .doc(itemId);

    // Delete the document from the Firestore database
    await cartItemRef.delete();

    console.log("Item removed from cart successfully.");
  } catch (error) {
    console.log("Error removing item from cart:", error.message);
  }
};

const addToCart = async (itemId, quantity) => {
  const userId = await AsyncStorage.getItem("userid");
  try {
    // Reference the document for the item in the user's cart
    const cartItemRef = firestore()
      .collection("carts")
      .doc(userId)
      .collection("items")
      .doc(itemId);

    // Check if the item already exists in the cart
    const cartItemSnapshot = await cartItemRef.get();
    if (cartItemSnapshot.exists) {
      // If the item exists, update its quantity
      const currentQuantity = cartItemSnapshot.data().quantity || 0;
      await cartItemRef.update({ quantity: currentQuantity + quantity });
    } else {
      // If the item does not exist, create a new document for it in the cart
      await cartItemRef.set({ quantity });
    }

    console.log("Item added to cart successfully.");
  } catch (error) {
    console.log("Error adding item to cart:", error.message);
  }
};
