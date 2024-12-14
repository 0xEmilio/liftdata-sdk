import createLiftSDK from '../src/index.js';

const apiKey = '<api key>';
const api = createLiftSDK(apiKey, 'https://staging.processing.studio.liftdata.ai/');

(async () => {
    try {
        const health = await api.getHealth();
        console.log('Health:', health);
    } catch (error) {
        console.error('Error:', error);
    }
})();
