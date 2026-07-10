# Deployment Processes

**Purpose:** Step-by-step deployment procedures for Netlify, GitHub Pages, and release workflows. Includes commands, prerequisites, and access requirements.

---

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
