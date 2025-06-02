// File: app/hooks/types.ts

export interface CommunityEvent {
    id: string;
    nombre: string;
    descripcion: string;
    fecha: string;
    hora?: string;
    ubicacion?: string;
    asistentes: string[];
    comentarios: Comment[];
  }
  
  export interface Comment {
    id: string;
    userId: string;
    userName: string;
    texto: string;
    fecha: string;
  }
  
  export interface User {
    uid: string;
    email: string;
    displayName?: string;
  }
  