import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { registerUser } from '../api/authApi';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    const res = await registerUser({ name, email, password });
    if (res.token) {
      setMsg('Registration successful! You can log in.');
      setTimeout(() => navigation.navigate('Login'), 1000);
    } else {
      console.log(res)
      setMsg(res.message.email || res.message.password||'Registration failed');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
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
      {msg ? <Text style={{ color: 'blue' }}>{msg}</Text> : null}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
