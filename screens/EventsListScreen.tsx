import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEvents } from '../hooks/useEvents';

type RootStackParamList = {
  EventsList: undefined;
  EventDetail: { eventId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EventsList'>;

export default function EventsListScreen({ navigation }: Props) {
  const events = useEvents();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
    >
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Comunitarios</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  eventItem: { backgroundColor: '#f1f1f1', padding: 15, borderRadius: 10, marginBottom: 12 },
  eventTitle: { fontSize: 18, fontWeight: 'bold' },
  eventDescription: { fontSize: 14, marginTop: 5 },
  eventDate: { fontSize: 12, marginTop: 5, fontStyle: 'italic' },
});
