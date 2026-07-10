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
    git checkout main
    git pull
    git checkout -b chore/ui5wc-{{WCVersion}}
    ```

2. Bump the UI5 core components to the latest version.

    **Check [UI5/webcomponents#10568](https://github.com/UI5/webcomponents/issues/10568) for the latest release** — they usually release around the **5th of each month**, and we release afterwards.

3. Update `package.json` with the new version, then reinstall dependencies:
    ```bash
    rm -rf node_modules && yarn
    ```

---

### Step 2 — Regenerate UI5 Web Component Wrappers

Run the following commands in order:

```bash
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

## Standard Release

> TODO: Add standard release process (non-UI5 version bump)

---

## Hotfix Release

See [Hotfix Release in deployment.md](./deployment.md#hotfix-release) for the hotfix process.
