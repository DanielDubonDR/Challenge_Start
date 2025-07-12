import { MockConfiguration } from "../models/mock.model.js";

// MockFactory para crear configuraciones de mocks
export class MockFactory {
    static createMockConfiguration(data) {
        try {
            return new MockConfiguration(data);
        } catch (error) {
            throw new Error(`Error creating mock configuration: ${error.message}`);
        }
    }

    static createMockFromTemplate(template, overrides = {}) {
        const mergedData = { ...template, ...overrides };
        return this.createMockConfiguration(mergedData);
    }

    static createResponseTemplate(statusCode, content, contentType = "application/json") {
        return {
            statusCode,
            responseContent: content,
            contentType
        };
    }

    static createConditionalResponse(conditions, responses) {
        return {
            conditions,
            responses
        };
    }
}