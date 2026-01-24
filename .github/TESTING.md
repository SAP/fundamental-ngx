# Testing GitHub Actions

## Quick Start

### Option 1: Test Composite Actions

Test the nodejs composite action directly:

```bash
# Run the test script
./.github/actions/nodejs/test-local.sh

# Test with custom Node version
NODE_VERSION=20.x ./.github/actions/nodejs/test-local.sh

# Test without frozen lockfile
FROZEN_LOCKFILE=false ./.github/actions/nodejs/test-local.sh
```

### Option 2: Use Act (GitHub Actions Simulation)

Install Docker and [act](https://github.com/nektos/act):

```bash
# macOS
brew install act

# Linux
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

Run tests:

```bash
# Test the nodejs composite action
act -W .github/actions/nodejs/test-action.yml

# Test specific job
act -W .github/actions/nodejs/test-action.yml -j test-default-config

# Dry run - see what would execute without running
act pull_request -W .github/workflows/on-pull-request.yml -n

# Test PR workflow (requires Docker and may take time)
act pull_request -W .github/workflows/on-pull-request.yml

# Test release workflow (requires secrets)
act workflow_dispatch -W .github/workflows/create-release.yml -n
```

## Available Tests

### Composite Action Tests

| Test                      | Command                                                                         |
| ------------------------- | ------------------------------------------------------------------------------- |
| All nodejs tests          | `act -W .github/actions/nodejs/test-action.yml`                                 |
| Default config            | `act -W .github/actions/nodejs/test-action.yml -j test-default-config`          |
| Custom Node version       | `act -W .github/actions/nodejs/test-action.yml -j test-custom-node-version`     |
| Cache effectiveness       | `act -W .github/actions/nodejs/test-action.yml -j test-cache-effectiveness`     |
| **Release actions (all)** | `act -W .github/actions/test-release-actions-workflow.yml`                      |
| Bump version only         | `act -W .github/actions/test-release-actions-workflow.yml -j test-bump-version` |
| Release tags only         | `act -W .github/actions/test-release-actions-workflow.yml -j test-release-tags` |
| Changelog only            | `act -W .github/actions/test-release-actions-workflow.yml -j test-changelog`    |
| NPM pack dry run          | `act -W .github/actions/test-release-actions-workflow.yml -j test-npm-pack`     |

### Local Script Tests

| Test                          | Command                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| Quick validation              | `./.github/actions/nodejs/test-local.sh`                       |
| Node 20.x                     | `NODE_VERSION=20.x ./.github/actions/nodejs/test-local.sh`     |
| Node 18.x                     | `NODE_VERSION=18.x ./.github/actions/nodejs/test-local.sh`     |
| No frozen lockfile            | `FROZEN_LOCKFILE=false ./.github/actions/nodejs/test-local.sh` |
| **Release actions (dry run)** | `./.github/actions/test-release-actions.sh`                    |
| **Helper functions**          | `./.github/actions/helpers/test-helpers.sh`                    |

### Helper Function Tests

✅ `get-version` - Version retrieval from git tags/package.json  
✅ `angular-version` - Angular major version detection  
✅ `get-file-contents` - File reading from filesystem and git  
✅ `git-semver-tags` - Git tag parsing and filtering  
✅ `bumped-release` - Conventional commit bump calculation  
✅ `get-release-tag` - Release tag determination logic  
✅ `current-version` - Current version detection  
✅ Jest unit tests for `get-release-tag` (5 scenarios)  
✅ Jest unit tests for `get-version` (20 scenarios: git tags, prerelease/RC handling, branch-specific versions, hotfix branches, and fallback logic)
✅ Interactive playground for release scenarios (`release-scenario.playground.js`)

### Release Scenario Playground

Test and visualize version calculation logic interactively:

```bash
# Run the playground
node .github/actions/helpers/release-scenario.playground.js
```

Edit `ACTIVE_SCENARIO` at the top of the file to test different cases:

- `PR_13773_BUG` - The prerelease RC continuation bug fix
- `CONTINUE_RC` - Continue RC releases on main
- `FIRST_RC_AFTER_STABLE` - First RC after stable release
- `STABLE_FROM_RC` - Graduate RC to stable
- `HOTFIX_OLD_VERSION` - Hotfix on older version branch
- `BREAKING_DURING_PATCH_RC` - Breaking change during patch RC
- And more...

## Limitations

### Local Script (`test-local.sh`)

- ✅ Fast and simple
- ✅ Tests actual setup on your machine
- ❌ Doesn't test GitHub Actions context

### Act

- ✅ Simulates full GitHub Actions environment
- ✅ Tests workflow/action integration
- ❌ Slower (downloads Docker images)
- ❌ Some secrets may be required

## Best Practices

1. **Before committing action changes**: Run `test-local.sh`
2. **Before testing release changes**: Run `./.github/actions/test-release-actions.sh`
3. **Before creating PR**: Run act tests to verify integration
4. **For quick iteration**: Use the local scripts
5. **For full validation**: Use act
6. **To test release flow without publishing**: Use the release actions test script

## Troubleshooting

### "Permission denied" for test-local.sh

Make the script executable:

```bash
chmod +x ./.github/actions/nodejs/test-local.sh
```

### Act fails with "unknown flag"

Act has limited flag support. Common working flags:

- `-W` or `--workflows` - Specify workflow file
- `-j` or `--job` - Run specific job
- `-l` or `--list` - List available jobs
- `-n` or `--dryrun` - Show what would be run (note: it's `-n`, not `--dry-run`)
- `--container-architecture linux/amd64` - For Apple M-series chips

### Act fails with "git: not found" or repository errors

When running release action tests with `act`, you need git in the container. When `act` prompts you to choose an image:

- ❌ **Micro** - Too minimal, doesn't include git
- ✅ **Medium** - Recommended, includes git and common tools (~500MB)
- ✅ **Large** - Full GitHub runner image (~17GB)

Alternatively, use the local script which doesn't require Docker:

```bash
./.github/actions/test-release-actions.sh
```

### Tests pass locally but fail on GitHub

Some differences between local and CI environment:

- Different OS (Linux on CI vs your local OS)
- Different environment variables
- Different secrets availability

---

### Inputs

| Input             | Description                                        | Required | Default |
| ----------------- | -------------------------------------------------- | -------- | ------- |
| `node-version`    | Node.js version to install                         | No       | `22.x`  |
| `frozen-lockfile` | Install dependencies with `--frozen-lockfile` flag | No       | `true`  |

### Usage Examples

**Basic Usage:**

```yaml
- name: Setup Node.js and dependencies
  uses: ./.github/actions/nodejs
```

**Custom Node.js Version:**

```yaml
- name: Setup Node.js 20.x
  uses: ./.github/actions/nodejs
  with:
      node-version: '20.x'
```

**Without Frozen Lockfile:**

```yaml
- name: Setup Node.js (allow lockfile changes)
  uses: ./.github/actions/nodejs
  with:
      frozen-lockfile: 'false'
```

### Caching Strategy

This action uses an optimized caching strategy that caches only the Yarn cache directory, not `node_modules`:

**Cache Key Structure:**

```
{os}-yarn-{node-version}-{yarn.lock-hash}
```

**Why not cache node_modules?**

1. **Prevents cache thrashing** - node_modules can be large and slow to compress/decompress
2. **More reliable** - Yarn cache is more consistent across different environments
3. **Faster** - Installing from Yarn cache is fast when the cache is warm
4. **Consistent** - Ensures dependencies are always installed correctly

**Cache invalidates when:**

- Operating system changes
- Node.js version changes
- `yarn.lock` file changes

---

## Release Actions Testing

### What Can Be Tested (Dry Run - No Publishing!)

All release actions can be tested **without actually publishing to NPM**:

1. **Version Bumping** (`bump-version/`)

    - Conventional commit analysis
    - Semantic version calculation
    - Prerelease/RC version handling
    - Hotfix version logic

2. **Release Tags** (`release-tags/`)

    - NPM tag determination (`latest`, `prerelease`, `hotfix`, `archive`)
    - GitHub release tag calculation
    - Main branch sync detection

3. **Changelog Generation** (`generate-conventional-release-notes/`)

    - Conventional commit parsing
    - Release notes generation
    - Tag-based changelog scoping

4. **NPM Package Validation**
    - Dry run packaging (no actual publish)
    - Package content verification
    - Metadata validation
    - File inclusion check

### Release Test Scenarios

#### Scenario 1: Current Version (Manual Release)

Tests when you want to release the current version without bumping:

```bash
# Manual release mode - uses current version
export INPUT_ISMANUAL="true"
export INPUT_ISPRERELEASE="false"
export INPUT_ISHOTFIX="false"

node .github/actions/bump-version/index.js
```

**Use case**: You've already bumped the version manually and want to publish.

#### Scenario 2: Automatic Version Bump

Tests conventional commit analysis and automatic version bumping:

```bash
# Automatic bump based on commits
export INPUT_ISMANUAL="false"
export INPUT_ISPRERELEASE="false"
export INPUT_ISHOTFIX="false"

node .github/actions/bump-version/index.js
```

**Analyzes commits and determines**:

- `patch` - for fix: commits
- `minor` - for feat: commits
- `major` - for BREAKING CHANGE
- `prerelease` - for RC versions

#### Scenario 3: Prerelease/RC Versions

Tests prerelease version handling:

```bash
export INPUT_ISMANUAL="false"
export INPUT_ISPRERELEASE="true"
export INPUT_ISHOTFIX="false"

node .github/actions/bump-version/index.js
```

**Creates versions like**: `0.41.0-rc.0`, `0.41.0-rc.1`, etc.

#### Scenario 4: Hotfix Release

Tests hotfix version logic:

```bash
export INPUT_ISMANUAL="false"
export INPUT_ISPRERELEASE="false"
export INPUT_ISHOTFIX="true"

node .github/actions/bump-version/index.js
```

**Determines**:

- If hotfix is newer than main → publish as `latest`
- If hotfix is older → publish as `archive`
- If main needs version sync

#### Scenario 5: NPM Package Dry Run

Test what would be published without actually publishing:

```bash
# Build packages first
npx nx run-many --target=build --projects=core,platform,cdk

# Test package contents
cd dist/libs/core
npm pack --dry-run
```

**Shows**:

- All files that would be included
- Package size (compressed and uncompressed)
- Number of files
- Excluded files (via .npmignore)

### Understanding Release Test Output

**Version Bump Output:**

```
new version is 0.41.0-rc.1 with release tag prerelease
```

**Release Tags Output:**

```json
{
    "bumpedVersion": "0.41.0-rc.1",
    "bumpTag": "prerelease",
    "gh": "prerelease",
    "npm": "prerelease",
    "mainNeedsSync": true
}
```

- **gh**: GitHub release type (`release` or `prerelease`)
- **npm**: NPM dist-tag (`latest`, `prerelease`, `hotfix`, `archive`)
- **mainNeedsSync**: Whether main branch needs version update

**NPM Pack Dry Run Output:**

```
npm notice 📦  @fundamental-ngx/core@0.41.0
npm notice === Tarball Contents ===
npm notice 1.2kB  package.json
npm notice 45kB   README.md
npm notice 125kB  index.js
...
npm notice === Tarball Details ===
npm notice name:          @fundamental-ngx/core
npm notice version:       0.41.0
npm notice package size:  120.5 kB
npm notice unpacked size: 450.2 kB
npm notice total files:   245
```

### Safety Features

**No Actual Publishing:**

- `npm pack --dry-run` shows contents without creating files
- Tests run in isolated environment
- No git tags are created
- No npm publish commands executed

**No Version Changes:**

- Tests don't modify `package.json`
- Tests don't commit changes
- Tests don't push to remote

**Read-Only Operations:**

- Only reads git history
- Only reads package.json
- Only analyzes commits

---

## Helper Functions

### Overview

Reusable helper functions for GitHub Actions workflows handle version management, git operations, and release calculations.

### Version Management Helpers

#### `get-version.js`

Gets version from git tags or package.json.

```javascript
const getVersion = require('./.github/actions/helpers/get-version');

const localVersion = getVersion(null); // From filesystem
const mainVersion = getVersion('origin/main'); // From git branch
```

#### `current-version.js`

Shortcut to get current version from filesystem.

```javascript
const currentVersion = require('./.github/actions/helpers/current-version');
console.log(currentVersion); // e.g., "0.58.0-rc.16"
```

#### `angular-version.js`

Gets the major version of Angular from package.json.

```javascript
const getAngularVersion = require('./.github/actions/helpers/angular-version');

const localAngular = getAngularVersion(null); // e.g., 20
const mainAngular = getAngularVersion('origin/main'); // e.g., 20
```

### Git Operation Helpers

#### `get-file-contents.js`

Reads file contents from filesystem or git.

```javascript
const getFileContents = require('./.github/actions/helpers/get-file-contents');

const localPkg = getFileContents('package.json', null); // From filesystem
const mainPkg = getFileContents('package.json', 'origin/main'); // From git
```

**Features:**

- Automatically parses JSON files
- Falls back to raw string for other file types
- Supports any git ref (branch, tag, commit)

#### `git-semver-tags.js`

Retrieves and filters git tags following semver.

```javascript
const gitSemverTags = require('./.github/actions/helpers/git-semver-tags');

const allTags = gitSemverTags(null, false); // All semver tags
const stableTags = gitSemverTags(null, true); // Only stable (no RC/beta)
const limited = gitSemverTags('1.0.0', false); // Tags up to 1.0.0
```

**Returns:** Array of tags sorted in descending order (newest first)

### Release Calculation Helpers

#### `bumped-release.js`

Analyzes conventional commits and determines the appropriate version bump.

```javascript
const bumpedRelease = require('./.github/actions/helpers/bumped-release');

const release = await bumpedRelease({
    prereleaseRequested: false,
    currentVersion: '0.58.0'
});

// Returns:
// {
//   releaseType: 'patch' | 'minor' | 'major' | 'prerelease',
//   reason: 'There are 0 BREAKING CHANGES and 2 features',
//   level: 1 // 0=patch, 1=minor, 2=major
// }
```

**Bump Rules:**

- `fix:` commits → `patch`
- `feat:` commits → `minor`
- `BREAKING CHANGE` → `major`
- Prerelease continues if in RC and same type

#### `get-release-tag.js`

Determines the appropriate npm and GitHub release tags.

```javascript
const getReleaseTag = require('./.github/actions/helpers/get-release-tag');

const tag = await getReleaseTag(
    false, // isHotfix
    false, // isPrerelease
    '0.58.0' // currentVersion
);

// Returns: 'latest' | 'prerelease' | 'hotfix' | 'ng{version}'
```

**Tag Logic:**

- Regular release → `'latest'`
- Prerelease → `'prerelease'`
- Hotfix newer than main → `'latest'`
- Hotfix older than main → `'hotfix'`
- Different Angular version → `'ng{majorVersion}'`

### Common Helper Patterns

**Check if Version is Prerelease:**

```javascript
const semver = require('semver');
const currentVersion = require('./.github/actions/helpers/current-version');

const isPrerelease = !!semver.prerelease(currentVersion);
```

**Compare Versions Across Branches:**

```javascript
const getVersion = require('./.github/actions/helpers/get-version');
const semver = require('semver');

const localVersion = getVersion(null);
const mainVersion = getVersion('origin/main');

if (semver.gt(localVersion, mainVersion)) {
    console.log('Local version is ahead of main');
}
```

**Find Latest Stable Release:**

```javascript
const gitSemverTags = require('./.github/actions/helpers/git-semver-tags');

const stableTags = gitSemverTags(null, true);
const latestStable = stableTags[0]; // e.g., "v0.57.5"
```

### Helper Dependencies

- `semver` - Version comparison and parsing
- `conventional-recommended-bump` - Commit analysis
- `@actions/core` - GitHub Actions integration

---

## Additional Resources

- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [Act (local testing tool)](https://github.com/nektos/act)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [NX Release documentation](https://nx.dev/features/manage-releases)

## CI/CD Integration

### Automatic Test Triggers

**Node.js Action Tests** (`test-action.yml`):

- Manual trigger (`workflow_dispatch`)
- When changes are made to `.github/actions/nodejs/**`

**Release Action Tests** (`test-release-actions-workflow.yml`):

- Manual trigger (`workflow_dispatch`) with scenario selection
- When changes are made to:
    - `.github/actions/bump-version/**`
    - `.github/actions/release-tags/**`
    - `.github/actions/generate-conventional-release-notes/**`

This ensures action changes are validated before being used in production workflows.

## Testing Release Scenarios

The release action tests support different scenarios:

### 1. Manual Release (No Version Bump)

Tests when a release is manually created from an existing version:

```bash
./.github/actions/test-release-actions.sh
# or with act:
act workflow_dispatch -W .github/actions/test-release-actions-workflow.yml --input test-scenario=bump-version
```

### 2. Prerelease (RC) Versions

Tests prerelease/RC version bumping:

- Analyzes conventional commits
- Calculates next RC version
- Determines appropriate npm tag (`prerelease`)

### 3. Hotfix Releases

Tests hotfix scenario:

- Determines if hotfix is newer than main
- Calculates appropriate npm tag (`hotfix` or `latest`)
- Checks if main needs version sync

### 4. NPM Package Validation

Tests what would be published **without publishing**:

```bash
# Build first
npx nx run-many --target=build --projects=core

# Then test
./.github/actions/test-release-actions.sh
```

Shows:

- Files that would be included in package
- Package size (compressed and uncompressed)
- Package metadata verification
- Required files check
