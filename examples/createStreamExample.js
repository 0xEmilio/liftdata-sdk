import createLiftSDK from '../src/index.js';

// Initialize the SDK with just the API key (uses the default base URL)
const apiKey = '<your API key>';
const api = createLiftSDK(apiKey);

(async () => {
    try {
        // Stream data to be sent in the request
        const streamData = {
            name: '<stream_name>',
            url: '<stream_URL>',
            pause_between_frames_ms: 1000,
            model_id: '<model_id>',
            worker_duration_minutes: 10,
        };

        // Call the createStream endpoint
        const response = await api.createStream(streamData);
        console.log('Stream Created Successfully:', response);
    } catch (error) {
        console.error('Error Creating Stream:', error);
    }
})();
