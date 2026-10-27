# Claude Code Agents

**Purpose:** How to use the project's Claude Code **subagents** — specialized assistants defined in [`.claude/agents/`](../../.claude/agents/) that handle focused, multi-step maintenance tasks.

> These are AI coding agents, distinct from the component-authoring reference guides in [`docs/agents/`](../agents/).

---

## What agents are

Each agent is a Markdown file in `.claude/agents/` with YAML frontmatter (`name`, `description`, allowed `tools`, `model`) followed by its instructions. Claude Code reads the `description` to decide when an agent applies, and runs the agent in its own isolated context — it reports back a result rather than dumping every file it read into the main conversation.

## How to invoke

- **Automatic** — just describe the task in plain language. If it matches an agent's `description`, Claude Code dispatches that agent. e.g. "audit the button docs for stale patterns" → `docs-auditor`; "update ui5-webcomponents to v2.28.0" → `ui5-wrapper-updater`.
- **Explicit** — name the agent: "use the ui5-wrapper-updater agent to bump to v2.28.0".

Agents run with only the tools their frontmatter grants, so they can't exceed their intended scope.

## Available agents

| Agent                                                                | What it does                                                                                                             | Give it                                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| [`docs-auditor`](../../.claude/agents/docs-auditor.md)               | Finds stale Angular patterns (`@Input()`, `*ngIf`, `ngClass`, `standalone: true`, …) in `libs/docs/` example files.      | A component name or directory, or "the whole docs library". |
| [`ui5-wrapper-updater`](../../.claude/agents/ui5-wrapper-updater.md) | Bumps `@ui5/webcomponents*` versions, regenerates the Angular wrappers, and updates wrapper docs for changed components. | The GitHub release changelog URL (e.g. `.../tag/v2.28.0`).  |

## Adding a new agent

1. Create `.claude/agents/<name>.md` with frontmatter (`name`, `description`, `tools`, optional `model`) and clear step-by-step instructions.
2. Write the `description` for _dispatch_ — state exactly when the agent should trigger, with example phrasings. This is what Claude Code matches against.
3. Grant the **minimum** tools the task needs (e.g. `Read, Glob, Grep` for a read-only auditor).
4. Add a row to the table above.

See the existing agents as templates.
