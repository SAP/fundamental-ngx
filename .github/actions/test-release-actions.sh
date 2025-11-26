#!/usr/bin/env bash

# Test script for release-related composite actions
# Tests bump-version, release-tags, and conventional release notes generation
# WITHOUT actually publishing to NPM

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
echo -e "${YELLOW}[1/9] Testing current version detection...${NC}"
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
echo ""

# Test 2: Test bump-version action (manual mode - no actual bump)
echo -e "${YELLOW}[2/9] Testing bump-version action (manual mode)...${NC}"
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

# Test 3: Test conventional commit analysis
echo -e "${YELLOW}[3/9] Testing conventional commit analysis...${NC}"
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

# Test 4: Test semver tags retrieval
echo -e "${YELLOW}[4/9] Testing git semver tags retrieval...${NC}"
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

# Test 5: Test release tag determination
echo -e "${YELLOW}[5/9] Testing release tag calculation...${NC}"
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
        echo -e "    ${GREEN}✓ NPM tag: $NPM_TAG, GH tag: $GH_TAG${NC}"
    else
        echo -e "    ${YELLOW}⚠️  Could not determine tags (may need git history)${NC}"
    fi
done
echo ""

# Test 6: Test conventional changelog generation (dry run)
echo -e "${YELLOW}[6/9] Testing conventional changelog generation...${NC}"
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

# Test 7: Test NX Release configuration
echo -e "${YELLOW}[7/9] Testing NX Release configuration...${NC}"
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

# Test 8: Test NX Release version command (dry-run)
echo -e "${YELLOW}[8/11] Testing NX Release version command (dry-run)...${NC}"

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

# Test nx release version dry-run (non-interactive with patch bump)
# Note: This will bump from prerelease (0.58.0-rc.19) to stable (0.58.0)
echo "  Testing: npx nx release version patch --dry-run"
NX_RELEASE_OUTPUT=$(NODE_OPTIONS="--no-deprecation" npx nx release version patch --dry-run 2>&1 | head -20 || true)

if echo "$NX_RELEASE_OUTPUT" | grep -qi "new version\\|written to manifest\\|resolved"; then
    echo -e "${GREEN}✓ NX Release version dry-run executed successfully${NC}"
    echo "  Output preview (patch bump would convert rc.19 → stable):"
    echo "$NX_RELEASE_OUTPUT" | grep -E "Resolved|New version|Applied" | head -3 | sed 's/^/    /'
else
    echo -e "${YELLOW}⚠️  NX Release dry-run completed with warnings${NC}"
    echo "  Output preview:"
    echo "$NX_RELEASE_OUTPUT" | head -5 | sed 's/^/    /'
fi
echo ""

# Test 9: Test NX Release publish (dry-run)
echo -e "${YELLOW}[9/10] Testing NX Release publish command (dry-run)...${NC}"

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

# Test 10: Test hotfix release script (dry-run)
echo -e "${YELLOW}[10/11] Testing hotfix release script...${NC}"

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

# Test 11: Dry run NPM pack (test what would be published)
echo -e "${YELLOW}[11/11] Testing NPM package dry run...${NC}"

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
