const core = require('@actions/core');
const github = require('@actions/github');
import { ChatGPTAPI } from 'chatgpt'


try {
    // get octokit
    const octokit = github.getOctokit();
    // get chatgpt api with model from 'chatgpt-model' the key is available in 'openai-key'
    const chatgpt = new ChatGPTAPI({
        apiKey: core.getInput('openai-key'),
        completionParams: {
            model: core.getInput('chatgpt-model')
        }
    });
    // get unanswered issues from repository with provided labels or all if not provided
    const issues = octokit.rest.issues.listForRepo({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        labels: core.getInput('labels').replace(' ','').split(','),
        state: 'open',
        filter: 'unanswered'
    });
    // order the issues per creation date descending and take the x first ones. x being the provided 'max-issues'
    const orderedIssues = issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, core.getInput('max-issues'));
    // for each issue
    orderedIssues.forEach(async issue => {
        // info on issue treated
        core.info("Handling issue " + issue.number + " : " + issue.title);
        // create the prompt by prefixing the issue body with the provided 'prompt-preamble'
        const prompt = core.getInput('prompt-preamble') + "\n#" + issue.title + "\n" + issue.body;
        // log the prompt
        core.debug(issue.number + " > " + prompt);
        // get chatgpt answer
        const answer = await chatgpt(prompt, core.getInput('openai-key'));
        // log the answer
        core.debug(issue.number + " < " + answer);
        // ask chatgtp for a response to the prompt (the openai key is provided in 'openai-key')
        await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            issue_number: issue.number,
            body: answer
        });
        // log the answer
        core.info("Answered issue " + issue.number + " : " + issue.title);
        // wait a bit before handling the next issue
        await new Promise(resolve => setTimeout(resolve, core.getInput('openai-key') * 1000));
    }
    );
} catch (error) {
    core.setFailed(error.message);
}