// app/screens/EventDetailScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Event, useEvents } from '../hooks/useEvents';

type RootStackParamList = {
  EventsList: undefined;
  EventDetail: { eventId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetail'>;

export default function EventDetailScreen({ route }: Props) {
  const { eventId } = route.params;
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando detalles del evento...</Text>
      </View>
    );
  }

  const event = events.find((e: Event) => e.id === eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Evento no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.nombre}</Text>
      <Text style={styles.description}>{event.descripcion}</Text>
      <Text style={styles.date}>Fecha: {event.fecha}</Text>
      {event.hora && <Text style={styles.info}>Hora: {event.hora}</Text>}
      {event.ubicacion && <Text style={styles.info}>Ubicación: {event.ubicacion}</Text>}
      {event.asistentes !== undefined && (
        <Text style={styles.info}>Asistentes: {event.asistentes}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  description: { fontSize: 16, marginBottom: 10 },
  date: { fontSize: 14, fontStyle: 'italic', marginBottom: 10 },
  info: { fontSize: 14, marginBottom: 6, color: '#333' },
  errorText: { fontSize: 18, color: 'red' },
});
