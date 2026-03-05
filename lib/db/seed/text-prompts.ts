export const textPromptsSeed = [
  // ─── GPT-5.4 ─────────────────────────────────────────────────
  {
    category: "text",
    targetModel: "gpt-5.4",
    prompt: `## Role
You are a senior software architect with 20 years of experience in distributed systems.

## Context
We are migrating a monolithic e-commerce application to microservices architecture. The current system handles 50K requests/second at peak and uses PostgreSQL as the primary database.

## Task
Design a migration strategy that includes:
1. Service decomposition plan (which bounded contexts become services)
2. Data migration approach (shared database → database-per-service)
3. Inter-service communication patterns (sync vs async)
4. Rollback strategy for each phase

## Constraints
- Zero downtime migration required
- Budget: $50K for infrastructure during transition
- Team size: 8 engineers
- Timeline: 6 months

## Output Format
Respond in structured Markdown with:
- Executive summary (3 sentences)
- Phase-by-phase plan (Gantt-style timeline)
- Risk matrix (likelihood × impact)
- Architecture diagram (Mermaid syntax)`,
    tags: ["architecture", "microservices", "migration", "gpt-5.4"],
    quality: 0.97,
    source: "curated",
  },
  {
    category: "text",
    targetModel: "gpt-5.4-thinking",
    prompt: `## Role
You are a mathematical reasoning expert and competitive programming coach.

## Task
Solve the following optimization problem step by step:

Given a weighted directed graph G with N nodes and M edges, find the minimum cost to visit all nodes exactly once starting from node 1 and returning to node 1 (Traveling Salesman Problem variant).

## Input
N = 15, edges provided as adjacency matrix.

## Requirements
1. Analyze the problem complexity
2. Choose the optimal algorithm (exact vs heuristic based on N)
3. Implement the solution in Python with type hints
4. Prove the time and space complexity
5. Provide test cases with edge cases

## Reasoning Instructions
Think through each step carefully. Show your working for the complexity analysis. Consider dynamic programming with bitmask approach given N ≤ 15.

## Output Format
- Analysis section with complexity proof
- Clean Python implementation
- Test results table`,
    tags: ["algorithm", "optimization", "reasoning", "competitive-programming", "gpt-5.4-thinking"],
    quality: 0.96,
    source: "curated",
  },

  // ─── Claude ──────────────────────────────────────────────────
  {
    category: "text",
    targetModel: "claude-sonnet",
    prompt: `<role>You are a senior technical writer with 15 years of experience in developer documentation.</role>

<context>We are creating API documentation for a new REST API that handles user authentication and authorization. The API uses JWT tokens and supports OAuth 2.0 flows.</context>

<task>Write comprehensive API documentation for the /auth endpoints including:
1. POST /auth/login
2. POST /auth/register
3. POST /auth/refresh
4. DELETE /auth/logout</task>

<rules>
- Use OpenAPI 3.0 format for endpoint specifications
- Include request/response examples with realistic data
- Document error codes and their meanings
- Add security considerations section
- Write in clear, concise technical English
</rules>

<examples>
Input: POST /auth/login with email and password
Output: JWT access token (15min) and refresh token (7d)
</examples>

<output_format>Markdown with code blocks for JSON examples</output_format>`,
    tags: ["api-docs", "technical-writing", "authentication", "claude"],
    quality: 0.96,
    source: "curated",
  },
  {
    category: "text",
    targetModel: "claude-opus",
    prompt: `<role>You are a world-class security researcher specializing in web application security.</role>

<context>Our company is preparing for SOC 2 Type II audit. We have a Next.js 15 application deployed on Vercel with a Neon PostgreSQL database. The app handles PII (names, emails, addresses) and payment data (via Stripe integration).</context>

<task>Perform a comprehensive security audit checklist:
1. Authentication & Authorization review
2. Data encryption (at rest and in transit)
3. Input validation and sanitization
4. API security (rate limiting, CORS, CSP)
5. Infrastructure security (env vars, secrets management)
6. OWASP Top 10 compliance check
7. GDPR/CCPA data handling requirements</task>

<constraints>
- Focus on actionable findings, not theoretical risks
- Prioritize by severity (Critical/High/Medium/Low)
- Include remediation steps for each finding
- Reference specific CWE numbers where applicable
</constraints>

<output_format>
Structured report with:
- Executive summary
- Findings table (ID, Severity, Description, CWE, Remediation)
- Compliance checklist (SOC 2 controls mapping)
</output_format>`,
    tags: ["security", "audit", "soc2", "owasp", "claude-opus"],
    quality: 0.98,
    source: "curated",
  },

  // ─── GPT-4o ──────────────────────────────────────────────────
  {
    category: "text",
    targetModel: "gpt-4o",
    prompt: `## Role
You are an experienced data analyst with expertise in e-commerce metrics.

## Task
Analyze the provided sales data and generate a comprehensive monthly report.

## Instructions
1. Calculate key metrics: revenue, AOV, conversion rate, customer retention
2. Identify top 5 performing products and bottom 5
3. Compare with previous month (MoM) and same month last year (YoY)
4. Highlight anomalies or significant trends
5. Provide 3 actionable recommendations

## Output Format
- Executive summary (3 sentences)
- Metrics table (Markdown)
- Trend analysis (bullet points)
- Recommendations (numbered list)

## Constraints
- Use only the provided data, do not assume
- Round all percentages to 1 decimal place
- Flag any data quality issues you notice`,
    tags: ["data-analysis", "e-commerce", "report", "gpt-4o"],
    quality: 0.93,
    source: "curated",
  },

  // ─── Gemini ──────────────────────────────────────────────────
  {
    category: "text",
    targetModel: "gemini-pro",
    prompt: `Your task is to analyze the following research paper and provide a structured summary.

## Instructions
1. Identify the main thesis and research question
2. Summarize the methodology (data sources, sample size, analysis techniques)
3. List the key findings (5 bullet points max)
4. Evaluate the limitations acknowledged by the authors
5. Suggest 3 follow-up research directions

## Format Requirements
- Use academic language but keep it accessible
- Include relevant statistical measures mentioned in the paper
- Highlight contradictions with existing literature if any
- Keep the total summary under 500 words

## Context
This is for a weekly research digest newsletter targeting senior researchers in AI/ML. The audience is familiar with technical concepts but values concise summaries.`,
    tags: ["research", "academic", "summary", "gemini"],
    quality: 0.91,
    source: "curated",
  },

  // ─── Kimi K2.5 ───────────────────────────────────────────────
  {
    category: "text",
    targetModel: "kimi-k2.5",
    prompt: `你是一位精通中英文的技术翻译专家。

## 任务
将以下技术文档从英文翻译成中文，同时保持专业术语的准确性。

## 翻译规则
1. 技术术语保留英文原文并在首次出现时标注中文翻译
2. 代码示例和API名称不翻译
3. 保持原文的Markdown格式
4. 对于有歧义的术语，提供多个翻译选项并标注推荐选择
5. 在文末添加术语表（中英对照）

## 质量要求
- 翻译要自然流畅，避免机器翻译腔
- 符合中国技术社区的表达习惯
- 关键概念保持前后一致
- 段落逻辑清晰连贯

## 输出格式
Markdown格式，包含翻译正文和术语对照表`,
    tags: ["translation", "chinese", "technical", "bilingual", "kimi"],
    quality: 0.90,
    source: "curated",
  },
];
