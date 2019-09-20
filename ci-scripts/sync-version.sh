#! /bin/bash

set -u -e


#
# Update Package version in the library package.json from root package.json
#

NEW_VERSION=$(node -p "require('./package.json').version")
echo "Updating packages.json under dist/libs with version ${NEW_VERSION}"

ANGULAR_VERSION=$(node -p "require('./package.json').dependencies['@angular/core']")
RXJS_VERSION=$(node -p "require('./package.json').dependencies['rxjs']")

cd ./dist

grep -rl 'VERSION_PLACEHOLDER' . | xargs  perl -p -i -e "s/VERSION_PLACEHOLDER/${NEW_VERSION}/g"
grep -rl 'ANGULAR_VER_PLACEHOLDER' . | xargs  perl -p -i -e "s/ANGULAR_VER_PLACEHOLDER/${ANGULAR_VERSION}/g"
grep -rl 'RXJS_VER_PLACEHOLDER' . | xargs  perl -p -i -e "s/RXJS_VER_PLACEHOLDER/${RXJS_VERSION}/g"

cd ../
