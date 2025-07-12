import cors from "cors";
import express from "express";
import morgan from "morgan";
import responseMiddleware from "./middlewares/response.middleware.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { configRateLimit, mockExecutionRateLimit } from "./middlewares/rateLimit.middleware.js";

import testHandler from "./routes/test.routes.js";
import mockConfigurationHandler from "./routes/mock-configuration.routes.js";
import mockExecutionHandler from "./routes/mock-execution.routes.js";
import { ALLOWED_ORIGINS } from "./config/credentials.js";

const app = express();

// Configuración del body parser
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Configuración de CORS
app.use(cors({
    origin: ALLOWED_ORIGINS(),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true
}));

// Logging
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan("combined"));
}

// Agregar middlewares de respuesta
app.use(responseMiddleware);

// Rate limiting solo para configuración de mocks
app.use('/configure-mock', configRateLimit);

// Endpoint del estado del servicio
app.get('/health', (req, res) => {
    res.response({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || '1.0.0'
    }, 'Service is healthy');
});

// Rutas de prueba
app.use("/test", testHandler);

// Rutas de configuración de mocks
app.use("/configure-mock", mockConfigurationHandler);

// Manejo de todas las rutas definidas por el mock/usuario
app.use((req, res, next) => {
    // Solo aplicar a rutas que no son del sistema
    if (!req.path.startsWith('/test') && 
        !req.path.startsWith('/configure-mock') && 
        !req.path.startsWith('/health')) {
        
        // Aplicar rate limiting para ejecución de mocks
        mockExecutionRateLimit(req, res, (err) => {
            if (err) return next(err);
            
            // Ejecutar el mock
            mockExecutionHandler(req, res, next);
        });
    } else {
        next();
    }
});

// Manejo de rutas no encontradas
app.use(notFoundHandler);

// Manejo de errores
app.use(errorHandler);

export default app;