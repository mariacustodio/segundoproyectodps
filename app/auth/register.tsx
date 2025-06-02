// app/auth/register.tsx
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function RegisterScreen() {
  const { register, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Crear Cuenta</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title={loading ? 'Cargando...' : 'Registrar'} onPress={handleRegister} />
    </View>
  );
}
