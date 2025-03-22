// screens/ProfileSummaryScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Assuming you moved RootStackParamList to types/navigation.ts

// Placeholder image (replace with your own image URI or local asset)
const profileImage = 'https://via.placeholder.com/100';

type ProfileSummaryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileSummary'
>;

const ProfileSummaryScreen = () => {
  const navigation = useNavigation<ProfileSummaryScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Siffat</Text>
      </View>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate('ProfileSettings')}
      >
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  inputText: {
    fontSize: 16,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileSummaryScreen;