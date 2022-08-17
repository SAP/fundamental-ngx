#!/bin/bash

COMMIT_RANGE_BRANCH=main
CORE_PATH=libs/core/
PLATFORM_PATH=libs/platform/
MOMENT_ADAPTER_PATH=libs/moment-adapter/
DOCS_PATH=apps/docs/

core=$(git diff --name-only ${COMMIT_RANGE_BRANCH} | sort -u | uniq | grep ${CORE_PATH})
platform=$(git diff --name-only ${COMMIT_RANGE_BRANCH} | sort -u | uniq | grep ${PLATFORM_PATH})
moment_adapter=$(git diff --name-only ${COMMIT_RANGE_BRANCH} | sort -u | uniq | grep ${MOMENT_ADAPTER_PATH})
docs=$(git diff --name-only ${COMMIT_RANGE_BRANCH} | sort -u | uniq | grep ${DOCS_PATH})


handle_error() {
    if [ $? -eq 0 ]
    then
        echo Tests passed
    else
        exit 1
    fi
}

# Check for core
if [ -z "$core"  ]
then
    echo There are no changes at core
else
    yarn run lint:core
    handle_error
fi


# Check for platform
if [ -z "$platform"  ]
then
    echo There are no changes at platform
else
    yarn run lint:platform
    handle_error
fi

# Check for moment-adapter
if [ -z "$moment_adapter"  ]
then
    echo There are no changes at moment-adapter
else
    yarn run lint:moment-adapter
    handle_error
fi


# Check for docs
if [ -z "$docs"  ]
then
    echo There are no changes at docs
else
    yarn run lint:docs
    handle_error
fi
