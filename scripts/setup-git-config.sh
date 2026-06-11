#!/bin/bash
# Setup git configuration for fundamental-ngx development

echo "Configuring git merge drivers..."

# Configure 'ours' merge driver for auto-generated files
git config merge.ours.driver true
git config merge.ours.name "Always use our version for generated files"

echo "✓ Git configuration complete"
echo ""
echo "This enables automatic conflict resolution for:"
echo "  - libs/mcp-server/src/data/components.json (36MB generated file)"
echo ""
echo "During merges, conflicts in these files will auto-resolve to your version."
echo "You can then regenerate with: nx run mcp-server:extract-metadata"
