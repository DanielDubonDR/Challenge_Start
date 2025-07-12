import { AppError } from './error.middleware.js';

// Clase RateLimiter para manejar la limitación de tasa de solicitudes
class RateLimiter {
    constructor() {
        this.clients = new Map();
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, 60000); // Cleanup every minute
    }

    // Método para crear un middleware de limitación de tasa
    createRateLimit(windowMs = 60000, max = 100, message = 'Too many requests') {
        return (req, res, next) => {
            const clientId = req.ip;
            const now = Date.now();
            
            if (!this.clients.has(clientId)) {
                this.clients.set(clientId, {
                    requests: [],
                    windowStart: now
                });
            }
            
            const client = this.clients.get(clientId);
            
            // Remove old requests outside the window
            client.requests = client.requests.filter(timestamp => 
                now - timestamp < windowMs
            );
            
            if (client.requests.length >= max) {
                return next(new AppError(message, 429));
            }
            
            client.requests.push(now);
            
            // Add rate limit headers
            res.set({
                'X-RateLimit-Limit': max,
                'X-RateLimit-Remaining': Math.max(0, max - client.requests.length),
                'X-RateLimit-Reset': new Date(now + windowMs)
            });
            
            next();
        };
    }

    cleanup() {
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        
        for (const [clientId, client] of this.clients.entries()) {
            // Remove clients that haven't made requests in the last hour
            if (client.requests.length === 0 || 
                now - Math.max(...client.requests) > oneHour) {
                this.clients.delete(clientId);
            }
        }
    }
}

const rateLimiter = new RateLimiter();

export const createRateLimit = (windowMs, max, message) => {
    return rateLimiter.createRateLimit(windowMs, max, message);
};

export const configRateLimit = createRateLimit(60000, 50, 'Too many configuration requests');
export const mockExecutionRateLimit = createRateLimit(60000, 1000, 'Too many mock execution requests');