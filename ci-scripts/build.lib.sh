#!/usr/bin/env bash

nx build core --with-deps --configuration production && nx build platform --with-deps --configuration production && nx build moment-adapter --with-deps --configuration production && npm run build:schematics && npm run build:platform-schematics && npm run build:moment-adapter-schematics && npm run sync-versions && cd dist/libs/core/ && npm pack && cd ../platform && npm pack && cd ../moment-adapter && npm pack && cd ../..
