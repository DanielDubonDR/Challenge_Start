
# 🚀 Challenge_Start
## 🔧 API para Mocks de Servicios REST

### 📘 Descripción
Esta API permite **crear, gestionar y ejecutar mocks de servicios REST** de manera dinámica. Es ideal para desarrollo, testing y simulación de servicios externos.

### Indice:

- [🚀 Challenge\_Start](#-challenge_start)
  - [🔧 API para Mocks de Servicios REST](#-api-para-mocks-de-servicios-rest)
    - [📘 Descripción](#-descripción)
    - [Indice:](#indice)
    - [✨ Características](#-características)
  - [⚙️ Instalación](#️-instalación)
    - [📋 Requisitos previos](#-requisitos-previos)
    - [📦 Pasos](#-pasos)
    - [Usando Docker](#usando-docker)
    - [🌐 Variables de Entorno](#-variables-de-entorno)
    - [🧪 Modos de ejecución](#-modos-de-ejecución)
  - [📡 Endpoints](#-endpoints)
    - [🔧 Configuración de Mocks](#-configuración-de-mocks)
    - [🔍 Utilidades](#-utilidades)
    - [🧪 Ejecución de Mocks](#-ejecución-de-mocks)
  - [🧮 Operadores de Condiciones](#-operadores-de-condiciones)
  - [🔁 Variables de Template](#-variables-de-template)
  - [🚨 Códigos de Error](#-códigos-de-error)
  - [🧰 Uso](#-uso)
    - [Configurar un Mock](#configurar-un-mock)
    - [Ejecutar el Mock](#ejecutar-el-mock)
    - [Mocks con Condiciones](#mocks-con-condiciones)
    - [Ejecutar con Condiciones](#ejecutar-con-condiciones)
    - [Templates Dinámicos](#templates-dinámicos)
    - [Ejecutar con Template](#ejecutar-con-template)
    - [Respuesta](#respuesta)
    - [Configuracion con busqueda con route params](#configuracion-con-busqueda-con-route-params)
    - [Configuracion con token](#configuracion-con-token)
    - [Ejecutar con busqueda con route params](#ejecutar-con-busqueda-con-route-params)
    - [Ejecución de Mocks con token](#ejecución-de-mocks-con-token)
  - [🔐 Autenticación](#-autenticación)
  - [🚦 Rate Limiting](#-rate-limiting)
- [🌐 Ejemplos de Uso con curl](#-ejemplos-de-uso-con-curl)
  - [🔧 Configuración de Mocks](#-configuración-de-mocks-1)
    - [✅ Crear Mock Básico](#-crear-mock-básico)
      - [🧪 Probar Mock Básico](#-probar-mock-básico)
    - [🧮 Mock con Condiciones](#-mock-con-condiciones)
      - [🧪 Probar Mock con Condiciones (Respuesta Normal)](#-probar-mock-con-condiciones-respuesta-normal)
      - [🧪 Probar Mock con Condiciones (Respuesta Premium)](#-probar-mock-con-condiciones-respuesta-premium)
    - [🧩 Mock con Templates Dinámicos](#-mock-con-templates-dinámicos)
      - [🧪 Probar Mock con Templates](#-probar-mock-con-templates)
      - [🔧 Crear Mock con Route Params](#-crear-mock-con-route-params)
      - [🧪 Probar Mock - Producto ID 1 (Laptop Gaming)](#-probar-mock---producto-id-1-laptop-gaming)
    - [📄 Mock con Respuesta XML](#-mock-con-respuesta-xml)
      - [🧪 Probar Mock XML](#-probar-mock-xml)
    - [📝 Mock con Respuesta Texto Plano](#-mock-con-respuesta-texto-plano)
      - [🧪 Probar Mock Texto Plano](#-probar-mock-texto-plano)
    - [🔐 Mock con Autenticación Requerida](#-mock-con-autenticación-requerida)
      - [🧪 Probar Mock con Autenticación](#-probar-mock-con-autenticación)
    - [❌ Mock de Error](#-mock-de-error)
      - [🧪 Probar Mock de Error](#-probar-mock-de-error)
  - [🔍 Consultar Mocks](#-consultar-mocks)
    - [📋 Listar Todos los Mocks](#-listar-todos-los-mocks)
    - [🎯 Obtener Mock Específico](#-obtener-mock-específico)
    - [📊 Obtener Estadísticas](#-obtener-estadísticas)
    - [🔎 Buscar Mocks por Ruta](#-buscar-mocks-por-ruta)
    - [🔎 Buscar Mocks por Método](#-buscar-mocks-por-método)
  - [✏️ Actualizar Mock](#️-actualizar-mock)
  - [🗑️ Eliminar Mock](#️-eliminar-mock)
  - [🧪 Ejecutar Mocks](#-ejecutar-mocks)
    - [👥 Ejecutar Mock de Usuarios](#-ejecutar-mock-de-usuarios)
    - [🛍️ Ejecutar Mock de Productos (Normal)](#️-ejecutar-mock-de-productos-normal)
    - [🌟 Ejecutar Mock de Productos (Premium)](#-ejecutar-mock-de-productos-premium)
    - [👋 Ejecutar Mock con Template](#-ejecutar-mock-con-template)
    - [📄 Ejecutar Mock XML](#-ejecutar-mock-xml)
    - [📝 Ejecutar Mock Texto Plano](#-ejecutar-mock-texto-plano)
  - [❌ Casos de Error](#-casos-de-error)
    - [🔒 Sin Token de Autorización](#-sin-token-de-autorización)
    - [📊 Datos Inválidos](#-datos-inválidos)
    - [🔍 Mock No Encontrado](#-mock-no-encontrado)
    - [🌐 Ruta No Configurada](#-ruta-no-configurada)
    - [🗑️ Eliminar Mock Inexistente](#️-eliminar-mock-inexistente)
  - [🏥 Health Check](#-health-check)
  - [📝 Notas Importantes](#-notas-importantes)
  - [🎯 Respuestas de Ejemplo](#-respuestas-de-ejemplo)
    - [✅ Creación Exitosa](#-creación-exitosa)
    - [📊 Estadísticas](#-estadísticas)
    - [🏥 Health Check](#-health-check-1)
  - [🧪 Testing](#-testing)
  - [🧱 Patrones Implementados](#-patrones-implementados)
  - [🏗️ Arquitectura](#️-arquitectura)
  - [🤝 Contribución](#-contribución)
  - [📄 Licencia](#-licencia)



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
git clone https://github.com/DanielDubonDR/Challenge_Start.git
cd challenge_start
npm install
cp .envTemplate .env
# Configurar variables en .env
npm run dev
```

### Usando Docker
```bash
docker pull daniel499/challenge_start:1.5.0
docker run -p 4000:4000 daniel499/challenge_start:1.5.0
```
- Acceder a la API en `http://localhost:4000`

> [!NOTE] \
> Para poder ejecutar los tests, es necesario levantar la API de forma local (descargar el repositorio)

### 🌐 Variables de Entorno
| Variable          | Descripción                          |
|-------------------|--------------------------------------|
| `API_PORT`            | Puerto del servidor (default: 4000)  |
| `ALLOWED_ORIGINS` | Orígenes permitidos para CORS (default: `*`) |

### 🧪 Modos de ejecución
- 🛠️ Desarrollo: `npm run dev`
- 🚀 Producción: `npm start`
- 🧪 Pruebas: `npm run test`

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

<!--  -->

### Configuracion con busqueda con route params
```json
POST /configure-mock
Authorization: Bearer 123123123123123
{
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
}
```

### Configuracion con token
```json
POST /configure-mock
Authorization: Bearer 123123123123123
{
  "route": "/api/v1/productos/prueba/:id",
  "method": "GET",
  "statusCode": 200,
  "responseContent": {
    "product": {
      "id": "{{routeParams.id}}",
      "name": "Producto por defecto",
      "price": 100
    }
  },
  "conditions": [
    {
      "field": "routeParams.id",
      "operator": "equals",
      "value": "1",
      "response": {
        "product": {
          "id": 1,
          "name": "Laptop Gaming",
          "price": 1500,
          "category": "electronics"
        }
      }
    },
    {
      "field": "routeParams.id",
      "operator": "equals",
      "value": "2",
      "response": {
        "product": {
          "id": 2,
          "name": "Mouse Inalámbrico",
          "price": 25,
          "category": "electronics"
        }
      }
    },
    {
      "field": "routeParams.id",
      "operator": "equals",
      "value": "999",
      "response": {
        "error": "Producto no encontrado",
        "code": "PRODUCT_NOT_FOUND"
      }
    }
  ]
}
```

### Ejecutar con busqueda con route params
```bash
GET /api/v1/productos/prueba/1
```

> [!NOTE] \
> Debe ejecutarse con el mismo token de autenticación en la configuración del mock

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
#### 🔧 Crear Mock con Route Params
```bash
curl -X POST http://localhost:4000/configure-mock \
  -H "Authorization: Bearer valid-token-123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/productos/prueba/:id",
    "method": "GET",
    "statusCode": 200,
    "responseContent": {
      "product": {
        "id": "{{routeParams.id}}",
        "name": "Producto por defecto",
        "price": 100
      }
    },
    "conditions": [
      {
        "field": "routeParams.id",
        "operator": "equals",
        "value": "1",
        "response": {
          "product": {
            "id": 1,
            "name": "Laptop Gaming",
            "price": 1500,
            "category": "electronics"
          }
        }
      },
      {
        "field": "routeParams.id",
        "operator": "equals",
        "value": "2",
        "response": {
          "product": {
            "id": 2,
            "name": "Mouse Inalámbrico",
            "price": 25,
            "category": "electronics"
          }
        }
      },
      {
        "field": "routeParams.id",
        "operator": "equals",
        "value": "999",
        "response": {
          "error": "Producto no encontrado",
          "code": "PRODUCT_NOT_FOUND"
        }
      }
    ]
  }'
```

#### 🧪 Probar Mock - Producto ID 1 (Laptop Gaming)
```bash
curl -X GET http://localhost:4000/api/v1/productos/prueba/1
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

<!-- Justificacion -->

Se han implementado patrones de diseño para mejorar la mantenibilidad y escalabilidad del código. El uso de **Factory Pattern** permite crear instancias de mocks de manera flexible, mientras que el **Adapter Pattern** facilita la integración con librerías externas. Los **Middlewares** permiten manejar la lógica de autorización y validación de manera modular.

Se trata de tener bajo acoplamiento y alta cohesión, lo que facilita la evolución del sistema sin afectar otras partes del código.

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
