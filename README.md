# ChatGPT Buttler

A GitHub action to handle issues first response with ChatGPT

The action will reply to unanswered issues with the reply of ChatGPT. 

It is highly encouraged to customize the prompt to give a bit of context.

The issues will be handled as ordered by date from most recent to least.

A limit of 10 issues are treated at a time.

## Inputs

Name | Description | Default 
-- | --- | ---
repo-token | token to access github | ```${{ github.token }}```
max-issues | Maximum number of issues to process | 10
only-labels | Only check issues with these labels | 
prompt-preamble | Preamble to to prompt to chatgpt followed by the issue body' | 'Please help me answer the follwing github issue:\n\n'
openai-key* | OpenAI API key | |
chagpt-model | ChatGPT model to use | gpt-4
delay | Delay between two requests to the OpenAI API | 5 seconds

*: mandatory

## Usage

The task below will add the answer from ChatGPT to every unanswered issue.

```yaml
uses: surestacks/chatgpt-buttler@v0.1.0
with:
    openai-key: <openai key>
```

It can be limited to issues with selected labels.

```yaml
uses: surestacks/chatgpt-buttler@v0.1.0
with:
    only-labels: enhancement, question
    openai-key: <openai key>
```
