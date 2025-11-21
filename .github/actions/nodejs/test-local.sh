#!/usr/bin/env bash

# Local testing script for nodejs composite action
# This script simulates what the composite action does

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

echo "================================================"
echo "Testing nodejs composite action locally"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test configuration
NODE_VERSION="${NODE_VERSION:-22.x}"
FROZEN_LOCKFILE="${FROZEN_LOCKFILE:-true}"

echo -e "${YELLOW}Configuration:${NC}"
echo "  Node version: $NODE_VERSION"
echo "  Frozen lockfile: $FROZEN_LOCKFILE"
echo ""

# Navigate to repo root
cd "$REPO_ROOT"

# Test 1: Node.js version
echo -e "${YELLOW}[1/6] Checking Node.js version...${NC}"
if command -v node &> /dev/null; then
    CURRENT_NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js is installed: $CURRENT_NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js is not installed${NC}"
    exit 1
fi
echo ""

# Test 2: Corepack
echo -e "${YELLOW}[2/6] Checking Corepack...${NC}"
if ! command -v corepack &> /dev/null; then
    echo "Installing Corepack..."
    npm install -g corepack
fi
echo -e "${GREEN}✓ Corepack is available: $(corepack --version)${NC}"
echo ""

# Test 3: Enable Yarn
echo -e "${YELLOW}[3/6] Enabling Yarn...${NC}"
corepack enable yarn
if command -v yarn &> /dev/null; then
    echo -e "${GREEN}✓ Yarn is enabled: $(yarn --version)${NC}"
else
    echo -e "${RED}✗ Yarn is not available${NC}"
    exit 1
fi
echo ""

# Test 4: Yarn cache
echo -e "${YELLOW}[4/6] Checking Yarn cache configuration...${NC}"
CACHE_DIR=$(yarn config get cacheFolder)
if [ -n "$CACHE_DIR" ]; then
    echo -e "${GREEN}✓ Yarn cache directory: $CACHE_DIR${NC}"
    mkdir -p "$CACHE_DIR"
else
    echo -e "${RED}✗ Yarn cache directory not configured${NC}"
    exit 1
fi
echo ""

# Test 5: Install dependencies
echo -e "${YELLOW}[5/6] Installing dependencies...${NC}"
START_TIME=$(date +%s)

if [ "$FROZEN_LOCKFILE" = "true" ]; then
    yarn install --frozen-lockfile
else
    yarn install
fi

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
echo -e "${GREEN}✓ Dependencies installed successfully (${DURATION}s)${NC}"
echo ""

# Test 6: Verify installation
echo -e "${YELLOW}[6/6] Verifying installation...${NC}"
if [ -d "node_modules" ]; then
    NODE_MODULES_SIZE=$(du -sh node_modules | cut -f1)
    PACKAGE_COUNT=$(find node_modules -maxdepth 1 -type d | wc -l)
    echo -e "${GREEN}✓ node_modules directory exists${NC}"
    echo "  Size: $NODE_MODULES_SIZE"
    echo "  Packages: $PACKAGE_COUNT"
else
    echo -e "${RED}✗ node_modules directory not found${NC}"
    exit 1
fi
echo ""

# Test 7: Verify core packages
echo -e "${YELLOW}[7/7] Verifying core packages...${NC}"
REQUIRED_PACKAGES=("@angular/core" "@nx/workspace" "typescript" "nx")
ALL_FOUND=true

for package in "${REQUIRED_PACKAGES[@]}"; do
    if [ -d "node_modules/$package" ]; then
        echo -e "${GREEN}✓ $package${NC}"
    else
        echo -e "${RED}✗ $package (missing)${NC}"
        ALL_FOUND=false
    fi
done
echo ""

if [ "$ALL_FOUND" = true ]; then
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}All tests passed! ✓${NC}"
    echo -e "${GREEN}================================================${NC}"
    exit 0
else
    echo -e "${RED}================================================${NC}"
    echo -e "${RED}Some tests failed! ✗${NC}"
    echo -e "${RED}================================================${NC}"
    exit 1
fi
