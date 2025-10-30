import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text,StyleSheet } from 'react-native';
import { loginUser } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
   
    const res = await loginUser({ email, password });
   
    if (res.token) {
      
      login(res.token);
    } else {
      
      setError(res.message.email || res.message.password||'Login failed');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
       <View style={{ marginTop: 10 }} />
      <Button
        title="No account? Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

