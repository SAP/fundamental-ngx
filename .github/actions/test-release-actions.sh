#!/usr/bin/env bash

# Test script for release-related composite actions
# Tests bump-version, release-tags, and conventional release notes generation
# WITHOUT actually publishing to NPM
#
# Key validations:
# - Library package.json files maintain placeholders in source control
# - reset-placeholders.js restores placeholders after nx release version
# - mainNeedsSync logic only returns true for hotfix releases
# - Version resolution works from git tags and libs/core/package.json

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Testing Release Actions (Dry Run)${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

cd "$REPO_ROOT"

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies first...${NC}"
    yarn install --frozen-lockfile
fi

# Test 1: Get current version
echo -e "${YELLOW}[1/14] Testing current version detection...${NC}"
# Get version from git tags (NX Release compatible), falls back to package.json
CURRENT_VERSION=$(node -e "
    const getVersion = require('./.github/actions/helpers/get-version');
    console.log(getVersion());
")
if [ -z "$CURRENT_VERSION" ] || [ "$CURRENT_VERSION" = "undefined" ] || [ "$CURRENT_VERSION" = "unknown" ]; then
    echo -e "${RED}✗ Failed to get current version${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Current version: $CURRENT_VERSION${NC}"

# Test 1b: Get version from specific branch (used by release-tags action)
echo "  Testing version from origin/main..."
MAIN_VERSION=$(node -e "
    const getVersion = require('./.github/actions/helpers/get-version');
    try {
        const version = getVersion('origin/main');
        if (!version || version === 'undefined' || version === '0.0.0') {
            console.error('Invalid version from origin/main');
            process.exit(1);
        }
        console.log(version);
    } catch (e) {
        console.error('Error getting version from origin/main:', e.message);
        process.exit(1);
    }
")
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to get version from origin/main${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Version from origin/main: $MAIN_VERSION${NC}"
echo ""

# Test 2: Verify library package.json files have placeholders (not actual versions)
echo -e "${YELLOW}[2/14] Testing library package.json placeholders...${NC}"
PLACEHOLDER_CHECK_FAILED=false

# Get list of release projects
RELEASE_PROJECTS=$(node -e "
    try {
        const nx = require('./nx.json');
        console.log(nx.release.projects.join(' '));
    } catch (e) {
        console.log('');
    }
")

if [ -n "$RELEASE_PROJECTS" ]; then
    echo "  Checking placeholders in library package.json files..."
    for project in $RELEASE_PROJECTS; do
        if [ -f "libs/$project/package.json" ]; then
            # Use Node.js to properly parse JSON and check for actual versions
            HAS_ACTUAL_VERSIONS=$(node -e "
                const fs = require('fs');
                const pkg = JSON.parse(fs.readFileSync('libs/$project/package.json', 'utf-8'));
                
                // Helper function to check dependencies
                function checkDeps(deps) {
                    if (!deps) return null;
                    for (const [dep, version] of Object.entries(deps)) {
                        // Check @fundamental-ngx/* dependencies
                        if (dep.startsWith('@fundamental-ngx/') && version !== 'VERSION_PLACEHOLDER') {
                            return 'fundamental-ngx';
                        }
                        // Check @angular/* dependencies
                        if (dep.startsWith('@angular/') && version !== 'ANGULAR_VER_PLACEHOLDER') {
                            return 'angular';
                        }
                        // Check @ui5/webcomponents* dependencies
                        if (dep.startsWith('@ui5/webcomponents') && version !== 'UI5_WEBCOMPONENTS_VER_PLACEHOLDER') {
                            return 'ui5-webcomponents';
                        }
                        // Check fundamental-styles dependency
                        if (dep === 'fundamental-styles' && version !== 'FDSTYLES_VER_PLACEHOLDER') {
                            return 'fundamental-styles';
                        }
                        // Check @fundamental-styles/cx dependency
                        if (dep === '@fundamental-styles/cx' && version !== 'FDCXSTYLES_VER_PLACEHOLDER') {
                            return 'fundamental-styles-cx';
                        }
                        // Check @sap-theming/theming-base-content dependency
                        if (dep === '@sap-theming/theming-base-content' && version !== 'THEMING_VER_PLACEHOLDER') {
                            return 'theming';
                        }
                    }
                    return null;
                }
                
                // Check peerDependencies
                let result = checkDeps(pkg.peerDependencies);
                if (result) {
                    console.log(result);
                    process.exit(0);
                }
                
                // Check dependencies
                result = checkDeps(pkg.dependencies);
                if (result) {
                    console.log(result);
                    process.exit(0);
                }
                
                console.log('ok');
            ")
            
            if [ "$HAS_ACTUAL_VERSIONS" = "fundamental-ngx" ]; then
                echo -e "    ${RED}✗${NC} libs/$project/package.json - has actual versions for @fundamental-ngx dependencies"
                PLACEHOLDER_CHECK_FAILED=true
            elif [ "$HAS_ACTUAL_VERSIONS" = "angular" ]; then
                echo -e "    ${RED}✗${NC} libs/$project/package.json - has actual versions for @angular dependencies"
                PLACEHOLDER_CHECK_FAILED=true
            elif [ "$HAS_ACTUAL_VERSIONS" = "ui5-webcomponents" ]; then
                echo -e "    ${RED}✗${NC} libs/$project/package.json - has actual versions for @ui5/webcomponents dependencies"
                PLACEHOLDER_CHECK_FAILED=true
            elif [ "$HAS_ACTUAL_VERSIONS" = "fundamental-styles" ]; then
                echo -e "    ${RED}✗${NC} libs/$project/package.json - has actual versions for fundamental-styles"
                PLACEHOLDER_CHECK_FAILED=true
            elif [ "$HAS_ACTUAL_VERSIONS" = "fundamental-styles-cx" ]; then
                echo -e "    ${RED}✗${NC} libs/$project/package.json - has actual versions for @fundamental-styles/cx"
                PLACEHOLDER_CHECK_FAILED=true
            elif [ "$HAS_ACTUAL_VERSIONS" = "theming" ]; then
                echo -e "    ${RED}✗${NC} libs/$project/package.json - has actual versions for @sap-theming/theming-base-content"
                PLACEHOLDER_CHECK_FAILED=true
            else
                echo -e "    ${GREEN}✓${NC} libs/$project/package.json"
            fi
        fi
    done
    
    if [ "$PLACEHOLDER_CHECK_FAILED" = "true" ]; then
        echo -e "${RED}✗ Some library package.json files have actual versions instead of placeholders${NC}"
        echo "  Run 'node scripts/reset-placeholders.js' to fix this"
        exit 1
    else
        echo -e "${GREEN}✓ All library package.json files have correct placeholders${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Could not read release projects${NC}"
fi
echo ""

# Test 3: Test placeholder resolution (sync-versions utility)
echo -e "${YELLOW}[3/15] Testing placeholder resolution (sync-versions)...${NC}"
cd "$REPO_ROOT"

# Test that placeholders resolve to valid versions (not undefined)
PLACEHOLDER_RESOLUTION_FAILED=false

RESOLUTION_OUTPUT=$(node -e "
    const { replaceInFile } = require('./libs/nx-plugin/src/generators/sync-versions/utils');
    
    const testCases = [
        { name: 'VERSION_PLACEHOLDER', input: 'VERSION_PLACEHOLDER' },
        { name: 'ANGULAR_VER_PLACEHOLDER', input: 'ANGULAR_VER_PLACEHOLDER' },
        { name: 'UI5_WEBCOMPONENTS_VER_PLACEHOLDER', input: 'UI5_WEBCOMPONENTS_VER_PLACEHOLDER' },
        { name: 'FDSTYLES_VER_PLACEHOLDER', input: 'FDSTYLES_VER_PLACEHOLDER' },
        { name: 'FDCXSTYLES_VER_PLACEHOLDER', input: 'FDCXSTYLES_VER_PLACEHOLDER' },
        { name: 'THEMING_VER_PLACEHOLDER', input: 'THEMING_VER_PLACEHOLDER' },
        { name: 'RXJS_VER_PLACEHOLDER', input: 'RXJS_VER_PLACEHOLDER' }
    ];
    
    let hasErrors = false;
    
    testCases.forEach(({ name, input }) => {
        const result = replaceInFile('test.json', input);
        
        // Check for undefined or invalid versions
        if (result.includes('undefined') || result.includes('NaN') || result === input) {
            console.log('FAIL:' + name + ':' + result);
            hasErrors = true;
        } else {
            console.log('PASS:' + name + ':' + result);
        }
    });
    
    process.exit(hasErrors ? 1 : 0);
" 2>&1)

if [ $? -ne 0 ]; then
    PLACEHOLDER_RESOLUTION_FAILED=true
fi

# Parse and display results
echo "$RESOLUTION_OUTPUT" | while IFS=: read -r status name value; do
    if [ "$status" = "PASS" ]; then
        echo -e "    ${GREEN}✓${NC} $name → $value"
    elif [ "$status" = "FAIL" ]; then
        echo -e "    ${RED}✗${NC} $name → $value (invalid!)"
    fi
done

if [ "$PLACEHOLDER_RESOLUTION_FAILED" = "true" ]; then
    echo -e "${RED}✗ Some placeholders resolved to invalid versions${NC}"
    echo "  Check libs/nx-plugin/src/generators/sync-versions/utils.ts"
    exit 1
else
    echo -e "${GREEN}✓ All placeholders resolve to valid versions${NC}"
fi
echo ""

# Test 4: Test bump-version action (manual mode - no actual bump)
echo -e "${YELLOW}[4/15] Testing bump-version action (manual mode)...${NC}"
# Actions must run from repo root where package.json exists
cd "$REPO_ROOT"

# Simulate the action by running the Node.js script from repo root
export INPUT_ISPRERELEASE="false"
export INPUT_ISHOTFIX="false"
export INPUT_ISMANUAL="true"

BUMP_OUTPUT=$(node .github/actions/bump-version/index.js 2>&1 || true)
if echo "$BUMP_OUTPUT" | grep -q "new version is"; then
    echo -e "${GREEN}✓ Bump version action executed${NC}"
    echo "  Output: $(echo "$BUMP_OUTPUT" | grep "new version is" || echo "N/A")"
else
    echo -e "${RED}✗ Bump version action failed${NC}"
    echo "  Output: $BUMP_OUTPUT"
fi
echo ""

# Test 4: Test conventional commit analysis
echo -e "${YELLOW}[4/14] Testing conventional commit analysis...${NC}"
cd "$REPO_ROOT"
if [ -f ".github/actions/helpers/bumped-release.js" ]; then
    TEST_RESULT=$(node -e "
        const bumpedRelease = require('./.github/actions/helpers/bumped-release');
        (async () => {
            try {
                const result = await bumpedRelease({ 
                    prereleaseRequested: false, 
                    currentVersion: '$CURRENT_VERSION' 
                });
                console.log(JSON.stringify(result, null, 2));
            } catch (e) {
                console.log('Analysis completed (may have no commits to analyze)');
            }
        })();
    " 2>&1 || echo "No new commits to analyze")
    echo -e "${GREEN}✓ Conventional commit analysis completed${NC}"
    echo "  Result: $TEST_RESULT" | head -5
else
    echo -e "${YELLOW}⚠️  bumped-release.js not found${NC}"
fi
echo ""

# Test 5: Test semver tags retrieval
echo -e "${YELLOW}[5/14] Testing git semver tags retrieval...${NC}"
if git tag | grep -q "v"; then
    LATEST_TAG=$(git tag --sort=-v:refname | grep "^v[0-9]" | head -1)
    echo -e "${GREEN}✓ Latest semver tag: $LATEST_TAG${NC}"
    
    # Get all RC/prerelease tags
    PRERELEASE_TAGS=$(git tag | grep -E "v[0-9]+\.[0-9]+\.[0-9]+-rc" | head -5 || echo "None")
    echo "  Recent prerelease tags:"
    if [ "$PRERELEASE_TAGS" != "None" ]; then
        echo "$PRERELEASE_TAGS" | sed 's/^/    /'
    else
        echo "    None found"
    fi
else
    echo -e "${RED}✗ No semver tags found in repository${NC}"
fi
echo ""

# Test 6: Test release tag determination
echo -e "${YELLOW}[6/14] Testing release tag calculation...${NC}"
cd "$REPO_ROOT"

# Test scenarios
declare -a scenarios=(
    "0.40.2:latest:false"
    "0.41.0-rc.0:prerelease:false"
    "0.40.3:hotfix:true"
)

for scenario in "${scenarios[@]}"; do
    IFS=':' read -r version bumpTag isHotfix <<< "$scenario"
    echo "  Testing: version=$version, bumpTag=$bumpTag, isHotfix=$isHotfix"
    
    export INPUT_BUMPEDVERSION="$version"
    export INPUT_BUMPTAG="$bumpTag"
    
    OUTPUT=$(node .github/actions/release-tags/index.js 2>&1 || true)
    if echo "$OUTPUT" | grep -q "npm"; then
        # Use macOS-compatible grep (no -P flag)
        NPM_TAG=$(echo "$OUTPUT" | grep -o '"npm": "[^"]*"' | cut -d'"' -f4 | head -1)
        GH_TAG=$(echo "$OUTPUT" | grep -o '"gh": "[^"]*"' | cut -d'"' -f4 | head -1)
        MAIN_NEEDS_SYNC=$(echo "$OUTPUT" | grep -o '"mainNeedsSync": [^,}]*' | cut -d':' -f2 | tr -d ' ' | head -1)
        
        echo -e "    ${GREEN}✓ NPM tag: $NPM_TAG, GH tag: $GH_TAG, mainNeedsSync: $MAIN_NEEDS_SYNC${NC}"
        
        # Verify mainNeedsSync logic
        if [ "$bumpTag" = "prerelease" ] || [ "$bumpTag" = "latest" ]; then
            if [ "$MAIN_NEEDS_SYNC" = "true" ]; then
                echo -e "    ${RED}✗ mainNeedsSync should be false for $bumpTag releases${NC}"
                exit 1
            fi
        fi
    else
        echo -e "    ${YELLOW}⚠️  Could not determine tags (may need git history)${NC}"
    fi
done
echo ""

# Test 7: Test conventional changelog generation (dry run)
echo -e "${YELLOW}[7/14] Testing conventional changelog generation...${NC}"
cd "$REPO_ROOT"

if [ -f ".github/actions/generate-conventional-release-notes/index.js" ]; then
    # Test changelog generation without actually deleting tags
    TEST_CHANGELOG=$(node -e "
        const conventionalChangelog = require('conventional-changelog');
        const through = require('through2');
        
        const changelog = conventionalChangelog({
            preset: 'angular',
            releaseCount: 1
        });
        
        let output = '';
        changelog
            .pipe(through(function (chunk, _enc, callback) {
                output += chunk.toString();
                callback();
            }))
            .on('finish', () => {
                console.log(output.substring(0, 200) + '...');
            })
            .on('error', (err) => {
                console.log('No changes to generate changelog from');
            });
    " 2>&1 || echo "No new commits for changelog")
    
    echo -e "${GREEN}✓ Changelog generation tested${NC}"
    echo "  Preview:"
    echo "$TEST_CHANGELOG" | head -5 | sed 's/^/    /'
else
    echo -e "${YELLOW}⚠️  Changelog generator not found${NC}"
fi
echo ""

# Test 8: Test NX Release configuration
echo -e "${YELLOW}[8/14] Testing NX Release configuration...${NC}"
if [ -f "nx.json" ]; then
    # Check if release config exists
    HAS_RELEASE=$(node -e "
        const nx = require('./nx.json');
        console.log(nx.release ? 'true' : 'false');
    ")
    
    if [ "$HAS_RELEASE" = "true" ]; then
        echo -e "${GREEN}✓ NX Release configuration found${NC}"
        
        # Display configuration
        echo "  Configuration summary:"
        node -e "
            const nx = require('./nx.json');
            const rel = nx.release;
            console.log('    Projects relationship:', rel.projectsRelationship);
            console.log('    Conventional commits:', rel.version.conventionalCommits);
            console.log('    Projects count:', rel.projects.length);
            console.log('    Projects:', rel.projects.join(', '));
        "
    else
        echo -e "${RED}✗ No release configuration in nx.json${NC}"
    fi
else
    echo -e "${RED}✗ nx.json not found${NC}"
fi
echo ""

# Test 9: Test NX Release version command (dry-run)
echo -e "${YELLOW}[9/14] Testing NX Release version command (dry-run)...${NC}"

# Verify all release projects exist
echo "  Verifying release projects..."
RELEASE_PROJECTS=$(node -e "
    try {
        const nx = require('./nx.json');
        console.log(nx.release.projects.join(','));
    } catch (e) {
        console.log('');
    }
")

if [ -n "$RELEASE_PROJECTS" ]; then
    IFS=',' read -ra PROJECTS <<< "$RELEASE_PROJECTS"
    ALL_EXIST=true
    for project in "${PROJECTS[@]}"; do
        if [ -d "libs/$project" ]; then
            echo -e "    ${GREEN}✓${NC} libs/$project"
        else
            echo -e "    ${RED}✗${NC} libs/$project (not found)"
            ALL_EXIST=false
        fi
    done
    
    if [ "$ALL_EXIST" = "true" ]; then
        echo -e "${GREEN}✓ All release projects exist${NC}"
    else
        echo -e "${RED}✗ Some release projects are missing${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Could not read release projects${NC}"
fi
echo ""

# Test nx release version dry-run using the same pattern as the workflow
# Test 1: With explicit version (matches workflow usage)
NEXT_TEST_VERSION=$(node -e "
    const semver = require('semver');
    const getVersion = require('./.github/actions/helpers/get-version');
    const current = getVersion();
    console.log(semver.inc(current, 'prerelease', 'rc'));
")

echo "  Testing: npx nx release version $NEXT_TEST_VERSION --git-commit=false --git-tag=false --dry-run"
NX_RELEASE_OUTPUT=$(NODE_OPTIONS="--no-deprecation" npx nx release version "$NEXT_TEST_VERSION" --git-commit=false --git-tag=false --dry-run 2>&1 | head -20 || true)

if echo "$NX_RELEASE_OUTPUT" | grep -qi "new version\\|written to manifest\\|resolved"; then
    echo -e "${GREEN}✓ NX Release version with explicit version executed successfully${NC}"
    echo "  Output preview:"
    echo "$NX_RELEASE_OUTPUT" | grep -E "Resolved|New version|Applied" | head -3 | sed 's/^/    /'
else
    echo -e "${RED}✗ NX Release version command failed${NC}"
    echo "  Output:"
    echo "$NX_RELEASE_OUTPUT" | head -10 | sed 's/^/    /'
    exit 1
fi

# Test 2: With semver keyword (also valid)
echo "  Testing: npx nx release version patch --dry-run"
NX_RELEASE_OUTPUT2=$(NODE_OPTIONS="--no-deprecation" npx nx release version patch --dry-run 2>&1 | head -20 || true)

if echo "$NX_RELEASE_OUTPUT2" | grep -qi "new version\\|written to manifest\\|resolved"; then
    echo -e "${GREEN}✓ NX Release version with semver keyword executed successfully${NC}"
else
    echo -e "${YELLOW}⚠️  NX Release dry-run completed with warnings${NC}"
fi
echo ""

# Test 10: Test NX Release publish (dry-run)
echo -e "${YELLOW}[10/14] Testing NX Release publish command (dry-run)...${NC}"

# Check if packages are built (needed for publish test)
if [ -d "dist/libs/core" ]; then
    echo "  Testing: npx nx release publish --dry-run"
    
    # Test publish dry-run
    PUBLISH_OUTPUT=$(NODE_OPTIONS="--no-deprecation" npx nx release publish --dry-run 2>&1 || true)
    
    if echo "$PUBLISH_OUTPUT" | grep -qi "dry-run\\|would publish\\|published"; then
        echo -e "${GREEN}✓ NX Release publish dry-run executed successfully${NC}"
        echo "  Output preview:"
        echo "$PUBLISH_OUTPUT" | head -10 | sed 's/^/    /'
    else
        echo -e "${YELLOW}⚠️  NX Release publish dry-run completed${NC}"
        echo "  Output preview:"
        echo "$PUBLISH_OUTPUT" | head -5 | sed 's/^/    /'
    fi
else
    echo -e "${YELLOW}⚠️  No built packages found in dist/libs/${NC}"
    echo "  Run 'nx run-many --target=build' first to test publish dry-run"
    echo "  Skipping publish test (this is normal for quick tests)"
fi
echo ""

# Test 11: Test hotfix release script (dry-run)
echo -e "${YELLOW}[11/14] Testing hotfix release script...${NC}"

if [ -f "scripts/release-hotfix.js" ]; then
    # Check if current version is valid for hotfix
    CURRENT_IS_PRERELEASE=$(node -e "
        const semver = require('semver');
        const currentVersion = require('./.github/actions/helpers/current-version');
        console.log(semver.prerelease(currentVersion) ? 'true' : 'false');
    ")
    
    if [ "$CURRENT_IS_PRERELEASE" = "true" ]; then
        echo -e "${YELLOW}⚠️  Current version is a prerelease (${CURRENT_VERSION})${NC}"
        echo "  Hotfix releases can only be created from stable versions"
        echo "  Test skipped (this is expected behavior)"
    else
        echo "  Testing hotfix version calculation..."
        NEXT_HOTFIX_VERSION=$(node -e "
            const semver = require('semver');
            const currentVersion = require('./.github/actions/helpers/current-version');
            console.log(semver.inc(currentVersion, 'patch'));
        ")
        
        if [ -n "$NEXT_HOTFIX_VERSION" ]; then
            echo -e "${GREEN}✓ Hotfix script is valid${NC}"
            echo "  Current version: $CURRENT_VERSION"
            echo "  Next hotfix would be: $NEXT_HOTFIX_VERSION"
            
            # Verify the script uses nx release
            if grep -q "nx release version" scripts/release-hotfix.js; then
                echo -e "${GREEN}✓ Script uses 'nx release version' command${NC}"
            else
                echo -e "${RED}✗ Script does not use 'nx release version' command${NC}"
            fi
        else
            echo -e "${RED}✗ Could not calculate next hotfix version${NC}"
        fi
    fi
else
    echo -e "${RED}✗ scripts/release-hotfix.js not found${NC}"
fi
echo ""

# Test 12: Test reset-placeholders script
echo -e "${YELLOW}[12/14] Testing reset-placeholders script...${NC}"

if [ -f "scripts/reset-placeholders.js" ]; then
    # Create a backup of one package.json
    TEST_PACKAGE="libs/core/package.json"
    BACKUP_FILE="/tmp/test-package.json.backup"
    cp "$TEST_PACKAGE" "$BACKUP_FILE"
    
    # Temporarily modify it to have actual versions for all placeholder types
    node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('$TEST_PACKAGE', 'utf-8'));
        if (pkg.peerDependencies) {
            Object.keys(pkg.peerDependencies).forEach(dep => {
                if (dep.startsWith('@fundamental-ngx/')) {
                    pkg.peerDependencies[dep] = '0.58.0-rc.26';
                }
                if (dep.startsWith('@angular/')) {
                    pkg.peerDependencies[dep] = '^20.0.0';
                }
                if (dep === 'fundamental-styles') {
                    pkg.peerDependencies[dep] = '0.40.1';
                }
                if (dep === '@sap-theming/theming-base-content') {
                    pkg.peerDependencies[dep] = '^11.31.0';
                }
            });
        }
        if (pkg.dependencies) {
            Object.keys(pkg.dependencies).forEach(dep => {
                if (dep.startsWith('@fundamental-ngx/')) {
                    pkg.dependencies[dep] = '0.58.0-rc.26';
                }
                if (dep === 'fundamental-styles') {
                    pkg.dependencies[dep] = '0.40.1';
                }
                if (dep === '@fundamental-styles/cx') {
                    pkg.dependencies[dep] = '0.40.1';
                }
                if (dep === '@sap-theming/theming-base-content') {
                    pkg.dependencies[dep] = '^11.31.0';
                }
                if (dep.startsWith('@ui5/webcomponents')) {
                    pkg.dependencies[dep] = '~2.18.1';
                }
            });
        }
        fs.writeFileSync('$TEST_PACKAGE', JSON.stringify(pkg, null, 4) + '\n');
    "
    
    # Run the reset script
    RESET_OUTPUT=$(node scripts/reset-placeholders.js 2>&1)
    
    # Check if all placeholders were restored
    PLACEHOLDERS_OK=true
    
    if ! grep -q "VERSION_PLACEHOLDER" "$TEST_PACKAGE"; then
        echo -e "    ${RED}✗${NC} VERSION_PLACEHOLDER not restored"
        PLACEHOLDERS_OK=false
    fi
    if ! grep -q "ANGULAR_VER_PLACEHOLDER" "$TEST_PACKAGE"; then
        echo -e "    ${RED}✗${NC} ANGULAR_VER_PLACEHOLDER not restored"
        PLACEHOLDERS_OK=false
    fi
    if ! grep -q "FDSTYLES_VER_PLACEHOLDER" "$TEST_PACKAGE"; then
        echo -e "    ${RED}✗${NC} FDSTYLES_VER_PLACEHOLDER not restored"
        PLACEHOLDERS_OK=false
    fi
    if ! grep -q "THEMING_VER_PLACEHOLDER" "$TEST_PACKAGE"; then
        echo -e "    ${RED}✗${NC} THEMING_VER_PLACEHOLDER not restored"
        PLACEHOLDERS_OK=false
    fi
    
    if [ "$PLACEHOLDERS_OK" = "true" ]; then
        echo -e "${GREEN}✓ reset-placeholders.js successfully restored all placeholders${NC}"
        echo "  Script output:"
        echo "$RESET_OUTPUT" | head -5 | sed 's/^/    /'
    else
        echo -e "${RED}✗ reset-placeholders.js failed to restore some placeholders${NC}"
    fi
    
    # Restore backup
    mv "$BACKUP_FILE" "$TEST_PACKAGE"
else
    echo -e "${RED}✗ scripts/reset-placeholders.js not found${NC}"
fi
echo ""

# Test 13: Test update-lerna-version script
echo -e "${YELLOW}[13/14] Testing update-lerna-version script...${NC}"

if [ -f "scripts/update-lerna-version.js" ]; then
    # Backup lerna.json
    LERNA_FILE="lerna.json"
    LERNA_BACKUP="/tmp/lerna.json.backup"
    
    if [ -f "$LERNA_FILE" ]; then
        cp "$LERNA_FILE" "$LERNA_BACKUP"
        
        # Get current version from lerna.json
        LERNA_CURRENT=$(node -e "console.log(require('./lerna.json').version)")
        echo "  Current lerna.json version: $LERNA_CURRENT"
        
        # Test updating to a new version
        TEST_VERSION="0.99.0-test.1"
        UPDATE_OUTPUT=$(node scripts/update-lerna-version.js "$TEST_VERSION" 2>&1)
        
        # Verify the update worked
        LERNA_NEW=$(node -e "console.log(require('./lerna.json').version)")
        
        if [ "$LERNA_NEW" = "$TEST_VERSION" ]; then
            echo -e "${GREEN}✓ update-lerna-version.js successfully updated lerna.json${NC}"
            echo "  Script output: $UPDATE_OUTPUT"
        else
            echo -e "${RED}✗ update-lerna-version.js failed to update version${NC}"
            echo "  Expected: $TEST_VERSION, Got: $LERNA_NEW"
        fi
        
        # Test with current version to restore
        node scripts/update-lerna-version.js "$LERNA_CURRENT" > /dev/null 2>&1
        
        # Restore backup to ensure no side effects
        mv "$LERNA_BACKUP" "$LERNA_FILE"
        echo -e "${GREEN}✓ Restored original lerna.json${NC}"
        
        # Test error handling (no version argument)
        ERROR_OUTPUT=$(node scripts/update-lerna-version.js 2>&1 || true)
        if echo "$ERROR_OUTPUT" | grep -q "Version argument is required"; then
            echo -e "${GREEN}✓ Script properly validates required arguments${NC}"
        else
            echo -e "${YELLOW}⚠️  Script error handling may need review${NC}"
        fi
    else
        echo -e "${RED}✗ lerna.json not found${NC}"
    fi
else
    echo -e "${RED}✗ scripts/update-lerna-version.js not found${NC}"
fi
echo ""

# Test 14: Dry run NPM pack (test what would be published)
echo -e "${YELLOW}[14/14] Testing NPM package dry run...${NC}"

# Test packing one library to see what would be published
TEST_PACKAGE="core"
if [ -d "dist/libs/$TEST_PACKAGE" ]; then
    echo "  Testing package: $TEST_PACKAGE"
    cd "dist/libs/$TEST_PACKAGE"
    
    # Dry run pack
    PACK_OUTPUT=$(npm pack --dry-run 2>&1 || true)
    if echo "$PACK_OUTPUT" | grep -q "package:"; then
        echo -e "${GREEN}✓ NPM pack dry run successful${NC}"
        echo "  Files that would be published:"
        echo "$PACK_OUTPUT" | grep -E "^\s+[0-9]" | head -10 | sed 's/^/    /'
        
        # Get package size (macOS compatible)
        PACKAGE_SIZE=$(echo "$PACK_OUTPUT" | grep -o "package size:.*" | head -1 || echo "Unknown")
        UNPACKED_SIZE=$(echo "$PACK_OUTPUT" | grep -o "unpacked size:.*" | head -1 || echo "Unknown")
        echo "  $PACKAGE_SIZE"
        echo "  $UNPACKED_SIZE"
    else
        echo -e "${YELLOW}⚠️  Build dist first: yarn build${NC}"
    fi
    cd "$REPO_ROOT"
else
    echo -e "${YELLOW}⚠️  No built packages found in dist/libs/${NC}"
    echo "  Run 'nx run-many --target=build' first to test packaging"
fi
echo ""

# Summary
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""
echo "Current version: $CURRENT_VERSION"
echo ""
echo -e "${GREEN}All tests completed!${NC}"
echo ""
echo "To test the full release process:"
echo "  1. Make some commits with conventional commit messages"
echo "  2. Run 'npx nx release version --dry-run' to preview version bump"
echo "  3. Run 'nx run-many --target=build' to build packages"
echo "  4. Run this script again to validate everything"
echo ""
echo -e "${YELLOW}Note: This is a dry run. Nothing was published or modified.${NC}"
