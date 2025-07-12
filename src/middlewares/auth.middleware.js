import { AppError } from './error.middleware.js';

// Middleware de autenticación y autorización
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Access token is required', 401));
    }
    
    const token = authHeader.substring(7);
    
    // Validación simple del token (en producción uso de JWT)
    if (!token || token.length < 10) {
        return next(new AppError('Invalid access token', 401));
    }
    
    // Posible lógica de validación del token, falta implementación real para la regla de negocio
    req.user = { id: 'user123', role: 'admin' };
    next();
};

// Middleware de autorización basado en roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError('User not authenticated', 401));
        }
        
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Insufficient permissions', 403));
        }
        
        next();
    };
};

// Middleware opcional de autenticación
export const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        if (token && token.length >= 10) {
            req.user = { id: 'user123', role: 'admin' };
        }
    }
    
    next();
};