import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Ensure correct path
import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUpUser = async (email: string, password: string, name: string, gender: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User Registered:", user.uid);

    const userData = {
      name,
      gender,
      email,
      uid: user.uid,
    };

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), userData);

    // Store user data in AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(userData));

    return { success: true, uid: user.uid };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Signup Error:", error.message);
      return { success: false, error: error.message };
    }
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user details from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Store user data in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      return { success: true, user: userData };
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Sign-in Error:", error.message);
      return { success: false, error: error.message };
    }
    console.error("Unexpected error:", error);
    return { success: false, error: "Unexpected error during sign-in." };
  }
};

// Logout function to remove user data
export const signOutUser = async () => {
  try {
    await auth.signOut(); // Firebase Logout
    await AsyncStorage.removeItem("user"); // Remove user data from storage
    return { success: true };
  } catch (error) {
    console.error("Sign-out Error:", error);
    return { success: false, error: "Logout failed." };
  }
};
