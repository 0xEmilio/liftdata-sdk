// src/ApiEndpoints.js

// built from https://processing.dev-studio.liftdata.ai/openapi.json
class ApiEndpoints {
    constructor(client) {
        this.client = client;
    }

    // Health
    async getHealth() {
        return this.client.request('GET', '/health');
    }

    // Requests - Image Processing
    async processImage({ model_id, image, config_name, payload }) {
        const formData = new FormData();
        formData.append('model_id', model_id);
        formData.append('image', image);
        if (config_name) formData.append('config_name', config_name);
        if (payload) formData.append('payload', payload);

        return this.client.request('POST', '/requests', formData, {}, {
            'Content-Type': 'multipart/form-data',
        });
    }

    // Requests - Stream Frame Processing
    async processStreamFrame(stream_id, { frame, payload }) {
        const formData = new FormData();
        formData.append('frame', frame);
        if (payload) formData.append('payload', payload);

        return this.client.request(
            'POST',
            `/requests/streams/${stream_id}`,
            formData,
            {},
            { 'Content-Type': 'multipart/form-data' }
        );
    }

    // Requests - Get Processing Results
    async getProcessingResults(model_id, { page = 1, size = 15, q } = {}) {
        const params = { page, size, q };
        return this.client.request('GET', `/requests/models/${model_id}`, {}, params);
    }

    // Models - Get Statistics
    async getModelsStatistics(public_address) {
        return this.client.request('GET', '/models/statistics', {}, { public_address });
    }

    // Streams - Create
    async createStream({ url, model_id, name, pause_between_frames_ms = 100, worker_duration_minutes = 15 }) {
        const data = {
            url,
            model_id,
            ...(name && { name }),
            ...(pause_between_frames_ms && { pause_between_frames_ms }),
            ...(worker_duration_minutes && { worker_duration_minutes }),
        };

        return this.client.request('POST', '/streams', data);
    }

    // Streams - Get
    async getStreams({ page = 1, size = 15 } = {}) {
        return this.client.request('GET', '/streams', {}, { page, size });
    }

    // Streams - Stop
    async stopStream(stream_id) {
        return this.client.request('PATCH', `/streams/${stream_id}/stop`);
    }

    // Streams - Get Details
    async getStreamDetails(stream_id) {
        return this.client.request('GET', `/streams/${stream_id}`);
    }

    // Users - Get Users With Models
    async getUsers({ page = 1, size = 15 } = {}) {
        return this.client.request('GET', '/users/', {}, { page, size });
    }
}
export default ApiEndpoints;
