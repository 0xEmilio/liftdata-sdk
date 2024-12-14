// src/index.js
import ApiClient from './ApiClient.js';
import ApiEndpoints from './ApiEndpoints.js';

const DEFAULT_BASE_URL = 'https://processing.studio.liftdata.ai/'; // fallback

// allows overrides on base URL
const createApiSdk = (apiKey, baseURL = DEFAULT_BASE_URL) => {
    if (!apiKey) {
        throw new Error('API key is required to initialize the SDK.');
    }
    const client = new ApiClient(baseURL, apiKey);
    return new ApiEndpoints(client);
};

export default createApiSdk;

