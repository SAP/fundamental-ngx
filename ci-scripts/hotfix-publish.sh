#!/usr/bin/env bash

set -u -e

source .ci-env/flags.sh

#PACKAGES=(core platform moment-adapter)
HOTFIX_BRANCH=hotfix_tmp_branch_for_automated_release_do_not_use
MAIN_BRANCH=refs/heads/main
OLD_TAG=$(git describe --tags --abbrev=0)

git config --global user.email $GH_EMAIL
git config --global user.name $GH_NAME
git remote set-url origin "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Hotfix-release" ]]; then
  echo "################ Running Hot Fix deploy tasks ################"

  # delete temp branch
  git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" ":$HOTFIX_BRANCH" > /dev/null 2>&1;

  std_ver=$(yarn run std-version)

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

git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git" $release_tag > /dev/null;
yarn run build-deploy-library

#cd dist/libs
#NPM_BIN="$(which yarn)"
#
#
#
#
#for P in ${PACKAGES[@]};
#do
#    echo publish "@fundamental-ngx/${P}"
#    cd ${P}
#    if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Hotfix-release" ]]; then
#      echo publishing "${P}"
#      if [[ $latest == "true" ]]; then
#        $NPM_BIN  publish --access public
#      else
#        $NPM_BIN  publish --tag archive --access public
#      fi
#    fi
#    cd ..
#done
#
#cd ../../

if [[ $TRAVIS_BUILD_STAGE_NAME =~ "Hotfix-release" ]]; then
    yarn run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch $OLD_TAG
fi


# Increment version on main
if [[ $latest == "true" ]]; then
  git stash
  git checkout $MAIN_BRANCH
  yarn run std-version
  git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git" $MAIN_BRANCH > /dev/null;
fi
