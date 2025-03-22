import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type ProfileSummaryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileSummary'
>;

const ProfileSummaryScreen = () => {
  const navigation = useNavigation<ProfileSummaryScreenNavigationProp>();

  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('Siffat');
  const [photoURL, setPhotoURL] = useState('https://via.placeholder.com/100');

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // Mock delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={{ uri: photoURL }} style={styles.profileImage} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{displayName}</Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
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
