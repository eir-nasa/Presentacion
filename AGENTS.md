# EIR Showcase content language

- All public-facing content in EIR Showcase must be written in English.
- This includes navigation, headings, descriptions, placeholders, captions, accessibility labels and future sections.
- Internal technical documentation and development discussions may remain in Spanish.
- Do not translate technical identifiers, API routes, filenames or code symbols.
- Do not introduce unsupported scientific or medical claims.

# Agent workflow

- Use Luna subagents for bounded, repetitive work. Delegate repeated read-only code searches to the `code_investigator` agent and obvious, bounded command sequences to the `generalist` agent.
- Keep Terra as the primary agent responsible for thinking through the task, analysis, planning, and coordination of subagents. Luna agents execute the delegated work and report concise findings.
- The `code_investigator` should use the code-base-memory MCP for code searches when it is available. If that MCP is unavailable, verify findings directly in the repository and record short, reusable search notes in `code.md` at the project root. Keep notes concise and useful for future repeated searches; do not record guesses.
- The `generalist` should execute only bounded, obvious, non-destructive command sequences selected by the primary agent, and report the exact commands and results.
