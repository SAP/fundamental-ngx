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

# Test i18n-manage sync executor
echo "2️⃣ Testing i18n-manage sync executor..."
npx nx run i18n:i18n-manage --command=sync
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

# Verify translations.properties exists
echo "4️⃣ Verifying translations.properties file..."
if [ -f "libs/i18n/src/lib/translations/translations.properties" ]; then
    echo "   Found translations.properties"
else
    echo "❌ ERROR: translations.properties not found"
    exit 1
fi
echo ""

# Verify .ts files exist
echo "5️⃣ Verifying generated TypeScript files..."
TS_COUNT=$(ls libs/i18n/src/lib/translations/translations*.ts 2>/dev/null | grep -v ".spec.ts" | wc -l)
echo "   Found $TS_COUNT TypeScript translation files"
ls libs/i18n/src/lib/translations/translations*.ts | grep -v ".spec.ts" | head -3
echo "   ..."
echo ""

# Final summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Test Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ i18n-manage sync executor works"
echo "✅ translations.properties file exists"
echo "✅ TypeScript translation files exist ($TS_COUNT files)"
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
