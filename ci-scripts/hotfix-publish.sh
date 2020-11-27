#!/usr/bin/env bash

set -u -e

source .ci-env/flags.sh

HOTFIX_BRANCH=hotfix_tmp_branch_for_automated_release_do_not_use
OLD_TAG=$(git describe)

git config --global user.email $GH_EMAIL
git config --global user.name $GH_NAME

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Hotfix-release" ]]; then
  echo "################ Running Hot Fix deploy tasks ################"

  # delete temp branch
  git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" ":$HOTFIX_BRANCH" > /dev/null 2>&1;

  std_ver=$(npm run std-version)

  release_tag=$(echo "$std_ver" | grep "tagging release" | awk '{print $4}')

  if  [[ $release_tag == v* ]]; then
    echo ""
  else
    release_tag="v$release_tag"
  fi

  echo "New version: $std_ver"

else
   echo  "${TRAVIS_BUILD_STAGE_NAME}"
   echo "Missing required stage name"
   exit 1
fi

git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" $release_tag > /dev/null;
npm run build-deploy-library

cd dist/libs
NPM_BIN="$(which npm)"




for P in ${PACKAGES[@]};
do
    echo publish "@fundamental-ngx/${P}"
    cd ${P}
    if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Hotfix-release" ]]; then
      echo publishing "${P}"
      if [[ $latest == "true" ]]; then
        echo LATEST
      else
        echo NON-LATEST
      fi
#      $NPM_BIN  publish --tag archive --access public
    fi
    cd ..
done

cd ../../

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Hotfix-release" ]]; then
    echo Release tag: "{$release_tag}" Old Tag: "{$OLD_TAG}"
#    npm run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch $OLD_TAG
fi
