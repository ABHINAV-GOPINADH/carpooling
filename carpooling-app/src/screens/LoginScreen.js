import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://your-server-ip:5000/login', { email, password });
            alert("Login Successful");
            navigation.navigate('Home');
        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({ /* Add your styles here */ });

export default LoginScreen;
