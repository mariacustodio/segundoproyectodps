// File: app/screens/EventDetailScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  Share,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEvents } from '../hooks/useEvents';
import { useAuth } from '../hooks/useAuth';
import { Comment } from '../hooks/types';

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const router = useRouter();
  const {
    events,
    loading,
    confirmarAsistencia,
    cancelarAsistencia,
    agregarComentario,
  } = useEvents();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  const event = events.find((e) => e.id === eventId);
  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Evento no encontrado.</Text>
      </View>
    );
  }

  const isAttending = user ? event.asistentes.includes(user.uid) : false;

  const handleRSVP = () => {
    if (!user) return;
    if (isAttending) {
      cancelarAsistencia(event.id, user.uid);
    } else {
      confirmarAsistencia(event.id, user.uid);
    }
  };

  const handleAddComment = () => {
    if (!user || commentText.trim() === '') return;
    const newComment: Comment = {
      id: Math.random().toString(36).substring(2, 15),
      userId: user.uid,
      userName: user.email ?? 'Anónimo',
      texto: commentText,
      fecha: new Date().toISOString(),
    };
    agregarComentario(event.id, newComment);
    setCommentText('');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Únete al evento: ${event.nombre}\nDescripción: ${event.descripcion}\nFecha: ${event.fecha}`,
      });
    } catch {
      // manejar error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.nombre}</Text>
      <Text style={styles.description}>{event.descripcion}</Text>
      <Text style={styles.info}>📅 {event.fecha}</Text>
      {event.hora && <Text style={styles.info}>🕒 {event.hora}</Text>}
      {event.ubicacion && <Text style={styles.info}>📍 {event.ubicacion}</Text>}
      <Text style={styles.info}>👥 Asistentes: {event.asistentes.length}</Text>

      <Button
        title={isAttending ? 'Cancelar asistencia' : 'Confirmar asistencia'}
        onPress={handleRSVP}
        color={isAttending ? 'red' : 'green'}
      />

      <Button title="Compartir evento" onPress={handleShare} />

      <Text style={styles.subtitle}>Comentarios</Text>
      <FlatList
        data={event.comentarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text style={{ fontWeight: 'bold' }}>{item.userName}</Text>
            <Text>{item.texto}</Text>
            <Text style={styles.commentDate}>
              {new Date(item.fecha).toLocaleString()}
            </Text>
          </View>
        )}
      />

      {user && (
        <View style={styles.commentInputContainer}>
          <TextInput
            placeholder="Agrega un comentario..."
            value={commentText}
            onChangeText={setCommentText}
            style={styles.commentInput}
          />
          <Button title="Enviar" onPress={handleAddComment} />
        </View>
      )}

      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10 },
  info: { fontSize: 14, marginBottom: 5 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  commentCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  commentDate: { fontSize: 10, color: 'gray', marginTop: 4 },
  commentInputContainer: { marginTop: 20 },
  commentInput: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
});
