#!/usr/bin/env bash

set -u -e

git config --global user.email "fundamental@sap.com"
git config --global user.name "fundamental-bot"

rm -Rf ./dist

PACKAGES=(store)
CURRENT_BRANCH=store

npm run build-deploy-library

cd ./dist/libs/
NPM_BIN="$(which npm)"

NEW_VERSION=$(node -p "require('./store/package.json').version")
echo $NEW_VERSION

grep -rl 'STORE_PLACEHOLDER' . | xargs  perl -p -i -e "s/STORE_PLACEHOLDER/${NEW_VERSION}/g"


pwd
for P in ${PACKAGES[@]};
do
     echo publish "@fundamental-ngx/${P}"
    cd ${P}
    $NPM_BIN publish --access public
    cd ..
done

cd ../../
