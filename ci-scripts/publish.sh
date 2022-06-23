#!/usr/bin/env bash

set -u -e

git config --global user.email $GH_EMAIL
git config --global user.name $GH_NAME
git remote set-url origin "https://$GHACTIONS@github.com/$TRAVIS_REPO_SLUG.git"

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Pre-release" ]]; then
   echo "################ Running RC deploy tasks ################"
   npm run std-version -- --prerelease rc --no-verify

elif [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then
  echo "################ Running Master deploy tasks ################"

  # delete temp branch
  git push "https://$GHACTIONS@github.com/$TRAVIS_REPO_SLUG.git" ":$TRAVIS_BRANCH"  > /dev/null;
  std_ver=$(npm run std-version)
  release_tag=$(echo "$std_ver" | grep "tagging release" | awk '{print $4}')

  if  [[ $release_tag == v* ]]; then
    echo ""
  else
    release_tag="v$release_tag"
  fi

  echo "New release version: $std_ver"

else
   echo  "${TRAVIS_BUILD_STAGE_NAME}"
   echo "Missing required stage name"
   exit 1
fi

git status

git push --follow-tags "https://$GHACTIONS@github.com/$TRAVIS_REPO_SLUG.git" main -v
npm run build-deploy-library

echo "Before generating release notes $TRAVIS_BUILD_STAGE_NAME"

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then
    npm run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch main --verbose
    npm run build-docs-github-pages
    npm run deploy-docs -- --repo "https://$GHACTIONS@github.com/$TRAVIS_REPO_SLUG"
fi

set +x
