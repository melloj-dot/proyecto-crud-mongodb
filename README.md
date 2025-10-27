# API RESTful con Node.js, Express y MongoDB

API RESTful robusta y modular que implementa operaciones CRUD para gestion de Productos, Categorias y Usuarios. Utiliza autenticacion JWT y sigue el patron de separacion de responsabilidades con una arquitectura en capas.

## Tecnologias Utilizadas

- **Node.js**: Entorno de ejecucion de JavaScript
- **Express.js**: Framework web minimalista para Node.js
- **MongoDB**: Base de datos NoSQL orientada a documentos
- **Mongoose**: ODM (Object Data Modeling) para MongoDB
- **JWT (jsonwebtoken)**: Autenticacion basada en tokens
- **bcrypt**: Encriptacion de contraseñas
- **dotenv**: Gestion de variables de entorno
- **CORS**: Middleware para habilitar CORS

## Estructura del Proyecto

```
proyecto-crud-mongodb/
├── app.js
├── .env
├── .env.example
├── package.json
└── src/
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── productModel.js
    │   ├── categoryModel.js
    │   └── userModel.js
    ├── services/
    │   ├── productService.js
    │   ├── categoryService.js
    │   └── userService.js
    ├── controllers/
    │   ├── productController.js
    │   ├── categoryController.js
    │   └── userController.js
    ├── routes/
    │   ├── productRoute.js
    │   ├── categoryRoute.js
    │   └── userRoute.js
    └── middleware/
        └── verifyToken.js
```

## Esquema de Base de Datos

### Coleccion: Categories

```javascript
{
  "_id": ObjectId,
  "nombre": String (requerido),
  "descripcion": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Coleccion: Products

```javascript
{
  "_id": ObjectId,
  "nombre": String (requerido),
  "descripcion": String,
  "precio": Number (requerido, min: 0),
  "stock": Number (requerido, min: 0, default: 0),
  "categoria": ObjectId (referencia a Categories, requerido),
  "createdAt": Date,
  "updatedAt": Date
}
```

### Coleccion: Users

```javascript
{
  "_id": ObjectId,
  "nombre": String (requerido),
  "email": String (requerido, unico, validacion de formato),
  "password": String (requerido, hasheado con bcrypt, min: 6 caracteres),
  "createdAt": Date,
  "updatedAt": Date
}
```

## Instalacion y Configuracion

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd proyecto-crud-mongodb
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raiz del proyecto basado en `.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/productos_db
PORT=3000
JWT_SECRET=tu_clave_secreta_segura_aqui
```

### 4. Iniciar MongoDB

Asegurate de tener MongoDB instalado y corriendo en tu sistema local, o utiliza un servicio cloud como MongoDB Atlas.

### 5. Ejecutar el proyecto

**Modo desarrollo (con nodemon):**
```bash
npm run dev
```

**Modo produccion:**
```bash
npm start
```

El servidor estara corriendo en `http://localhost:3000`

## Endpoints de la API

### Categorias

| Metodo | Endpoint | Descripcion | Autenticacion |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Obtener todas las categorias | No |
| GET | `/api/categories/:id` | Obtener categoria por ID | No |
| POST | `/api/categories` | Crear nueva categoria | Si (JWT) |
| PUT | `/api/categories/:id` | Actualizar categoria | Si (JWT) |
| DELETE | `/api/categories/:id` | Eliminar categoria | Si (JWT) |

### Productos

| Metodo | Endpoint | Descripcion | Autenticacion |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Obtener todos los productos | No |
| GET | `/api/products/:id` | Obtener producto por ID | No |
| POST | `/api/products` | Crear nuevo producto | Si (JWT) |
| PUT | `/api/products/:id` | Actualizar producto | Si (JWT) |
| DELETE | `/api/products/:id` | Eliminar producto | Si (JWT) |

### Usuarios

| Metodo | Endpoint | Descripcion | Autenticacion |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Registrar nuevo usuario | No |
| POST | `/api/users/login` | Iniciar sesion | No |
| GET | `/api/users` | Obtener todos los usuarios | Si (JWT) |
| GET | `/api/users/:id` | Obtener usuario por ID | Si (JWT) |
| PUT | `/api/users/:id` | Actualizar usuario | Si (JWT) |
| DELETE | `/api/users/:id` | Eliminar usuario | Si (JWT) |

## Ejemplos de Datos Mock (JSON)

### Crear Categoria

**POST** `/api/categories`

```json
{
  "nombre": "Electronica",
  "descripcion": "Dispositivos y accesorios electronicos"
}
```

### Crear Producto

**POST** `/api/products`

```json
{
  "nombre": "Laptop HP Pavilion",
  "descripcion": "Laptop con procesador Intel Core i5, 8GB RAM, 256GB SSD",
  "precio": 899.99,
  "stock": 15,
  "categoria": "6502f8c9a1b2c3d4e5f6g7h8"
}
```

### Registrar Usuario

**POST** `/api/users/register`

```json
{
  "nombre": "Jose Caramello",
  "email": "jose.caramello@example.com",
  "password": "password123"
}
```

### Iniciar Sesion

**POST** `/api/users/login`

```json
{
  "email": "jose.caramello@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6502f8c9a1b2c3d4e5f6g7h8",
      "nombre": "Jose Caramello",
      "email": "jose.caramello@example.com"
    }
  }
}
```

### Actualizar Producto

**PUT** `/api/products/:id`

```json
{
  "nombre": "Laptop HP Pavilion 15",
  "precio": 849.99,
  "stock": 20
}
```

## Autenticacion

Las rutas protegidas requieren un token JWT en el header de la solicitud:

```
Authorization: Bearer <token>
```

Para obtener un token:
1. Registrar un usuario usando `/api/users/register`
2. Iniciar sesion usando `/api/users/login`
3. Usar el token devuelto en las solicitudes protegidas

## Respuestas de la API

### Respuesta Exitosa

```json
{
  "success": true,
  "data": { ... },
  "count": 10
}
```

### Respuesta de Error

```json
{
  "success": false,
  "message": "Mensaje de error descriptivo"
}
```

## Codigos de Estado HTTP

- `200 OK`: Solicitud exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error en la solicitud
- `401 Unauthorized`: No autorizado (token invalido o no proporcionado)
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

## Caracteristicas de Seguridad

- Contraseñas hasheadas con bcrypt antes de almacenar en la base de datos
- Autenticacion basada en JWT con expiracion de 24 horas
- Validacion de datos en los modelos de Mongoose
- Proteccion de rutas sensibles con middleware de verificacion de token
- Variables sensibles gestionadas con dotenv

## Licencia

ISC

