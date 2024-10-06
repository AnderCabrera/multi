## Prerequisitos

- Node.js
- Prisma
- PostgreSQL

## Rutas (Backend)

La aplicación cuenta con las siguientes rutas:

- `POST /auth/register`: Registra un nuevo usuario.
- `POST /auth/login`: Envía credenciales para iniciar sesión.
- `GET /user`: Devuelve una lista de todos los usuarios.
- `GET /user/:id`: Devuelve un usuario específico por su ID.
- `POST /user`: Crea un nuevo usuario.
- `PUT /user/:id`: Actualiza un usuario existente.
- `DELETE /user/:id`: Elimina un usuario.

## Roles
| Role | Can Read | Can Create | Can Update | Can Delete |
| --- | --- | --- | --- | --- |
| ADMIN | ✅ | ✅ | ✅ | ✅ |
| MINI_ADMIN | ✅ | ❌ | ❌ | ✅ |
| USER | ✅ | ❌ | ❌ | ❌ |

## Installation (Backend)

### Requisitos

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

1. Clonar el repositorio:

```bash
git clone https://github.com/AnderCabrera/multi
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear la base de datos y migraciones:

```bash
npx prisma migrate dev --name init
```

4.