import React from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { useEvents } from '../hooks/useEvents';

export default function EventsScreen() {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Cargando eventos...</Text>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noEventsText}>No hay eventos disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Comunitarios</Text>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item, index }) => <EventCard event={item} index={index} />}
      />
    </View>
  );
}

const EventCard = ({ event, index }: { event: any; index: number }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    }) }] }]}>
      <View style={styles.colorStrip} />
      <View style={styles.cardContent}>
        <Text style={styles.eventName}>{event.nombre}</Text>
        <Text style={styles.eventDescription}>{event.descripcion}</Text>
        <Text style={styles.eventDate}>{event.fecha}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  center: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00E676',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  loadingText: {
    color: '#BBDEFB',
    fontSize: 18,
  },
  noEventsText: {
    color: '#616161',
    fontSize: 18,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  colorStrip: {
    width: 6,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: '#00E676',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  eventName: {
    color: '#E0F2F1',
    fontSize: 22,
    fontWeight: '700',
  },
  eventDescription: {
    color: '#B2DFDB',
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
  },
  eventDate: {
    color: '#80CBC4',
    fontSize: 14,
    marginTop: 12,
    fontStyle: 'italic',
  },
});    