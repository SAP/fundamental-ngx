#!/usr/bin/env bash

set -u -e
args=("$@")

if [ $# -eq 0 ]
  then
    printf "No arguments supplied\n"
    exit 1
fi


if [[ ${args[0]}  != "rc"  &&  ${args[0]}  != "master" ]]; then

    echo "Missing mandatory argument: . "
    echo " - Usage: ./publish.sh  [deploy type]  "
    echo "      type: rc | master"
    exit 1
fi


git config --global user.email "fundamental@sap.com"
git config --global user.name "fundamental-bot"



PACKAGES=(core platform)
CURRENT_BRANCH=master


echo "#### STAGE ${TRAVIS_BUILD_STAGE_NAME}"



if [ ${args[0]} == "master" ]; then
   echo "################ Running Master deploy tasks ################"
   CURRENT_BRANCH=master

  # delete temp branch
##  git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" ":$TRAVIS_BRANCH" > /dev/null 2>&1;
##  std_ver=$(npm run std-version)
##  release_tag=$(echo "$std_ver" | grep "tagging release" | awk '{print $4}')

##  echo "New release version: $std_ver"


else
   echo "################ Running RC deploy tasks ################"

   CURRENT_BRANCH=${TRAVIS_BRANCH}
## npm run std-version -- --prerelease rc --no-verify

fi



## git push --follow-tags "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" $CURRENT_BRANCH > /dev/null 2>&1;
npm run build-deploy-library


cd dist/libs

ls -l


NPM_BIN='which npm'

echo "NPM PATH:::: ${NPM_BIN}"

for P in ${PACKAGES[@]};
do
    echo publish "@fundamental-ngx/${P}"
    cd ${P}
    $NPM_BIN publish --help
    cd ..
done

cd ../../


if [ ${args[0]} == "master" ]; then
    echo "Run after publish to make sure GitHub finishes updating from the push"
##    npm run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch master

##    npm run build-docs
##    npm run deploy-docs -- --repo "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG"

fi

