import { MockService } from '../services/mock.service.js';
import { MockValidator } from '../validators/mock.validator.js';
import { AppError, asyncHandler } from '../middlewares/error.middleware.js';

const mockService = new MockService();

// Controlador para manejar las operaciones relacionadas con los mocks
export const configureMock = asyncHandler(async (req, res, next) => {
    const validation = MockValidator.validateMockConfiguration(req.body);
    
    if (!validation.isValid) {
        return next(new AppError(`Validation errors: ${validation.errors.join(', ')}`, 400));
    }
    
    const sanitizedData = MockValidator.sanitizeInput(req.body);
    const mock = mockService.createMock(sanitizedData);
    
    res.response(mock.toJSON(), 'Mock configuration created successfully', 201);
});

// Controlador para obtener todos los mocks
export const getAllMocks = asyncHandler(async (req, res, next) => {
    const mocks = mockService.getAllMocks();
    const mocksData = mocks.map(mock => mock.toJSON());
    
    res.response({
        count: mocksData.length,
        mocks: mocksData
    }, 'Mocks retrieved successfully');
});

// Controlador para obtener un mock por ID
export const getMockById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const mock = mockService.getMockById(id);
    
    if (!mock) {
        return next(new AppError('Mock configuration not found', 404));
    }
    
    res.response(mock.toJSON(), 'Mock retrieved successfully');
});

// Controlador para actualizar un mock
export const updateMock = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    const validation = MockValidator.validateUpdateData(req.body);
    if (!validation.isValid) {
        return next(new AppError(`Validation errors: ${validation.errors.join(', ')}`, 400));
    }
    
    try {
        const sanitizedData = MockValidator.sanitizeInput(req.body);
        // Normalizar el método a minúsculas si existe
        if (sanitizedData.method) {
            sanitizedData.method = sanitizedData.method.toLowerCase();
        }
        const mock = mockService.updateMock(id, sanitizedData);
        res.response(mock.toJSON(), 'Mock updated successfully');
    } catch (error) {
        return next(new AppError(error.message, 404));
    }
});

// Controlador para eliminar un mock
export const deleteMock = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    try {
        mockService.deleteMock(id);
        res.response(null, 'Mock deleted successfully');
    } catch (error) {
        return next(new AppError(error.message, 404));
    }
});

// Controlador para ejecutar un mock
export const executeMock = asyncHandler(async (req, res, next) => {
    // Usar la ruta completa directamente
    const route = req.originalUrl.split('?')[0]; // Separar query string de la ruta
    const method = req.method;
    const urlParams = req.query;
    const bodyParams = req.body;
    const headers = req.headers;
    
    let mock;
    
    try {
        mock = mockService.findMatchingMock(route, method, urlParams, bodyParams, headers);
    } catch (error) {
        if (error.isAuthError) {
            return next(new AppError('Authorization header required or invalid', 401));
        }
        throw error;
    }
    
    if (!mock) {
        return next(new AppError(`Mock not found for route: ${route} with method: ${method}`, 404));
    }
    
    // Extraer parámetros de la ruta si es una ruta dinámica
    const routeParams = extractRouteParams(mock.route, route);
    
    const context = {
        params: urlParams,          
        routeParams: routeParams,  
        body: bodyParams,
        headers: headers,
        user: req.user || null,    
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent') || 'unknown'
    };
    
    // Evaluar condiciones si existen
    let responseContent = mockService.evaluateConditions(mock, context);
    
    // Procesar templates
    responseContent = mockService.processTemplate(responseContent, context);
    
    // Configurar headers de respuesta
    res.set('Content-Type', mock.contentType);
    
    // Agregar headers personalizados si existen
    if (mock.responseHeaders) {
        Object.entries(mock.responseHeaders).forEach(([key, value]) => {
            res.set(key, value);
        });
    }
    
    res.status(mock.statusCode);
    
    if (mock.contentType === 'application/json') {
        res.json(responseContent);
    } else {
        res.send(responseContent);
    }
});

// Función auxiliar para extraer parámetros de ruta
function extractRouteParams(mockRoute, actualRoute) {
    const mockParts = mockRoute.split('/');
    const actualParts = actualRoute.split('/');
    const params = {};
    
    for (let i = 0; i < mockParts.length; i++) {
        if (mockParts[i].startsWith(':')) {
            const paramName = mockParts[i].substring(1);
            params[paramName] = actualParts[i];
        }
    }
    
    return params;
}

// Controlador para obtener estadísticas de los mocks
export const getMockStats = asyncHandler(async (req, res, next) => {
    const mocks = mockService.getAllMocks();
    
    const stats = {
        total: mocks.length,
        byMethod: {},
        byStatus: {},
        byContentType: {}
    };
    
    mocks.forEach(mock => {
        // Estadísticas por método
        stats.byMethod[mock.method] = (stats.byMethod[mock.method] || 0) + 1;
        
        // Estadísticas por código de estado
        stats.byStatus[mock.statusCode] = (stats.byStatus[mock.statusCode] || 0) + 1;
        
        // Estadísticas por content type
        stats.byContentType[mock.contentType] = (stats.byContentType[mock.contentType] || 0) + 1;
    });
    
    res.response(stats, 'Statistics retrieved successfully');
});

// Controlador para buscar mocks por diferentes criterios
export const searchMocks = asyncHandler(async (req, res, next) => {
    const { route, method, description } = req.query;
    let mocks = mockService.getAllMocks();
    
    if (route) {
        mocks = mocks.filter(mock => mock.route.includes(route));
    }
    
    if (method) {
        mocks = mocks.filter(mock => mock.method === method.toLowerCase());
    }
    
    if (description) {
        mocks = mocks.filter(mock => mock.description.toLowerCase().includes(description.toLowerCase()));
    }
    
    const mocksData = mocks.map(mock => mock.toJSON());
    
    res.response({
        count: mocksData.length,
        mocks: mocksData
    }, 'Search completed successfully');
});