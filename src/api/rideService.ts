// src/api/rideService.ts

import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  doc,
  runTransaction,
  DocumentData,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Ride = {
  id: string;
  vehicle: string;
  plateNumber: string;
  pickup: string;
  destination: string;
  stops: string[];
  pricePerSeat: number;
  date: string;
  time: string;
  seatsAvailable: number;
  driverId: string;
  driverName: string;
  createdAt: any; // Firebase Timestamp
  name: string;
  rating: string;
  location: string;
  price: string;
};

export type RideData = {
  vehicle: string;
  plateNumber: string;
  pickup: string;
  destination: string;
  stops: string[];
  pricePerSeat: number;
  date: string;
  time: string;
  seatsAvailable: number;
};

export const publishRide = async (
  ride: RideData
): Promise<{ success: boolean; error?: string }> => {
  try {
    const userJson = await AsyncStorage.getItem("user");
    if (!userJson) throw new Error("User not found in storage");
    const user = JSON.parse(userJson);

    const fullRide = {
      ...ride,
      driverId: user.uid,
      driverName: user.name,
      createdAt: serverTimestamp(),
      totalSeats: ride.seatsAvailable,
      seatsAvailable: ride.seatsAvailable,
    };

    await addDoc(collection(db, "rides"), fullRide);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const fetchAvailableRides = async ():
  Promise<{ success: boolean; data?: Ride[]; error?: string }> => {
  try {
    const ridesCollection = collection(db, "rides");
    const snapshot = await getDocs(ridesCollection);
    const allRides: Ride[] = [];

    snapshot.forEach((docSnap: DocumentData) => {
      const data = docSnap.data();
      allRides.push({
        id: docSnap.id,
        vehicle: data.vehicle || "",
        plateNumber: data.plateNumber || "",
        pickup: data.pickup || "",
        destination: data.destination || "",
        stops: data.stops || [],
        pricePerSeat: data.pricePerSeat || 0,
        date: data.date || "",
        time: data.time || "",
        seatsAvailable: data.seatsAvailable || 0,
        driverId: data.driverId || "",
        driverName: data.driverName || "",
        createdAt: data.createdAt || null,
        name: data.driverName || "",
        rating: "4.5",
        location: data.pickup || "",
        price: `€${data.pricePerSeat || 0}`,
      });
    });

    return { success: true, data: allRides };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export type RideRequest = {
  id: string;
  customerName: string;
  status: string;
  rideId: string;
  driverId: string;
};

export const fetchRideRequestsForDriver = async (
  driverId: string
): Promise<RideRequest[]> => {
  const q = query(
    collection(db, "rideRequests"),
    where("driverId", "==", driverId)
  );
  const snapshot = await getDocs(q);
  const requests: RideRequest[] = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    requests.push({
      id: docSnap.id,
      customerName: data.customerName,
      status: data.status,
      rideId: data.rideId,
      driverId: data.driverId,
    });
  });

  return requests;
};

export const acceptRideRequest = async (
  requestId: string
): Promise<void> => {
  const requestRef = doc(db, "rideRequests", requestId);

  await runTransaction(db, async (tx) => {
    const reqSnap = await tx.get(requestRef);
    if (!reqSnap.exists()) throw new Error("Request not found");
    const { rideId } = reqSnap.data() as { rideId: string };

    const rideRef = doc(db, "rides", rideId);
    const rideSnap = await tx.get(rideRef);
    if (!rideSnap.exists()) throw new Error("Ride not found");

    const rideData = rideSnap.data() as { seatsAvailable: number };
    if (rideData.seatsAvailable <= 0) {
      throw new Error("No seats left to accept");
    }

    tx.update(rideRef, { seatsAvailable: rideData.seatsAvailable - 1 });
    tx.update(requestRef, { status: "Accepted" });
  });
};


export const sendRideRequest = async (
  rideId: string,
  driverId: string,
  customerName: string,
  customerId: string
): Promise<{ success: boolean; requestId: string | null; error?: string }> => {
  try {
    const newReqRef = doc(collection(db, "rideRequests"));

    await runTransaction(db, async (tx) => {
      const rideSnap = await tx.get(doc(db, "rides", rideId));
      if (!rideSnap.exists()) throw new Error("Ride not found");

      const { seatsAvailable } = rideSnap.data() as { seatsAvailable: number };
      if (seatsAvailable <= 0) throw new Error("No seats available");

      tx.set(newReqRef, {
        rideId,
        driverId,
        customerId,
        customerName,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
    });

    return { success: true, requestId: newReqRef.id };
  } catch (err: any) {
    return { success: false, requestId: null, error: err.message };
  }
};
