#!/usr/bin/env bash

# Tests all helper modules in .github/actions/helpers/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Testing Helper Functions${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

cd "$REPO_ROOT"

# Check if required dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${RED}✗ node_modules not found. Please run: yarn install${NC}"
    exit 1
fi

if [ ! -d "node_modules/@actions/core" ]; then
    echo -e "${YELLOW}⚠️  @actions/core not found. Installing missing dependencies...${NC}"
    yarn add -D @actions/core @actions/http-client
fi

TESTS_PASSED=0
TESTS_FAILED=0

# Test 1: get-version.js
echo -e "${YELLOW}[1/8] Testing get-version helper...${NC}"
VERSION_TEST=$(node -e "
    const getVersion = require('./.github/actions/helpers/get-version');
    const localVersion = getVersion(null);
    const mainVersion = getVersion('origin/main');
    console.log(JSON.stringify({ local: localVersion, main: mainVersion }));
" 2>&1)

if echo "$VERSION_TEST" | grep -q '"local"'; then
    echo -e "${GREEN}✓ get-version working${NC}"
    echo "$VERSION_TEST" | node -e "
        const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
        console.log('  Local version:', data.local);
        console.log('  Main version:', data.main);
    "
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ get-version failed${NC}"
    echo "  Error: $VERSION_TEST"
    ((TESTS_FAILED++))
fi
echo ""

# Test 2: angular-version.js
echo -e "${YELLOW}[2/8] Testing angular-version helper...${NC}"
ANGULAR_TEST=$(node -e "
    const getAngularVersion = require('./.github/actions/helpers/angular-version');
    const localAngular = getAngularVersion(null);
    const mainAngular = getAngularVersion('origin/main');
    console.log(JSON.stringify({ local: localAngular, main: mainAngular }));
" 2>&1)

if echo "$ANGULAR_TEST" | grep -q '"local"'; then
    echo -e "${GREEN}✓ angular-version working${NC}"
    echo "$ANGULAR_TEST" | node -e "
        const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
        console.log('  Local Angular version:', data.local);
        console.log('  Main Angular version:', data.main);
    "
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ angular-version failed${NC}"
    echo "  Error: $ANGULAR_TEST"
    ((TESTS_FAILED++))
fi
echo ""

# Test 3: get-file-contents.js
echo -e "${YELLOW}[3/8] Testing get-file-contents helper...${NC}"
FILE_CONTENTS_TEST=$(node -e "
    const getFileContents = require('./.github/actions/helpers/get-file-contents');
    try {
        const local = getFileContents('package.json', null);
        const main = getFileContents('package.json', 'origin/main');
        console.log(JSON.stringify({ 
            localHasName: !!local.name,
            mainHasName: !!main.name,
            localName: local.name
        }));
    } catch (e) {
        console.log(JSON.stringify({ error: e.message }));
    }
" 2>&1)

if echo "$FILE_CONTENTS_TEST" | grep -q '"localHasName"'; then
    echo -e "${GREEN}✓ get-file-contents working${NC}"
    echo "$FILE_CONTENTS_TEST" | node -e "
        const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
        console.log('  Can read local files:', data.localHasName);
        console.log('  Can read from git:', data.mainHasName);
        console.log('  Project name:', data.localName);
    "
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ get-file-contents failed${NC}"
    echo "  Error: $FILE_CONTENTS_TEST"
    ((TESTS_FAILED++))
fi
echo ""

# Test 4: git-semver-tags.js
echo -e "${YELLOW}[4/8] Testing git-semver-tags helper...${NC}"
SEMVER_TAGS_TEST=$(node -e "
    const gitSemverTags = require('./.github/actions/helpers/git-semver-tags');
    try {
        const allTags = gitSemverTags(null, false);
        const stableTags = gitSemverTags(null, true);
        console.log(JSON.stringify({ 
            totalCount: allTags.length,
            stableCount: stableTags.length,
            latest: allTags[0],
            latestStable: stableTags[0]
        }));
    } catch (e) {
        console.log(JSON.stringify({ error: e.message }));
    }
" 2>&1)

if echo "$SEMVER_TAGS_TEST" | grep -q '"totalCount"'; then
    echo -e "${GREEN}✓ git-semver-tags working${NC}"
    echo "$SEMVER_TAGS_TEST" | node -e "
        const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
        console.log('  Total tags:', data.totalCount);
        console.log('  Stable tags:', data.stableCount);
        console.log('  Latest tag:', data.latest);
        console.log('  Latest stable:', data.latestStable);
    "
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ git-semver-tags failed${NC}"
    echo "  Error: $SEMVER_TAGS_TEST"
    ((TESTS_FAILED++))
fi
echo ""

# Test 5: bumped-release.js
echo -e "${YELLOW}[5/8] Testing bumped-release helper...${NC}"
BUMPED_RELEASE_TEST=$(node -e "
    const bumpedRelease = require('./.github/actions/helpers/bumped-release');
    const currentVersion = require('./.github/actions/helpers/current-version');
    (async () => {
        try {
            const result = await bumpedRelease({ 
                prereleaseRequested: false, 
                currentVersion 
            });
            console.log(JSON.stringify(result));
        } catch (e) {
            console.log(JSON.stringify({ error: e.message }));
        }
    })();
" 2>&1)

if echo "$BUMPED_RELEASE_TEST" | grep -q '"releaseType"'; then
    echo -e "${GREEN}✓ bumped-release working${NC}"
    echo "$BUMPED_RELEASE_TEST" | node -e "
        const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
        console.log('  Release type:', data.releaseType);
        console.log('  Reason:', data.reason);
        console.log('  Level:', data.level);
    "
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ bumped-release failed${NC}"
    echo "  Error: $BUMPED_RELEASE_TEST"
    ((TESTS_FAILED++))
fi
echo ""

# Test 6: get-release-tag.js
echo -e "${YELLOW}[6/8] Testing get-release-tag helper...${NC}"
RELEASE_TAG_TEST=$(node -e "
    const getReleaseTag = require('./.github/actions/helpers/get-release-tag');
    const currentVersion = require('./.github/actions/helpers/current-version');
    (async () => {
        try {
            const latestTag = await getReleaseTag(false, false, currentVersion);
            const prereleaseTag = await getReleaseTag(false, true, currentVersion + '-rc.0');
            const hotfixTag = await getReleaseTag(true, false, '0.40.99');
            console.log(JSON.stringify({ 
                latest: latestTag, 
                prerelease: prereleaseTag,
                hotfix: hotfixTag
            }));
        } catch (e) {
            console.log(JSON.stringify({ error: e.message }));
        }
    })();
" 2>&1)

if echo "$RELEASE_TAG_TEST" | grep -q '"latest"'; then
    echo -e "${GREEN}✓ get-release-tag working${NC}"
    echo "$RELEASE_TAG_TEST" | node -e "
        const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
        console.log('  Latest release tag:', data.latest);
        console.log('  Prerelease tag:', data.prerelease);
        console.log('  Hotfix tag:', data.hotfix);
    "
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ get-release-tag failed${NC}"
    echo "  Error: $RELEASE_TAG_TEST"
    ((TESTS_FAILED++))
fi
echo ""

# Test 7: current-version.js
echo -e "${YELLOW}[7/8] Testing current-version helper...${NC}"
CURRENT_VERSION_TEST=$(node -e "
    try {
        const currentVersion = require('./.github/actions/helpers/current-version');
        console.log(JSON.stringify({ version: currentVersion, valid: !!currentVersion }));
    } catch (e) {
        console.log(JSON.stringify({ error: e.message }));
    }
" 2>&1)

if echo "$CURRENT_VERSION_TEST" | grep -q '"version"'; then
    echo -e "${GREEN}✓ current-version working${NC}"
    echo "$CURRENT_VERSION_TEST" | node -e "
        const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
        console.log('  Current version:', data.version);
    "
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ current-version failed${NC}"
    echo "  Error: $CURRENT_VERSION_TEST"
    ((TESTS_FAILED++))
fi
echo ""

# Test 8: Run Jest tests for get-release-tag.spec.js
echo -e "${YELLOW}[8/8] Running Jest unit tests...${NC}"
if command -v jest &> /dev/null || [ -f "node_modules/.bin/jest" ]; then
    cd "$REPO_ROOT/.github/actions/helpers"
    JEST_OUTPUT=$(npx jest get-release-tag.spec.js --silent 2>&1 || true)
    
    if echo "$JEST_OUTPUT" | grep -q "PASS"; then
        echo -e "${GREEN}✓ Jest unit tests passing${NC}"
        PASSED_TESTS=$(echo "$JEST_OUTPUT" | grep -o "[0-9]* passed" | grep -o "[0-9]*" || echo "0")
        echo "  Tests passed: $PASSED_TESTS"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ Jest unit tests failed${NC}"
        echo "$JEST_OUTPUT" | head -10
        ((TESTS_FAILED++))
    fi
    cd "$REPO_ROOT"
else
    echo -e "${YELLOW}⚠️  Jest not available, skipping unit tests${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Helper Functions Test Summary${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
echo "Total tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"

if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}Failed: $TESTS_FAILED${NC}"
    echo ""
    echo -e "${RED}Some tests failed!${NC}"
    exit 1
else
    echo -e "${RED}Failed: $TESTS_FAILED${NC}"
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}All helper tests passed! ✓${NC}"
    echo -e "${GREEN}================================================${NC}"
fi
