// app/hooks/useEvents.ts

import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { CommunityEvent, Comment } from './types';

export const useEvents = () => {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar eventos ordenados por fecha ascendente
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'eventos'), orderBy('fecha', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as CommunityEvent[];
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Confirmar asistencia (añadir UID al arreglo asistentes)
  const confirmarAsistencia = async (eventId: string, userId: string) => {
    const eventRef = doc(db, 'eventos', eventId);
    await updateDoc(eventRef, {
      asistentes: arrayUnion(userId)
    });
    setEvents(prev =>
      prev.map(e =>
        e.id === eventId
          ? { ...e, asistentes: [...(e.asistentes ?? []), userId] }
          : e
      )
    );
  };

  // Cancelar asistencia (quitar UID del arreglo asistentes)
  const cancelarAsistencia = async (eventId: string, userId: string) => {
    const eventRef = doc(db, 'eventos', eventId);
    await updateDoc(eventRef, {
      asistentes: arrayRemove(userId)
    });
    setEvents(prev =>
      prev.map(e =>
        e.id === eventId
          ? { ...e, asistentes: e.asistentes?.filter(uid => uid !== userId) ?? [] }
          : e
      )
    );
  };

  // Agregar comentario
  const agregarComentario = async (
    eventId: string,
    comment: Comment
  ) => {
    const eventRef = doc(db, 'eventos', eventId);
    await updateDoc(eventRef, {
      comentarios: arrayUnion(comment)
    });
    setEvents(prev =>
      prev.map(e =>
        e.id === eventId
          ? { ...e, comentarios: [...(e.comentarios ?? []), comment] }
          : e
      )
    );
  };

  // Crear nuevo evento
  const crearEvento = async (evento: Omit<CommunityEvent, 'id' | 'asistentes' | 'comentarios'>) => {
    const newEvent = {
      ...evento,
      asistentes: [],
      comentarios: []
    };
    await addDoc(collection(db, 'eventos'), newEvent);
    // Recargar lista
    const q = query(collection(db, 'eventos'), orderBy('fecha', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as CommunityEvent[];
    setEvents(data);
  };

  return {
    events,
    loading,
    confirmarAsistencia,
    cancelarAsistencia,
    agregarComentario,
    crearEvento
  };
};
