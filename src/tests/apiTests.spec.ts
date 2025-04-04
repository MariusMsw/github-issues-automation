import { test, expect } from '@playwright/test';
import { GitHubApi } from '../api/githubApi';

test.describe('GitHub API Tests', () => {
    let api: GitHubApi;
    let issueNumber: string;

    test.beforeAll(() => {
        api = new GitHubApi();
    });

    test('Create, retrieve, and close an issue, then verify details', async () => {
        // Step 1: Create an issue
        const createResponse = await api.createIssue('Test Issue', 'This is a test issue.');
        expect(createResponse.ok()).toBeTruthy();
    
        const createdIssue = await createResponse.json();
        issueNumber = createdIssue.number;
    
        expect(createdIssue.title).toBe('Test Issue');
        expect(createdIssue.body).toBe('This is a test issue.');
    
        // Step 2: Retrieve the created issue and verify details
        const getResponse = await api.getIssue(issueNumber);
        expect(getResponse.ok()).toBeTruthy();
    
        const retrievedIssue = await getResponse.json();
        expect(retrievedIssue.number).toBe(issueNumber);
        expect(retrievedIssue.state).toBe('open');
    
        // Step 3: Close the issue and verify status
        const closeResponse = await api.closeIssue(issueNumber);
        expect(closeResponse.ok()).toBeTruthy();
    
        const closedIssueResponse = await api.getIssue(issueNumber);
        const closedIssue = await closedIssueResponse.json();
        expect(closedIssue.state).toBe('closed');
    });
    
    test('Create an issue with missing title', async () => {
        const response = await api.createIssue('', 'This issue has no title.');
        expect(response.ok()).toBeFalsy();

        const errorResponse = await response.json();
        expect(errorResponse.message).toContain('Validation Failed');
    });

    test('Create an issue with missing body', async () => {
        const response = await api.createIssue('Title Only', '');
        expect(response.ok()).toBeTruthy();

        const createdIssue = await response.json();
        expect(createdIssue.title).toBe('Title Only');
    });

    test('Create an issue with both title and body missing', async () => {
        const response = await api.createIssue('', '');
        expect(response.ok()).toBeFalsy();
        const errorResponse = await response.json();
        expect(errorResponse.message).toContain('Validation Failed');
    });

    test('Retrieve an issue with a non-existent ID', async () => {
        const nonExistentId = '999999999abc';
        const response = await api.getIssue(nonExistentId);
        expect(response.ok()).toBeFalsy();

        const errorResponse = await response.json();
        expect(errorResponse.message).toContain('Not Found');
    });

    test('Attempt to close an already closed issue', async () => {
        const closedResponse = await api.closeIssue(issueNumber);
        expect(closedResponse.ok()).toBeTruthy();

        const secondCloseResponse = await api.closeIssue(issueNumber);
        expect(secondCloseResponse.ok()).toBeTruthy();

        const closedIssueResponse = await api.getIssue(issueNumber);
        const closedIssue = await closedIssueResponse.json();
        expect(closedIssue.state).toBe('closed');
    });
});
