# Deployment Processes

**Purpose:** Step-by-step deployment procedures for Netlify, GitHub Pages, and release workflows. Includes commands, prerequisites, and access requirements.

---

## GitHub Pages Artifact Deployment

Stable releases publish the documentation through the official GitHub Pages artifact flow in the `Create Release`
workflow. When the release's npm tag is `latest`, `pages_build` checks out `main`, regenerates `components.json`,
builds the production documentation, validates the complete `dist/apps/docs` directory, and uploads that directory as
the Pages artifact. `pages_deploy` then deploys only the uploaded artifact to the `github-pages` environment.
Prereleases and archived hotfixes skip both jobs.

### One-time cutover from branch deployment

Repository administrator access is required. Merge and validate the workflow change before changing repository
settings. Complete this cutover before the next stable release. Do not trigger a synthetic release to test the
cutover.

1. Record the current Pages configuration, protected `gh-pages` branch SHA, and the status and response headers for the
   root page, `llms.txt`, and `components.json`:

    ```bash
    gh api repos/SAP/fundamental-ngx/pages
    git ls-remote origin refs/heads/gh-pages
    curl -fsSIL https://sap.github.io/fundamental-ngx/
    curl -fsSIL https://sap.github.io/fundamental-ngx/llms.txt
    curl -sSIL https://sap.github.io/fundamental-ngx/components.json
    ```

2. Confirm the merged workflow's normal `main` prerelease run skips `pages_build`; the existing `npmTag == latest`
   gate must remain unchanged.
3. In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Do not use
   `actions/configure-pages` enablement to change the source.
4. Confirm the setting changed:

    ```bash
    gh api repos/SAP/fundamental-ngx/pages --jq .build_type
    ```

    The result must be `workflow`.

5. Keep the protected `gh-pages` branch unchanged as the rollback copy. Use the normal next stable-release process; do
   not publish a release solely to exercise Pages.
6. After that stable release deploys, verify the published artifact:

    ```bash
    curl -fsSIL https://sap.github.io/fundamental-ngx/
    curl -fsSIL https://sap.github.io/fundamental-ngx/llms.txt
    curl -fsS https://sap.github.io/fundamental-ngx/components.json \
        | jq -e '.components | type == "array" and length > 0'
    ```

    The root must return HTML, `llms.txt` must be non-empty plain text, and `components.json` must be valid JSON with a
    non-empty `components` array.

### Rollback to the retained branch

If the first Actions deployment fails or the site regresses, return to **Settings → Pages → Build and deployment →
Source**, select **Deploy from a branch**, choose `gh-pages` and `/ (root)`, and verify the URLs recorded before the
cutover. This restores the last known branch artifact; it does not repair the legacy automation, which cannot write to
the protected branch. Keep `gh-pages` intact, and revert the workflow change separately before a later stable release.

## Netlify Deploy Older Versions (Manual)

Deploy older version documentation to Netlify so users can access historical docs. Netlify cleans up old branch deployments automatically, so we manually configure specific versions to persist.

**Why:** Users need access to older version documentation pages. This process ensures specific versions remain deployed on Netlify.

**Prerequisites:**

- Netlify admin access to [Fundamental NGX](https://app.netlify.com/sites/fundamental-ngx/configuration/deploys)
- Version tag to deploy (e.g., `v0.63.0`)

**Reference:** [Sprint Reviews Wiki - Netlify Deploying Previews](https://github.tools.sap/TI-DX-Fundamental/sprint-reviews/wiki/Netlify-deploying-previews)

---

**Example:** Deploy version `0.63.0`

**Step 1:** Configure Netlify branch deployment

1. Go to [Netlify deployment configuration](https://app.netlify.com/sites/fundamental-ngx/configuration/deploys)
2. Scroll to [Branches and deploy contexts](https://app.netlify.com/sites/fundamental-ngx/configuration/deploys#branches-and-deploy-contexts)
3. Click **Configure**
4. Add `docs/0.63` to the **Additional Branches** field
5. Click **Save**

**Step 2:** Create and push the docs branch

```bash
# Checkout the version tag
git checkout v0.63.0

# Create docs branch (format: docs/X.YY)
git checkout -b docs/0.63

# Push the branch to trigger Netlify build
git push --set-upstream origin docs/0.63
```

**Step 3:** Monitor deployment

1. Go to [Netlify deploys](https://app.netlify.com/sites/fundamental-ngx/deploys)
2. Look for `Branch Deploy: docs/0.63@...`
3. Click to view deployment details
4. Once complete, deployment link will be: `https://docs-0-63--fundamental-ngx.netlify.app/`

**Notes:**

- Use two-digit minor versions in branch names: `docs/0.63`, not `docs/0.63.0`
- The deployment creates a version dropdown in the docs UI (see version selector in deployed docs)
- Only configure branches for versions users actively need — don't deploy every version

---

## Update an Existing Docs Branch to a Newer Patch (Fast-Forward)

Use when a `docs/X.YY` branch already exists but serves an old patch (e.g. `docs/0.58` sits at `0.58.0`) and you want it to serve a newer tag on the same minor line (`v0.58.10`). Netlify re-deploys on push. No Netlify config change needed.

Substitute your own values: `0.58` → your minor, `v0.58.10` → your tag. Branch names use two-digit minors (`docs/0.58`).

**1. Verify it's a clean fast-forward** (no merge/rebase/force):

```bash
git fetch origin
# (a) branch tip must be an ancestor of the tag:
git merge-base --is-ancestor origin/docs/0.58 v0.58.10 && echo "ff OK"
# (b) must print 0 — else the branch has commits that would be lost; STOP:
git rev-list --count v0.58.10..origin/docs/0.58
```

**2. Push the tag's commit onto the branch** (no `--force`):

```bash
git push origin 'v0.58.10^{commit}:refs/heads/docs/0.58'
```

`^{commit}` is literal syntax, not a placeholder. Quote it — zsh expands unquoted `^{}`. Output should show `..` (not `+`/`forced update`). Alternative: `git push origin <sha>:refs/heads/docs/0.58`.

**3. Verify + confirm the site:**

```bash
git fetch origin && git log -1 --format="%h %s" origin/docs/0.58   # now the new tag
```

Then open `https://docs-0-58--fundamental-ngx.netlify.app` and **visually confirm the fix** — a moved ref isn't a verified deploy.

**Rollback:** `git push origin <old-sha>:refs/heads/docs/0.58 --force-with-lease`.

### Troubleshooting: build fails with `Nx Cloud … unable to be authorized`

Old tags (< ~0.61) carry a stale `nxCloudAccessToken` in `nx.json`. **Fix:** add `NX_NO_CLOUD=true` in Netlify → Site configuration → Environment variables (scope: Builds), then retry. It's a persistent var, so it covers all old-branch redeploys.

---

## Netlify Deploy via gh-pages (Alternative)

Deploy a specific version tag to Netlify using gh-pages.

**Prerequisites:**

- Admin rights on the repository

**Steps:**

```bash
# Checkout the version tag
git checkout v0.63.1

# Install dependencies (frozen lockfile)
yarn install --frozen-lockfile

# Build docs for production
npx nx run docs:compile:production --skip-nx-cache

# Deploy to gh-pages
npx gh-pages \
  --dist dist/apps/docs \
  --message "docs: deploy v0.63.1 [ci skip]" \
  --dotfiles
```

---

## Hotfix Release

Create a patch release from a previous version by cherry-picking specific fixes.

**Prerequisites:**

- Access to NPM to verify the latest released version
- Cherry-pick commit hashes ready

**Steps:**

```bash
# Sync with remote
git pull
git fetch --tags

# Checkout the last released version (check NPM for latest)
# Example: v0.54.5
git checkout v0.54.5

# Create hotfix branch with bumped version (+1 patch)
# Example: v0.54.6
git checkout -b fix/v0.54.6-fixes

# Clean install dependencies
rm -rf node_modules
yarn install

# Cherry-pick the fixes in order
git cherry-pick commit-hash-1
git cherry-pick commit-hash-2
git cherry-pick commit-hash-3

# Run hotfix release script
yarn hotfix-release
```

**Notes:**

- Version numbers are examples — always check NPM for the actual latest release
- The new branch name should reflect the bumped version (last version + 0.0.1)
- Cherry-pick commits in the order they were originally applied to avoid conflicts

---

## CI/CD Deployment

Deployment is automated via GitHub Actions when:

- A new release tag is pushed
- Changes are merged to `main` (deploys preview)

**Manual trigger:**

```bash
# Trigger deployment workflow manually (via GitHub CLI)
gh workflow run deploy.yml
```

---

## Troubleshooting Deployment

### Build fails with cache errors

```bash
# Clear NX cache and retry
nx reset
npx nx run docs:compile:production
```

### gh-pages push rejected

Ensure you have admin rights and the branch is not protected:

```bash
# Check remote settings
git remote -v
```
