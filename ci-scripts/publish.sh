#!/usr/bin/env bash

set -u -e

git config --global user.email $GH_EMAIL
git config --global user.name $GH_NAME
git remote set-url origin "https://$GHACTIONS@github.com/$TRAVIS_REPO_SLUG.git"

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Pre-release" ]]; then
   echo "################ Running RC deploy tasks ################"
   yarn run std-version -- --prerelease rc --no-verify

elif [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then
  echo "################ Running Master deploy tasks ################"

  # delete temp branch
  git push "https://$GHACTIONS@github.com/$TRAVIS_REPO_SLUG.git" ":$TRAVIS_BRANCH"  > /dev/null;
  std_ver=$(yarn run std-version)
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
yarn run build-deploy-library

echo "Before generating release notes $TRAVIS_BUILD_STAGE_NAME"

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then
    yarn run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch main --verbose
    yarn run build-docs-github-pages
    yarn run deploy-docs -- --repo "https://$GHACTIONS@github.com/$TRAVIS_REPO_SLUG"
fi

set +x
