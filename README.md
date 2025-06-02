# Segundo Proyecto - Desarrollo de Proyectos de Software

Este proyecto consiste en una aplicación web desarrollada con Next.js y Firebase. El sistema permite gestionar eventos, con funcionalidades como registro de usuarios, inicio de sesión y operaciones CRUD sobre eventos.

## Integrantes del Grupo

- María Custodio - Grupo Teórico 02  

## Enlaces Relevantes

- Notion (organización del proyecto):  
  https://www.notion.so/2060ba2429078057ab17d0a9e7906b8d

- Repositorio en GitHub (enlace público):  
  https://github.com/mariacustodio/segundoproyectodps

## Tipo de Licencia

Este proyecto se encuentra licenciado bajo una Licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0).  
Más información en: https://creativecommons.org/licenses/by-nc-sa/4.0/

## Documentación del Proyecto

### Descripción General

Este sistema fue desarrollado como parte del segundo proyecto de la materia de Desarrollo de Proyectos de Software. El objetivo es aplicar conocimientos de desarrollo web utilizando herramientas modernas como Next.js y Firebase, con el propósito de crear un sistema funcional y organizado.

### Funcionalidades

- Registro e inicio de sesión utilizando Firebase Authentication.
- Creación de eventos.
- Visualización de eventos disponibles.
- Edición y eliminación de eventos.
- Protección de rutas para usuarios autenticados.

### Tecnologías Utilizadas

- Next.js 14 (con App Router)
- Firebase (Authentication y Firestore)
- CSS Modules o Tailwind CSS (según configuración del equipo)
- Git y GitHub

## Guía de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/mariacustodio/segundoproyectodps.git
Instalar las dependencias:

npm install
Configurar el archivo .env.local con los siguientes valores proporcionados por Firebase:

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
Ejecutar el entorno de desarrollo:

npm run dev

## Guía de Usuario

Al ingresar a la aplicación, el usuario puede registrarse con su correo electrónico y contraseña.

Luego de iniciar sesión, podrá acceder a la pantalla principal donde se listan los eventos.

El usuario puede crear nuevos eventos desde el formulario correspondiente.

También podrá editar o eliminar eventos existentes si tiene los permisos adecuados.

Al cerrar sesión, el acceso a las rutas protegidas será restringido.

## Observaciones finales
Este proyecto será presentado como parte del segundo proyecto del ciclo. 
La documentación técnica, guía de usuario y enlaces relevantes están disponibles en este repositorio y en la plataforma solicitada por el docente. 

