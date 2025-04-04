import { defineConfig } from '@playwright/test';

export default defineConfig({
    timeout: 30000, // 30 seconds timeout for each test
    use: {
        baseURL: 'https://github.com',
        headless: false, // Set to true if you don't want a browser UI
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    }
});
