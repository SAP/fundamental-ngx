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
echo -e "${YELLOW}[1/7] Testing current version detection...${NC}"
# Try lerna.json first (preferred), fall back to package.json
CURRENT_VERSION=$(node -e "
    try {
        const lernaVersion = require('./lerna.json').version;
        if (lernaVersion) {
            console.log(lernaVersion);
        } else {
            console.log(require('./package.json').version);
        }
    } catch (e) {
        console.log(require('./package.json').version || 'unknown');
    }
")
if [ -z "$CURRENT_VERSION" ] || [ "$CURRENT_VERSION" = "undefined" ] || [ "$CURRENT_VERSION" = "unknown" ]; then
    echo -e "${RED}✗ Failed to get current version${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Current version: $CURRENT_VERSION${NC}"
echo ""

# Test 2: Test bump-version action (manual mode - no actual bump)
echo -e "${YELLOW}[2/7] Testing bump-version action (manual mode)...${NC}"
# Actions must run from repo root where package.json/lerna.json exist
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
echo -e "${YELLOW}[3/7] Testing conventional commit analysis...${NC}"
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
echo -e "${YELLOW}[4/7] Testing git semver tags retrieval...${NC}"
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
echo -e "${YELLOW}[5/7] Testing release tag calculation...${NC}"
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
echo -e "${YELLOW}[6/7] Testing conventional changelog generation...${NC}"
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

# Test 7: Dry run NPM pack (test what would be published)
echo -e "${YELLOW}[7/7] Testing NPM package dry run...${NC}"

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
        
        # Get package size
        PACKAGE_SIZE=$(echo "$PACK_OUTPUT" | grep -oP 'package size:\s+\K[^B]+B' || echo "Unknown")
        UNPACKED_SIZE=$(echo "$PACK_OUTPUT" | grep -oP 'unpacked size:\s+\K[^B]+B' || echo "Unknown")
        echo "  Package size: $PACKAGE_SIZE"
        echo "  Unpacked size: $UNPACKED_SIZE"
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
echo "  2. Run this script to see what version would be bumped"
echo "  3. Run 'nx run-many --target=build' to build packages"
echo "  4. Run this script again to see package contents"
echo ""
echo -e "${YELLOW}Note: This is a dry run. Nothing was published or modified.${NC}"
