import { MockFactory } from "../factories/mock.factory.js";

// MockService provee los servicios para manejar la lógica de los mocks
// Incluye la creación, actualización, eliminación y búsqueda de mocks
export class MockService {
    constructor() {
        this.mocks = new Map();
    }

    createMock(data) {
        const mock = MockFactory.createMockConfiguration(data);
        this.mocks.set(mock.id, mock);
        return mock;
    }

    getAllMocks() {
        return Array.from(this.mocks.values());
    }

    getMockById(id) {
        return this.mocks.get(id);
    }

    updateMock(id, data) {
        const mock = this.mocks.get(id);
        if (!mock) {
            throw new Error(`Mock with id ${id} not found`);
        }
        mock.update(data);
        return mock;
    }

    deleteMock(id) {
        if (!this.mocks.has(id)) {
            throw new Error(`Mock with id ${id} not found`);
        }
        return this.mocks.delete(id);
    }

    findMatchingMock(route, method, urlParams = {}, bodyParams = {}, headers = {}) {
        const normalizedMethod = method.toLowerCase();
        
        console.log(`Searching for mock: route=${route}, method=${normalizedMethod}`);
        console.log(`Request headers:`, headers);
        console.log(`Available mocks:`, this.getAllMocks().map(m => ({ 
            id: m.id, 
            route: m.route, 
            method: m.method,
            requiredHeaders: m.headers 
        })));
        
        const candidateMocks = this.getAllMocks().filter(mock => {
            const routeMatch = this.matchRoute(mock.route, route);
            const methodMatch = mock.method === normalizedMethod;
            
            console.log(`Mock ${mock.id}: route match=${routeMatch}, method match=${methodMatch} (${mock.method} vs ${normalizedMethod})`);
            
            return routeMatch && methodMatch;
        });

        console.log(`Candidate mocks found: ${candidateMocks.length}`);

        // Si no hay candidatos, retornamos null
        if (candidateMocks.length === 0) {
            return null;
        }

        // Buscar la mejor coincidencia basada en parámetros
        const bestMatch = candidateMocks.find(mock => {
            const urlMatch = this.matchParams(mock.urlParams, urlParams);
            const bodyMatch = this.matchParams(mock.bodyParams, bodyParams);
            const headerMatch = this.matchHeaders(mock.headers, headers);
            
            console.log(`Mock ${mock.id}: URL params match=${urlMatch}, body match=${bodyMatch}, headers match=${headerMatch}`);
            
            return urlMatch && bodyMatch && headerMatch;
        });

        // Encontrar la mejor coincidencia
        if (bestMatch) {
            console.log(`Best match found: ${bestMatch.id}`);
            return bestMatch;
        }

        // Verificar si hay mocks que requieren headers
        const mocksWithRequiredHeaders = candidateMocks.filter(mock => {
            const urlMatch = this.matchParams(mock.urlParams, urlParams);
            const bodyMatch = this.matchParams(mock.bodyParams, bodyParams);
            const hasRequiredHeaders = mock.headers && Object.keys(mock.headers).length > 0;
            
            return urlMatch && bodyMatch && hasRequiredHeaders;
        });

        // Si hay mocks que requieren headers pero no coinciden, lanzar error de autorización
        if (mocksWithRequiredHeaders.length > 0) {
            console.log(`Found mocks requiring headers but headers don't match`);
            
            const authError = new Error('Authorization required');
            authError.statusCode = 401;
            authError.isAuthError = true;
            throw authError;
        }

        // Solo buscar mocks sin headers requeridos si no hay mocks con headers requeridos
        const permissiveMatch = candidateMocks.find(mock => {
            const urlMatch = this.matchParams(mock.urlParams, urlParams);
            const bodyMatch = this.matchParams(mock.bodyParams, bodyParams);
            const hasNoRequiredHeaders = !mock.headers || Object.keys(mock.headers).length === 0;
            
            return urlMatch && bodyMatch && hasNoRequiredHeaders;
        });

        if (permissiveMatch) {
            console.log(`Permissive match found: ${permissiveMatch.id}`);
            return permissiveMatch;
        }

        return null;
    }

    // Soporte para rutas con parámetros dinámicos
    matchRoute(mockRoute, actualRoute) {
        const mockRouteRegex = mockRoute.replace(/:\w+/g, '([^/]+)');
        const regex = new RegExp(`^${mockRouteRegex}$`);
        return regex.test(actualRoute);
    }

    // Soporte para coincidencia de parámetros de URL y cuerpo
    matchParams(mockParams, actualParams) {
    
        if (!mockParams || Object.keys(mockParams).length === 0) {
            return true;
        }

        for (const [key, value] of Object.entries(mockParams)) {
            if (actualParams[key] !== value) {
                return false;
            }
        }
        return true;
    }

    // Soporte para coincidencia de headers
    matchHeaders(mockHeaders, actualHeaders) {
        // Si el mock no tiene headers requeridos, siempre coincide
        if (!mockHeaders || Object.keys(mockHeaders).length === 0) {
            return true;
        }

        // console.log(`Matching headers for mock:`, mockHeaders);
        // console.log(`Against request headers:`, actualHeaders);

        // Verificar que todos los headers requeridos por el mock estén presentes
        for (const [key, value] of Object.entries(mockHeaders)) {
            const normalizedKey = key.toLowerCase();
            const actualValue = actualHeaders[normalizedKey];
            
            // console.log(`Checking header: ${normalizedKey}, expected: ${value}, actual: ${actualValue}`);
            
            if (!actualValue) {
                console.log(`Header ${normalizedKey} not found in request`);
                return false;
            }

            // Para Authorization headers, verificar que el valor coincida exactamente
            if (normalizedKey === 'authorization') {
                if (actualValue !== value) {
                    console.log(`Authorization header mismatch: expected ${value}, got ${actualValue}`);
                    return false;
                }
            } else {
                // Para otros headers, verificar coincidencia exacta
                if (actualValue !== value) {
                    console.log(`Header ${normalizedKey} mismatch: expected ${value}, got ${actualValue}`);
                    return false;
                }
            }
        }
        
        console.log(`All required headers matched`);
        return true;
    }

    // Evaluar condiciones del mock
    evaluateConditions(mock, context) {
        if (!mock.conditions || !Array.isArray(mock.conditions)) {
            return mock.responseContent;
        }

        console.log('Evaluating conditions for mock:', mock.id);
        console.log('Context:', context);

        // Evaluar condiciones simples
        for (const condition of mock.conditions) {
            console.log('Evaluating condition:', condition);
            
            if (this.evaluateCondition(condition, context)) {
                console.log('Condition matched, returning custom response');
                return condition.response;
            }
        }

        console.log('No conditions matched, returning default response');
        return mock.responseContent;
    }

    // Evaluar una condición específica
    evaluateCondition(condition, context) {
        const { field, operator, value } = condition;
        const actualValue = this.getValueFromContext(field, context);

        console.log(`Evaluating: ${field} ${operator} ${value}`);
        console.log(`Actual value: ${actualValue}`);

        switch (operator) {
            case 'equals':
                return actualValue === value;
            case 'contains':
                return actualValue && actualValue.toString().includes(value);
            case 'exists':
                return actualValue !== undefined && actualValue !== null;
            case 'not_equals':
                return actualValue !== value;
            case 'greater_than':
                return Number(actualValue) > Number(value);
            case 'less_than':
                return Number(actualValue) < Number(value);
            default:
                console.log(`Unknown operator: ${operator}`);
                return false;
        }
    }

    // Obtener el valor de un campo en el contexto
    getValueFromContext(field, context) {
        const parts = field.split('.');
        let value = context;
        
        for (const part of parts) {
            value = value?.[part];
        }
        
        return value;
    }

    // Procesar plantillas con contexto
    processTemplate(template, context) {
        if (typeof template === 'string') {
            return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
                return this.getValueFromContext(key.trim(), context) || match;
            });
        }
        
        if (Array.isArray(template)) {
            return template.map(item => this.processTemplate(item, context));
        }
        
        if (typeof template === 'object' && template !== null) {
            const result = {};
            for (const [key, value] of Object.entries(template)) {
                result[key] = this.processTemplate(value, context);
            }
            return result;
        }
        
        return template;
    }
}