#!/usr/bin/env bash

set -u -e

#PACKAGES=(core platform moment-adapter)
CURRENT_BRANCH=refs/heads/main

git config --global user.email $GH_EMAIL
git config --global user.name $GH_NAME
git remote set-url origin "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Pre-release" ]]; then
   echo "################ Running RC deploy tasks ################"

   CURRENT_BRANCH=${TRAVIS_BRANCH}
   npm run std-version -- --prerelease rc --no-verify

elif [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then
   echo "################ Running Master deploy tasks ################"
   CURRENT_BRANCH=refs/heads/main

  # delete temp branch
  git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git" ":$TRAVIS_BRANCH" > /dev/null 2>&1;
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

#git push --follow-tags "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git" $CURRENT_BRANCH > /dev/null;
git remote -v
git push --follow-tags origin main -v --no-verify
npm run build-deploy-library

#cd dist/libs
#NPM_BIN="$(which npm)"

#for P in ${PACKAGES[@]};
#do
#    echo publish "@fundamental-ngx/${P}"
#    cd ${P}
#    if [[  $TRAVIS_BUILD_STAGE_NAME =~ "Pre-release"  ]]; then
#      $NPM_BIN  publish --tag prerelease --access public
#    elif [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then
#      $NPM_BIN  publish --access public
#    fi
#    cd ..
#done

#cd ../../


if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Release" ]]; then
    npm run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch main
    npm run build-docs-github-pages
    npm run deploy-docs -- --repo "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG"
fi

set +x
