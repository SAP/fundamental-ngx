#!/usr/bin/env bash


nx run-many --target=build --all --with-deps --parallel --maxParallel=3 --exclude=docs,core,platform,docs-e2e --configuration=production
nx run-many --target=build --projects=core,platform --with-deps --parallel --maxParallel=3  --configuration=production
