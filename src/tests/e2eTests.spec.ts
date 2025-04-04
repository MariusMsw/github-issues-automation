import { test, expect } from "@playwright/test";
import { GitHubApi } from "../api/githubApi";

const repoUrl = "https://github.com/microsoft/vscode/issues";
const githubApi = new GitHubApi(); // Instantiate GitHubApi class

test.describe("GitHub E2E Tests", () => {
  test("Create, close and verify issue via UI and ensure status change is reflected in the API", async ({page}) => {
    // Step 1: Navigate to the repository
    await page.goto(repoUrl);

    // Step 2: Click on the "New Issue" button
    await page.locator('a:has-text("New issue")').click();
    await page.locator('a:has-text("Bug report")').click();

    // Step 3: Fill in the issue title and description
    const issueTitle = "Issue from automation code";
    await page.locator('input[aria-label="Add a title"]"]').fill(issueTitle);

    // Step 4: Submit the issue
    await page.locator('button[data-testid="create-issue-button"]').click();

    // Step 5: Verify that the issue has been created
    await expect(page.locator('div[data-component="TitleArea"]')).toHaveText(
      issueTitle
    );

    // Step 7: Extract the issue number
    const issueIdLocator = page.locator(
      'div[data-component="TitleArea"] h1 span'
    );
    const issueIdText = await issueIdLocator.textContent();
    const issueId: string = (issueIdText ?? "").trim().replace("#", "");

    // Step 8: Close the issue via the UI (click "Close issue" button)
    await page.locator('button:has-text("Close issue")').click();

    // Step 9: Verify that the issue state is now 'closed' in the UI
    await expect(
      page.locator(
        'div[data-testid="issue-metadata-fixed"] span[data-testid="header-state"]'
      )
    ).toHaveText("Closed");

    // Step 10: Retrieve the issue details from the API and verify its state
    const apiResponse = await githubApi.getIssue(issueId);
    const issueData = await apiResponse.json();
    expect(issueData.state).toBe("closed");
  });
});
