import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const profileImage = 'https://via.placeholder.com/100';

type ProfileSettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileSettings'
>;

const ProfileSettingsScreen = () => {
  const navigation = useNavigation<ProfileSettingsScreenNavigationProp>();

  const [profile, setProfile] = useState({
    name: 'Siffat',
    phone: '+92 3470967396',
    idVerified: false,
    licenseVerified: false,
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editPhone, setEditPhone] = useState(profile.phone);

  const handleSave = () => {
    setProfile({ ...profile, name: editName, phone: editPhone });
    setEditModalVisible(false);
    Alert.alert('Success', 'Profile updated!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </View>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.phone}>{profile.phone}</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setEditModalVisible(true)}
      >
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
        <Text style={[styles.arrow, !profile.idVerified ? styles.notVerified : styles.verified]}>
          {profile.idVerified ? '✓' : '✗'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>License Confirmation</Text>
        <Text style={[styles.arrow, !profile.licenseVerified ? styles.notVerified : styles.verified]}>
          {profile.licenseVerified ? '✓' : '✗'}
        </Text>
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

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('SignInSignUp')}
      >
        <Text style={styles.optionText}>Logout</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Details</Text>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter name"
            />
            <TextInput
              style={styles.input}
              value={editPhone}
              onChangeText={setEditPhone}
              placeholder="Enter phone"
              keyboardType="phone-pad"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  profileContainer: { alignItems: 'center', marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  phone: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#666', marginVertical: 10 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: { fontSize: 16 },
  arrow: { fontSize: 20, color: '#666' },
  notVerified: { color: 'red' },
  verified: { color: 'green' },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { margin: 20, padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 15, paddingVertical: 5 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  saveButtonText: { color: '#fff' },
  cancelButton: { backgroundColor: '#f44336', padding: 10, borderRadius: 5 },
  cancelButtonText: { color: '#fff' },
});

export default ProfileSettingsScreen;
