import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('http://your-server-ip:5000/register', { name, email, password });
            alert("Registration Successful");
            navigation.navigate('Login');
        } catch (error) {
            alert("User already exists");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput style={styles.input} placeholder="Name" onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({ /* Add your styles here */ });

export default RegisterScreen;

