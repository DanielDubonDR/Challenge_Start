import { getUUID } from "../adapters/get-uuid.adapter.js";

// Modelo MockConfiguration para representar una configuración de mock
export class MockConfiguration {
    constructor({
        route,
        method,
        urlParams = {},
        bodyParams = {},
        headers = {},
        responseHeaders = {},
        statusCode = 200,
        responseContent = {},
        contentType = "application/json",
        conditions = null,
        description = ""
    }) {
        this.id = getUUID();
        this.route = route;
        this.method = method.toLowerCase();
        this.urlParams = urlParams;
        this.bodyParams = bodyParams;
        this.headers = headers;
        this.responseHeaders = responseHeaders;
        this.statusCode = statusCode;
        this.responseContent = responseContent;
        this.contentType = contentType;
        this.conditions = conditions;
        this.description = description;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Método para actualizar la configuración del mock
    update(data) {
        const allowedFields = [
            'route', 'method', 'urlParams', 'bodyParams', 'headers', 'responseHeaders',
            'statusCode', 'responseContent', 'contentType', 'conditions', 'description'
        ];

        allowedFields.forEach(field => {
            if (data.hasOwnProperty(field)) {
                if (field === 'method' && data[field]) {
                    this[field] = data[field].toLowerCase();
                } else {
                    this[field] = data[field];
                }
            }
        });

        this.updatedAt = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            route: this.route,
            method: this.method,
            urlParams: this.urlParams,
            bodyParams: this.bodyParams,
            headers: this.headers,
            responseHeaders: this.responseHeaders,
            statusCode: this.statusCode,
            responseContent: this.responseContent,
            contentType: this.contentType,
            conditions: this.conditions,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}