import { Slot } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../app/hooks/useAuth';

export default function App() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
