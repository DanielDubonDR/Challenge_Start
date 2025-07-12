
// Clase AppError para manejar errores personalizados
export class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        
        Error.captureStackTrace(this, this.constructor);
    }
}

// Middleware para manejar errores
export const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    
    // Errores de validación
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
    }
    
    // Errores de sintaxis JSON
    if (err.name === 'SyntaxError' && err.message.includes('JSON')) {
        statusCode = 400;
        message = 'Invalid JSON format';
    }
    
    // Log del error para debugging
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    
    const response = {
        message: message || 'Internal Server Error',
        status: false,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
    
    res.status(statusCode || 500).json(response);
};

// Middleware para manejar rutas no encontradas
export const notFoundHandler = (req, res, next) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};

// Middleware para manejar errores asíncronos
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};