# Graphify

**Purpose:** Set up and use the repository's local Graphify knowledge graph for codebase exploration.

---

## Setup

Install a Python tool manager once on your machine, then install Graphify:

```bash
# macOS with Homebrew
brew install uv
uv tool install --upgrade graphifyy

# or, if you use pipx
brew install pipx
pipx install graphifyy
```

The package is `graphifyy`; the command is `graphify`. Confirm the installation:

```bash
graphify --version
```

Create a local code graph from the repository root:

```bash
graphify extract . --code-only
```

This needs no API key. Verify it works:

```bash
graphify query "Where is the button component implemented?"
```

## Daily use

Use Graphify directly when useful:

```bash
graphify query "What depends on the dialog service?"
graphify path "ButtonComponent" "DialogService"
graphify explain "ButtonComponent"
```

After code changes, refresh the graph:

```bash
graphify update .
```

The repository includes Graphify skills for Claude Code and Codex. Ask a codebase question normally, or use `/graphify .` when you want the agent to build a graph that also includes documentation and images.

`graphify-out/` is generated locally and ignored by Git. Every clone needs its own initial graph.
