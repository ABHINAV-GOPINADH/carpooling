// screens/ProfileSettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Placeholder image (same as above)
const profileImage = 'https://via.placeholder.com/100';

type ProfileSettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileSettings'
>;

const ProfileSettingsScreen = () => {
  const navigation = useNavigation<ProfileSettingsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </View>
      <Text style={styles.name}>Siffat</Text>
      <Text style={styles.phone}>+92 3470967396</Text>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Edit personal details</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('ChangeNumber')}
      >
        <Text style={styles.optionText}>Change Number</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>VERIFICATION</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Verify ID</Text>
        <Text style={[styles.arrow, styles.notVerified]}>✗</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>License Confirmation</Text>
        <Text style={[styles.arrow, styles.notVerified]}>✗</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Payments</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Vehicle Information</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Help</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Terms and condition</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Logout</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phone: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginVertical: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    color: '#666',
  },
  notVerified: {
    color: 'red',
  },
});

export default ProfileSettingsScreen;