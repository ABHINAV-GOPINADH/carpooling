// RatingScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator'; // adjust the path as needed

// Define the navigation type for this screen
type RatingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Rating'>;

const RatingScreen: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const navigation = useNavigation<RatingScreenNavigationProp>();

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Handle rating submission (e.g., send to backend)
    console.log('Rating submitted:', rating);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOW WAS YOUR TRIP?</Text>
      <Text style={styles.subtitle}>
        Your feedback will help us improve driving experience better.
      </Text>

      {/* Star Rating */}
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Not Now Link */}
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
    color: '#FFD700', // Gold for filled stars
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
