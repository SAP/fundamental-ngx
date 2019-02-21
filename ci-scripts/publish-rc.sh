#! /bin/bash

set -e

git config --global user.email "fundamental@sap.com"
git config --global user.name "fundamental-bot"

cd library

npm install

npm run std-version -- --prerelease rc --no-verify

cd ..

git push --follow-tags "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" "$TRAVIS_BRANCH" > /dev/null 2>&1;

npm run build-deploy-library

cd dist/fundamental-ngx

npm publish --tag prerelease

cd ../..
