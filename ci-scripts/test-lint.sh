#!/bin/bash

COMMIT_RANGE_BRANCH=master
CORE_PATH=libs/core/
PLATFORM_PATH=libs/platform/
DOCS_PATH=apps/docs/


core=$(git diff --name-only ${COMMIT_RANGE_BRANCH} | sort -u | uniq | grep ${CORE_PATH})
platform=$(git diff --name-only ${COMMIT_RANGE_BRANCH} | sort -u | uniq | grep ${PLATFORM_PATH})
docs=$(git diff --name-only ${COMMIT_RANGE_BRANCH} | sort -u | uniq | grep ${DOCS_PATH})


# Check for core
if [ -z "$core"  ]
then
    echo There are no changes at core
else
    npm run test && npm run lint:core
fi


# Check for platform
if [ -z "$platform"  ]
then
    echo There are no changes at platform
else
    npm run test:platform && npm run lint:platform
fi


# Check for docs
if [ -z "$docs"  ]
then
    echo There are no changes at docs
else
    npm run lint:docs
fi

