import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Ensure correct path
import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Type for user data
export type UserData = {
  uid: string;
  name: string;
  email: string;
  gender: string;
};

// Type for responses
type SuccessSignUp = { success: true; uid: string };
type Failure = { success: false; error: string };
type SuccessSignIn = { success: true; user: UserData };
export type SignUpResponse = SuccessSignUp | Failure;
export type SignInResponse = SuccessSignIn | Failure;

export const signUpUser = async (email: string, password: string, name: string, gender: string): Promise<SignUpResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData: UserData = {
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
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
};

export const signInUser = async (email: string, password: string): Promise<SignInResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user details from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;

      await AsyncStorage.setItem("user", JSON.stringify(userData));

      return { success: true, user: userData };
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unexpected error during sign-in." };
  }
};

export const signOutUser = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await auth.signOut(); // Firebase Logout
    await AsyncStorage.removeItem("user"); // Remove user data from storage
    return { success: true };
  } catch (error) {
    return { success: false, error: "Logout failed." };
  }
};
