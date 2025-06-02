// app/screens/AddEventScreen.tsx
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../firebase/firebaseConfig';

const AddEventScreen = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  const handleAddEvent = async () => {
    if (!nombre || !descripcion || !fecha) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    try {
      await addDoc(collection(db, 'eventos'), { nombre, descripcion, fecha });
      Alert.alert('Éxito', 'Evento agregado correctamente');
      setNombre('');
      setDescripcion('');
      setFecha('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el evento');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Evento</Text>

      <TextInput
        placeholder="Nombre del evento"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
        style={styles.input}
      />

      <Button title="Agregar Evento" onPress={handleAddEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: '#2c3e50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#34495e',
    borderWidth: 1,
  },
});

export default AddEventScreen;
