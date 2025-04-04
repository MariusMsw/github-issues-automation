import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export const config = {
    token: process.env.GITHUB_TOKEN ?? '',
    baseUrl: 'https://api.github.com/repos/microsoft/vscode'
};
