import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Ensure correct path
import { doc, setDoc } from "firebase/firestore";

export const signUpUser = async (email: string, password: string, name: string, gender: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User Registered:", user.uid);

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      gender,
      email,
      uid: user.uid,
    });

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
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unexpected error during sign-in.");
  }
};