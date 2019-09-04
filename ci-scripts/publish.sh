#! /bin/bash

set -e

git config --global user.email "fundamental@sap.com"
git config --global user.name "fundamental-bot"

# delete temp branch
git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" ":$TRAVIS_BRANCH" > /dev/null 2>&1;

# Frank Note:
# library package.json should not have any dependencies or dev dependencies, only peer.
# This should install from the root. s
#
cd libs/core

npm install

std_ver=$(npm run std-version)
release_tag=$(echo "$std_ver" | grep "tagging release" | awk '{print $4}')

echo "$std_ver"

cd ../..

git push --follow-tags "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" master > /dev/null 2>&1;

npm run build-deploy-library

cd dist/libs/core

npm publish

cd ../../..

# run this after publish to make sure GitHub finishes updating from the push
npm run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch master

npm run build-docs
npm run deploy-docs -- --repo "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG"
