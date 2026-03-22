# AI Domain

Rules for using AI and LLM systems in production software, tooling decisions, and responsible AI practices.


---

## When to Use What

### AI Infrastructure

| Need | Use |
|------|-----|
| AI model inference | [define yours] |
| Route or proxy AI requests | [define yours] |
| Vector storage or embeddings | [define yours] |
| RAG capabilities | [define yours] |

### AI-Assisted Development

| Need | Use |
|------|-----|
| AI coding assistant | [define yours] |
| CLI AI assistant | [define yours] |
| AI MR / PR reviews | [define yours] |

### MCP Servers

| Need | Action |
|------|--------|
| Build an MCP server | Submit for review — [define yours] |
| Deploy an MCP server | Use [define yours] |
| AI tool access to internal systems | Request an MCP server via the review process — [define yours] |

### Responsible AI

| Situation | Requirement |
|-----------|-------------|
| Build with generative AI | Opt out of training data usage by default |
| Use LLM-generated code | Thorough code review is required before merging |


## Rules

### AI-001: Never use LLM output as a trust boundary

**Rule**: Treat all LLM-generated output as untrusted user input and validate it before use in business logic, database writes, or downstream API calls.

**Rationale**: LLMs can be prompt-injected, hallucinate structured data, or produce malformed output. Downstream systems that trust LLM output without validation are vulnerable to injection attacks and data corruption.

**Good example**:
```python
result = llm.complete(prompt)
parsed = parse_and_validate(result, schema=OutputSchema)  # validates + sanitizes
db.insert(parsed)
```

**Bad example**:
```python
result = llm.complete(prompt)
db.insert(json.loads(result))  # trusts raw LLM output directly
```


### AI-002: Log LLM inputs and outputs for auditability

**Rule**: Log all LLM prompts and responses (or a hash of them) in production systems for debugging and compliance purposes.

**Rationale**: Without logs, reproducing failures, detecting prompt injection, or explaining model decisions to customers or auditors is impossible. Structured logs enable alerting on unexpected patterns.

**Good example**:
```python
logger.info("llm_request", extra={
    "prompt_hash": sha256(prompt),
    "model": model_id,
    "tokens_in": usage.prompt_tokens,
    "tokens_out": usage.completion_tokens,
    "latency_ms": elapsed,
})
```

**Bad example**:
```python
result = llm.complete(prompt)
return result  # no logging, no observability
```

**Notes**: If prompts contain PII, log only a hash or truncated version. Review your data retention policy before logging full prompts.


### AI-003: Set explicit token and cost limits on LLM calls

**Rule**: Always set `max_tokens` and implement per-request cost budgets when calling LLM APIs.

**Rationale**: Without limits, a single malformed prompt or unexpected input can generate an extremely long (and expensive) response. Unbounded LLM calls are a reliability and cost risk.

**Good example**:
```python
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    max_tokens=512,   # explicit limit
    temperature=0.2,
)
```

**Bad example**:
```python
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    # no max_tokens — response length is unbounded
)
```


### AI-004: Do not embed secrets or PII in LLM prompts

**Rule**: Never include API keys, passwords, tokens, or personally identifiable information in prompts sent to external LLM providers.

**Rationale**: Prompts sent to third-party LLM APIs may be logged by the provider, used for training, or exposed in data breaches. Embedding secrets or PII in prompts violates security and privacy policies.

**Good example**:
```python
# Pass only the user's query, not their account data
prompt = f"Summarize the following support request: {user_query}"
```

**Bad example**:
```python
# Embeds PII and account credentials in the prompt
prompt = f"User {user.email} with API key {user.api_key} is asking: {user_query}"
```


### AI-005: Use structured output formats when parsing LLM responses

**Rule**: When LLM output will be parsed programmatically, instruct the model to respond in a structured format (JSON, YAML) and use a schema to validate the response.

**Rationale**: Free-text LLM responses are brittle to parse with regex or heuristics. Structured output with schema validation catches malformed responses early and makes error handling explicit.

**Good example**:
```python
prompt = """Extract the following fields as JSON:
{ "name": string, "amount": number, "currency": string }

Input: "Pay John $42.50"
"""
response = llm.complete(prompt)
data = OutputSchema.model_validate_json(response)  # pydantic or similar
```


### AI-006: [Scaffold] Define retry and fallback behavior for LLM calls

**Rule**: <!-- Define your org's standard for retrying failed LLM API calls and falling back gracefully -->

**Rationale**: <!-- Why this matters for your systems -->

**Good example**:
```python
# TODO: add your example
```

**Bad example**:
```python
# TODO: add your counterexample
```


### AI-007: [Scaffold] Establish evaluation standards for AI features before production

**Rule**: <!-- Define what evaluation (evals) are required before shipping an AI-powered feature -->

**Rationale**: <!-- Your rationale here -->

**Notes**: Consider: accuracy benchmarks, regression tests, human eval sample size.


### AI-008: [Scaffold] Document model version pinning policy

**Rule**: <!-- Define whether and how model versions should be pinned in production -->

**Rationale**: <!-- LLM providers silently update models; define your policy for managing this risk -->
