# Fundamental-ngx developers guide

## Structure

The general structure of the project is fairly standard `Nx` workspace, with some customizations. The default
folder for applications is `apps` and for the libraries is `libs`. The documentation webpage is located in the `apps/docs`.

The repository mainly contains three parts of this project:

### 1. Libraries

The libraries are located in the `libs` folder. The libraries are divided into the three categories we mentioned above,
but they are not strictly three folders. `libs/${cdk|core|cx|i18n|platform|moment-adapter|datetime-adapter}` contains the libraries which are used
for the npm packages, `libs/docs/${cdk|core|cx|i18n|platform}` contains the libraries which are used for the documentation
and `libs/nx-plugin` contains the custom Nx plugins.

The libraries `core`, `platform`, `cdk` and `cx` contain sub-libraries, which are buildable, but they do not end up in npm as a separate package,
they are more of a secondary entrypoints to their respective libraries. For example `core` library contains `core-button` library, which is
located at `libs/core/src/lib/button`. This is done like this because we want to have an [Angular Package Format](https://angular.io/guide/angular-package-format)
and also have a granular control over the tasks. For example, if something changes in `core-button`, only `core-button` and it's dependents(and dependants of its dependants)
will be built, tested and linted. This also allows us to have a more granular control over the testing of the documentation pages in e2e tests.

The documentation sub-pages, for every library and their components that we have are located in the
`libs/docs/${cdk|core|cx|platform}/${component-name}` folders. All the components which we have, have their counterpart
documentation library, which contains the parts of the documentation and examples which are specific to that component.
This setup allows us to test only the documentation pages for the component which might have been affected by any given
change, and not the whole documentation webpage. The documentation libraries have same naming structure,
which is `docs-${cdk|core|cx|i18n|platform|moment-adapter|datetime-adapter}-${component-name}`.

### 2. Documentation webpage

The documentation webpage is located in the `apps/docs` folder. The documentation webpage is a standard Angular application,
which uses the libraries from the `libs/docs` folder. It only contains the startup pages for the host libraries and the routing
for the documentation pages. The documentation pages are located in the `libs/docs` folders, as well as the examples for the
components.

Example codes are being loaded with the HTTP request to the `docs` folder, which contains the example codes for the components.
Every major library has a provider for the name of it. For example when `@fundamental-ngx/core` library docs are being loaded,
[CURRENT_LIB](libs/docs/shared/src/lib/utilities/libraries.ts) is set to `core`. This is used in the
[getAssetFromModuleAssets](libs/docs/shared/src/lib/getAsset.ts) function, which is used to load the example codes.

### StackBlitz Integration

The documentation includes StackBlitz integration that allows users to open examples in an interactive online IDE.
The StackBlitz service automatically creates a working Angular project based on the example files.

**Important:** To ensure StackBlitz files match the actual example filenames, use the `originalFileName` property
in the `ExampleFile` configuration. This property should contain the base filename (without extension) from the
examples folder. For example, if your example files are `button-sample.ts` and `button-sample.html`, set:

```typescript
examples: ExampleFile[] = [
    {
        language: 'html',
        code: getAssetFromModuleAssets('button-sample.html'),
        fileName: 'button-example',  // Display name in docs
        originalFileName: 'button-sample'  // Actual filename for StackBlitz
    },
    {
        language: 'typescript',
        component: 'ButtonExample',
        code: getAssetFromModuleAssets('button-sample.ts'),
        fileName: 'button-example',
        originalFileName: 'button-sample'
    }
];
```

The StackBlitz service will:

1. Extract metadata (selector, templateUrl, styleUrls) from TypeScript files
2. Use the `originalFileName` or extracted metadata to create files with correct names
3. Ensure the generated files match the component's selector and template references

This prevents mismatches where the StackBlitz files (e.g., `button-example.component.ts`) don't match
the component's internal references (e.g., `selector: 'ui5-button-sample'`, `templateUrl: './button-sample.html'`).

Documentation Application has assets configured in the [project.json](apps/docs/project.json) file like this:

```json
{
    "glob": "**/examples/**/*",
    "input": "libs/docs/${libraryName}",
    "output": "./docs/${libraryName}"
}
```

As a result, when the documentation application is built, the example codes are copied to the `docs` folder, which is
served by the documentation application. When example code renderer calls for the example code, HTTP request is
made to the `/docs/${libraryName}/examples/${exampleName}` endpoint, which returns the example code. This approach
helps us to have the example codes in the same repository as the documentation, but also have them served by the
documentation application in a lazy manner.

### 3. Nx plugins

Nx plugins are located at `{workspaceRoot}/libs/nx-plugin`. They are used to extend the functionality of the Nx workspace.
The plugin contains the executors and the generators which help us to automate daily tasks of the development. More information
can be found in the [Nx plugin README](libs/nx-plugin/README.md) and in the Readmes of the generators and executors.

## Formatting

We use [Prettier](https://prettier.io/) for the formatting of the code. The configuration for the Prettier is located
in the [.prettierrc](.prettierrc) file. We use eslint to enforce the formatting rules, and the configuration for the
eslint is located in the [.eslintrc](.eslintrc.json) file. The formatting rules are enforced in the pre-commit hook, so
if you try to commit the code which is not formatted, the commit will fail. You can run the formatting manually by
running the `nx format:write` command, which will format the code in the whole repository, but only the changed files
compared to the `main` branch.

Every library has a `lint` script, which is used to lint the code in the library. The linting rules are located in the
`{projectRoot}/.eslintrc.json` files. The linting rules per library are extending the rules from the root `.eslintrc.json`
file.

## Versioning

fundamental-ngx consists of multiple sub-packages and the versions for all of them
are managed by NX Release (configured in nx.json). This is done to ensure that all the packages
are in sync with each other. The versioning of the packages is done using
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [Semantic Versioning](https://semver.org/).

NX Release handles the entire release workflow including:

- Version bumping based on conventional commits
- Updating package.json files across all packages
- Creating git commits with proper commit messages
- Tagging releases
- Publishing packages to npm with provenance
- Generating changelogs

All the information about the versioning is given in the links above
but TL;DR is that before we reach version 1, every fix, feature or chore is resulting in the patch version change,
if those changes do not break the API, and if they do, then the minor version is changed.

After version 1, the patch version is the result of the bug fixes, minor version is the result of the new features,
and major version is the result of the breaking changes.

After every merge into the main, `rc` version is released automatically with the changes it includes,
this ensures fast feedback loop for the users of the library, and allows us to test the changes in the real world.

We try to avoid releasing hotfixes and downports, but from time to time it is necessary to do so, for those cases
we have a separate workflow. We try to support only the latest version of the library and the latest build, which
was released using the previous Angular version. For example, is the latest Angular version is 16, then the latest
Angular 15 compatible build will be supported, but not the Angular 14 compatible build. For ease of use,
Angular 15 compatible build will be tagged in npm as `@ng15`, but the latest build will be tagged as `@latest`,
until the next Angular version is released and we follow them with our latest build, in which case the `@latest`
tag will be moved to the new build and the `@ng16` tag will be added to the latest Angular 16 compatible build.

## Creation of the release

In `fundamental-ngx` are multiple methods for creating a release. In general there are few release types:

- stable release
- prerelease
- hotfix release

### Stable releases

`Stable` releases can be triggered either via github workflow `Create Release`, or via CLI. The scripts will take the
latest commit from the `main` branch, and create a release from it. The release from the CLI allows the user to specify the version of the release, if needed.

The command to trigger the next release automatically:

```bash
# Full release (version, commit, tag, publish)
npx nx release

# Or step by step:
# 1. Version bump
npx nx release version

# 2. Build packages
npx nx run-many --target=build --all

# 3. Publish to npm
npx nx release publish
```

The command for specific version release is:

```bash
# Specify exact version
npx nx release version ${version}

# Or use the full workflow
npx nx release ${version}
```

### Prereleases

`Prerelease`, a.k.a. `rc` releases are created automatically after every merge into the `main` branch. The version of the release is determined using the conventional commits.

While we are under `v1` stage, BREAKING CHANGES are incrementing the minor version, and the rest of the changes
are incrementing the patch version. After we reach `v1`, BREAKING CHANGES will increment the major version, and
the rest of the changes will increment the minor version or the patch, depending on the type of the change.

Let's say the latest release was `0.40.0`, and you merged a PR with the `fix` commit type. In this case, the next
version will be `0.40.1-rc.0` and ever subsequent merge will increment the `rc` version, until the next `Stable`
release is created, after which the version without the `rc` will be created. If you merge a PR with the `BREAKING CHANGE`,
then the next version will be `0.41.0-rc.0`, and the subsequent merges will increment the `rc` version, even if the PRs
contain `BREAKING CHANGE` again.

### Hotfix releases

`Hotfix` releases are created for older versions.

Steps(hotfix for the latest version of `0.40.x`):

1. `git checkout v0.40.3` - let's assume `0.40.3` is the latest version of `0.40`
2. introduce the change either with `git cherry-pick <commit-hash>` or make changes manually
3. build, run, pack, and test the libraries, ask for peer-review
4. `npm run hotfix-release` - this will create a commit, tag it, and push to trigger the hotfix release

Background:
After this, NX Release determines that the next version should be `0.40.4`, creates a commit and tag, and pushes to trigger CI which will create a release from the HEAD.
CI also finds out that the `0.40.1` is newer than the latest RC release, which is `0.40.1-rc.*`, and updates the main
branch version to `0.40.1`. Also it must be noted that the npm will mark this release as the `latest`.

Now, let's imagine that the latest RC version was `0.41.0-rc.0`, and you want to create a hotfix for `0.40.0` release.
In this case, you do the same exact steps, but the outcome is a little bit different. After the `npm run hotfix-release`
command, NX Release determines that the next version should be `0.40.1`, but since the `0.40.1` is lower than the latest RC,
which is `0.41.0-rc.0`, the main branch version will not be updated, and the hotfix will be marked as `hotfix` on npm.

Now, lets imagine that you want to downport functionality to `v0.39.8`, then you need to checkout the `v0.39.8` tag,
and do all the changes you want to do. After that you need to type in `npm run hotfix-release` and the release
process will start and will behave exactly as in previous scenario, with a small difference. When it bumps and gets
`v0.39.9`, it will not update the main branch version, since it is older than the main branch version and
for the npm it will use `hotfix` tag if Angular version is the same as in main. If the Angular versions are different,
then it will use `ng${version}` tag, where `${version}` is the Angular version of the build.

To create a `hotfix`, there are few requirements, which need to be met:

- The version from which you are creating a hotfix should not be a `prerelease` version
- The git tree should be clean
- The changes which go into the source of the hotfix should not contain breaking changes, otherwise it's not a hotfix

## Testing Release Process

Before creating an actual release, you can test the entire release process safely using dry-run commands and test scripts.

### Local Testing

Run the comprehensive test script that validates all release components:

```bash
# Run all tests (10 tests covering version bumping, release tags, changelog, NX Release, hotfix script, and npm packaging)
./.github/actions/test-release-actions.sh

# Save test results to a file
./.github/actions/test-release-actions.sh > test-results.txt 2>&1
```

**What it tests:**

- Current version detection
- Bump version action (manual and prerelease modes)
- Conventional commit analysis
- Git semver tags retrieval
- Release tag calculation
- Conventional changelog generation
- NX Release configuration
- NX Release version command (dry-run)
- NX Release publish command (dry-run)
- Hotfix release script validation
- NPM package dry run

### Preview Version Changes

See what version would be bumped without making any changes:

```bash
# See what the next version would be based on commits
npx nx release version --dry-run

# See detailed information about the version bump
npx nx release version --dry-run --verbose

# Test a specific version bump
npx nx release version 0.59.0 --dry-run

# Test the entire release workflow (version + publish) without making changes
npx nx release --dry-run

# Test just the publish step
npx nx release publish --dry-run
```

### GitHub Actions Testing

You can also run tests via GitHub Actions:

1. Go to the **Actions** tab in your repository
2. Select **"Test Release Actions (Dry Run)"** workflow
3. Click **"Run workflow"**
4. Choose a test scenario:
    - `all` - runs all tests (default)
    - `bump-version` - only version bumping tests
    - `release-tags` - only release tag tests
    - `changelog` - only changelog generation tests
    - `nx-release` - only NX Release version tests
    - `nx-release-publish` - only NX Release publish tests
    - `hotfix` - only hotfix script tests
    - `npm-pack` - only npm package tests

Or trigger via GitHub CLI:

```bash
# Run all tests
gh workflow run "Test Release Actions (Dry Run)"

# Run specific test scenario
gh workflow run "Test Release Actions (Dry Run)" -f test-scenario=nx-release
```

**Note:** All test commands are completely safe and do not create releases, publish packages, or modify any files. They only validate and preview what would happen.
