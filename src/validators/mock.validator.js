import validator from 'validator';

export class MockValidator {
    static validateMockConfiguration(data) {
        const errors = [];

        // Validar route
        if (!data.route || typeof data.route !== 'string') {
            errors.push('Route is required and must be a string');
        } else if (!data.route.startsWith('/')) {
            errors.push('Route must start with /');
        }

        // Validar method
        const allowedMethods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];
        if (!data.method || !allowedMethods.includes(data.method.toLowerCase())) {
            errors.push(`Method must be one of: ${allowedMethods.join(', ')}`);
        }

        // Validar statusCode
        if (data.statusCode && (!Number.isInteger(data.statusCode) || data.statusCode < 100 || data.statusCode > 599)) {
            errors.push('Status code must be a valid HTTP status code (100-599)');
        }

        // Validar contentType
        if (data.contentType && typeof data.contentType !== 'string') {
            errors.push('Content type must be a string');
        }

        // Validar conditions si existen
        if (data.conditions && !Array.isArray(data.conditions)) {
            errors.push('Conditions must be an array');
        } else if (data.conditions) {
            data.conditions.forEach((condition, index) => {
                const conditionErrors = this.validateCondition(condition);
                if (conditionErrors.length > 0) {
                    errors.push(`Condition ${index}: ${conditionErrors.join(', ')}`);
                }
            });
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static validateCondition(condition) {
        const errors = [];

        if (!condition.field || typeof condition.field !== 'string') {
            errors.push('Field is required and must be a string');
        }

        const allowedOperators = ['equals', 'contains', 'exists', 'not_equals'];
        if (!condition.operator || !allowedOperators.includes(condition.operator)) {
            errors.push(`Operator must be one of: ${allowedOperators.join(', ')}`);
        }

        if (condition.operator !== 'exists' && condition.value === undefined) {
            errors.push('Value is required for this operator');
        }

        return errors;
    }

    static validateUpdateData(data) {
        const allowedFields = [
            'route', 'method', 'urlParams', 'bodyParams', 'headers',
            'statusCode', 'responseContent', 'contentType', 'conditions', 'description'
        ];

        const errors = [];
        const invalidFields = Object.keys(data).filter(key => !allowedFields.includes(key));

        if (invalidFields.length > 0) {
            errors.push(`Invalid fields: ${invalidFields.join(', ')}`);
        }

        // Validar solo los campos presentes
        const validationData = {};
        allowedFields.forEach(field => {
            if (data.hasOwnProperty(field)) {
                validationData[field] = data[field];
            }
        });

        if (Object.keys(validationData).length > 0) {
            const validation = this.validateMockConfiguration({ ...validationData, route: validationData.route || '/dummy', method: validationData.method || 'get' });
            if (!validation.isValid) {
                errors.push(...validation.errors);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Sanitizar campos de entrada
    static sanitizeInput(data) {
        const sanitized = {};
        const fieldsToExcludeFromSanitization = ['route', 'contentType']; // Campos que no deben escaparse

        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'string' && !fieldsToExcludeFromSanitization.includes(key)) {
                sanitized[key] = validator.escape(data[key]);
            } else {
                sanitized[key] = data[key];
            }
        });

        return sanitized;
    }
}