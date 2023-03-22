#! /bin/bash

# This can be triggered by 2 instructions
# - npm run hotfix-release
# - npm run hotfix-release-latest
# `-latest` indicates if the new tag should be treated as a latest one in npm, which is going to trigger
# - npm publish with `latest` tag, which will become new default version
# - main version incrementation



NOCOLOR='\033[0m'
ERROR='\033[31m'

HOTFIX_TMP_BRANCH="hotfix_tmp_branch_for_automated_release_do_not_use"

# make sure the current branch has non-rc tag
rcVersion=$(git describe)
[[ "$rcVersion" =~ "rc" ]] && echo -e "\n\t${ERROR}Sorry, this branch is a release candidate.${NOCOLOR}\n\tIn order to publish a hot-fix release, the package must be an non-rc version.\n\n" && exit 0

# make sure the branch is clean
git_status=$(git status --porcelain)
[ -n "$git_status" ] && echo -e "\n\t${ERROR}Sorry, you have uncommitted changes.${NOCOLOR}\n\tIn order to publish a release, your working directory must be clean.\n\n" && exit 0


git checkout -b $HOTFIX_TMP_BRANCH
sed -i '' -e '$ d' .ci-env/flags.sh
# Check if should be treated as a latest version
[[ $1 == "latest" ]] && echo -e 'echo "isLatest=true" >> $GITHUB_OUTPUT' >> .ci-env/flags.sh

[[ $1 != "latest" ]] && echo -e 'echo "isLatest=false" >> $GITHUB_OUTPUT' >> .ci-env/flags.sh

# make sure the file is executable
git update-index --chmod=+x .ci-env/flags.sh

git add -u
git commit -m "chore(release): create new release via script" -n

# push new branch to trigger travis build
git push --set-upstream origin $HOTFIX_TMP_BRANCH

# delete branch on local machine
git checkout main
git branch -D $HOTFIX_TMP_BRANCH
