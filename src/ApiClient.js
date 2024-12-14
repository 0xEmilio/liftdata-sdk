// src/ApiClient.js
import axios from 'axios';

class ApiClient {
    constructor(baseURL, apiKey) {
        this.client = axios.create({
            baseURL,
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json',
            },
        });
    }

    async request(method, url, data = {}, params = {}, headers = {}) {
        try {
            const response = await this.client({
                method,
                url,
                data,
                params,
                headers: {
                    ...this.client.defaults.headers,
                    ...headers,
                },
            });
            return response.data;
        } catch (error) {
            const status = error.response?.status || 500;
            const message = error.response?.data || error.message;
            console.error(`API Error [${status}]: ${message}`);
            throw message;
        }
    }
}

export default ApiClient;
