import request from "supertest";
import app from "../src/app.js";

describe("Mock API Tests", () => {
    let authToken = "Bearer valid-token-123456789";
    let createdMockId;

    // Test de configuración de mock
    describe("POST /configure-mock", () => {
        test("Debería crear un mock exitosamente", async () => {
            const mockData = {
                route: "/api/v1/usuarios",
                method: "GET",
                statusCode: 200,
                responseContent: {
                    users: [
                        { id: 1, name: "Juan Pérez", email: "juan@email.com" },
                        { id: 2, name: "María García", email: "maria@email.com" }
                    ]
                },
                contentType: "application/json",
                description: "Mock para listar usuarios"
            };

            const response = await request(app)
                .post("/configure-mock")
                .set("Authorization", authToken)
                .send(mockData);

            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe("Mock configuration created successfully");
            expect(response.body.data.route).toBe("/api/v1/usuarios");
            expect(response.body.data.id).toBeDefined();
            
            createdMockId = response.body.data.id;
        });

        test("Debería fallar sin token de autenticación", async () => {
            const mockData = {
                route: "/api/v1/test",
                method: "GET",
                statusCode: 200,
                responseContent: { message: "test" }
            };

            const response = await request(app)
                .post("/configure-mock")
                .send(mockData);

            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Access token is required");
        });

        test("Debería fallar con datos inválidos", async () => {
            const mockData = {
                route: "invalid-route", // No empieza con /
                method: "INVALID_METHOD",
                statusCode: 999 // Código inválido
            };

            const response = await request(app)
                .post("/configure-mock")
                .set("Authorization", authToken)
                .send(mockData);

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toContain("Validation errors");
        });
    });

    // Test de obtención de mocks
    describe("GET /configure-mock", () => {
        test("Debería obtener todos los mocks", async () => {
            const response = await request(app)
                .get("/configure-mock")
                .set("Authorization", authToken);

            expect(response.statusCode).toBe(200);
            expect(response.body.data.mocks).toBeDefined();
            expect(Array.isArray(response.body.data.mocks)).toBe(true);
        });

        test("Debería obtener un mock específico por ID", async () => {
            const response = await request(app)
                .get(`/configure-mock/${createdMockId}`)
                .set("Authorization", authToken);

            expect(response.statusCode).toBe(200);
            expect(response.body.data.id).toBe(createdMockId);
        });

        test("Debería retornar 404 para mock inexistente", async () => {
            const response = await request(app)
                .get("/configure-mock/nonexistent-id")
                .set("Authorization", authToken);

            expect(response.statusCode).toBe(404);
        });
    });

    // Test de ejecución de mocks
    describe("Mock Execution", () => {
        test("Debería ejecutar un mock configurado", async () => {
            const response = await request(app)
                .get("/api/v1/usuarios");

            expect(response.statusCode).toBe(200);
            expect(response.body.users).toBeDefined();
            expect(response.body.users.length).toBe(2);
        });

        test("Debería retornar 404 para mock no configurado", async () => {
            const response = await request(app)
                .get("/api/v1/nonexistent");

            // Console.log para ver la respuesta de error
            console.log("Respuesta 404:", response.status, response.body);

            expect(response.statusCode).toBe(404);
        });
    });

    // Test de mock con condiciones
    describe("Conditional Mocks", () => {
        test("Debería crear y ejecutar mock con condiciones", async () => {
            const conditionalMock = {
                route: "/api/v1/productos",
                method: "GET",
                statusCode: 200,
                responseContent: {
                    products: [
                        { id: 1, name: "Producto Normal", price: 100 }
                    ]
                },
                conditions: [
                    {
                        field: "params.categoria",
                        operator: "equals",
                        value: "premium",
                        response: {
                            products: [
                                { id: 1, name: "Producto Premium", price: 500 }
                            ]
                        }
                    }
                ]
            };

            // Crear mock condicional
            const createResponse = await request(app)
                .post("/configure-mock")
                .set("Authorization", authToken)
                .send(conditionalMock);

            expect(createResponse.statusCode).toBe(201);

            // Ejecutar mock sin condición
            const normalResponse = await request(app)
                .get("/api/v1/productos");

            expect(normalResponse.statusCode).toBe(200);
            expect(normalResponse.body.products[0].name).toBe("Producto Normal");

            // Ejecutar mock con condición
            const premiumResponse = await request(app)
                .get("/api/v1/productos?categoria=premium");

            expect(premiumResponse.statusCode).toBe(200);
            expect(premiumResponse.body.products[0].name).toBe("Producto Premium");
        });
    });

    // Test de templates
    describe("Template Processing", () => {
        test("Debería procesar templates dinámicos", async () => {
            const templateMock = {
                route: "/api/v1/saludo",
                method: "POST",
                statusCode: 200,
                responseContent: {
                    message: "Hola {{body.nombre}}, bienvenido!",
                    timestamp: "{{timestamp}}"
                }
            };

            // Crear mock con template
            const createResponse = await request(app)
                .post("/configure-mock")
                .set("Authorization", authToken)
                .send(templateMock);

            expect(createResponse.statusCode).toBe(201);

            // Ejecutar mock con datos
            const executeResponse = await request(app)
                .post("/api/v1/saludo")
                .send({ nombre: "Juan" });

            expect(executeResponse.statusCode).toBe(200);
            expect(executeResponse.body.message).toBe("Hola Juan, bienvenido!");
            expect(executeResponse.body.timestamp).toBeDefined();
        });
    });

    // Test de estadísticas
    describe("GET /configure-mock/stats", () => {
        test("Debería obtener estadísticas de mocks", async () => {
            const response = await request(app)
                .get("/configure-mock/stats")
                .set("Authorization", authToken);

            expect(response.statusCode).toBe(200);
            expect(response.body.data.total).toBeDefined();
            expect(response.body.data.byMethod).toBeDefined();
            expect(response.body.data.byStatus).toBeDefined();
        });
    });

    // Test de búsqueda
    describe("GET /configure-mock/search", () => {
        test("Debería buscar mocks por ruta", async () => {
            const response = await request(app)
                .get("/configure-mock/search?route=usuarios")
                .set("Authorization", authToken);

            expect(response.statusCode).toBe(200);
            expect(response.body.data.mocks).toBeDefined();
        });

        test("Debería buscar mocks por método", async () => {
            const response = await request(app)
                .get("/configure-mock/search?method=GET")
                .set("Authorization", authToken);

            expect(response.statusCode).toBe(200);
            expect(response.body.data.mocks).toBeDefined();
        });
    });

    // Test de actualización
    describe("PUT /configure-mock/:id", () => {
        test("Debería actualizar un mock existente", async () => {
            const updateData = {
                description: "Mock actualizado para usuarios",
                statusCode: 201
            };

            const response = await request(app)
                .put(`/configure-mock/${createdMockId}`)
                .set("Authorization", authToken)
                .send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body.data.description).toBe("Mock actualizado para usuarios");
            expect(response.body.data.statusCode).toBe(201);
        });
    });

    // Test de eliminación
    describe("DELETE /configure-mock/:id", () => {
        test("Debería eliminar un mock existente", async () => {
            const response = await request(app)
                .delete(`/configure-mock/${createdMockId}`)
                .set("Authorization", authToken);

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe("Mock deleted successfully");
        });

        test("Debería fallar al eliminar mock inexistente", async () => {
            const response = await request(app)
                .delete("/configure-mock/nonexistent-id")
                .set("Authorization", authToken);

            expect(response.statusCode).toBe(404);
        });
    });

    // Test de diferentes content types
    describe("Content Types", () => {
        test("Debería manejar respuestas XML", async () => {
            const xmlMock = {
                route: "/api/v1/xml-data",
                method: "GET",
                statusCode: 200,
                responseContent: "<?xml version='1.0'?><root><message>Hello XML</message></root>",
                contentType: "application/xml"
            };

            const createResponse = await request(app)
                .post("/configure-mock")
                .set("Authorization", authToken)
                .send(xmlMock);

            expect(createResponse.statusCode).toBe(201);

            const executeResponse = await request(app)
                .get("/api/v1/xml-data");

            expect(executeResponse.statusCode).toBe(200);
            expect(executeResponse.headers['content-type']).toBe("application/xml; charset=utf-8");
            expect(executeResponse.text).toContain("Hello XML");
        });

        test("Debería manejar respuestas de texto plano", async () => {
            const textMock = {
                route: "/api/v1/plain-text",
                method: "GET",
                statusCode: 200,
                responseContent: "Esta es una respuesta de texto plano",
                contentType: "text/plain"
            };

            const createResponse = await request(app)
                .post("/configure-mock")
                .set("Authorization", authToken)
                .send(textMock);

            expect(createResponse.statusCode).toBe(201);

            const executeResponse = await request(app)
                .get("/api/v1/plain-text");

            expect(executeResponse.statusCode).toBe(200);
            expect(executeResponse.headers['content-type']).toBe("text/plain; charset=utf-8");
            expect(executeResponse.text).toBe("Esta es una respuesta de texto plano");
        });
    });

    // Test de health check
    describe("Health Check", () => {
        test("Debería retornar estado de salud del servicio", async () => {
            const response = await request(app).get("/health");

            expect(response.statusCode).toBe(200);
            expect(response.body.data.status).toBe("OK");
            expect(response.body.data.timestamp).toBeDefined();
            expect(response.body.data.uptime).toBeDefined();
        });
    });
});