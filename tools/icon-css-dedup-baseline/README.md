# Icon CSS deduplication validation

This tool builds a production consumer from packed Fundamental NGX packages and verifies that the icon catalogue is emitted exactly once while supported icon fonts and glyphs continue working.

Run from the repository root:

```bash
node --test tools/icon-css-dedup-baseline/tests/icon-catalogue.integration.test.mjs
```
