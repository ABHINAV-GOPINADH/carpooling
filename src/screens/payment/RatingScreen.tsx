// RatingScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Rating'>;

type RouteParams = {
  driverId: string;
};

const RatingScreen: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  // Use optional chaining to safely extract driverId from route.params.
  const driverId = (route.params as RouteParams | undefined)?.driverId;

  // Check on mount if driverId is available; if not, alert and navigate away.
  useEffect(() => {
    if (!driverId) {
      Alert.alert("Driver Not Found", "Driver information is missing. Returning to Home.");
      navigation.navigate("Home");
    }
  }, [driverId, navigation]);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Please select a rating before submitting.");
      return;
    }

    // Guard against missing driverId (extra safety check).
    if (!driverId) {
      Alert.alert("Driver Not Specified", "Cannot submit rating because driver information is missing.");
      return;
    }

    try {
      const driverRef = doc(db, "users", driverId);

      await runTransaction(db, async (tx) => {
        const driverSnap = await tx.get(driverRef);
        if (!driverSnap.exists()) throw new Error("Driver not found");

        const driverData = driverSnap.data();
        const currentRating = driverData.rating || 0;
        const currentCount = driverData.ratingCount || 0;

        const newCount = currentCount + 1;
        const newAverage = ((currentRating * currentCount) + rating) / newCount;

        tx.update(driverRef, {
          rating: parseFloat(newAverage.toFixed(2)),
          ratingCount: newCount,
        });
      });

      Alert.alert("Thank you for your feedback!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Failed to submit rating:", error);
      Alert.alert("Something went wrong while submitting your rating.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOW WAS YOUR TRIP?</Text>
      <Text style={styles.subtitle}>Your feedback helps improve our service.</Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.notNow}>Not now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  star: {
    fontSize: 30,
    color: '#FFD700',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notNow: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'underline',
  },
});

export default RatingScreen;
