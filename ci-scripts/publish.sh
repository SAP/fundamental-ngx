#!/usr/bin/env bash

set -u -e

git config --global user.email "fundamental@sap.com"
git config --global user.name "fundamental-bot"

PACKAGES=(core platform)
CURRENT_BRANCH=master

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then
   echo "################ Running Master deploy tasks ################"
   CURRENT_BRANCH=master

  # delete temp branch
  git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" ":$TRAVIS_BRANCH" > /dev/null 2>&1;
  std_ver=$(npm run std-version)
  release_tag=$(echo "$std_ver" | grep "tagging release" | awk '{print $4}')
  echo "New release version: $std_ver"




elif [[ $TRAVIS_BUILD_STAGE_NAME =~ "Pre-release" ]]; then
   echo "################ Running RC deploy tasks ################"

   CURRENT_BRANCH=${TRAVIS_BRANCH}
   npm run std-version -- --prerelease rc --no-verify



else
   echo "Missing required stage name"
   exit 1
fi


git push --follow-tags "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" $CURRENT_BRANCH > /dev/null 2>&1;
npm run build-deploy-library



cd dist/libs
NPM_BIN="$(which npm)"

for P in ${PACKAGES[@]};
do
    echo publish "@fundamental-ngx/${P}"
    cd ${P}
    $NPM_BIN  publish --access public
    cd ..
done

cd ../../


if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then

    npm run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch master
    npm run build-docs
    npm run deploy-docs -- --repo "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG"
fi

