# ChatGPT Buttler

A GitHub action to handle issues first response with ChatGPT

The action will reply to unanswered issues with the reply of ChatGPT. 

It is highly encouraged to customize the prompt to give a bit of context.

The issues will be handled as ordered by date from most recent to least.

A limit of 10 issues are treated at a time.

## Inputs

Name | Description | Default 
-- | --- | ---
token | token to access github | ```${{ github.token }}```
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

## How to Get an OpenAI API Key

The action needs an Open AI key. Additionally, you can choose the model to use.

1. Go to OpenAI's Platform website at platform.openai.com and sign in with an OpenAI account.
2. Click your profile icon at the top-right corner of the page and select "View API Keys".
3. Click "Create New Secret Key" to generate a new API key.
4. Make sure to save the API key as soon as possible. Once the window showing it closes, you won't be able to reopen it.

You can create an OpenAI API key for free. New free trial users receive $5 (USD) worth of credit. However, this expires after three months. Once your credit has been used up or expires, you can enter billing information to continue using the API of your choice.

### Models

The OpenAI API is powered by a diverse set of models with different capabilities and price points. For chat applications, the following models are compatible:
- GPT-4 and GPT-4 Turbo: These models improve on GPT-3.5 and can understand as well as generate natural language or code.
- GPT-3.5: This model improves on GPT-3 and can understand as well as generate natural language or code.

### Throttling

OpenAI enforces rate limits at the organization level. Rate limits are measured in two ways: RPM (requests per minute) and TPM (tokens per minute). If you're looking for specific costs based on the AI model you want to use (for example, GPT-4 or gpt-3.5-turbo, as used in ChatGPT), check out [OpenAI's AI models and pricing page](https://platform.openai.com/docs/models).