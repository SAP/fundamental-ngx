# Release Processes

**Purpose:** Step-by-step procedures for releasing new versions of Fundamental NGX, including UI5 Web Components updates, standard releases, and hotfix releases.

---

## UI5 Web Components Release

Release a new version of the library with updated UI5 Web Components.

**Reference:** [Fundamental Library Wiki - Create Release of Fundamental NGX](https://github.tools.sap/Fundamental-Library/fundamental-library/wiki/Create-release-of-Fundamental-NGX)

**Prerequisites:**

- Access to the GitHub repository and Actions
- `yarn` and `nx` available in your environment

---

### Step 1 — Prepare the Branch

1. Create a branch from the latest `main`:

    ```bash
    git fetch origin
    git switch -c chore/ui5wc-{{WCVersion}} origin/main
    ```

2. Bump the eight direct UI5 Web Components dependencies together, preserving their `~` version prefix: `@ui5/webcomponents`, `@ui5/webcomponents-ai`, `@ui5/webcomponents-base`, `@ui5/webcomponents-fiori`, `@ui5/webcomponents-icons`, `@ui5/webcomponents-icons-business-suite`, `@ui5/webcomponents-icons-tnt`, and `@ui5/webcomponents-theming`. `@ui5/tooling-webc` has a separate version series.

    **Check [UI5/webcomponents#10568](https://github.com/UI5/webcomponents/issues/10568) for the latest release** — they usually release around the **5th of each month**, and we release afterwards.

3. Update `package.json` with the new version, then refresh and verify the lockfile:

    ```bash
    yarn install
    yarn install --immutable
    ```

4. Review the new `@ui5/webcomponents*/dist/custom-elements-internal.json` manifests against the CEM fields consumed by [`libs/webc-generator/src/executors/generate/cem-types.ts`](../../libs/webc-generator/src/executors/generate/cem-types.ts). Check UI5-specific fields such as `_ui5formProperty`, `_ui5formEvents`, `_ui5parameters`, and `_ui5since`. The generator casts parsed JSON to these local types; TypeScript does **not** validate the manifest at runtime. Update the local types and generator tests when consumed fields change.

5. Check published `@ui5/webcomponents-tools` versions and release notes separately (for example, `npm view @ui5/webcomponents-tools versions --json`), including whether a version drops the legacy WDIO dependencies. The package is **not installed in this repository**: the generator only needed its internal CEM declarations as types, now represented locally. An update to tools will not appear in our dependency-update PRs; do not re-add it solely for type imports. Check explicit published versions rather than relying only on the `latest` dist-tag.

    > **Before using the `ui5-wrapper-updater` agent:** check that its instructions no longer add `@ui5/webcomponents-tools` as a direct dependency. The agent instructions reviewed with this change still list it; HERMES must update them. Follow this release guide until then.

---

### Step 2 — Regenerate UI5 Web Component Wrappers

Build and test the generator before regenerating. `yarn cleanup` removes ignored generated files and can discard local wrapper work; preserve unrelated changes before running it. Run the following commands in order:

```bash
nx run webc-generator:build --skip-nx-cache
nx run webc-generator:test --skip-nx-cache

# Remove existing generated wrapper components
yarn cleanup

# Regenerate wrappers
nx run ui5-webcomponents-base:generate --skip-nx-cache
nx run ui5-webcomponents:generate --skip-nx-cache
nx run ui5-webcomponents-ai:generate --skip-nx-cache
nx run ui5-webcomponents-fiori:generate --skip-nx-cache

# Build all UI5 wrapper libraries
nx run ui5-webcomponents-base:build --skip-nx-cache
nx run ui5-webcomponents:build --skip-nx-cache
nx run ui5-webcomponents-ai:build --skip-nx-cache
nx run ui5-webcomponents-fiori:build --skip-nx-cache
```

Run all four `generate` targets a second time without Nx cache and compare output file counts and hashes between the two runs. A new UI5 release can intentionally change the output compared with the previous release, but two runs against the **same** release must match. Review any changed wrappers and their source CEM fields before committing.

---

### Step 3 — Verify the Documentation App

```bash
yarn start
```

- Review the UI5 Web Components **release notes** and test any newly added or changed functionality in the docs app.
- Check for **newly added components** and create issues to track adding them to the documentation for the wrappers.
    > **Do not** add new component docs to the current PR — track them as separate issues.

---

### Step 4 — Create a PR with the Changes

```bash
git add .
git commit -m "chore(deps): ui5-webcomponents version {{WCVersion}}"
git push --set-upstream origin chore/ui5wc-{{WCVersion}}
```

Create a pull request and wait for approval and merge.

---

### Step 5 — Trigger the Release

1. Once the above PR is merged, go to **GitHub → Actions**
2. Select **"Create Release"** workflow
3. Click **"Run workflow"**, selecting the `main` branch
4. Click **"Run workflow"** to confirm

---

### Step 6 — Verify the Release

1. Under **Actions**, confirm the release workflow completed successfully.
2. Under **Releases**, confirm the latest release tag is present.
3. Optionally, verify the new version is published on **npm**.

---

## Hotfix Release

See [Hotfix Release in deployment.md](./deployment.md#hotfix-release) for the hotfix process.
