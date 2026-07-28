# Useful Scripts

**Purpose:** Collection of shell scripts, one-liners, and automation helpers for common tasks. Copy-paste and modify as needed.

---

## Git & Version Management

### Create a release branch

```bash
# Create and push a release branch
git checkout -b release/v0.64.0 main
git push -u origin release/v0.64.0
```

### Tag a release

```bash
# Create annotated tag
git tag -a v0.64.0 -m "Release 0.64.0"
git push origin v0.64.0
```

### Find commits in a version range

```bash
# List commits between two tags
git log v0.63.0..v0.64.0 --oneline
```

---

## Code Search & Analysis

### Find all usages of a component

```bash
# Search for component selector in templates
grep -r "fd-button" libs/ apps/ --include="*.html"

# Search for import statements
grep -r "from '@fundamental-ngx/core/button'" libs/ apps/ --include="*.ts"
```

### Find deprecated APIs

```bash
# Search for @deprecated annotations
grep -r "@deprecated" libs/ --include="*.ts" -A 2
```

### Count lines of code by library

```bash
# Count TypeScript lines in core
find libs/core -name "*.ts" -not -path "*/node_modules/*" | xargs wc -l
```

---

## Testing & Quality

### Run tests for changed files only

```bash
# Run affected tests since main
nx affected:test --base=main --head=HEAD
```

### Find flaky tests

```bash
# Run tests 10 times and report failures
for i in {1..10}; do
  echo "Run $i"
  npx playwright test || echo "FAILED on run $i"
done
```

### Update all snapshots for a specific component

```bash
# Update snapshots for button tests
npx playwright test --update-snapshots --grep "button"
```

---

## Build & Bundle Analysis

### Analyze bundle size

```bash
# Build and analyze docs bundle
npx nx run docs:build:production --stats-json
npx webpack-bundle-analyzer dist/apps/docs/stats.json
```

### Check build output size

```bash
# Build and show sizes
npx nx run core:build
du -sh dist/libs/core
```

---

## Cleanup

### Remove all node_modules and rebuild

```bash
# Nuclear option: clean everything
rm -rf node_modules dist .nx
yarn install
nx reset
```

### Clear NX cache for specific project

```bash
# Clear cache for one library
nx reset
rm -rf node_modules/.cache/nx
```

### Remove untracked files (dry run first!)

```bash
# See what would be deleted
git clean -dn

# Actually delete untracked files
git clean -df
```

---

## Bulk Operations

### Update all component imports

```bash
# Replace old import path with new one
find libs/ apps/ -name "*.ts" -exec sed -i '' 's|@fundamental-ngx/core|@fundamental-ngx/core/button|g' {} +
```

### Format specific files

```bash
# Format only changed files
git diff --name-only --diff-filter=ACMR | grep -E '\.(ts|html|scss)$' | xargs prettier --write
```
