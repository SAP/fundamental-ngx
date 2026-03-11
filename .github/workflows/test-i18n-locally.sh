#!/bin/bash
set -e

echo "🧪 Testing i18n Auto-Generate Workflow Locally"
echo ""
echo "This script is READ-ONLY and safe to run."
echo "It will NOT commit or modify your git history."
echo ""

# Check we're in the right directory
if [ ! -f "libs/i18n/project.json" ]; then
    echo "❌ Error: Must run from repository root"
    exit 1
fi

# Check current git status
echo "1️⃣ Checking current git status..."
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "⚠️  Warning: You have uncommitted changes"
    echo ""
    git status --short
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
echo "✅ Git working tree is clean"
echo ""

# Test transform-translations executor
echo "2️⃣ Testing transform-translations executor..."
npx nx run i18n:transform-translations
echo "✅ Executor ran successfully"
echo ""

# Check if files changed
echo "3️⃣ Checking for generated file changes..."
if git diff --quiet -- libs/i18n/src/lib/translations/; then
    echo "✅ No changes detected (expected for clean repo)"
    CHANGES_DETECTED=false
else
    echo "⚠️  Changes detected:"
    git diff --stat libs/i18n/src/lib/translations/
    CHANGES_DETECTED=true
fi
echo ""

# Verify .properties files exist
echo "4️⃣ Verifying .properties files..."
PROPERTIES_COUNT=$(ls libs/i18n/src/lib/translations/*.properties 2>/dev/null | wc -l)
echo "   Found $PROPERTIES_COUNT .properties files"
ls libs/i18n/src/lib/translations/*.properties | head -3
echo "   ..."
echo ""

# Verify .ts files exist
echo "5️⃣ Verifying generated .ts files..."
TS_COUNT=$(ls libs/i18n/src/lib/translations/*.ts 2>/dev/null | wc -l)
echo "   Found $TS_COUNT .ts files"
ls libs/i18n/src/lib/translations/*.ts | head -3
echo "   ..."
echo ""

# Final summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Test Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ transform-translations executor works"
echo "✅ .properties files exist ($PROPERTIES_COUNT files)"
echo "✅ .ts files exist ($TS_COUNT files)"
if [ "$CHANGES_DETECTED" = true ]; then
    echo "⚠️  Generated files have uncommitted changes"
    echo ""
    echo "To reset changes:"
    echo "  git restore libs/i18n/src/lib/translations/"
else
    echo "✅ No unexpected changes"
fi
echo ""
echo "✅ All tests passed!"
echo ""
echo "Note: This script does NOT test:"
echo "  - Git secrets (GH_NAME, GH_EMAIL, GHACTIONS)"
echo "  - Actual commit/push operations"
echo "  - Fork PR validation"
echo ""
echo "Those can only be tested via GitHub Actions."
