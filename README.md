# Overview
Esta aplicación permite gestionar usuarios y sus permisos. Cada usuario puede tener diferentes roles, que determinan sus permisos para acceder a diferentes acciones.

## Índice
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Roles](#roles)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Rutas](#rutas)

## Tecnologías utilizadas
- NestJS
- TypeScript
- Prisma
- PostgreSQL

## Roles
| Role | Can Read | Can Create | Can Update | Can Delete |
| --- | --- | --- | --- | --- |
| ADMIN | ✅ | ✅ | ✅ | ✅ |
| MINI_ADMIN | ✅ | ❌ | ❌ | ✅ |
| USER | ✅ | ❌ | ❌ | ❌ |

## Installation

```bash
git clone https://github.com/AnderCabrera/multi
```

### Backend
1. Puedes ejecutar el comando `make up` para arrancar el backend.

```bash
sudo make up
```

Si por alguna razón no funciona, puedes ejecutar los siguientes comandos:

```bash
cd server
npm install
npm run start:dev
```

### Frontend
1. Puedes ejecutar el comando `make dev` para arrancar el frontend.

```bash
sudo make dev
```

Si por alguna razón no funciona, puedes ejecutar los siguientes comandos:

```bash
cd client
npm install
npm run dev
```

## Rutas

### Backend
La aplicación cuenta con las siguientes rutas que tambien puedes consultar en el archivo [server/src/Multi.postman_collection.json](server/Multi.postman_collection.json):

- `POST /auth/register`: Registra un nuevo usuario.
- `POST /auth/login`: Envía credenciales para iniciar sesión.
- `GET /user`: Devuelve una lista de todos los usuarios.
- `GET /user/:id`: Devuelve un usuario específico por su ID.
- `POST /user`: Crea un nuevo usuario.
- `PUT /user/:id`: Actualiza un usuario existente.
- `DELETE /user/:id`: Elimina un usuario.
