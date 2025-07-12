
# 🚀 Challenge_Start
## 🔧 API para Mocks de Servicios REST

### 📘 Descripción
Esta API permite **crear, gestionar y ejecutar mocks de servicios REST** de manera dinámica. Es ideal para desarrollo, testing y simulación de servicios externos.

### ✨ Características
- ✅ Configuración dinámica de mocks
- 🌐 Soporte para múltiples métodos HTTP
- 🎯 Respuestas condicionales basadas en parámetros
- 🧩 Templates dinámicos con variables
- 🧾 Múltiples tipos de contenido (JSON, XML, texto plano)
- 🔐 Autenticación y autorización
- ⏱️ Rate limiting
- 📊 Estadísticas y búsqueda
- ❗ Manejo de errores
- 📋 Logging detallado

---

## ⚙️ Instalación

### 📋 Requisitos previos
- Node.js 20.14 o superior

### 📦 Pasos
```bash
git clone 
cd challenge_start
npm install
cp .envTemplate .env
# Configurar variables en .env
npm run dev
```

### 🌐 Variables de Entorno
| Variable          | Descripción                          |
|-------------------|--------------------------------------|
| `API_PORT`            | Puerto del servidor (default: 4000)  |
| `ALLOWED_ORIGINS` | Orígenes permitidos para CORS (default: `*`) |

### 🧪 Modos de ejecución
- 🛠️ Desarrollo: `npm run dev`
- 🚀 Producción: `npm start`
- 🧪 Pruebas: `npm test`

---

## 📡 Endpoints

### 🔧 Configuración de Mocks
| Método | Endpoint | Descripción | Necesita Autenticación |
|--------|----------|-------------|---------------|
| POST   | `/configure-mock`        | Crear nuevo mock          | ✅ |
| GET    | `/configure-mock`        | Listar todos los mocks    | ✅ |
| GET    | `/configure-mock/:id`    | Obtener mock específico   | ✅ |
| PUT    | `/configure-mock/:id`    | Actualizar mock           | ✅ |
| DELETE | `/configure-mock/:id`    | Eliminar mock             | ✅ |

### 🔍 Utilidades
| Método | Endpoint | Descripción            | Necesita Autenticación |
|--------|----------|------------------------|---------------|
| GET    | `/configure-mock/stats`  | Estadísticas de mocks     | ✅ |
| GET    | `/configure-mock/search` | Buscar mocks              | ✅ |
| GET    | `/health`                | Estado del servicio       | ❌ |

### 🧪 Ejecución de Mocks
| Método | Endpoint | Descripción        | Necesita Autenticación |
|--------|----------|--------------------|---------------|
| *      | `/*`     | Ruta de Mock       | Depende de la configuracion del mock |

---

## 🧰 Uso

### Configurar un Mock
```json
POST /configure-mock
Authorization: Bearer 123123123123123
{
  "route": "/api/v1/usuarios",
  "method": "GET",
  "statusCode": 200,
  "responseContent": {
    "users": [{"id": 1, "name": "Juan", "email": "juan@email.com"}]
  },
  "contentType": "application/json",
  "description": "Mock para listar usuarios"
}
```

### Ejecutar el Mock
```bash
GET /api/v1/usuarios
```

### Mocks con Condiciones
```json
POST /configure-mock
Authorization: Bearer 123123123123123
{
  "route": "/api/v1/productos",
  "method": "GET",
  "statusCode": 200,
  "responseContent": {"products": [{"id": 1, "name": "Producto Normal"}]},
  "conditions": [
    {
      "field": "params.categoria",
      "operator": "equals",
      "value": "premium",
      "response": {
        "products": [{"id": 1, "name": "Producto Premium"}]
      }
    }
  ]
}
```
### Ejecutar con Condiciones
```bash
GET /api/v1/productos?categoria=premium
```

###  Templates Dinámicos
```json
POST /configure-mock
Authorization: Bearer 123123123123123
{
  "route": "/api/v1/saludo",
  "method": "POST",
  "responseContent": {
    "message": "Hola {{body.nombre}}, bienvenido!",
    "timestamp": "{{timestamp}}"
  }
}
```

### Ejecutar con Template
```bash
POST /api/v1/saludo
Content-Type: application/json
{
  "nombre": "Juan"
}
```

### Respuesta
```json
{
  "message": "Hola Juan, bienvenido!",
  "timestamp": "2023-10-01T12:00:00Z"
}
```

### Configuracion con token
```json
POST /configure-mock
Authorization: Bearer 123123123123123
{
    "route": "/api/users",
    "method": "GET",
    "headers": {
        "authorization": "Bearer user-token-456"
    },
    "statusCode": 200,
    "responseContent": {
        "users": [
            {
                "id": 1,
                "name": "Juan"
            },
            {
                "id": 2,
                "name": "María"
            }
        ]
    }
}
```

**Nota:** debe ejecutarse con el mismo token de autenticación en la configuración del mock

### Ejecución de Mocks con token
```bash
GET /api/users
Authorization: Bearer user-token-456
```
---

## 🔐 Autenticación
```bash
Authorization: Bearer your-token-here
```
**Nota:** El token debe ser con una longitud mayor a 10 caracteres para configurar los mocks ya que este le da permisos de administrador. El token puede ser cualquier cadena de texto.

## 🚦 Rate Limiting

La API implementa un sistema de **rate limiting** para evitar abusos y garantizar un rendimiento óptimo:


- 🔧 Configuración: 50 requests/minuto
- 🧪 Ejecución: 1000 requests/minuto

---

# 🌐 Ejemplos de Uso con curl

## 🔧 Configuración de Mocks

### ✅ Crear Mock Básico
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/usuarios",
    "method": "GET",
    "statusCode": 200,
    "responseContent": {
      "users": [
        { "id": 1, "name": "Juan Pérez", "email": "juan@email.com" },
        { "id": 2, "name": "María García", "email": "maria@email.com" }
      ]
    },
    "contentType": "application/json",
    "description": "Mock para listar usuarios"
  }'
```

#### 🧪 Probar Mock Básico
```bash
curl -X GET http://localhost:4000/api/v1/usuarios
```

### 🧮 Mock con Condiciones
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/productos",
    "method": "GET",
    "statusCode": 200,
    "responseContent": {
      "products": [
        { "id": 1, "name": "Producto Normal", "price": 100 }
      ]
    },
    "conditions": [
      {
        "field": "params.categoria",
        "operator": "equals",
        "value": "premium",
        "response": {
          "products": [
            { "id": 1, "name": "Producto Premium", "price": 500 }
          ]
        }
      }
    ]
  }'
```

#### 🧪 Probar Mock con Condiciones (Respuesta Normal)
```bash
curl -X GET http://localhost:4000/api/v1/productos
```

#### 🧪 Probar Mock con Condiciones (Respuesta Premium)
```bash
curl -X GET "http://localhost:4000/api/v1/productos?categoria=premium"
```

### 🧩 Mock con Templates Dinámicos
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/saludo",
    "method": "POST",
    "statusCode": 200,
    "responseContent": {
      "message": "Hola {{body.nombre}}, bienvenido!",
      "timestamp": "{{timestamp}}"
    }
  }'
```

#### 🧪 Probar Mock con Templates
```bash
curl -X POST http://localhost:4000/api/v1/saludo \
  -H "Content-Type: application/json" \
  -d '{ "nombre": "Juan" }'
```

### 📄 Mock con Respuesta XML
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/xml-data",
    "method": "GET",
    "statusCode": 200,
    "responseContent": "<?xml version=\"1.0\"?><root><message>Hello XML</message></root>",
    "contentType": "application/xml"
  }'
```

#### 🧪 Probar Mock XML
```bash
curl -X GET http://localhost:4000/api/v1/xml-data
```

### 📝 Mock con Respuesta Texto Plano
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/plain-text",
    "method": "GET",
    "statusCode": 200,
    "responseContent": "Esta es una respuesta de texto plano",
    "contentType": "text/plain"
  }'
```

#### 🧪 Probar Mock Texto Plano
```bash
curl -X GET http://localhost:4000/api/v1/plain-text
```

### 🔐 Mock con Autenticación Requerida
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/users",
    "method": "GET",
    "headers": {
      "authorization": "Bearer user-token-456"
    },
    "statusCode": 200,
    "responseContent": {
      "users": [
        { "id": 1, "name": "Juan" },
        { "id": 2, "name": "María" }
      ]
    }
  }'
```

#### 🧪 Probar Mock con Autenticación
```bash
curl -X GET http://localhost:4000/api/users \
  -H "Authorization: Bearer user-token-456"
```

### ❌ Mock de Error
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/error-test",
    "method": "GET",
    "statusCode": 500,
    "responseContent": {
      "error": "Internal Server Error",
      "message": "Simulated error for testing"
    }
  }'
```

#### 🧪 Probar Mock de Error
```bash
curl -X GET http://localhost:4000/api/v1/error-test
```

## 🔍 Consultar Mocks

### 📋 Listar Todos los Mocks
```bash
curl -X GET http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789"
```

### 🎯 Obtener Mock Específico
```bash
curl -X GET http://localhost:4000/configure-mock/{mock-id} \
  -H "Authorization: Bearer valid-token-123456789"
```

### 📊 Obtener Estadísticas
```bash
curl -X GET http://localhost:4000/configure-mock/stats \
  -H "Authorization: Bearer valid-token-123456789"
```

### 🔎 Buscar Mocks por Ruta
```bash
curl -X GET "http://localhost:4000/configure-mock/search?route=usuarios" \
  -H "Authorization: Bearer valid-token-123456789"
```

### 🔎 Buscar Mocks por Método
```bash
curl -X GET "http://localhost:4000/configure-mock/search?method=GET" \
  -H "Authorization: Bearer valid-token-123456789"
```

## ✏️ Actualizar Mock
```bash
curl -X PUT http://localhost:4000/configure-mock/{mock-id} \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Mock actualizado para usuarios",
    "statusCode": 201
  }'
```

## 🗑️ Eliminar Mock
```bash
curl -X DELETE http://localhost:4000/configure-mock/{mock-id} \
  -H "Authorization: Bearer valid-token-123456789"
```

## 🧪 Ejecutar Mocks

### 👥 Ejecutar Mock de Usuarios
```bash
curl -X GET http://localhost:4000/api/v1/usuarios
```

### 🛍️ Ejecutar Mock de Productos (Normal)
```bash
curl -X GET http://localhost:4000/api/v1/productos
```

### 🌟 Ejecutar Mock de Productos (Premium)
```bash
curl -X GET "http://localhost:4000/api/v1/productos?categoria=premium"
```

### 👋 Ejecutar Mock con Template
```bash
curl -X POST http://localhost:4000/api/v1/saludo \
  -H "Content-Type: application/json" \
  -d '{ "nombre": "Juan" }'
```

### 📄 Ejecutar Mock XML
```bash
curl -X GET http://localhost:4000/api/v1/xml-data
```

### 📝 Ejecutar Mock Texto Plano
```bash
curl -X GET http://localhost:4000/api/v1/plain-text
```

## ❌ Casos de Error

### 🔒 Sin Token de Autorización
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/test",
    "method": "GET",
    "statusCode": 200,
    "responseContent": { "message": "test" }
  }'
```
**Respuesta esperada:** 401 Unauthorized

### 📊 Datos Inválidos
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "invalid-route",
    "method": "INVALID_METHOD",
    "statusCode": 999
  }'
```
**Respuesta esperada:** 400 Bad Request

### 🔍 Mock No Encontrado
```bash
curl -X GET http://localhost:4000/configure-mock/nonexistent-id \
  -H "Authorization: Bearer valid-token-123456789"
```
**Respuesta esperada:** 404 Not Found

### 🌐 Ruta No Configurada
```bash
curl -X GET http://localhost:4000/api/v1/nonexistent
```
**Respuesta esperada:** 404 Not Found

### 🗑️ Eliminar Mock Inexistente
```bash
curl -X DELETE http://localhost:4000/configure-mock/nonexistent-id \
  -H "Authorization: Bearer valid-token-123456789"
```
**Respuesta esperada:** 404 Not Found

## 🏥 Health Check
```bash
curl -X GET http://localhost:4000/health
```

## 📝 Notas Importantes

- **Token de Autorización**: Debe tener más de 10 caracteres para operaciones de configuración
- **Content-Type**: Siempre usar `application/json` para crear/actualizar mocks
- **Variables de Template**: Usar `{{variable}}` para contenido dinámico
- **Condiciones**: Soporta operadores `equals`, `contains`, `exists`, `not_equals`
- **Rate Limiting**: 50 requests/minuto para configuración, 1000 requests/minuto para ejecución

## 🎯 Respuestas de Ejemplo

### ✅ Creación Exitosa
```json
{
  "message": "Mock configuration created successfully",
  "data": {
    "id": "mock-123",
    "route": "/api/v1/usuarios",
    "method": "GET",
    "statusCode": 200
  }
}
```

### 📊 Estadísticas
```json
{
  "data": {
    "total": 5,
    "byMethod": {
      "GET": 3,
      "POST": 2
    },
    "byStatus": {
      "200": 4,
      "201": 1
    }
  }
}
```

### 🏥 Health Check
```json
{
  "data": {
    "status": "OK",
    "timestamp": "2023-10-01T12:00:00Z",
    "uptime": "0 days, 2 hours, 30 minutes"
  }
}
```

---

## 🧮 Operadores de Condiciones
| Operador     | Descripción       |
|--------------|-------------------|
| `equals`     | Valor exacto      |
| `contains`   | Contiene texto    |
| `exists`     | Campo existe      |
| `not_equals` | Valor diferente   |

## 🔁 Variables de Template
| Variable             | Descripción                  |
|----------------------|------------------------------|
| `{{body.campo}}`     | Campo del body               |
| `{{params.campo}}`   | Parámetro de URL             |
| `{{headers.campo}}`  | Header de la request         |
| `{{timestamp}}`      | Timestamp actual             |
| `{{user.id}}`        | ID del usuario autenticado   |

## 🚨 Códigos de Error
| Código | Descripción              |
|--------|--------------------------|
| 400    | Datos inválidos          |
| 401    | No autenticado           |
| 403    | Sin permisos             |
| 404    | Mock no encontrado       |
| 429    | Rate limit excedido      |
| 500    | Error interno            |

## 🧪 Testing
```bash
npm run test
```

## 🧱 Patrones Implementados
- 🏭 **Factory Pattern**
- 🔌 **Adapter Pattern**
- 🧱 **Middleware Pattern**
- 🧠 **Service Layer**
- 🧭 **Controller Layer**

## 🏗️ Arquitectura

```
src/
├── adapters/        # Adaptadores para librerías externas
├── config/          # Configuración
├── controllers/     # Controladores REST
├── factories/       # Factories para creación de objetos
├── middlewares/     # Middlewares personalizados
├── models/          # Modelos de datos
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
└── validators/      # Validadores de entrada
```

## 🤝 Contribución
1. 🍴 Fork el proyecto
2. 🌿 Crear branch de feature
3. 💾 Commit cambios
4. 📤 Push al branch
5. ✅ Crear Pull Request

## 📄 Licencia
MIT - Ver LICENSE file para detalles.
