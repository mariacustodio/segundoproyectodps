import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../firebase/firebaseConfig";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = () => {
    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          Alert.alert("Usuario registrado");
        })
        .catch(error => {
          Alert.alert("Error", error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          Alert.alert("Inicio de sesión exitoso");
        })
        .catch(error => {
          Alert.alert("Error", error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? "Registrar" : "Iniciar Sesión"}</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title={isRegistering ? "Registrar" : "Iniciar Sesión"} onPress={handleAuth} />
      <Text
        style={styles.toggleText}
        onPress={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  toggleText: { marginTop: 15, textAlign: "center", color: "blue" }
});
