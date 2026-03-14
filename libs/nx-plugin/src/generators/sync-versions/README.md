# sync-versions Generator

Synchronizes version placeholders in build output files with actual version numbers during the library publishing process.

## Overview

When libraries are built for publishing to npm, their `package.json` files and other configuration files contain placeholder values like `VERSION_PLACEHOLDER` or `ANGULAR_VER_PLACEHOLDER`. This generator replaces these placeholders with actual version numbers from the workspace.

## Purpose

This generator is essential for:

- ✅ Publishing libraries with correct version numbers to npm
- ✅ Maintaining consistent peer dependency versions across all libraries
- ✅ Supporting the CI/CD release workflow
- ✅ Ensuring published packages have accurate dependency information

## When It Runs

### Automatic Execution

The generator is **automatically called** by the `prepare` target during the build/publish process. You typically don't need to run it manually.

Each library has a `prepare` target in its `project.json` that calls sync-versions:

```json
{
    "targets": {
        "prepare": {
            "command": "npx nx g @fundamental-ngx/nx-plugin:sync-versions --project=core --verbose",
            "dependsOn": ["core-schematics:build"]
        }
    }
}
```

### Manual Execution

You can run it manually if needed:

```bash
nx generate @fundamental-ngx/nx-plugin:sync-versions --project=core
```

## How It Works

### 1. Version Resolution

The generator resolves versions in this priority order:

1. **Environment variables** (highest priority)

    - Set during CI/CD release workflow
    - Example: `FD_ENV_VERSION_PLACEHOLDER=0.61.2`

2. **Root package.json**

    - Falls back to workspace root version field

3. **Library package.json** (lowest priority)
    - Uses `libs/core/package.json` version
    - Default for NX Release with fixed versioning

### 2. File Discovery

The generator:

1. Reads the project configuration from `project.json`
2. Finds the build target (e.g., `@nx/angular:ng-packagr`)
3. Uses the build output directory (e.g., `dist/libs/core`)
4. Scans all files in the output directory

### 3. Placeholder Replacement

Replaces these placeholders with actual versions:

| Placeholder                         | Replaced With              | Example    |
| ----------------------------------- | -------------------------- | ---------- |
| `VERSION_PLACEHOLDER`               | Library version            | `0.61.2`   |
| `ANGULAR_VER_PLACEHOLDER`           | Angular peer dependency    | `^19.0.0`  |
| `RXJS_VER_PLACEHOLDER`              | RxJS version               | `^7.8.0`   |
| `FDSTYLES_VER_PLACEHOLDER`          | Fundamental Styles version | `0.41.0`   |
| `FDCXSTYLES_VER_PLACEHOLDER`        | CX Styles version          | `0.33.0`   |
| `FOCUSTRAP_VER_PLACEHOLDER`         | focus-trap version         | `^7.6.0`   |
| `FOCUSVISIBLE_VER_PLACEHOLDER`      | focus-visible version      | `^5.2.0`   |
| `COMPARE_VERSIONS_VER_PLACEHOLDER`  | compare-versions version   | `^6.1.0`   |
| `DAYJS_VER_PLACEHOLDER`             | dayjs version              | `^1.11.0`  |
| `THEMING_VER_PLACEHOLDER`           | SAP theming version        | `^11.18.0` |
| `MESSAGEFORMAT_VER_PLACEHOLDER`     | intl-messageformat version | `^10.7.0`  |
| `UI5_WEBCOMPONENTS_VER_PLACEHOLDER` | UI5 Web Components version | `^2.5.0`   |

## Example

### Before sync-versions

**dist/libs/core/package.json:**

```json
{
    "name": "@fundamental-ngx/core",
    "version": "VERSION_PLACEHOLDER",
    "peerDependencies": {
        "@angular/core": "ANGULAR_VER_PLACEHOLDER",
        "rxjs": "RXJS_VER_PLACEHOLDER"
    },
    "dependencies": {
        "fundamental-styles": "FDSTYLES_VER_PLACEHOLDER"
    }
}
```

### After sync-versions

**dist/libs/core/package.json:**

```json
{
    "name": "@fundamental-ngx/core",
    "version": "0.61.2",
    "peerDependencies": {
        "@angular/core": "^19.0.0",
        "rxjs": "^7.8.0"
    },
    "dependencies": {
        "fundamental-styles": "0.41.0"
    }
}
```

## Parameters

### `--project` (required)

The name of the project/library to sync versions for.

**Examples:**

```bash
nx generate sync-versions --project=core
nx generate sync-versions --project=platform
nx generate sync-versions --project=cdk
```

### `--files` (optional)

Custom glob patterns for files to sync. If not provided, the generator automatically uses the project's build output directory.

**Example:**

```bash
nx generate sync-versions --project=core --files=["dist/libs/core/**/*"]
```

## Environment Variables

Override specific versions during CI/CD by setting environment variables:

```bash
# Set library version
export FD_ENV_VERSION_PLACEHOLDER=0.61.2

# Set Angular peer dependency version
export FD_ENV_ANGULAR_VER_PLACEHOLDER=^19.0.0

# Set RxJS version
export FD_ENV_RXJS_VER_PLACEHOLDER=^7.8.0

# ... and so on for other dependencies
```

These are typically set by the release workflow in CI/CD pipelines.

## Version Format Rules

### Peer Dependencies

For peer dependencies (like Angular), versions use the caret range at the major version:

- Input: `19.2.3`
- Output: `^19.0.0`

This allows any minor/patch version of the same major version.

### Regular Dependencies

For regular dependencies, versions use the caret range at the minor version:

- Input: `7.8.1`
- Output: `^7.8.0`

This allows any patch version of the same minor version.

## Integration with Release Process

### Typical Release Flow

1. **Version Bump**

    - NX Release updates library versions in `libs/*/package.json`
    - Or CI/CD sets `FD_ENV_VERSION_PLACEHOLDER`

2. **Build**

    - Libraries are built to `dist/` directory
    - Output contains placeholder values

3. **Sync Versions** (this generator)

    - Called by the `prepare` target in each library's `project.json`
    - Replaces all placeholders with actual versions
    - Updates both built files and source `package.json`

4. **Publish**
    - Libraries are published to npm with correct versions

### Called By

Each library's `prepare` target calls sync-versions. For example, in `libs/core/project.json`:

```json
{
    "targets": {
        "prepare": {
            "command": "npx nx g @fundamental-ngx/nx-plugin:sync-versions --project=core --verbose",
            "dependsOn": ["core-schematics:build"]
        }
    }
}
```

This is typically run as part of the release workflow:

```bash
# Build libraries
nx run-many --target=build --all

# Prepare for publishing (sync versions)
nx run-many --target=prepare --all

# Publish to npm
nx release publish
```

## Source Files

**Implementation:**

- Generator: `libs/nx-plugin/src/generators/sync-versions/generator.ts`
- Version resolution: `libs/nx-plugin/src/generators/sync-versions/utils.ts`
- Tests: `libs/nx-plugin/src/generators/sync-versions/utils.spec.ts`

**Logic:**

1. Resolves versions from environment/package.json
2. Finds build output files (or uses custom glob patterns)
3. Reads each file and replaces placeholders
4. Writes updated content back to files
5. Also updates source `package.json` if it exists

## Troubleshooting

### "Could not determine version from root package.json or libs/core/package.json"

**Cause:** No version found in expected locations.

**Solution:**

- Ensure `libs/core/package.json` has a `version` field
- Or set `FD_ENV_VERSION_PLACEHOLDER` environment variable
- Or ensure root `package.json` has a version (if not a private workspace)

### Versions not updating

**Cause:** Files not being found or already processed.

**Solution:**

- Check that build output exists in `dist/` directory
- Verify the build target has `outputs` configured in `project.json`
- Run with custom `--files` parameter to specify exact files

### Wrong versions being used

**Cause:** Environment variables overriding package.json values.

**Solution:**

- Check for `FD_ENV_*` environment variables
- Clear/unset them if running locally
- Remember: env vars have highest priority

## When NOT to Use

❌ **Don't run manually** unless:

- Debugging the release process
- Testing version placeholder replacement
- Building a library for local testing

✅ **Normal workflow:** Let the `prepare` target handle it automatically during the build/publish process.

## Related

- **prepare target**: Calls this generator automatically (configured in each library's project.json)
- **NX Release**: Updates source package.json versions
- **CI/CD Release Workflow**: Sets environment variables for version overrides
