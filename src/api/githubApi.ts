import { request } from '@playwright/test';
import { config } from '../../config/config';

export class GitHubApi {
    private baseUrl = config.baseUrl;
    private token = config.token;
    private headers = {
        Authorization: `token ${this.token}`,
        Accept: 'application/vnd.github.v3+json'
    };

    async createIssue(title: string, body: string) {
        const context = await request.newContext();
        const response = await context.post(`${this.baseUrl}/issues`, {
            headers: this.headers,
            data: { title, body }
        });
        return response;
    }

    async getIssue(issueNumber: string) {
        const context = await request.newContext();
        const response = await context.get(`${this.baseUrl}/issues/${issueNumber}`, {
            headers: this.headers
        });
        return response;
    }

    async closeIssue(issueNumber: string) {
        const context = await request.newContext();
        const response = await context.patch(`${this.baseUrl}/issues/${issueNumber}`, {
            headers: this.headers,
            data: { state: 'closed' }
        });
        return response;
    }
}
