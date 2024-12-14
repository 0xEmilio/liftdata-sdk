import createApiSdk from '../src/index.js';

const apiKey = '<api key>';
const api = createApiSdk(apiKey, 'https://staging.processing.studio.liftdata.ai/');

(async () => {
    try {
        const health = await api.getHealth();
        console.log('Health:', health);
    } catch (error) {
        console.error('Error:', error);
    }
})();
