#!/usr/bin/env bash


nx run-many --target=build --all --with-deps --parallel --maxParallel=3 --exclude=docs,core,platform,docs-e2e --configuration=production
nx run-many --target=build --projects=core,platform --with-deps --parallel --maxParallel=3  --configuration=production
npm run build:schematics && npm run build:platform-schematics && npm run build:moment-adapter-schematics && npm run sync-versions && cd dist/libs/core/ && npm pack && cd ../platform && npm pack && cd ../moment-adapter && npm pack && cd ../..
